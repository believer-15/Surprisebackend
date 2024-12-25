const { insertUser } = require("../repositories/customerRepo");
const AppError = require("../utils/appError");

async function createCustomer(customerDetails){
    console.log("Hitting customerService -> createCustomer fn");

    const name = customerDetails.name.trim();
    const mobile = customerDetails.mobileNumber.trim();
    const email = customerDetails.email;

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

    function validateName(input){

        input = input.trim().split(" ").filter(word => word !== "").join(" ");

        const nameRegex = /^[A-Za-z ]+$/;

        if(!nameRegex.test(input)){
            throw new Error("Enter Valid Name!");
        }
    }

    function validateMobile(input){

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

        input = input.trim();

        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        if(!emailRegex.test(input)){
            throw new Error("Enter Valid Email!");
        }
    }


    


    const customer = await insertUser(customerDetails);

    return customer;

}

module.exports = {
    createCustomer
}