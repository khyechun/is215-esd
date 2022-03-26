<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <div class="custom-container background-secondary top-container">
          <div class="row">
            <div class="col-6">You Offer</div>
            <div class="col-6 text-end">Clear</div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="custom-container background-secondary top-container">
          <div class="row">
            <div class="col-6">You Get</div>
            <div class="col-6 text-end">Clear</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="custom-container background-secondary btm-container">
          <div class="row">
            <div class="col-8">
                <input style="border-radius:10px;border:0;height:35px;background-color:#C4C4C4;" placeholder="Search ..." class="form-control w-100"/>
            </div>
            <div class="col-3" align="right"><button class="btn ms-auto">Filter <img style="width:25px;" src="../assets/images/logo/icons8-chevron-down-60.png"></button> </div>
            <div class="col-1"><button class="btn"><img style="width:25px;" src="../assets/images/logo/icons8-refresh-60.png"></button></div>
          </div>
        </div>
      </div>
    <div class="col-6">
        <div class="custom-container background-secondary btm-container">
          <div class="row">
            <div class="col-8">
                <input style="border-radius:10px;border:0;height:35px;background-color:#C4C4C4;" placeholder="Search ..." class="form-control w-100"/>
            </div>
            <div class="col-3" align="right"><button class="btn ms-auto">Filter <img style="width:25px;" src="../assets/images/logo/icons8-chevron-down-60.png"></button> </div>
            <div class="col-1"><button class="btn"><img style="width:25px;" src="../assets/images/logo/icons8-refresh-60.png"></button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListTrade",
  components: {
    // HelloWorld,
  },
};
</script>

<style scoped>
.custom-container {
  padding:  15px 20px ;
  margin: 10px 0px;
  color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  text-align: left;
}

.top-container {
  height: 25vh;
}

.btm-container {
  height: 55vh;
}
</style>