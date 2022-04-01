const { default: axios } = require("axios");
const { MongoClient } = require("mongodb");
const { mainModule } = require("process");

const csgo_uri = 'http://csgobackpack.net/api/GetItemsList/v2/';
const dota_uri = 'http://dota2.csgobackpack.net/api/GetItemsList/v2/';

const uri = "mongodb+srv://admin:4azF5gfOoIR8hQ3P@itemdb.rwiet.mongodb.net/itemDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, async(err, database) => {
    if (err) return console.log(err)
    db = database.db('itemDB');

    // populateitemDB(csgo_uri, db, 'gameitems');
    // populateitemDB(dota_uri, db, 'gameitems');
    
    console.log("Records are now being inserted into Item Database...")
    
    
});


function populateitemDB(url, db, item_table) {
    axios.get(url)
        .then(response => {
            var game_items = response.data.items_list
            for (item in game_items) {
                db.collection(item_table).insertOne({
                    gameID: 570,
                    itemID: game_items[item]["classid"],
                    itemName: game_items[item]["name"],
                    icon_url: game_items[item]["icon_url"],
                    rarity: game_items[item]["rarity"],
                    rarity_colour: game_items[item]["rarity_color"]
                  })
                  .then(function(result) {
                    
                  })
            }

        })
        .catch(error => console.error(error));
}

// function countRecords() {
//     axios.get(csgo_uri)
//         .then(response => {
//             var arr = [];
//             var game_items = response.data.items_list
//             for (item in game_items) {
//                 arr.push(item);
//             }
//             console.log(arr.length)
//         })
//         .catch(error => console.error(error));
    
// }

// countRecords()



