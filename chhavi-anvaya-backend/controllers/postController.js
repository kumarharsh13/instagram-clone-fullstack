const { User, Post, Like, Comment, Follow } = require("../models");
const upload = require("../middleware/post_image");
const path = require("path");
const { where } = require("sequelize");

const createPost = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { caption, user_id } = req.body;
    const imageFile = req.file;

    if (!caption || !user_id || !imageFile) {
      return res.status(400).json({
        message: "All fields (image, caption, user_id) are required!",
      });
    }

    const image_url = path.join("images/post_image", imageFile.filename);
    try {
      const newPost = await Post.create({
        image_url,
        caption,
        user_id,
      });

      return res.status(201).json({
        success: true,
        message: "Post created successfully!",
        post: newPost,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating post" });
    }
  });
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "name", "profile_url"],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["user_id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "name", "profile_url"],
            },
          ],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["comment"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "name", "profile_url"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts." });
  }
};

const getMyPosts = async (req, res) => {
  const user_id = req.user && req.user.id;
  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const posts = await Post.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "name", "profile_url"],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["user_id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "name", "profile_url"],
            },
          ],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["comment"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "name", "profile_url"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts." });
  }
};

const getFollowingUserPosts = async (req, res) => {
  const user_id = req.user && req.user.id;
  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const followingUser = await Follow.findAll({
      where: {
        follower_id: user_id,
      },
      attributes: ["following_id"],
    });

    const followedUserIds = followingUser.map((follow) => follow.following_id);

    const posts = await Post.findAll({
      where: {
        user_id: followedUserIds,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "name", "profile_url"],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["user_id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "name", "profile_url"],
            },
          ],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["comment"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "name", "profile_url"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts." });
  }
};

const getOtherUserProfilePost = async (req, res) => {
  const user_id = req.user && req.user.id;
  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }
  
  const { username } = req.query;

  try {
    console.debug(req.query)
    const otherUser = await User.findOne({
      where: {
        username: username,
      },
      attributes: ["id"],
    });

    const isFollowingOtherUser = await Follow.findOne({
      where: {
        follower_id: user_id,
        following_id: otherUser.id,
      },
      attributes: ["id"],
    });

    const posts = await Post.findAll({
      where: {
        user_id: otherUser.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "name", "profile_url"],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["user_id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "name", "profile_url"],
            },
          ],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["comment"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "name", "profile_url"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      posts,
      isFollowingOtherUser,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts." });
  }
};

const createLike = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;

    const exisitingLike = await Like.findOne({
      where: { post_id: post_id, user_id: user_id },
    });

    if (exisitingLike) {
      return res
        .status(400)
        .json({ message: "User has already liked the post." });
    }

    const newLike = await Like.create({ post_id, user_id });
    return res.status(201).json({
      success: true,
      message: "Post liked successfully.",
      like: newLike,
    });
  } catch (error) {
    console.error("Error while liking");
    res.status(500).json({ message: "Failed to Like the post" });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;
    const exisitingLike = await Like.findOne({ where: { post_id, user_id } });
    if (!exisitingLike) {
      return res.status(400).json({ message: "Like not found" });
    }

    await exisitingLike.destroy();

    res.status(200).json({
      success: true,
      message: "Like removed successfully",
    });
  } catch (error) {
    console.error("Error while unliking");
    res.status(500).json({ message: "Failed to Unlike the post" });
  }
};

const createComment = async (req, res) => {
  try {
    const { comment, post_id, user_id } = req.body;
    console.debug(req.body);
    const newComment = await Comment.create({
      comment,
      post_id,
      user_id,
    });
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      newComment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment");
    res.status(400).json({ message: "Failed to add comment" });
  }
};

module.exports = {
  createPost,
  getPosts,
  getMyPosts,
  getFollowingUserPosts,
  getOtherUserProfilePost,
  createLike,
  deleteLike,
  createComment,
};
