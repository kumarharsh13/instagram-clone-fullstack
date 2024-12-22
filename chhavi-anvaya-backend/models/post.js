'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      })

      Post.hasMany(models.Like, {
        foreignKey: 'post_id',
        as: 'likes',
      });

      Post.hasMany(models.Comment, {
        foreignKey: 'post_id',
        as: 'comments',
      });
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    caption: DataTypes.STRING,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};