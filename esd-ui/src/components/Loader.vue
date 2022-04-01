<template>
  <img
    src="../assets/images/logo/csgo.png"
    class="rotate"
    width="100"
    height="100"
  />
</template>

<script>
export default {
  name: "Loader",
  //   props: {
  //     msg: String,
  //   },
};
</script>

<style scoped>
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