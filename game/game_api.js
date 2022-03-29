const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const db = require("./game")
const firestore = db.db




//1st api: get all games 
router.get("/getAllGames", async (req,res) => {
    all_games=[];
    let games = await firestore.collection('Games').get()
    games.forEach(doc=>{
        all_games.push(doc.data())
    })

    if(res.statusCode==200){
        res.send({
            "code": res.statusCode,
            "game_titles": all_games
        })
    }
    else{
        res.send(
            {"code": res.statusCode,
            "message": "An error: 400 occurred while trying to authenticate the user. Please try again."
        })
    }

})



//2nd api: get game by id 
router.get("/getGame", async (req,res) => {
    let gameID='500'
    try{
        let game = await firestore.collection('Games').doc(gameID).get()
        let game_title = game.data().gameTitle
        res.send({
            "code": res.statusCode,
            "game_title": game_title
        })

    }
    catch(error){
        res.send(
            {"code": res.statusCode,
            "message": "An error: 400 occurred while trying to authenticate the user. Please try again."
        })
    }

})



module.exports = router;
