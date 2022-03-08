const mongoose = require('mongoose');

const tradeSchema = mongoose.Schema({
    userId: { type: Number, required: true},
    offerItems: { type: Array, required: true },
    receiveItems: { type: Array, required: true},
    status: { type: Boolean, required: true}
})

module.exports = mongoose.model("Trade", tradeSchema)