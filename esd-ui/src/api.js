const axios = require('axios')
// const dev_key = '810A381CF018AA1D7A6C8A99C440AA11';

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

    // listTrade: async function () {
    //     const response = await axios.post('http://localhost:8092/api/list_trade')
    // },

    // getAvailableTrades: async function () {
    //     const response = await axios.post('http://localhost:8093/api/get_available_trades')
    // },

    // getUserInfo: async function() {
    //     const response = await axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=810A381CF018AA1D7A6C8A99C440AA11&steamids=76561198000003391')
    //     var name = response.data.response.players[0].personaname
    //     console.log(name)
    //     var profile_img = response.data.response.players[0].avatar
    //     console.log(profile_img)
    // },

    


}


// const setHeader = ()=>{
//     return {
//       headers:{
//                 'Content-Type': 'application/json',
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
//               }
//     }
// }



