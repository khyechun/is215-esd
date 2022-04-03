const axios = require('axios')
// const dev_key = '810A381CF018AA1D7A6C8A99C440AA11';

module.exports = {
    getItems: async function (gameId) {
        const response = await axios.get('http://localhost:8000/api/getItems', {
            params: {
                gameId: gameId
            }
        }, setHeader())

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
        const response = await axios.get("http://localhost:8088/api/item_api/getInventory/" + steamId + "/" + gameId, setHeader())
        return response.data.items.map(item => { return { ...item, "img_url": item["icon_url"] } })
    },

    getUserInfo: async function (userId) {
        
        const response = await axios.get('http://localhost:8081/api/user_api/getUserInfo/' + userId, setHeader())
        // var name = response.data.response.players[0]?.personaname
        // console.log(response)
        console.log(response.data)
        var name = response.data.user_info[0].personaname
        var profile_img = response.data.user_info[0].avatar
        // var profile_img = response.data.response.players[0]?.avatar
        // const response_two = await axios.get('http://localhost:8081/api/user_api/getUserTradeURL/' + userId, setHeader())
        // console.log(response_two)
        // var tradeURL = response_two.data.userInfo.tradeURL
        
        return { name: name, img: profile_img}
    },

    steamLogin: async function (id) {
        const response = await axios.get("http://localhost:8000/api/steamUserLogin?id=" + id, setHeader())
        console.log(response)
        return response;
    },

    searchTrades: async function (items) {
        
        // console.log(response)
        try {
            const response = await axios.get("http://localhost:8000/api/get_available_trades?items=" + items, 
            setHeader())

            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            return false
        }
        
 

    },

    listTrade: async function ({ receiveItems, offerItems }) {
        const token = localStorage.getItem("token")
        console.log(receiveItems) 
        console.log(offerItems)
        console.log(token)
        const response = await axios.post("http://localhost:8000/api/list_trade",
            {
                receiveItems: receiveItems,
                offerItems: offerItems,
                token: token
            },
            setHeader(token)
        )

        return response
    }
}


const setHeader = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    }
}



