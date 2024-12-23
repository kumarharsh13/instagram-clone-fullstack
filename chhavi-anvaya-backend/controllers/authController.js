const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const signUp = async (req, res) => {
  const { email, username, password, mobile, fullName } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email ID already in use." });
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername)
      return res.status(400).json({ message: "Username already in use." });

    const hashPassowrd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hashPassowrd,
      mobile,
      name: fullName,
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const signIn = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateJwtToken(user);

    res.cookie("auth_token", token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Secure flag for HTTPS
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 3600000, // Set the cookie's expiration (e.g., 1 hour)
    });

    res
      .status(200)
      .json({ success: true, message: "Signed in successfully", token });
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
