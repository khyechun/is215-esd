<template>
  <nav class="navbar navbar-expand-md navbar-light pt-3">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold" to="/"><img src='@/assets/hoseh_logo.png' style="height:80px;"></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/list-trade" class="nav-link nav-link-custom"
              >List Trades</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/trade" class="nav-link nav-link-custom"
              >Search Trades</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
          <li class="nav-item" v-if="!loggedIn">
            <form
              action="https://steamcommunity.com/openid/login"
              method="post"
            >
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
                class="nav-link active btn primary-btn"
                style="color: white !important"
                type="submit"
              >
                <img
                  style="width: 30px"
                  src="../assets/images/logo/icons8-steam-96.png"
                />Sign in through Steam
              </button>
            </form>
          </li>
          <li v-else>
            <div class="row">
              <div class="col d-flex align-items-center pe-0" style="font-size:14px">{{name}}</div>
              <div class="col"><img style="border-radius:50%;width:40px;" v-bind:src="profileImg"></div>
            </div>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  //   props: {
  //     msg: String,
  //   },
  props:{
    loggedIn: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    profileImg: {
      type: String,
      default: ""
    },
  },
  methods:{
    checkLoggedIn(){
      console.log(localStorage.getItem("token"))
      console.log(localStorage.getItem("token"))
      console.log(this.loggedIn)
      // if(localStorage.getItem("token")){
      //   this.loggedIn = true
      // }
      console.log(this.loggedIn);
    },

  },
  mounted:function(){
    this.checkLoggedIn();
    console.log(this.profileImg)
  }
};
</script>

<style scoped>
.nav-link,
.navbar-brand {
  color: #3b4248 !important;
  font-family: "Inter", sans-serif;
}

.nav-link-custom {
  font-weight: bold;
  text-transform: uppercase;
}
</style>