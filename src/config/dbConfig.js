const mysql = require('mysql2');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('./serverConfig');

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: process.env.DB_PORT
});

async function connectDB(){
    try {
        await connection.connect();
        console.log("Successfully Connected to DB...")
    } catch (error) {
        console.log('Not connected to DB...');
        console.log(error);
    }
}


module.exports = {
    connection,
    connectDB
};