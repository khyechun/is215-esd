
const { MongoClient } = require("mongodb");
const { mainModule } = require("process");


const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();

const uri = "mongodb+srv://admin:4azF5gfOoIR8hQ3P@itemdb.rwiet.mongodb.net/itemDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, async(err, database) => {
    if (err) return console.log(err)
    db = database.db('itemDB');
    console.log("Item microservice is now online")
    
    
});


// 1st API: GET all items (from both CSGO and Dota 2)
router.get("/getAllItems", async (req,res) => {
    var gameId = req.query.gameId
    if (gameId == 570){
        let dotaitems = await db.collection('dotaitems').find().toArray()
        res.send(dotaitems)
    } else {
        let csitems = await db.collection('csgoitems').find().toArray()
        res.send(csitems)
    }
   /*  all_items=[];
    let csitems = await db.collection('csgoitems').find().toArray()
    let dotaitems = await db.collection('dotaitems').find().toArray()
    
    csitems.forEach(doc=>{
        all_items.push(doc)
    })
    dotaitems.forEach(doc=>{
        all_items.push(doc)
    })
    res.send(all_items); */
})

// 2nd API: GET specific item 

router.get("/getItem/:itemID", async (req,res) => {
    var id = req.params.itemID;
    console.log(id)

    db.collection('csgoitems').findOne({itemID: id}, function(err, result) {
        console.log(result);
        if(result == null) {
            db.collection('dotaitems').findOne({itemID: id}, function(err, result) {
                res.send(result)
            })
        } else {
            res.send(result)
        }
    })
})


// 3rd API: GET specific item(s)

router.get("/getItems", async (req,res) => {
    var ids = req.query.arr;
    var ids = ids.split('|');
    var result = [];
    for (i=0; i < ids.length; i++) {
        var items = ids[i];
        var id_arr = items.split(",")
        var offer = id_arr[0]
        var receive = id_arr[1]
        var offer_arr = []
        var receive_arr = []
        for (id of offer.split(".")){
            db.collection('csgoitems').findOne({itemID: id}, function(err, result) {
                console.log(result);
                if(result == null) {
                    db.collection('dotaitems').findOne({itemID: id}, function(err, result) {
                        offer_arr.push({itemID: result.itemID, itemName: result.itemName, icon_url: result.icon_url, rarity_colour: result.rarity_colour});
                    })
                } else {
                    offer_arr.push({itemID: result.itemID, itemName: result.itemName, icon_url: result.icon_url, rarity_colour: result.rarity_colour});
                }
            })
        }

        for (id of receive.split(".")){
            db.collection('csgoitems').findOne({itemID: id}, function(err, result) {
                console.log(result);
                if(result == null) {
                    db.collection('dotaitems').findOne({itemID: id}, function(err, result) {
                        receive_arr.push({itemID: result.itemID, itemName: result.itemName, icon_url: result.icon_url, rarity_colour: result.rarity_colour});
                    })
                } else {
                    receive_arr.push({itemID: result.itemID, itemName: result.itemName, icon_url: result.icon_url, rarity_colour: result.rarity_colour});
                }
            })
        }
        result.push({offer: offer_arr, receive: receive_arr})
        
    }
    res.send(result);
})


module.exports = router;
