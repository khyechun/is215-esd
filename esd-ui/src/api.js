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

    // 

    // getSteamInventory: async function () {
    //     const response = await axios.get('http://steamcommunity.com/inventory/76561198000003391/730/2?l=english&count=5000', setHeader())
    //     console.log(response)
    //     return response
    // },
    getSteamInventory: async function (gameId) {
        let steamId = localStorage.getItem("steamId")
        console.log(steamId)
        console.log("http://localhost:8088/api/item_api/getInventory/" + steamId + "/" + gameId)
        const response = await axios.get("http://localhost:8088/api/item_api/getInventory/" + steamId + "/" + gameId)
        return response.data.items.map(item => { return { ...item, "img_url": item["icon_url"] } })
    },

    getUserInfo: async function () {
        const response = await axios.get('http://localhost:8081/api/user_api/getUserInfo', setHeader())
        var name = response.data.response.players[0].personaname
        console.log(name)
        var profile_img = response.data.response.players[0].avatar
        console.log(profile_img)

        return { name: name, img: profile_img }
    },

    steamLogin: async function (id) {
        const response = axios.get("http://localhost:8090/api/steamUserLogin?id=" + id)
        console.log(response)
        return response;
    },

    searchTrades: async function (items) {
        const response = await axios.get("http://localhost:8093/api/get_available_trades?items=" + items)
        return response.data
        // axios
        // .get(
        //   "http://localhost:8093/api/get_available_trades?items=3600960863,1618266229,3608158181,469548722"
        // )
        // .then(function (response) {
        //   // handle success
        //   console.log(response);
        //   self.trades = response.data;
        // })
        // .catch(function (error) {
        //   // handle error
        //   console.log(error);
        // })
        // .then(function () {
        //   // always executed
        // });
    },

    listTrade: async function ({ receiveItems, offerItems }) {
        const token = localStorage.getItem("token")
        console.log(receiveItems)
        console.log(offerItems)
        console.log(token)
        const response = await axios.post("http://localhost:8092/api/list_trade",
            {
                receiveItems: receiveItems,
                offerItems: offerItems,
                token: token
            }
        )

        return response
    }
}


const setHeader = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    }
}



