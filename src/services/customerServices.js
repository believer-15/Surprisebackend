const { insertUser } = require("../repositories/customerRepo");
const AppError = require("../utils/appError");

async function createCustomer(customerDetails){
    console.log("Hitting customerService -> createCustomer fn");

    const name = customerDetails.name;
    const mobile = customerDetails.mobileNumber;
    const email = customerDetails.email;
    console.log(name);

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

    validateName(name);
    validateMobile(mobile);
    // validateEmail(email);
    if(email){
        validateEmail(email);
    }
    

    const customer = await insertUser(customerDetails);

    return customer;

}
function validateName(input){

    // console.log("Hitting validateName fn");

    input = input.trim().split(" ").filter(word => word !== "").join(" ");

    const nameRegex = /^[A-Za-z ]+$/;

    if(!nameRegex.test(input)){
        throw new Error("Enter Valid Name!");
    }
}
function validateMobile(input){

    // console.log("Hitting validateMobile fn");
    input = input.trim();
    
    const mobileRegex = /^[6-9]\d{9}$/; 

    if(typeof input === "string"){
        if (typeof input !== "string" || isNaN(Number(input))) {
            throw new Error("Enter Valid Mobile Number!");
        }
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