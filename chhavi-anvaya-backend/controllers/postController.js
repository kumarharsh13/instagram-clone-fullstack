const { Post } = require("../models");
const { User } = require("../models");
const upload = require("../middleware/post_image");
const path = require("path");

const createPost = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { caption, user_id } = req.body;
    const imageFile = req.file;

    if (!caption || !user_id || !imageFile) {
      return res
        .status(400)
        .json({
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
			include: {
				model: User,
				as: 'user',
				attributes: ["id", "username", "name", "profile_url"],
			},
			order: [["createdAt", "DESC"]],
		});
	
		return res.status(200).json({
			success: true,
			posts,
		})
	} catch (error) {
		console.error("Error fetching posts:", error);
    res.status(500).json({ message: 'Failed to fetch posts.' });
	}
};

const getMyPosts = async (req, res) => {};

const getFollowingUserPosts = async (req, res) => {};

module.exports = { createPost, getPosts, getMyPosts, getFollowingUserPosts };
