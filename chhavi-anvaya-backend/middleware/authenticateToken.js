const jwt = require("jsonwebtoken");
const { User } = require('../models');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    User.findOne({ where: { id: userId } })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next(); 
      })
      .catch(error => {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
      });

  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
