<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <div class="custom-container background-secondary top-container">
          <div class="row">
            <div class="col-6">You Offer</div>
            <div class="col-6 text-end">
              <button class="btn" @click="clear('offer')">Clear</button>
            </div>
          </div>
          <div
            v-if="offerItemsSelected.length == 0"
            class="mt-4"
            align="center"
          >
            <p class="mb-0">What you are offering</p>
            <small style="color: #ffffff5f"
              >Add the items you want to trade from your inventory</small
            >
          </div>
          <div class="row item-scroll">
            <div
              class="col-3 mb-3"
              v-for="(item, index) of offerItemsSelected"
              :key="item._id"
            >
              <div
                class="item-container"
                style="position: relative"
                v-bind:style="{ borderBottomColor: '#' + item.rarity_colour }"
              >
                <button
                  class="btn btn-danger remove-item-btn"
                  style="color: white"
                  @click="removeOfferItem(index)"
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
      <div class="col-6">
        <div class="custom-container background-secondary top-container">
          <div class="row">
            <div class="col-6">You Get</div>
            <div class="col-6 text-end">
              <button class="btn" @click="clear('get')">Clear</button>
            </div>
          </div>
          <div v-if="getItemsSelected.length == 0" class="mt-4" align="center">
            <p class="mb-0">What you are receiving</p>
            <small style="color: #ffffff5f"
              >Add the items you want in return</small
            >
          </div>
          <div class="row item-scroll">
            <div
              class="col-3 mb-3"
              v-for="item of getItemsSelected"
              :key="item._id"
            >
              <div
                class="item-container"
                style="position: relative"
                v-bind:style="{ borderBottomColor: '#' + item.rarity_colour }"
              >
                <button
                  class="btn btn-danger remove-item-btn"
                  style="color: white"
                  @click="removeGetItem(index)"
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
    <div class="row">
      <div class="col-6" v-if="loggedIn">
        <div class="custom-container background-secondary btm-container mb-0">
          <div class="row mb-4">
            <div class="col-8">
              <input
                v-model="offerItemsSearchInput"
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
              <!-- <button class="btn ms-auto" style="color: #3b4248">
                CSGO
                <img
                  style="width: 25px"
                  src="../assets/images/logo/icons8-chevron-48.png"
                />
              </button> -->
              <select
                class="form-select custom-select"
                @change="changeGame('offer')"
                v-model="inventoryGameId"
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
          <div class="row item-scroll" v-if="!offerLoading">
            <div
              class="col-3 mb-3"
              v-for="item of filteredOfferItems"
              :key="item._id"
            >
              <div
                class="item-container"
                v-bind:style="{ borderBottomColor: '#' + item.rarity_colour }"
                @click="selectOfferItems(item)"
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
      </div>
      <div v-else class="col-6 pt-4" align="center">
        <img
          src="../assets/images/logo/icons8-warning-64.png"
          style="display: block"
          class="mb-3 mt-5"
        />
        Sign in before you can offer items for trade :(
        <form action="https://steamcommunity.com/openid/login" method="post">
          <input
            type="hidden"
            name="openid.identity"
            value="http://specs.openid.net/auth/2.0/identifier_select"
          />
          <input
            type="hidden"
            name="openid.claimed_id"
            value="http://specs.openid.net/auth/2.0/identifier_select"
          />
          <input
            type="hidden"
            name="openid.ns"
            value="http://specs.openid.net/auth/2.0"
          />
          <input type="hidden" name="openid.mode" value="checkid_setup" />
          <input
            type="hidden"
            name="openid.return_to"
            value="http://localhost:8080/redirect"
          />
          <button
            class="mt-3 nav-link active btn primary-btn"
            style="color: white !important"
            type="submit"
          >
            <img
              style="width: 30px"
              src="../assets/images/logo/icons8-steam-96.png"
            />Sign in through Steam
          </button>
        </form>
      </div>
      <div class="col-6">
        <div class="custom-container background-secondary btm-container mb-0">
          <div class="row mb-4">
            <div class="col-8">
              <input
                v-model="getItemsSearchInput"
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
              <!-- <button class="btn ms-auto" style="color: #3b4248">
                 <img
                  style="width: 25px"
                  src="../assets/images/logo/icons8-chevron-48.png"
                /> 
              </button> -->
              <select
                class="form-select custom-select"
                @change="changeGame('get')"
                v-model="getGameId"
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
          <div class="row item-scroll" v-if="!getLoading">
            <div
              class="col-3 mb-3"
              v-for="item of filteredGetItems"
              :key="item._id"
            >
              <div
                class="item-container"
                v-bind:style="{ borderBottomColor: '#' + item.rarity_colour }"
                @click="selectGetItems(item)"
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
      </div>
      <div align="right">
        <button class="btn btn-2">Reset</button
        ><button
          class="btn btn-1"
          @click="listTrade()"
        >
          List Trade
        </button>
      </div>
    </div>
  </div>
</template>


<script>
const api = require("../api.js");

import Loader from "@/components/Loader.vue";

export default {
  name: "ListTrade",
  components: {
    Loader,
  },
  props: {
    loggedIn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      getGameId: 730,
      inventoryGameId: 730,
      offerLoading: false,
      getLoading: false,
      offerItemsSearchInput: "",
      getItemsSearchInput: "",
      offerItems: [],
      offerItemsSelected: [],
      getItems: [],
      getItemsSelected: [],
      fullGetItems: [],
      fullOfferItems:[]
    };
  },
  computed: {
    filteredOfferItems: function () {
      if (this.offerItemsSearchInput == "") {
        return this.offerItems;
      }
      let filteredArr = [];
      this.fullOfferItems.map((item) => {
        if (
          item.itemName
            .toLowerCase()
            .includes(this.offerItemsSearchInput.toLowerCase())
        ) {
          filteredArr.push(item);
        }
      });
      // console.log(filteredArr);
      return filteredArr;
    },
    filteredGetItems: function () {
      if (this.getItemsSearchInput == "") {
        return this.getItems;
      }
      let filteredArr = [];
      this.fullGetItems.map((item) => {
        if (
          item.itemName
            .toLowerCase()
            .includes(this.getItemsSearchInput.toLowerCase())
        ) {
          filteredArr.push(item);
        }
      });
      // console.log(filteredArr);
      return filteredArr;
    },
  },
  methods: {
    selectOfferItems: function (item) {
      if (!this.offerItemsSelected.map((i) => i.itemID).includes(item.itemID)) {
        this.offerItemsSelected.push(item);
      }
      console.log(this.offerItemsSelected);
    },
    selectGetItems: function (item) {
      console.log(this.getItemsSelected.map((i) => i._id));
      if (!this.getItemsSelected.map((i) => i.itemID).includes(item.itemID)) {
        this.getItemsSelected.push(item);
      }
      console.log(this.offerItemsSelected);
    },
    removeGetItem: function (index) {
      this.getItemsSelected.splice(index, 1);
    },
    removeOfferItem: function (index) {
      this.offerItemsSelected.splice(index, 1);
    },
    clear: function (type) {
      if (type == "offer") {
        this.offerItemsSelected = [];
      } else if (type == "get") {
        this.getItemsSelected = [];
      }
    },
    getInventoryItems: async function () {
      let result = await api.getSteamInventory(730);
      console.log(result);
      return result;
    },
    async changeGame(type) {
      if (type == "get") {
        this.getLoading = true;
        let result = await api.getItems(this.getGameId);
        console.log(result);
        this.fullGetItems = result
        this.getItems = result.slice(0, 150);
        this.getLoading = false;
      } else if (type == "offer") {
        this.offerLoading = true;
        let result_2 = await api.getSteamInventory(this.inventoryGameId);
        console.log(result_2);
        this.fullOfferItems = result_2
        this.offerItems = result_2.slice(0, 150);
        this.offerLoading = false;
      }
    },

    async listTrade() {
      console.log(this.getItemsSelected);
      console.log(this.offerItemsSelected);
      const listTradeResponse = await api.listTrade({
        receiveItems: this.getItemsSelected.map((item) => item.itemID),
        offerItems: this.offerItemsSelected.map((item) => item.itemID),
      });
      // console.log(listTradeResponse)
      if (listTradeResponse.statusText == "Created") {
        // alert("successfully listed trade :D")
        this.$router.push({ name: "Success" });
      }else{
        alert(listTradeResponse.data.message)
      }
    },
  },
  mounted: async function () {
    //call api
    this.offerLoading = true;
    if (this.loggedIn) {
      this.getLoading = true;
      let myInventory = await this.getInventoryItems();
      // console.log(myInventory);
      this.offerItems = myInventory;
    }
    // console.log(this.offerItems);

    let getItemsResponse = await api.getItems(730);
    this.fullGetItems = getItemsResponse
    this.getItems = getItemsResponse.slice(0, 100);
    this.offerLoading = false;
    this.getLoading = false;
  },
};
</script>

<style scoped>
.custom-container {
  padding: 15px 20px;
  margin: 10px 0px;
  color: white;
  border-radius: 10px;
  /* box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3); */
  text-align: left;
}

.top-container {
  height: 30vh;
}

.btm-container {
  height: 65vh;
  background-color: transparent !important;
  /* box-shadow: none; */
  color: white;
}

.item-container {
  cursor: pointer;
  background-color: #3b4248;
  padding: 5px;
  border-radius: 15px 15px 0 15px;
  border-bottom-width: 8px;
  border-bottom-style: solid;
  transition: 0.2s;
}

.item-container:hover {
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.35);
  transition: 0.01s;
}

.item-scroll {
  max-height: 80%;
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
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

.custom-select {
  background-color: transparent;
  border: transparent;
  width: 100px;
  max-width: 100%;
}

/* 
.add-item-btn{
  border-radius:5px;
  position:absolute;
  top:10px;
  right:10px;
} */

.remove-item-btn {
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0 7px;
}
</style>