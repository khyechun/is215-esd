<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Navbar />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

const hosehapi = require('../api.js')


export default {
  name: "Home",
  data() {
    return {
      gameId: 730
      // gameId = selected game in search menu
    }
  },
  components: {
    // HelloWorld,
  },

  async beforeMount(){
    await hosehapi.getUserInfo();
    
  }

  
  };
</script>
