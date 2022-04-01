<template>
  <nav class="navbar navbar-expand-md navbar-light pt-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Hoseh Trades</a>
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
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
          <li class="nav-item">
            <a class="nav-link active btn primary-btn" aria-current="page" href="#">
              <img style="width:30px;" src="../assets/images/logo/icons8-steam-96.png" />
              Sign in with Steam
            </a>
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
};
</script>

<style scoped>
.nav-link,
.navbar-brand {
  color: white !important;
  font-family: "Inter", sans-serif;
}
</style>