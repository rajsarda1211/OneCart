import express from "express";
import { processPayment, sendStripeKey } from "../controllers/paymentControllers.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/payment/process",isAuthenticated,processPayment);
router.get("/stripeapikey",isAuthenticated,sendStripeKey);

export default router;