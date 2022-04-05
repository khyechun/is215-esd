<template>
<div>
  <div class="container-fluid" align="left">
    <h3 align="center " class="fw-bold mt-4">Trades</h3>
    <div v-if="trades.length != 0" style="padding:70px;">
      <div class="row" v-for="(trade, index) of trades" :key="index">
        <div class="col-5 mt-2">
          <p class="mb-1"><img style="border-radius:50%;margin:5px" v-bind:src='this.userInfo[index]?.img'>{{this.userInfo[index]?.name}} offers...</p>
          <div class="trade-container">
            <div class="y-scroll-overflow">
              <div
                v-for="(item, index_1) of trade.offerItems"
                :key="index_1"
                class="item-container"
                v-bind:style="{ borderBottomColor: '#' + item.rarity_colour }"
              >
                <img
                  style="width: 100%"
                  :src="
                    'https://steamcommunity-a.akamaihd.net/economy/image/' +
                    item.icon_url
                  "
                />
                <div
                  class="p-1 pb-0"
                  style="font-size: 12px; color: white; word-wrap: break-word"
                >
                  {{ item.itemName }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-2 d-flex align-items-end justify-content-center"
          align="center"
        >
          <div>
            <img
              src="../assets/images/logo/icons8-left-and-right-arrows-100.png"
              style="
                width: 50px;
                max-width: 100%;
                display: block;
                transform: rotate(-45deg);
              "
            />
            <a href='https://steamcommunity.com/tradeoffer/new/?partner=39737663&token=FeyRjGZQ'><button class="btn btn-1" >Trade</button></a>
          </div>
        </div>
        <div class="col-5">
          <p class="mb-1" style="margin-top:28px;">...in return for</p>
          <div class="trade-container y-scroll-overflow">
            <div
              v-for="(item, index_1) of trade.receiveItems"
              :key="index_1"
              class="item-container"
              v-bind:style="{ borderBottomColor: '#' + item.rarity_colour }"
            >
              <img
                style="width: 100%"
                :src="
                  'https://steamcommunity-a.akamaihd.net/economy/image/' +
                  item.icon_url
                "
              />
              <div
                class="p-1 pb-0"
                style="font-size: 12px; color: white; word-break: break-all"
              >
                {{ item.itemName }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else align="center">
      <lottie-player
        src="https://assets6.lottiefiles.com/packages/lf20_nhv85sha.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
      Please open the trade search menu down below to start searching for
      trades!
    </div>
  </div>
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button
          style="
            position: fixed;
            bottom: 0;
            background-color: #595cb9;
            color: white;
          "
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="false"
          aria-controls="flush-collapseOne"
        >
          Open Trade Search Menu
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div
          class="accordion-body"
          style="
            position: fixed;
            bottom: 52px;
            height: 380px;
            background-color: white;
            width: 100%;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          "
        >
          <div class="container-fluid">
            <div class="row">
              <div class="col-6">
                <div class="row mb-4">
                  <div class="col-8">
                    <input
                      v-model="search"
                      style="
                        border-radius: 10px;
                        border: 0;
                        height: 35px;
                        background-color: #c4c4c4;
                      "
                      placeholder="Search ..."
                      class="form-control w-100"
                    />
                  </div>
                  <div class="col-3" align="right">
                    <select
                      class="form-select custom-select"
                      @change="changeGame()"
                      v-model="gameId"
                    >
                      <option value="730" selected>CSGO</option>
                      <option value="570">DOTA</option>
                    </select>
                  </div>
                  <div class="col-1">
                    <button class="btn">
                      <img
                        style="width: 25px"
                        src="../assets/images/logo/icons8-refresh-60.png"
                      />
                    </button>
                  </div>
                </div>
                <div class="row item-scroll" align="left" v-if="!loading">
                  <div
                    class="col-3 mb-3"
                    v-for="item of filteredItems"
                    :key="item._id"
                  >
                    <div
                      class="item-container"
                      v-bind:style="{
                        borderBottomColor: '#' + item.rarity_colour,
                      }"
                      @click="selectItems(item)"
                    >
                      <img
                        style="width: 100%"
                        :src="
                          'https://steamcommunity-a.akamaihd.net/economy/image/' +
                          item.img_url
                        "
                      />
                      <div
                        class="p-1 pb-0"
                        style="font-size: 12px"
                        v-html="item.itemName"
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex align-items-center justify-content-center"
                  style="min-height: 300px"
                  v-else
                >
                  <Loader />
                </div>
              </div>
              <div class="col-6">
                <div
                  class="background-secondary"
                  align="left"
                  style="
                    border-radius: 20px;
                    padding: 10px;
                    color: white;
                    height: 310px;
                  "
                >
                  <h6>Selected Items</h6>
                  <div
                    v-if="selectedItems.length == 0"
                    class="mt-4"
                    align="center"
                  >
                    <p class="mb-0 pt-5">Your Searched Items</p>
                    <small style="color: #ffffff5f"
                      >Add items you want to search for</small
                    >
                  </div>
                  <div class="row item-scroll">
                    <div
                      class="col-3 mb-3"
                      v-for="(item, index) of selectedItems"
                      :key="item._id"
                    >
                      <div
                        class="item-container"
                        style="position: relative"
                        v-bind:style="{
                          borderBottomColor: '#' + item.rarity_colour,
                        }"
                      >
                        <button
                          class="btn btn-danger remove-item-btn"
                          style="color: white"
                          @click="removeItem(index)"
                        >
                          <img
                            style="width: 10px"
                            src="../assets/images/logo/icons8-close-48.png"
                          />
                        </button>
                        <img
                          style="width: 100%"
                          :src="
                            'https://steamcommunity-a.akamaihd.net/economy/image/' +
                            item.img_url
                          "
                        />
                        <div
                          class="p-1 pb-0"
                          style="font-size: 12px"
                          v-html="item.itemName"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div align="right">
              <button
                class="btn btn-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
                @click="callSearchTrades()"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
