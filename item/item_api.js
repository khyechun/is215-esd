
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
    console.log("HI")
    all_items=[];
    let csitems = await db.collection('csgoitems').find().toArray()
    let dotaitems = await db.collection('dotaitems').find().toArray()
    csitems.forEach(doc=>{
        all_items.push(doc)
    })
    dotaitems.forEach(doc=>{
        all_items.push(doc)
    })
    res.send(all_items);
})

// 2nd API: GET specific item 

router.get("/getItem/:itemID", async (req,res) => {
    var id = req.params.itemID;
    

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
    var ids = ids.split(',');
    var items = [];
    for (i=0; i < ids.length; i++) {
        id = ids[i];
        console.log(ids[i]);
        db.collection('csgoitems').findOne({itemID: id}, function(err, result) {
            console.log(result);
            if(result == null) {
                db.collection('dotaitems').findOne({itemID: id}, function(err, result) {
                    items.push(result);
                })
            } else {
                items.push(result);
            }
        })
    }
    res.send(items);
})


module.exports = router;
