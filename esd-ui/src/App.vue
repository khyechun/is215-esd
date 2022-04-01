<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <Navbar v-bind:loggedIn="loggedIn"/>  
  <router-view  @loginEvent="setLogin" />
  <!-- <Loader/> -->
</template>

<script>
import Navbar from "@/components/Navbar.vue";  
// import Loader from "@/components/Loader.vue";


export default {
  name: "App",
  components: {
    Navbar
  },
  data(){
    return{
      loggedIn : false
    }
  },
  methods:{
    setLogin(loggedIn){
      this.loggedIn = loggedIn
      console.log("im called")
    }
  },
  mounted:function(){
    if(localStorage.getItem("token")){
      this.loggedIn= true;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h1, h2, h3, h4, h5, h6, p,a {
  /* color:white; */
  font-family: 'Inter', sans-serif;
}

.primary-btn{
  background-color: #595DB9;
  color:white;
  border-radius:10px;
}

.background-secondary{
  background-color:#c4c4c4
}

.btn{
  color:white;
}


.btn-1{
  background-color:#595DB9;
  color:white;
  border-radius:25px;
  margin:10px;
}

.btn-2{
  background-color:white;
  color:#595DB9;
  border-radius:25px;
  border:2px solid #595DB9; 
  margin:10px;
}

.rotate {
    animation: rotation 1.5s infinite linear;
  }
  
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
