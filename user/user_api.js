const { async } = require('@firebase/util');
const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const db = require("./user")
const firestore = db.db


//1. get all user
router.get("/getAllUser", async (req, res) => {
    let all_users=[]
    let users = await firestore.collection('Users').get()
    users.forEach(doc=>{
        all_users.push(doc.data())
    })

    res.send(all_games);
})

//2. get a user
router.get("/getUser", async (req,res)=> {
    // let userID = req.query['openid.identity'].split("/")[5]
    // let userID='12354697'
    const userID = req.query.userId
    let user = await firestore.collection('Users').doc(userID).get()

    let data={
        email:'',
        tradeID:''
    }

    if(!user.exists){
        await firestore.collection("Users").doc(userID).set(data);
        // res.send("New User has been created")
        res.send({newUser: true})
    }
    else{
        res.send({newUser:false})
    }

})

//3. update user
router.post("/updateUser", async (req,res)=>{
    //1.  get email, tradeID, steamID from user 
    // let email = req.body.email
    // let tradeID=req.body.tradeURL
    // let steamID = req.body.
    let userID='12354697'

    let email = 'hehe@gmail.com'
    let tradeID='45678';
    data={
        email: email,
        tradeID: tradeID
    }

    try{
        await firestore.collection('Users').doc(userID).set(data)
        res.send("User has been updated!")

    }
    catch{
        res.send("Error")
    }
})


//4. get user email -> for email microservice
router.get('/getUserEmail', async (req,res)=> {

    let userID= '12354697'
    let user = await firestore.collection('Users').doc(userID).get()
    if(user.exists){
        res.send(user.data().email)
    }
    else{
        res.send("No User Found")
    }
})










module.exports = router;
