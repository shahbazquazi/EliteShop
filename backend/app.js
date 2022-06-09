const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());



//config
if(process.env.NODE_ENV !== "PRODUCTION") {
   require("dotenv").config({path:"backend/config/config.env"});
}

//import route
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const PaymentRoute = require("./routes/paymentRoute");
const contactRoute = require("./routes/contactRoute");

app.use('/api',productRoute);
app.use('/api',userRoute);
app.use('/api',orderRoute);
app.use('/api',PaymentRoute);
app.use('/api',contactRoute);

app.use(express.static(path.join(__dirname,"../frontend/build")));


app.get("*",(req, res) => {
   res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
});


//Middleware for Error
app.use(errorMiddleware);


module.exports = app;