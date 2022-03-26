<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <Navbar />  
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar.vue";  


export default {
  name: "App",
  components: {
    Navbar,
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
  color:white;
  font-family: 'Inter', sans-serif;
}

.primary-btn{
  background-color: #595DB9;
  color:white;
  border-radius:10px;
}

.background-secondary{
  background-color:#646464
}

.btn{
  color:white;
}
</style>
