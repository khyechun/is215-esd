const express = require('express');
const router = express.Router();
var cors = require('cors')


// JWT TOKEN 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;




// router.get("/hosehbo", function (req,res){
//     res.send("hosehbo")
// })

router.get("/AuthenticateUser", function (req,res){
    //1. get steamID
    let steam_id = req.query['openid.identity'].split("/")[5]
    console.log(steam_id)
    // console.log(req.query)
    
    //2. create JWT token using steam id 
    function generateAccessToken(steamID) {
        return jwt.sign(steamID, process.env.TOKEN_SECRET);
    }
    const token= generateAccessToken(steam_id);

    res.send.json(token);
})


// use this in useLogin complex microservice 
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
  
//     if (token == null) return res.sendStatus(401)
  
//     jwt.verify(token, process.env.TOKEN_SECRET, (err,user) => {
  
//       if (err){
//         return res.sendStatus(403)
//       }
//       else{
//         req.user = user
//       }
//       next()
//     })
//   }

//   router.get("/hosehbo", authenticateToken, function (req,res){
//     res.send("hosehbo")
// })


module.exports = router;
