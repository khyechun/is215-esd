const axios = require('axios')


module.exports = {
    getItems: async function (gameId) {
        const response = await axios.get('http://localhost:8094/api/getItems', {
            params: {
                gameId: gameId
            }
        })
        var arr = response.data.items
        var result_arr = []
        for (var item of arr) {
            var itemDetails = { itemID: item['itemID'], itemName: item['itemName'], img_url: item['icon_url'], rarity: item['rarity'], rarity_colour: item['rarity_colour'] }
            result_arr.push(itemDetails)
        }
        console.log(result_arr);
        return result_arr;
    },

    // We need to pass in a GraphQL query for these 2 functions.

    listTrade: function () {
        axios.post('http://localhost:8092/api/list_trade')
    },

    getAvailableTrades: function () {
        axios.post('http://localhost:8093/api/get_available_trades')
    }


}




