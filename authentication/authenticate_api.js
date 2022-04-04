const express = require('express');
const router = express.Router();
var cors = require('cors')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;






router.get("/authenticateUser", function (req, res) {
    //1. get steamID
    // let steam_id = req.query['openid.identity'].split("/")[5]
    // console.log(steam_id)
    // console.log(req.query)
    // console.log(req)
    console.log(req)
    console.log(req.query)
    let steam_id = req.query.steamID
    console.log("steam ID : " + steam_id)
    //2. create JWT token using steam id 
    function generateAccessToken(steamID) {
        return jwt.sign(steamID, process.env.TOKEN_SECRET);
    }
    const token = generateAccessToken(steam_id);
    
    if(res.statusCode==200){
        res.send({
            "code": res.statusCode,
            "jwt_token": token
        })
    }
    else{
        res.send(
            {"code": res.statusCode,
            "message": `An error: ${res.statusCode} occurred while trying to authenticate the user. Please try again.`
        })
    }
})

router.get("/authenticateToken", authenticateToken,function (req,res){
    if(res.statusCode==200){
        const responseObj = req.responseObj 
        res.send(
            {"code": 200, 
            "token_object": responseObj
        })
    }

    else if (res.statusCode==401){
        res.send({"code": 401, "message": "Invalid Token"})
    }

    else{
        res.send({
            "code": res.statusCode, 
            "message": `An error: ${res.statusCode} occurred while trying to authenticate the user. Please try again.`
        })
    }


})

// use this in useLogin complex microservice 
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, userId) => {
        var responseObj = {
            valid : true,
            userID : ""
        }
        if (err) {
            responseObj.valid = false;
        }
        else {
            responseObj.userId = userId
        }
        req.responseObj = responseObj
        next()
    })
}



module.exports = router;
