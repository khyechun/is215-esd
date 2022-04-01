<template>
  <nav class="navbar navbar-expand-md navbar-light pt-3">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">Hoseh Trades</a>
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
          <li class="nav-item">
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
  color: #3b4248 !important;
  font-family: "Inter", sans-serif;
}

.nav-link-custom {
  font-weight: bold;
  text-transform: uppercase;
}
</style>