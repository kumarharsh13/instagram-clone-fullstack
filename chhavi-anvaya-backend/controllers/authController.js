const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Follow } = require("../models");

const signUp = async (req, res) => {
  const { email, username, password, mobile, fullName } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email ID already in use." });
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername)
      return res.status(400).json({ message: "Username already in use." });

    const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordStrengthRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long and contain letters and numbers",
      });
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassowrd,
      mobile,
      name: fullName,
    });

    const defaultToFollow = await User.findOne({
      where: {
        username: "chhavi_anvaya"
      },
      attributes: ["id"],
    })

    await Follow.create({
      follower_id: newUser.id,
      following_id: defaultToFollow.id
    })

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateJwtToken({ id: user.id, username: user.username });

    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === "production" ? true : false, // Should be true in production (HTTPS)
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 3600000, // Set cookie expiration (1 hour)
    });

    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const generateJwtToken = (user) => {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

module.exports = { signUp, signIn };
