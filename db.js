
class DB {
  constructor(dbType) {
    this.dbType = dbType;
  };
  async connect() {
    try {
      if (this.dbType == 'postgres') {
        const Sequelize = require('sequelize');
        this.connection = new Sequelize(
          process.env.DB_URI,
          {
            logging: console.log,
            define: {
              timestamps: true
            },
            dialect: 'postgres',
            timezone: 'utc'
          }
        )
        await this.connection.authenticate();
        //await sequelize.sync({ force: true });
        //await sequelize.sync();
        console.log('Connection has been established successfully.');
      }
      else {
        console.log("Connecting mongo!")
      }
    } catch (error) {
      console.error('Unable to connect to the database:', error.message);
    }
  }
}
const db = new DB(process.env.DB);
db.connect()
module.exports = db.connection;

