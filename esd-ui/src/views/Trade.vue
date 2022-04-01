<template>
  <div class="container-fluid" align="left">
    <h3 align="center " class="fw-bold mt-4">Trades</h3>
    <div class="row" v-for="(trade, index) of trades" :key="index">
      <div class="col-5">
        <p>Lance offers...</p>
        <div class="trade-container">
          <div class="y-scroll-overflow">
            <div
              v-for="(item, index_1) of trade.offerItems"
              :key="index_1"
              class="item-container"
            >
              <img
                style="width: 100%"
                :src="
                  'https://steamcommunity-a.akamaihd.net/economy/image/' +
                  item.icon_url
                "
              />
              <div class="p-1 pb-0" style="font-size: 12px; color: white">
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
          <button class="btn btn-1">Trade</button>
        </div>
      </div>
      <div class="col-5">
        <p>...in return for</p>
        <div class="trade-container y-scroll-overflow">
          <div
            v-for="(item, index_1) of trade.receiveItems"
            :key="index_1"
            class="item-container"
          >
            <img
              style="width: 100%"
              :src="
                'https://steamcommunity-a.akamaihd.net/economy/image/' +
                item.icon_url
              "
            />
            <div class="p-1 pb-0" style="font-size: 12px; color: white">
              {{ item.itemName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Trade",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      trades: [
        {
          _id: "",
          offerItems: [
            {
              itemName: "test 2",
              icon_url:
                "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
              rarity_colour: "8847ff",
            },
            {
              itemName: "test 4",
              icon_url:
                "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
              rarity_colour: "8847ff",
            },
            {
              itemName: "test 2",
              icon_url:
                "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
              rarity_colour: "8847ff",
            },
            {
              itemName: "test 4",
              icon_url:
                "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
              rarity_colour: "8847ff",
            },
            {
              itemName: "test 2",
              icon_url:
                "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
              rarity_colour: "8847ff",
            },
            {
              itemName: "test 4",
              icon_url:
                "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
              rarity_colour: "8847ff",
            },
            {
              itemName: "test 2",
              icon_url:
                "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
              rarity_colour: "8847ff",
            },
            {
              itemName: "test 4",
              icon_url:
                "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
              rarity_colour: "8847ff",
            },
          ],
          receiveItems: [
            {
              itemName: "test 3",
              icon_url:
                "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk",
              rarity_colour: "8847ff",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.trade-container {
  border-radius: 15px;
  padding: 10px;
  background-color: #595cb9a9;
}

.item-container {
  background-color: #3b4248;
  padding: 5px;
  border-radius: 15px 15px 0 15px;
  border-bottom-width: 8px;
  border-bottom-style: solid;
  transition: 0.2s;
  width: 150px;
  display: inline-block;
  margin: 10px;
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
  height:6px;
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

</style>