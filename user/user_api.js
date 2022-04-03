const { async } = require('@firebase/util');
const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const db = require("./user")
const firestore = db.db
const axios = require('axios');


//1. get all user
router.get("/getAllUsers", async (req, res) => {
    let all_users=[]
    let users = await firestore.collection('Users').get()

    if(res.statusCode==200){
        users.forEach(doc=>{
            all_users.push({userid: doc.id, info: doc.data()})
        })

    
        res.send({
            "code": res.statusCode,
            "all_users": all_users 
        });
    }

    else{
        res.send({
            "code": res.statusCode,
            "message": `An error: ${res.statusCode} occurred while trying to retrieve the user. Please try again`
        })
    }

})

//2. get a user
router.get("/getUser", async (req,res)=> {
    // let userID = req.query['openid.identity'].split("/")[5]
    // let userID='12354697'
    const userID = req.query.userId
    let user = await firestore.collection('Users').doc(userID).get()

    let data={
        email:'',
        tradeURL:''
    }

    if(res.statusCode==200){
        if(!user.exists){
            await firestore.collection("Users").doc(userID).set(data);
            res.send({newUser: true})
        }
        else{
            res.send({newUser:false})
        }

    }

    else{
        res.send({
            "code": res.statusCode,
            "message": `An error: ${res.statusCode} occurred while trying to retrieve the user. Please try again`
        })
    }


})

//3. update user
router.put("/updateUser", async (req,res)=>{
    //1.  get email, tradeID, steamID from user 

    const email = req.body.email
    const tradeID = req.body.tradeID
    const userID = req.body.userID


    const data={
        email: email,
        tradeID: tradeID
    }

    let user = await firestore.collection('Users').doc(userID).get()
    if(res.statusCode==200){
        if(user.exists){
            await firestore.collection('Users').doc(userID).set(data)
            res.send({
                "code": res.statusCode,
                "message": "User has been successfully updated!"
            })
        }
        else{
            res.send({
                "code": res.statusCode,
                "message": "Sorry, there is no such user."
            })
        }
    }

    else{
        res.send({
            "code": res.statusCode,
            "message": `An error: ${res.statusCode} occurred while trying to update the user details. Please try again`
        })
    }

})


//4. get user email -> for email microservice
router.get('/getUserEmail', async (req,res)=> {

    let userID= req.query.id 
    let user = await firestore.collection('Users').doc(userID).get()

    if(res.statusCode==200){
        if(user.exists){    
            res.send({
                "code": res.statusCode,
                "email": user.data().email
            })
        }
        else{
            res.send({
                "code": res.statusCode,
                "email": "Sorry, there is no such user."
            })
        }

    }

    else{
        res.send({
            "code": res.statusCode,
            "message": "An error: 400 occurred while trying to retrieve the user’s email address. Please try again."
        })
    }
})



// 5th API: Get user steam info
router.get('/getUserInfo/:userId', async (req, res)=>
{
    console.log("HI")
    const userId = req.params.userId;
    const response = await axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=810A381CF018AA1D7A6C8A99C440AA11&steamids=' + userId)
    console.log(response)
    res.send({
        "code": res.statusCode,
        "user_info": response.data.response.players
    })
})


//6th API: Get user's tradeURL from user db 
router.get('/getUserTradeURL/:userID', async (req, res) => {
    const userID = req.params.userID
    let user = await firestore.collection('Users').doc(userID).get();
    let tradeURL = user._fieldsProto.tradeURL.stringValue
    var userInfo = {"userID": user.id, "tradeURL": tradeURL}
    res.send({"code": res.statusCode, "userInfo": userInfo})
    }
)









module.exports = router;
