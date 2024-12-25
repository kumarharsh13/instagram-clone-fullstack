const jwt = require("jsonwebtoken");
const user = require('../models/user')

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    
    user.findOne({ where: { id: userId } })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: "user not found" });
        }

        res.status(200).json({ user });
      })
      .catch(error => {
        res.status(500).json({ message: "Server error" });
      });

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
