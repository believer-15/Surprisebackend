const mysql = require('mysql2');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('./serverConfig');

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
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