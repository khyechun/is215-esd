const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const axios = require('axios');


router.get("/hosehbo", function (req, res) {
    res.send("hosehbo")
})



router.get("/steamUserLogin", async function (req, res) {
    // let steam_id = req.query['openid.identity'].split("/")[5]
    let steam_id = req.query["id"]
    console.log(steam_id)
    console.log("HI")
    // 1. send steam user ID to auth
    const auth_url = "http://authenticate:8082/api/authenticate_api/";
    const auth_route = "AuthenticateUser"
    const jwtTokenRequest = await axios.get(auth_url + auth_route, {
        params: {
            steamID: steam_id
        }
    });
    const jwtToken = jwtTokenRequest.data;

    // 2. send user ID
    const user_url = "http://user:8081/api/user_api/";
    const user_route = "getUser";
    const userIdRequest = await axios.get(user_url + user_route, {
        params: {
            userId: steam_id
        }
    });
    // Checks whether it is a first time user
    const userIdData = userIdRequest.data

    // 3. res.send JWT token
    var responseObj = {
        jwtToken : jwtToken,
        firstTimeUser: userIdData.newUser
    }
    res.send(responseObj)
})


module.exports = router;
