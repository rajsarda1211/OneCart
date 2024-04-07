import {User} from "../models/userModels.js"
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

// register a user
export const registerUser = catchAsyncErrors(async(req,res,next)=>{
  const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
})
// login a user
export const loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email or password",400));
    }
    const user = await User.findOne({email:email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    sendToken(user,200,res);
})
// logout a user
export const logoutUser = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"Logged Out Successfully"
    })
})

// forgot password
export const forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getTokenForResetPassword();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
})
// reset password
export const resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
})

// get user details -- only 4 logged in users
export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
//   const user = {
//     name:"karan",
//     email:"user@gmail.com",
//     password:"hello",
//     avatar:{
//       public_id:
// "this is a sample id",
// url:
// "profileidurl",
//     }
//   }

// const user=null;
// if (req.user && req.user.id) {
//   console.log("before hii"); 
  
  // Handle the case where req.user.id is missing or invalid
 

// }else{ 
//   console.log("else hii"); 
//   user = {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     password: 'password123',
//     avatar: {
//       public_id: 'public_id_123',
//       url: 'https://example.com/avatar.jpg',
//     }, // Replace with an appropriate date
//   };
//   console.log(user+"hii");
// }
//  console.log(user+"hii");

  const user = await User.findById(req.user.id);
  
  // console.log(u+"hii");

  // if(u!==null) user=u;
  
  res.status(200).json({
    success:true,
    user,
  })
})

// update password
export const updatePassword = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if(!isPasswordMatched){
    return next(new ErrorHandler("Old Password is incorrect",400));
  } 
  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHandler("Password don't match",400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user,200,res);
})
// update user Profile
export const updateProfile = catchAsyncErrors(async(req,res,next)=>{
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
  }
  if(req.body.avatar!==""){
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id:myCloud.public_id,
      url:myCloud.secure_url,
    }
  }
  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  })
  res.status(200).json({
    success:true,
  })
})

// get all users (admin route)
export const getAllUsers = catchAsyncErrors(async(req,res,next)=>{
  const users = await User.find();
  res.status(200).json({
    success:true,
    users,
  })

})
// get single user detail -- admin route
export const getSingleUser = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User does not exist with id:${req.params.id}`,400))
  }
  res.status(200).json({
    success:true,
    user,
  })
})

// update user role - admin route
export const updateUserRole = catchAsyncErrors(async(req,res,next)=>{
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }
  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  })
  res.status(200).json({
    success:true,
  })
})

// delete user  - admin route
export const deleteUser = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;
  await cloudinary.uploader.destroy(imageId);


  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
})