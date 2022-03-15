const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer'); 


router.get("/sendEmail", async function (res,req){

    //1. retrieve steamID AND TRADE IT from complex microservice
    let userEmail = 'lanceljr98@gmail.com'
    let userID= '1234567'

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hosehtrades@gmail.com',
            pass: 'lyhuroxfxmwrmzbh'
        }
    });



    var mailOptions = {
        from: 'hosehtrade@gmail.com',
        to: userEmail,
        subject: 'Request for reset of password',
        html: `
        <h1> Test </h1>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.send('email send successfully')
            console.log('Email sent: ' + info.response);
        }
    });
    })

module.exports = router;
