<template>
  <div class="prod_item">
      <router-link to="/?id=666">
        <div class="img_box">
            <img :src="prodInfo.img" alt="">
        </div>
        <div class="prod_info">
            © {{prodInfo.author}}
        </div>
      </router-link>
  </div>
</template>

<script>
export default {
  props: ['prodInfo'],
  data() {
    return {};
  }
};
</script>

<style scoped>
.prod_item {
  display: table-cell;
  box-sizing: border-box;
  padding: 0 30px;
  float: left;
  width: 33.33%;
  margin-bottom: 80px;
}
.prod_item img{
    width: 100%;
}
.prod_info{
    padding: 10px 0px 0px 0px;
    font-size: 13px;
    color: #555;
}
</style>

