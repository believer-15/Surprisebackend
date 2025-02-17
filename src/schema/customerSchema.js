const { sequelize } = require('../config/dbConfig');
const { DataTypes } = require('sequelize');

const customerSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Name is required"},
            len: { args: [3, 50], msg: "Name must be valid!"},
            is: {
                args: /^[A-Za-z]+([ ][A-Za-z]+)*$/,
                msg: "Name must contain letters."
            }
        }
    },    
    email_id: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: { msg: 'Invalid email format'}
        }
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Mobile number is required"},
            isNumeric: { msg: "Mobile number must contain only digits" },
            len: { args: [10, 10], msg: "Mobile number must be 10 digits" }
        }
    },
    service_type: {
        type: DataTypes.ENUM("Skin Care", "Hair Care", "Body Care", "Makeup"),
        allowNull: true,
        validate: {
            isIn: { args: [["Skin Care", "Hair Care", "Body Care", "Makeup"]], msg: "Invalid service type" }
        }
    }
}

const Customer = sequelize.define('Customer', customerSchema,
    {
        timestamps: true,   // Adds createdAt & updatedAt columns
        createdAt: true,
        updatedAt: 'updateTimestamp',
        paranoid: true,
        tableName: "customer" // Custom table name
    }
);

module.exports = Customer;