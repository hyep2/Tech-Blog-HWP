const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config')
const bcrypt = require('bcrypt')

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    }
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(
          newUser.password,
          10
        );
        return newUser;
      },
      beforeUpdate: async (updatedUser) => {
        updatedUser.password = await bcrypt.hash(
          updatedUser.password,
          10
        );
        return updatedUser;
      },
    }
    sequelize,
    timestamps: false,
    modelName: "users"
  }
)

module.exports = User