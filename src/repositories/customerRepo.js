const { ValidationError } = require("sequelize");
const Customer = require("../schema/customerSchema");
const BadRequestError = require("../utils/BadRequestError");
const InternalServerError = require("../utils/internalServerError");

async function insertUser(userDetails){
    console.log("Hitting customerRepo -> insertUser fn");
    
    const { full_name, email_id, mobile_number, service_type } = userDetails;

    try {        
        // Step 1: Soft delete the existing record
        await Customer.destroy({
            where: { mobile_number: userDetails.mobile_number}
        });

        // Step 2: Create a new record
        const customer = await Customer.create({ full_name, email_id, mobile_number, service_type });
        return customer;
    } catch(error) {
        // console.log("hey from error",error);
        if( error instanceof ValidationError){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            // console.log(errorMessageList);
            throw new BadRequestError(errorMessageList);
        }
        throw new InternalServerError();
    }

}

module.exports = {
    insertUser
}