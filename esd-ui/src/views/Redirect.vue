<template>
  <div>
    <p align="center">Please wait as we redirect you ...</p>
  </div>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "Redirect",
  methods: {
    redirect() {
      const params = new URLSearchParams(window.location.search)
      console.log(params)
      let id = params.get('openid.identity').split("/")[5]
      // console.log()
      axios
        .get("http://localhost:8090/api/steamUserLogin?id=" + id)
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
  },
  mounted: function () {
    this.redirect();
  },
};
</script>
