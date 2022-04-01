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
      localStorage.setItem("token", response.data.jwtToken.jwt_token);
      this.$emit("loginEvent", true);
      this.$router.push({ name: "List Trade" });
    },
  },
  mounted: function () {
    this.redirect();
  },
};
</script>
