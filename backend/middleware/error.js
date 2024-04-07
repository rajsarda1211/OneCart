import ErrorHandler from "../utils/errorHandler.js";

export const errorMiddleware = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // cast error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid:${err.path}`;
        err = new ErrorHandler(message,400);
    }
    // mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }
    // wrong json web token error
    if(err.name === "JsonWebTokenError"){
        const message = `JSON web token is invalid, try again`;
        err = new ErrorHandler(message,400);
    }
    // json expire error
    if(err.name === "TokenExpiredError"){
        const message = `JSON web token is expired, try again`;
        err = new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}