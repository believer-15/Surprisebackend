const express = require('express');

const serverConfig = require('./config/serverConfig');
const {connectDB, connection} = require('./config/dbConfig');

const app = express();

app.listen(serverConfig.PORT, () => {
    connectDB();
    console.log(`Server Started at ${serverConfig.PORT}`);
})

app.get('/', (req, res) => {
    let sql = "SELECT * FROM CUSTOMER_INFO";
    connection.query(sql, function(err, results){
        if(err) throw err;
        // res.send(results);
        results.forEach(result => {
            console.log(result.full_name);
            res.send(result);
        });
    });
});