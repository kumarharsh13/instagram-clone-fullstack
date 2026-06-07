"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Posts
    await queryInterface.addIndex("Posts", ["user_id"], { name: "idx_posts_user_id" });

    // Likes
    await queryInterface.addIndex("Likes", ["post_id"], { name: "idx_likes_post_id" });
    await queryInterface.addIndex("Likes", ["user_id"], { name: "idx_likes_user_id" });

    // Comments
    await queryInterface.addIndex("Comments", ["post_id"], { name: "idx_comments_post_id" });
    await queryInterface.addIndex("Comments", ["user_id"], { name: "idx_comments_user_id" });

    // Follows — unique constraint prevents duplicate follow rows
    await queryInterface.addIndex("Follows", ["following_id"], { name: "idx_follows_following_id" });
    await queryInterface.addIndex("Follows", ["follower_id", "following_id"], {
      name: "idx_follows_unique_pair",
      unique: true,
    });

    // Notifications
    await queryInterface.addIndex("Notifications", ["user_id"], { name: "idx_notifications_user_id" });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Posts", "idx_posts_user_id");
    await queryInterface.removeIndex("Likes", "idx_likes_post_id");
    await queryInterface.removeIndex("Likes", "idx_likes_user_id");
    await queryInterface.removeIndex("Comments", "idx_comments_post_id");
    await queryInterface.removeIndex("Comments", "idx_comments_user_id");
    await queryInterface.removeIndex("Follows", "idx_follows_following_id");
    await queryInterface.removeIndex("Follows", "idx_follows_unique_pair");
    await queryInterface.removeIndex("Notifications", "idx_notifications_user_id");
  },
};
