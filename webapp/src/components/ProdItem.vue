<template>
  <div class="prod_item">
      <!-- <router-link :to="{name: 'photos',params:{id:prodInfo.id}}"> -->
      <router-link :to="'/photos?id=' + prodInfo.id">
        <div class="img_table">
          <div class="img_box">
            <img :src="prodInfo.img" alt="">
          </div>
        </div>
        <div class="prod_info">
          <router-link :to="'/userpage?id='+ (prodInfo.author && prodInfo.author._id)">
            © {{prodInfo.author && prodInfo.author.userName}}
          </router-link>
            
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
    max-width: 339px;
    max-height: 177px;
}
.prod_info{
    padding: 10px 0px 0px 0px;
    font-size: 13px;
    color: #555;
}
.prod_info a{
  color: #555;
}
.prod_item .img_table{
  display: table;
  height: 180px;
}
.prod_item .img_box{
  display: table-cell;
  vertical-align: middle;
}

</style>

