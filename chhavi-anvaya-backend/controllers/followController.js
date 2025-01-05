const { User, Follow } = require("../models");
const { Sequelize, where } = require("sequelize");

const createFollow = async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;
    const checkForAlreadyFollowing = await Follow.findOne({
      where: {
        follower_id: follower_id,
        following_id: following_id,
      },
    });

    if (checkForAlreadyFollowing)
      return res.status(400).json({ message: "Already Following" });

    await Follow.create({
      follower_id: follower_id,
      following_id: following_id,
    });

    return res.status(200).json({
      success: true,
      message: "Following successful",
    });
  } catch (error) {
    console.error("Error while following", error);
    res.status(500).json({ message: "Unable to follow" });
  }
};

const getFollowings = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({
      where: { username },
      attributes: ["id"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const myFollowings = await Follow.findAll({
      where: { follower_id: user.id },
      include: [
        {
          model: User,
          as: "following",
          attributes: ["id", "username", "name", "bio", "profile_url"],
        },
      ],
    });

    return res.status(200).json({
      message: "Follower fetched successfully.",
      myFollowings,
    });
  } catch (error) {
    console.error("Unable to fetch follower", error);
    res.status(500).json({ message: "Unable to fetch follower" });
  }
};

const getFollowers = async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ["id"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const myFollowers = await Follow.findAll({
      where: { following_id: user.id },
      include: [
        {
          model: User,
          as: "follower",
          attributes: ["id", "username", "name", "bio", "profile_url"],
        },
      ],
    });

    return res.status(200).json({
      message: "Follower fetched successfully.",
      myFollowers,
    });
  } catch (error) {
    console.error("Unable to fetch follower", error);
    res.status(500).json({ message: "Unable to fetch follower" });
  }
};

const getFollowSuggestion = async (req, res) => {
  const user_id = req.user && req.user.id;

  try {
    const allUsers = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.ne]: user_id,
        },
      },
      attributes: ["id"],
    });

    const followingUser = await Follow.findAll({
      where: {
        follower_id: user_id,
      },
      attributes: ["following_id"],
    });

    const followedUserIds = followingUser.map((follow) => follow.following_id);

    const suggestionFollow = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.ne]: user_id,
          [Sequelize.Op.notIn]: followedUserIds,
        },
      },
      attributes: ["id", "username", "name", "bio", "profile_url"],
    });

    return res.status(200).json({
      success: true,
      message: "Suggestion to follow fetch successfully",
      suggestionFollow,
    });
  } catch (error) {
    console.error("Error while fetching the suggestion to follow", error);
    res.status(500).json({ message: "Unable to fetch suggestion to follow" });
  }
};

const mutualFollowing = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteFollow = async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;
    const checkForAlreadyFollowing = await Follow.findOne({
      where: {
        follower_id: follower_id,
        following_id: following_id,
      },
    });

    if (!checkForAlreadyFollowing)
      return res.status(400).json({ message: "Follow to Unfollow" });

    await checkForAlreadyFollowing.destroy();

    return res.status(200).json({
      success: true,
      message: "Unfollow successful",
    });
  } catch (error) {
    console.error("Error while unfollowing", error);
    res.status(500).json({ message: "Unable to unfollow" });
  }
};
module.exports = {
  createFollow,
  getFollowers,
  getFollowings,
  getFollowSuggestion,
  mutualFollowing,
  deleteFollow,
};
