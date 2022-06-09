const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [3, "Name cannot be less than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password cannot be less than 6 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// To implement a hash password
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcryptjs.hash(this.password,10);
})

// for JWT TOKEN
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,  
    })
};

// for Comparing the existing hash password with the user's given password
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcryptjs.compare(userPassword,this.password)
};

//Generating password reset token
userSchema.methods.getResetPasswordToken = function (){
      //Generate token
      const resetToken = crypto.randomBytes(20).toString("hex");
      //Hashing and adding to userSchema
      this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      //Expire the reset token after given time
      this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

      return resetToken;
};

module.exports = mongoose.model("users",userSchema);