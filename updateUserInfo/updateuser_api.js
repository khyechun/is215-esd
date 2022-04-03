const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const axios = require('axios');



router.put("/updateUserInfo", async function (req, res) {
    const authHeader = req.headers['authorization'];
    const jwtToken = authHeader && authHeader.split(' ')[1];
    const userEmail = req.body.userEmail;
    const steamTradeID = req.body.steamTradeId;

    const auth_url = "http://authenticate:8082/api/authenticate_api/";
    const auth_route = "authenticateToken"

    const authRequestConfig = {
        method: 'get',
        url: auth_url + auth_route,
        headers:{
            Authorization: "Bearer " + jwtToken 
        }
    }
    const authenticateTokenRequest = await axios.request(authRequestConfig);
    const authenticateTokenRequestData = authenticateTokenRequest.data;
    const authValid = authenticateTokenRequestData.valid;
    const userID  = authenticateTokenRequestData.userId;

    if(!authValid){
        // log to error? call error microservice
        res.send("User not valid")
    }

    const user_url = "http://user:8081/api/user_api/";
    const user_update_route = "updateUser"
    const userUpdateRequestConfig = {
        method: 'put',
        url: user_url + user_update_route,
        data:{
            email: userEmail,
            tradeID: steamTradeID,
            userID : userID
        }
    }

    const updateUserRequest = await axios.request(userUpdateRequestConfig);
    const updateUserRequestData = updateUserRequest.data

    res.send(updateUserRequestData)
})


module.exports = router;
