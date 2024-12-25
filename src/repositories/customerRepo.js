const { connection } = require("../config/dbConfig");

async function insertUser(userDetails){
    console.log("Hitting customerRepo -> insertUser fn");

    const { name, email, mobileNumber, serviceType } = userDetails;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO customer_info (full_name, email_id, mobile_number, service_type) VALUES (?, ?, ?, ?)';
        connection.query(sql, [name, email, mobileNumber, serviceType], (err, result) => {
            if (err) {
                console.log("Error in inserting user");
                return reject(err);
            } else {
                return resolve({
                    id: result.insertId,
                    name,
                    email,
                    mobileNumber,
                    serviceType,
                    
                });
            }
        });
    });
}

async function getCustomer(parameters) {
    return new Promise((resolve, reject) => {
        console.log("Hey from find customers");
        try {
            const query = `SELECT * FROM CUSTOMER_INFO WHERE email_id = ${parameters} LIMIT 1`;
    
            connection.query(query, (err, results) => {
                if(err){
                   reject(err)
                }else {
                    resolve(results[0]);
                }
            })
        } catch (error) {
            console.log("No Match Found");
            console.log(error);
        }
    })
}

async function addColumn(tableName, columnName, columnType = 'VARCHAR(255)' || 'INT' || 'TIMESTAMP'){
    try {
        const response = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;

        connection.query(response, (err, result) => {
            if(err){
                throw err;
            } else {
                return result;
            }
        })
    } catch(error) {
        console.log("Failed to Create Add Column");
        console.log(error);
    }

}

async function deleteColumn(tableName, columnName) {
    try {
        const response = `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`;

        connection.query(response,(err, result) => {
            if(err) throw err;
            return result;
        } )
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertUser,
    getCustomer,
    addColumn,
    deleteColumn
}