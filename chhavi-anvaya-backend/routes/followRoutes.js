const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

const {
  getFollowers,
  getFollowings,
  createFollow,
  deleteFollow,
  mutualFollowing,
  getFollowSuggestion,
} = require("../controllers/followController");

router.get("/get_followers", authenticateToken, getFollowers);
router.get("/get_followings", authenticateToken, getFollowings);
router.get("/mutual_following", authenticateToken, mutualFollowing);
router.get("/get_follow_suggestion", authenticateToken, getFollowSuggestion);
router.post("/create_follow", createFollow);
router.delete("/delete_follow", authenticateToken, deleteFollow);

module.exports = router;
