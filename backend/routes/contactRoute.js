const express = require('express');
const router =  express.Router();

const {contactUs} = require('../controllers/contactController');

//Routes

router.post('/contactus', contactUs);


module.exports = router;