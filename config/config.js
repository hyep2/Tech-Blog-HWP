require('dotenv').config()

const { Sequelize } = require('sequelize')

//setting up connection to mysql workbench to vscode
module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  },
  
  )
