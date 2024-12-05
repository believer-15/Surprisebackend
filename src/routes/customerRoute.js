const express = require('express');
const { addCustomer } = require('../controllers/customerController');

const userRouter = express.Router();

userRouter.post('/', addCustomer);

module.exports = userRouter;