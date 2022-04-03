<template>
  <div>
    <p align="center">Please wait as we redirect you ...</p>
  </div>
</template>

<script>
const api = require("../api");
export default {
  name: "Redirect",
  methods: {
    async redirect() {
      const params = new URLSearchParams(window.location.search);
      let id = params.get("openid.identity").split("/")[5];
      let response = await api.steamLogin(id);
      const response_2 = await api.getUserInfo(id);
      // console.log(response);
      let name = response_2.name;
      let profileImg = response_2.img;
      let obj = {name:name, img:profileImg, loggedIn: true}
      localStorage.setItem("token", response.data.jwtToken.jwt_token);
      
      localStorage.setItem("steamId", id);
      this.$emit("loginEvent", obj);
      this.$router.push({ name: "List Trade" });
    },
  },
  mounted: function () {
    this.redirect();
  },
};
</script>
