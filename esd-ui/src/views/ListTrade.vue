<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <div class="custom-container background-secondary top-container">
          <div class="row">
            <div class="col-6">You Offer</div>
            <div class="col-6 text-end"><button class="btn" @click="clear('offer')">Clear</button></div>
          </div>
          <div class="row item-scroll">
            <div
              class="col-4 mt-4"
              v-for="item of offerItemsSelected"
              :key="item._id"
            >
              <div class="item-container">
                <img
                  style="width: 100%"
                  :src="
                    'https://steamcommunity-a.akamaihd.net/economy/image/' +
                    item.icon_url
                  "
                />
                <div>
                  {{ item.itemName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="custom-container background-secondary top-container">
          <div class="row">
            <div class="col-6">You Get</div>
            <div class="col-6 text-end"><button class="btn" @click="clear('get')">Clear</button></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="custom-container background-secondary btm-container">
          <div class="row">
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
              <button class="btn ms-auto">
                Filter
                <img
                  style="width: 25px"
                  src="../assets/images/logo/icons8-chevron-down-60.png"
                />
              </button>
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
          <div class="row item-scroll">
            <div
              class="col-4 mt-4"
              v-for="item of filteredOfferItems"
              :key="item._id"
            >
              <div class="item-container" @click="selectOfferItems(item)">
                <img
                  style="width: 100%"
                  :src="
                    'https://steamcommunity-a.akamaihd.net/economy/image/' +
                    item.icon_url
                  "
                />
                <div>
                  {{ item.itemName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="custom-container background-secondary btm-container">
          <div class="row">
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
              <button class="btn ms-auto">
                Filter
                <img
                  style="width: 25px"
                  src="../assets/images/logo/icons8-chevron-down-60.png"
                />
              </button>
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
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ListTrade",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      offerItemsSearchInput: "",
      getItemsSearchInput: "",
      offerItems: [
        {
          _id: "62271514d1835c3341411ee7",
          itemID: "4114517977",
          itemName: "&#39Blueberries&#39 Buckshot | NSWC SEAL",
          icon_url:
            "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
          rarity: "Exceptional",
          rarity_colour: "8847ff",
        },
        {
          _id: "62271514d1835c3341411ee1",
          itemID: "4114517977",
          itemName: "test 2",
          icon_url:
            "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
          rarity: "Exceptional",
          rarity_colour: "8847ff",
        },
        {
          _id: "62271514d1835c3341411ee2",
          itemID: "4114517977",
          itemName: "asdfasdf",
          icon_url:
            "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
          rarity: "Exceptional",
          rarity_colour: "8847ff",
        },
        {
          _id: "62271514d1835c3341411e3e",
          itemID: "4114517977",
          itemName: "fffgggg",
          icon_url:
            "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
          rarity: "Exceptional",
          rarity_colour: "8847ff",
        },
        {
          _id: "62271514d1835c3341411e4e",
          itemID: "4114517977",
          itemName: "123123",
          icon_url:
            "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
          rarity: "Exceptional",
          rarity_colour: "8847ff",
        },
      ],
      offerItemsSelected: [],
      getItems: [],
      getItemsSelected: [],
    };
  },
  computed: {
    filteredOfferItems: function () {
      if (this.offerItemsSearchInput == "") {
        return this.offerItems;
      }
      let filteredArr = [];
      this.offerItems.map((item) => {
        if (
          item.itemName
            .toLowerCase()
            .includes(this.offerItemsSearchInput.toLowerCase())
        ) {
          filteredArr.push(item);
        }
      });
      console.log(filteredArr);
      return filteredArr;
    },
  },
  methods: {
    selectOfferItems: function (item) {
      this.offerItemsSelected.push(item);
      console.log(this.offerItemsSelected);
    },
    clear: function(type){
      if(type == "offer"){
        this.offerItemsSelected = []
      }
      else if (type=="get"){
        this.getItemsSelected = []
      }
    }
  },
  // mounted: {
  //   //call api
  // },
};
</script>

<style scoped>
.custom-container {
  padding: 15px 20px;
  margin: 10px 0px;
  color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  text-align: left;
}

.top-container {
  height: 25vh;
}

.btm-container {
  height: 55vh;
}

.item-container {
  background-color: #3b4248;
  padding: 5px;
  border-radius: 5px;
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
  background: white;
  width: 4px;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>