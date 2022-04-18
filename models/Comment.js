const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config')

class Comment extends Model { }

Comment.init(
  {

  },
  {
    sequelize,
    timestamps: false,
    modelName: "comments"
  }
)

module.exports = Comment