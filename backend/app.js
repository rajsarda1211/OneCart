import express from 'express';
import { errorMiddleware } from './middleware/error.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// config
dotenv.config({ path: "backend/config/config.env" });

// importing routes
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js"

// using routes
app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);
app.use("/api/v1",paymentRoute);
app.use(express.static(path.join(__dirname, '../frontend/build/')));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
})

// Middleware for error handling
app.use(errorMiddleware);
export default app;