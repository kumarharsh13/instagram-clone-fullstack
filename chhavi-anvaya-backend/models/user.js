'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'user_id',
        as: 'posts', 
      });

      User.hasMany(models.Like, {
        foreignKey: 'user_id',
        as: 'likes', 
      });

      User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'comments', 
      });

      User.belongsToMany(models.User, {
        through: models.Follow, // The Follow table is the intermediary table
        foreignKey: 'follower_id',
        as: 'followers',  // Alias for users who are being followed
        otherKey: 'follower_id',
      });
  
      // A User can have many followers (self-referential relationship)
      User.belongsToMany(models.User, {
        through: models.Follow, // The Follow table is the intermediary table
        foreignKey: 'following_id',
        as: 'followings',  // Alias for users who are following
        otherKey: 'following_id',
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};