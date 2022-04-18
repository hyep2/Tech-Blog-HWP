const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config')

class Comment extends Model { }

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "comments"
  }
)

module.exports = Comment