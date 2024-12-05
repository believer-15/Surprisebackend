const { insertUser } = require("../repositories/customerRepo");

async function createCustomer(customerDetails){
    console.log("Hitting customerService -> createCustomer fn");

    const firstName = customerDetails.name;
    const mobile = customerDetails.mobileNumber;

    if(!firstName || !mobile){
        throw new Error("Name and mobile number are required");
    }

    const customer = await insertUser(customerDetails);

    return customer;

}

module.exports = {
    createCustomer
}