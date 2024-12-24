const express = require("express");
const authenticateToken = require('../middleware/authenticateToken'); 

const router = express.Router();

router.get("/homepage", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Welcome to the Homepage",
    user: req.user, 
  });
});

// Other protected routes can be added here
// router.get("/another-protected-route", authenticateToken, (req, res) => {...});

module.exports = router;
