const sequelize = require('./pgConfig');

(async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync({ force: true });
        // await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();