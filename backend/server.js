const app = require("./app");
const cloudinary = require("cloudinary");

//Handling Uncaught Exeption
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

//config
if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({path:"backend/config/config.env"});
}

//Connect To MongoDB
const connectDatabase = require("./database");
connectDatabase();

//cloudinary configuration
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});


const server = app.listen(process.env.PORT,()=>{
   console.log(`eliteshop listening at http://localhost:${process.env.PORT}`)
});

// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandles promise rejection");

    server.close(()=>{
        process.exit(1);
    })
});
