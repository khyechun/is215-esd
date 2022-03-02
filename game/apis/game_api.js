const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const db = require("../server")
const firestore = db.db



router.get("/hosehbo", function (req, res) {
    res.send("hosehbo")
})



//1st api: get all games 
router.get("/getAllGames", async (req,res) => {
    let games = await firestore.collection('Games').get()
    res.send(games);
})



//2nd api: get game by id 
router.get("/getGame", async (req,res) => {
    let game_id = 700;
    let game = await firestore.collection('Games').doc(game_id).get()
    res.send(game);
})


module.exports = router;
