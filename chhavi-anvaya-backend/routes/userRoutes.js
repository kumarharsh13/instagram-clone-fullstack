const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); 

const {
  getSearchUser,
  changePassword,
  editProfileDetails
} = require("../controllers/userController");

router.post("/change_password", authenticateToken, changePassword)
router.post("/edit_profile", authenticateToken, editProfileDetails)
router.get("/search", authenticateToken, getSearchUser);

module.exports = router;
