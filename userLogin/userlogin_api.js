const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const axios = require('axios');



router.get("/steamUserLogin", async function (req, res) {
    let steam_id = req.query['openid.identity'].split("/")[5]

    // 1. send steam user ID to auth
    const auth_url = "http://localhost:8082/api/authenticate_api/";
    const auth_route = "AuthenticateUser"
    const jwtTokenRequest = await axios.get(auth_url + auth_route, {
        params: {
            steamID: steam_id
        }
    });
    const jwtToken = jwtTokenRequest.data;

    // 2. send user ID
    const user_url = "http://localhost:8081/api/user_api/";
    const user_route = "getUser";
    const userIdRequest = await axios.get(user_url + user_route, {
        params: {
            userId: steam_id
        }
    });
    const userIdData = userIdRequest.data

    // 3. res.send JWT token
    res.send(jwtToken)
})


module.exports = router;
