const {Model, DataTypes} = require('sequelize')

const sequelize = require('../config')

class Post extends Model {}

Post.init(
  {

  },
  {
    sequelize,
    timestamps: false,
    modelName: "posts"
  }
)

module.exports = Post