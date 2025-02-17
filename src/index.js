const express = require('express');

const serverConfig = require('./config/serverConfig');
const {connectDB} = require('./config/dbConfig');
const userRouter = require('./routes/customerRoute');
const cors = require('cors');
const Customer = require('./schema/customerSchema');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173' // restrict calls to those this address
}));

app.use(express.urlencoded({ extended: true })); // For x-www-form-urlencoded
app.use(express.json());


//Routing Middleware

app.use('/addCustomer', userRouter);




app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server Started at ${serverConfig.PORT}`);
});

Customer.sync();



