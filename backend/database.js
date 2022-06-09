const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;

const connectToMongoDb = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("Connected to MongoDb");
    });
};

module.exports = connectToMongoDb;