const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/config')

class Comment extends Model { }

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },ç
  {
    sequelize,
    modelName: "comments"
  }
)

module.exports = Comment