const { async } = require('@firebase/util');
const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const db = require("./user")
const firestore = db.db






// //2nd api: get game by id 
// router.get("/getGame", async (req,res) => {
//     let gameID='500'
//     try{
//         let game = await firestore.collection('Games').doc(gameID).get()
//         res.send(game.data().gameTitle)

//     }
//     catch(error){
//         res.send('fuck u')
//     }

// })



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
    let userID = req.query['openid.identity'].split("/")[5]
    try{
        let user = await firestore.collection('Users').doc(userID).get()
        if(user.exists){
            res.send(userID)
        }
        else{
            res.send("User does not exist")
        }
    }
    catch(error){
        res.send('fuck u')
    }

})

//3. create user
router.post("/createUser", async (req,res)=>{
    //1.  get email and trade URL from user 
    // let email = req.body.email
    // let trade_url=req.body.tradeURL


    // let userID = req.query['openid.identity'].split("/")[5]

    let email = 'hehe@gmail.com'
    let trade_url='www.facebook.com';
    data={
        email: email,
        tradeURL: trade_url
    }
    // firestore.collection('Users').doc(email).set(new_user)


})










module.exports = router;
