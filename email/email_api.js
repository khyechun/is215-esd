const express = require('express');
const router = express.Router();
const db = require("./email")
const firestore = db.db
var nodemailer = require('nodemailer'); 


router.get("/sendEmail", async function (res,req){

    //1. retrieve steamID AND TRADE IT from complex microservice
    let userID= '1234567'
    let user = await firestore.collection('Users').doc(userID).get()
    if(user.exists){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hosehtrades@gmail.com',
                pass: 'lyhuroxfxmwrmzbh'
            }
        });

        // get user email
        let userEmail= user.data().email

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
    }
    else{
        console.log('error')
    }

})

module.exports = router;
