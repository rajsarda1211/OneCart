import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import {v2 as cloudinary} from "cloudinary";
// handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`error:${err.message}`);
    console.log("shutting down the server due to uncaught exception");
    process.exit(1);
})

// config
dotenv.config({ path: "backend/config/config.env" });

// connecting database
connectDB();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection");

    server.close(()=>{
        process.exit(1);
    })
})
