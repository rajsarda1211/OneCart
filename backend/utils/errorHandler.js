// we have inherit the class Error Handler from node default class Error
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);         // super is contructor of Error
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);
    }
}
export default ErrorHandler;