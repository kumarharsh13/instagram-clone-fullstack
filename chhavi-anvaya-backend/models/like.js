'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, {
        foreignKey: 'user_id',  // The field in the Like table that holds the reference
        as: 'user',             // Alias for the related User model
      });

      // A Like belongs to a Post
      Like.belongsTo(models.Post, {
        foreignKey: 'post_id',  // The field in the Like table that holds the reference
        as: 'post',             // Alias for the related Post model
      });
    }
  }
  Like.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};