import Loader from "@/components/Loader.vue";
const api = require("../api");

export default {
  name: "Trade",
  components: {
    // HelloWorld,
    Loader,
  },
  data() {
    return {
      gameId: 730,
      loading: false,
      items: [],
      allItems:[],
      selectedItems: [],
      search: "",
      userInfo: [
      ],
      trades: [
      ],
    };
  },
  methods: {
    selectItems(item) {
      if (!this.selectedItems.map((i) => i.itemID).includes(item.itemID)) {
        this.selectedItems.push(item);
      }
    },
    removeItem: function (index) {
      this.selectedItems.splice(index, 1);
    },
    async callSearchTrades() {
      console.log(this.selectedItems);
      console.log("hi");
      const itemIdArr = this.selectedItems.map((i) => i.itemID);
      console.log(itemIdArr);
      const stringifyIdArr = itemIdArr.join(",");
      console.log(stringifyIdArr);
      const result = await api.searchTrades(stringifyIdArr);
      console.log(result);
      if (result != false) {
        this.trades = result;
        await this.callgetUserInfo();
      } else {
        alert("Cannot find trades with these items");
      }
    },
    async callgetUserInfo() {
      const tradeUserInfo = [];
      console.log("hi")
      for (var trade of this.trades) {
        console.log(trade)
        var userId = trade.steamId;
        // var userId = '76561198000003391';
        const userInfo = await api.getUserInfo(userId);
        tradeUserInfo.push(userInfo)
      }
      console.log(tradeUserInfo)
      this.userInfo = tradeUserInfo;
      
    },
    async changeGame() {
      this.loading = true;
      const itemResponse = await api.getItems(this.gameId);
      this.allItems = itemResponse
      this.items = itemResponse.slice(0, 100);
      this.loading = false;
    },
  },
  mounted: async function () {
    // console.log("hi");
    this.loading = true;
    const itemResponse = await api.getItems(this.gameId);
    this.allItems = itemResponse;
    this.items = itemResponse.slice(0, 100);
    this.loading = false;
    // const tradeSearchResponse = await api.searchTrades(
    //   "3600960863,1618266229,3608158181,469548722"
    // );
    // console.log(tradeSearchResponse);
    // if (tradeSearchResponse != false) {
    //   this.trades = tradeSearchResponse;
    // }
  },
  computed: {
    filteredItems: function () {
      if (this.search == "") {
        return this.items;
      }
      let filteredArr = [];
      this.allItems.map((item) => {
        if (item.itemName.toLowerCase().includes(this.search.toLowerCase())) {
          filteredArr.push(item);
        }
      });
      // console.log(filteredArr);
      return filteredArr;
    },
  },
};
</script>

<style scoped>
.trade-container {
  border-radius: 15px;
  padding: 10px;
  /* background-color: #595cb9a9; */
  /* background-color: #c4c4c4; */
  background-color: rgba(109, 146, 202, 0.55);
}

.item-container {
  background-color: #3b4248;
  padding: 5px;
  border-radius: 15px 15px 0 15px;
  border-bottom-width: 8px;
  border-bottom-style: solid;
  transition: 0.2s;
  width: 120px;
  display: inline-block;
  margin: 10px;
  white-space: normal;
  color: white;
  cursor: pointer;
}

.item-container:hover {
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.35);
  transition: 0.01s;
}

.y-scroll-overflow {
  overflow: auto;
  white-space: nowrap;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #848484;
  width: 4px;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.item-scroll {
  max-height: 240px;
  overflow-y: scroll;
}

.remove-item-btn {
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0 7px;
}
</style>