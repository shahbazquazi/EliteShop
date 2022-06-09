const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require('validator');

const contactSchema = new Schema ({

    name: {
        type: String,
        required: [true, "Please enter your name"], 
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Enter your email"],
        validate: [validator.isEmail, "Please enter valid email"]
    }


})

module.exports = mongoose.model("contacts",contactSchema)