import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { User } from "../models/userModels.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        
        req.user = null;
        // return next(new ErrorHandler("Please login to access this resource",401));
        return next();
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})

export const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }
}