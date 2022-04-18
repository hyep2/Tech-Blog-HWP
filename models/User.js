const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config')

class User extends Model { }

User.init(
  {

  },
  {
    sequelize,
    timestamps: false,
    modelName: "users"
  }
)

module.exports = User