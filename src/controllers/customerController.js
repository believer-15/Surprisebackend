const { createCustomer } = require("../services/customerServices");

async function addCustomer(req, res){
    try {
        console.log("Hitting customerController -> addCustomer fn");
        const customer = await createCustomer({
            name: req.body.full_name,
            email: req.body.email_id,
            mobileNumber: req.body.mobile_number,
            selectDate: req.body.select_date,
            serviceType: req.body.service_type
        });


        return res.status(201).json({
            message: 'Successfully registered the user.',
            success: true,
            data: customer,
            error: {}
        });
    } catch (error) {
        console.log("Customer not created!");
        console.log(error);
    }
}

module.exports = {
    addCustomer
}