import catchAsyncErrors from "../middleware/catchAsyncError.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51O7N06SCKLrtXZY1YdgIklnKNtFmbRy9RImEI4EgNZQarvvwy5JK4j5pb0JY2dvmcr6Hi6363tOt3QF4pESv3CPw00xIGreRSe");

export const processPayment = catchAsyncErrors(async (req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce",
        }
    })
    res.status(200).json({success:true,client_secret:myPayment.client_secret});
})

export const sendStripeKey = catchAsyncErrors(async (req,res,next)=>{
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY});
})