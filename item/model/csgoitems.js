const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemID: { type: String, required: true},
    itemName: { type: String, required: true },
    icon_url: { type: String, required: true},
    rarity: { type: String, required: true},
    rarity_colour: { type: String, required: true}
})

module.exports = mongoose.model("csgoitems", itemSchema)