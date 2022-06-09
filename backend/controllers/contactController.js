const catchAsyncError = require('../middleware/catchAsyncError');
const Contact = require('../models/contactModel');
const ErrorHandler = require('../utils/errorHandler');
const {contactFormEmail} = require('../utils/sendEmail');

exports.contactUs = catchAsyncError( async (req, res, next) => {
   
     //Get the value from request
     const {name, email, message} = req.body;


     //check contact is already saved in database or not

   const checkContact = await Contact.findOne({email:req.body.email})
     
     if(checkContact === null ) {
       //Save contact
       await Contact.create({
        name,
        email
    })
     }
    

    //Send contactForm message to admin by email
    
    try {
        //Send Email to user
        await contactFormEmail({
            useremail: email,
            subject:`ContactForm: sent by ${email}`,
            message
        });
        //Send response
        res.status(200).json({
            success: true,
            message: `Email sent to EliteShop successfully`
        });
    } catch (error) {

        // Send Error
        return next(new ErrorHandler(error.message,500));
    }

});