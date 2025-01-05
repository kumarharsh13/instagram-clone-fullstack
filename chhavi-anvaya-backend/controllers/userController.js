const { User } = require("../models");
const bcrypt = require("bcryptjs");
const upload = require("../middleware/profile_image");
const path = require("path");
const { Op } = require("sequelize");

const changePassword = async (req, res) => {
  const user_id = req.user && req.user.id;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    const passwordStrengthRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordStrengthRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and contain letters and numbers",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id: user_id } });

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const editProfileDetails = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const user_id = req.user && req.user.id;

    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, bio, mobile } = req.body;

    const imageFile = req.file;
    let image_url = null;
    if (imageFile) {
      image_url = path.join("images/profile_image", imageFile.filename);
    }

    try {
      const updatedData = {};

      if (username) {
        updatedData.username = username;
      } else {
        updatedData.username = user.username;
      }

      if (bio) updatedData.bio = bio;
      if (mobile) updatedData.contact_number = mobile;
      if (image_url) updatedData.profile_url = image_url;

      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: "No fields to update." });
      }
      await User.update(updatedData, { where: { id: user_id } });
      return res.status(200).json({ message: "Profile updated successfully!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error while updating user details." });
    }
  });
};

const getSearchUser = async (req, res) => {
  const query = req.query.query;

  try {
    const users = await await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${query}%` } },
          { name: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: ["id", "username", "name", "profile_url"],
      limit: 6,
    });

    res.json({ success: true, users });
  } catch (error) {
    console.error("Error searching users:", error);
    res.json({ success: false, users: [] });
  }
};

module.exports = { getSearchUser, changePassword, editProfileDetails };
