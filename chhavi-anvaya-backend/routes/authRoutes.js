const express = require("express");
const authenticateToken = require('../middleware/authenticateToken');
const { signUp, signIn } = require("../controllers/authController"); 

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

router.get('/verify_token', authenticateToken, (req, res) => {
	console.console("User in auth routes" +  req.user)
	console.debug("User in auth routes" +  req.user)
  res.status(200).json({ user: req.user });
});

module.exports = router;
