const { createCustomer } = require("../services/customerServices");
const AppError = require("../utils/appError");

async function addCustomer(req, res){
    try {
        console.log("Hitting customerController -> addCustomer fn");
        const customer = await createCustomer({
            name: req.body.full_name,
            email: req.body.email_id,
            mobileNumber: req.body.mobile_number,
            serviceType: req.body.service_type
        });
        return res.json({
            message: 'Successfully registered the user.',
            status: 201,
            success: true,
            data: customer,
            error: {}
        });
    } catch (error) {
        console.log("Customer not created!");
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        return res.json({
            success: false,
            message: error.message,
            data: {},
            error: error
        });
    }
}

module.exports = {
    addCustomer
}