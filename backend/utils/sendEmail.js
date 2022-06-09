const nodemailer = require('nodemailer');

exports.sendEmail = async (emailInfo)=>{

    const {useremail,subject,message} = emailInfo;

    //Create transporter object to send email
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD
        },
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
          },
    });  
    //Email options
    const emailOptions = {
        from: process.env.SMTP_EMAIL,
        to: useremail,
        subject: subject,
        text: message
    } 
    //Send Email
   await transporter.sendMail(emailOptions); 
};

exports.contactFormEmail = async (contactFormMessage) => {
    
    const {useremail,subject,message} = contactFormMessage; 

     //Create transporter object to send email
     const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD
        },
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
          },
    }); 
    
    //Email options
    const contactFormEmailOptions = {
        from: process.env.SMTP_EMAIL,
        to: process.env.SMTP_EMAIL,
        subject: subject,
        text: message
    } 

    //Send Email
   await transporter.sendMail(contactFormEmailOptions); 

}