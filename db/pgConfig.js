const Sequelize = require('sequelize');
require('dotenv').config();
const DB_URI = (process.env.NODE_ENV == 'test') ? process.env.DB_URI_TEST : process.env.DB_URI;
console.log(DB_URI)
const sequelize = new Sequelize(
  DB_URI,
  {
    logging: console.log,
    define: {
      timestamps: true
    },
    dialect: 'postgres',
    timezone: 'utc'
  }
);
module.exports = sequelize;