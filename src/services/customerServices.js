const { insertUser } = require("../repositories/customerRepo");
const AppError = require("../utils/appError");
const sanitize = require("sanitize-html");

async function createCustomer(customerDetails){
    console.log("Hitting customerService -> createCustomer fn");

    const name = customerDetails.name?.trim();
    const mobile = customerDetails.mobileNumber?.trim();
    const email = customerDetails.email?.trim();
    const serviceType =customerDetails.serviceType?.trim();
    // console.log(name);

    if(!name && !mobile){
        throw new Error("Name and Mobile Number are required!");
    } else if(!name && mobile){
        throw new Error("Name is required!");
    } else if(name && !mobile) {
        throw new Error("Mobile Number is required!");
    }
    if(typeof name !== 'string' && typeof mobile !== 'string'){
        // console.log(typeof name);
        throw new Error("Enter Valid Input!");
    }  
    
    const DataSanitized = {
        full_name: sanitize(name),
        email_id: sanitize(email),
        mobile_number: sanitize(mobile),
        service_type: sanitize(serviceType)
    }
    
    // ✅ Validate Input
    validateName(DataSanitized.full_name);
    validateMobile(DataSanitized.mobile_number);
    if (DataSanitized.email_id) {
        validateEmail(DataSanitized.email_id);
    }

    // ✅ Insert into DB
    const customer = await insertUser(DataSanitized);

    return customer;
}

function validateName(input){

    // console.log("Hitting validateName fn");

    input = input.split(" ").filter(word => word !== "").join(" ");

    const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;

    if(!nameRegex.test(input)){
        throw new Error("Enter Valid Name!");
    }
}
function validateMobile(input){

    // console.log("Hitting validateMobile fn");
    input = input.trim();
    
    const mobileRegex = /^[6-9]\d{9}$/; 

    if (isNaN(Number(input))) {
        throw new Error("Enter Valid Mobile Number!");
    }

    if(!mobileRegex.test(input)){
        throw new Error("Enter Valid Mobile Number!");
    }    
}
function validateEmail(input){

    console.log("Hitting validateEmail fn");

    input = input.trim();

    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if(!emailRegex.test(input)){
        throw new Error("Enter Valid Email!");
    }
}

module.exports = {
    createCustomer,
    validateName,
    validateMobile,
    validateEmail
}