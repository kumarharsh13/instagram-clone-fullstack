const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); 

const {
  getSearchUser
} = require("../controllers/userController");

router.get("/search", authenticateToken, getSearchUser);

module.exports = router;
