const express = require('express');
const router = express.Router();

router.get("/hosehbo", function (req,res){
    res.send("hosehbo")
})

router.get("/AuthenticateUser", function (req,res){
    
    res.sendFile(__dirname + '/index.html')
})



module.exports = router;
