const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // Multer upload handler
const { User } = require("../models"); // Sequelize model for User

// Route to upload a profile image
router.post(
  "/upload-profile-image",
  upload.single("profile_image"),
  async (req, res) => {
    try {
      const userId = req.body.userId; // Assuming the user is authenticated and you have their ID

      // Store the profile image path (relative to the server)
      const imagePath = `profile_image/${req.file.filename}`;

      // Update the user's profile image path in the database
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.profile_image = imagePath;
      await user.save();

      return res.status(200).json({
        message: "Profile image uploaded successfully",
        profile_image: imagePath, // Return the image path or URL
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error uploading profile image" });
    }
  }
);

module.exports = router;
