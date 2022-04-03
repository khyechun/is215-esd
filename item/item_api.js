
const { MongoClient } = require("mongodb");
const { mainModule } = require("process");
const gameitems = require("./model/items")

const express = require('express');
const { default: axios } = require("axios");
// const res = require('express/lib/response');
const router = express.Router();

const uri = "mongodb+srv://admin:4azF5gfOoIR8hQ3P@itemdb.rwiet.mongodb.net/itemDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, database) => {
    if (err) return console.log(err)
    db = database.db('itemDB');
    console.log("Item microservice is now online")

}); 


// 1st API: GET all items for specific game
router.get("/getAllItems/:gameID", async (req, res) => {
    var id = req.params.gameID
    console.log(id)
    if (res.statusCode == 200) {
        let gameitems = await db.collection('gameitems').find({ gameID: parseInt(id) }).toArray()
        res.send({
            "code": res.statusCode,
            "items": gameitems
        }
        )
    } else {
        res.send(
            {
                "code": res.statusCode,
                "message": `An error: ${res.statusCode} occurred while trying to retrieve the items. Please try again.`
            })

    }
    /*  all_items=[];
     let csitems = await db.collection('gameitems').find().toArray()
     let gameitems = await db.collection('gameitems').find().toArray()
     
     csitems.forEach(doc=>{
         all_items.push(doc)
     })
     gameitems.forEach(doc=>{
         all_items.push(doc)
     })
     res.send(all_items); */
})

// 2nd API: GET specific item 

// router.get("/getItem/:itemID", async (req, res) => {
//     if (res.statusCode == 200) {
//         var id = req.params.itemID;
//         console.log(id)

//         db.collection('gameitems').findOne({ itemID: id }, function (err, result) {
//             console.log(result);
//             if (result == null) {
//                 db.collection('gameitems').findOne({ itemID: id }, function (err, result) {
//                     res.send(
//                     {
//                         "code": res.statusCode,
//                         "item": result
//                     }

//                     )
//                 })
//             } else {
//                 res.send(
//                     {
//                         "code": res.statusCode,
//                         "item": result
//                     }
//                 )
//             }
//         })
//     } else { 
//         res.send(
//             {
//                 "code": res.statusCode,
//                 "message": `An error: ${res.statusCode} occurred while trying to retrieve the item. Please try again.`
//             })
//     }
// })


// 3rd API: GET specific item(s)

router.get("/getItems", async (req, res) => {
    if (res.statusCode == 200) {
        var ids = req.query.arr;
        var ids = ids.split('|');
        var final = [];

        for (i = 0; i < ids.length; i++) {
            var items = ids[i];
            var id_arr = items.split(",")
            var offer = id_arr[0]
            var receive = id_arr[1]
            var offer_arr = []
            var receive_arr = []
            console.log(offer)
            console.log(receive)
            // console.log(offer.split('.'))
            for (id of offer.split(".")) {
                console.log(id)
                /* db.collection('gameitems').findOne({ itemID: id }, function (err, result) {
                    console.log(id)
                    console.log(result)
                    offer_arr.push({ itemID: result['itemID'], itemName: result['itemName'], icon_url: result['icon_url'], rarity_colour: result['rarity_colour'] });
                }) */
                var result = await gameitems.find({ itemID: id })
                console.log(result)
                if (result.length !== 0){
                    result = result[0]
                    offer_arr.push({ itemID: result['itemID'], itemName: result['itemName'], icon_url: result['icon_url'], rarity_colour: result['rarity_colour'] });
                }
               
            }
            for (id of receive.split(".")) {
                console.log(id)
                var result = await gameitems.find({ itemID: id})
                if (result.length !== 0){
                    result = result[0]
                    receive_arr.push({ itemID: result['itemID'], itemName: result['itemName'], icon_url: result['icon_url'], rarity_colour: result['rarity_colour'] });
                }
                
            }
            console.log(offer_arr)
            console.log(receive_arr)
            final.push({ offer: offer_arr, receive: receive_arr })
            
        }
        
        
        console.log(final)
        console.log("HIIII")
        res.send(
            {
                "code": res.statusCode,
                "items": final
            }
        );

        }else {
            res.send(
                {
                    "code": res.statusCode,
                    "message": `An error: ${res.statusCode} occurred while trying to retrieve the items. Please try again.`
                }
            )
        }
        
    } 

)



router.get('/getInventory/:userID/:gameID', async (req, res) => {
    var userID = req.params.userID;
    var gameID = req.params.gameID;
    var final = [];

    const response = await axios.get('http://steamcommunity.com/inventory/' + userID + '/' + gameID + '/2?l=english&count=5000')
    console.log(response)
    if (res.statusCode == 200) {
        var arr = response.data.descriptions
        for (item of arr) {
            if (item['tradable'] == 1) {
                var result = await gameitems.find({ itemName: item['market_name']}) 
                if (result.length != 0) {
                    final.push({ itemID: result[0]['itemID'], itemName: result[0]['itemName'], icon_url: result[0]['icon_url'], rarity_colour: result[0]['rarity_colour'] }) 
                }
                
            }

        }
        res.send({
            "code": res.statusCode,
            "items": final 
        })
    }
})



module.exports = router;
