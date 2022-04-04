<template>
  <div class="container-fluid mx-0 px-0 col-12">
    <div class="row align-items-center">
      <div class="mt-5 col-6">
        <h1 style="font-weight: bold" class="text">
          The best way to <br />trade your Steam items.
        </h1>
        <div class="mt-5 col-12">
          <h5 class="text">
            Find and trade for the items you want, fast and hassle-free.
          </h5>

          <br />

          <button class="btn btn-1 px-5 py-2" @click="redirect()"> Try Now</button>
        </div>
      </div>

      <div class="mt-5 col-6">
        <img src="@/assets/homepagelogo.png" />
      </div>
    </div>
  </div>

  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

//const hosehapi = require("../api.js");



export default {
  name: "Home",

  components: {
    // HelloWorld,
  },

  methods:{
    redirect: function(){
      this.$router.push("list-trade")
    }
  }
};
</script>

<style scoped>
.support {
  margin-top: 40px;
}

.text {
  max-width: 600px;
  margin: auto;
  line-height: 115%;
}

img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
}

button {
  background-color: #595db9;
}
</style>
