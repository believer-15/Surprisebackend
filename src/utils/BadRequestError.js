const AppError = require("./appError");

class BadRequestError extends AppError {
    constructor(invalidParams) {
        
        let message = invalidParams[0];
        // invalidParams.forEach((params) => {
        //     message += `${params}`;
        // });
        super(`${message}`, 400);
    }
}

module.exports = BadRequestError;