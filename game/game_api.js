const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const db = require("./game")
const firestore = db.db



router.get("/hosehbo", function (req, res) {
    res.send("hosehbo")
})



//1st api: get all games 
router.get("/getAllGames", async (req,res) => {
    all_games=[];
    let games = await firestore.collection('Games').get()
    games.forEach(doc=>{
        all_games.push(doc.data())
    })
    res.send(all_games);
})



//2nd api: get game by id 
router.get("/getGame", async (req,res) => {
    let gameID='500'
    try{
        let game = await firestore.collection('Games').doc(gameID).get()
        res.send(game.data().gameTitle)

    }
    catch(error){
        res.send('fuck u')
    }

})



module.exports = router;
