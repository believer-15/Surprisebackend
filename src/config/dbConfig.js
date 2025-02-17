const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('./serverConfig');


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false, 
})

async function connectDB(){
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL Connection Established!");
    } catch (error) {
        console.error("❌ MySQL Connection Failed:", error);
    }
};


module.exports = {
    connectDB,
    sequelize
};