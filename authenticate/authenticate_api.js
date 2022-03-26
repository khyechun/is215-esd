const express = require('express');
const router = express.Router();
var cors = require('cors')




router.get("/authenticateUser", function (req, res) {
    //1. get steamID
    // let steam_id = req.query['openid.identity'].split("/")[5]
    // console.log(steam_id)
    // console.log(req.query)
    console.log(req)
    let steam_id = req.query.steamID
    console.log("steam ID : " + steam_id)
    //2. create JWT token using steam id 
    function generateAccessToken(steamID) {
        return jwt.sign(steamID, process.env.TOKEN_SECRET);
    }
    const token = generateAccessToken(steam_id);
    if(res.statusCode==200){
        res.send(token)
    }
    else{
        res.send(
            {"error_code": res.statusCode,
            "message": "An error: 400 occurred while trying to authenticate the user. Please try again."
        })
    }
})

router.get("/authenticateToken", authenticateToken,function (req,res){
    // console.log(req)
    const responseObj = req.responseObj 
    console.log(responseObj)
    res.send(responseObj)
})

// use this in useLogin complex microservice 
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, userId) => {
        var responseObj = {
            valid : true,
            userId : ""
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

//   router.get("/hosehbo", authenticateToken, function (req,res){
//     res.send("hosehbo")
// })


module.exports = router;
