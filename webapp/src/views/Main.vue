<template>
  <div class="main_content">
    <div class="banner">
      <img src="" alt="">
    </div>
    <div class="desc_tit">
      <span class="sort_sp">{{sort}}</span>
      <span>{{prucNname}}</span>
    </div>
    <!-- 照片分类 -->
    <div class="sort_tit">
      <div class="sort_item">
        <span :class="{active: sort_type == 'popular'}">流行</span>
      </div>
      <div class="sort_item">
        <span :class="{active: sort_type == 'lasted'}">最新</span>
      </div>
      <div class="sort_item">
        <span :class="{active: sort_type == 'awarded'}">获奖</span>
      </div>
    </div>
    <!-- 照片列表 -->
    <div class="prod_listbox">
      <template v-for="n in 11">
        <prod-item :key="n" :prodInfo="{img:require('../../static/image/test_prod.jpg'),author: '李时珍'}"></prod-item>
        <div v-if="n%3 == 0" class="clear" :key="'clear'+n" ></div>
      </template>
    </div>
    <!-- 更多 -->
    <div class="see_more">
      <router-link to="/more">
        更多图片
      </router-link>
    </div>
  </div>
</template>

<script>
import ProdItem from '../components/ProdItem'

export default {
  components: {
    ProdItem
  },
  data () {
    return {
      sort: '杂志',
      prucNname: '作品名称',
      sort_type: 'popular'
    }
  }
}
</script>

<style>
.main_content{
  width: 100%;
  padding-top: 65px;

}
.banner{
  width: 100%;
  height: 360px;
}
.desc_tit{
  width: 100%;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #222;
}
.desc_tit .sort_sp{
  padding: 6px 10px;
  font-size: 15px;
  color: #bbb;
  background-color: #222;
  border-radius: 5px;
  margin-right: 15px;

}
.desc_tit span{
  font-size: 22px;
  color: #ccc;
}
.sort_tit{
  width: 100%;
  padding: 40px 0 30px;
  font-size: 19px;
  color: #666;
  text-align: center;
}
.sort_tit .sort_item{
  display: inline-block;
  margin: 0 20px;
  cursor: pointer;
}
.sort_tit .sort_item span{
  padding: 7px 0 10px;
  border-bottom: 1px solid #999;
}
.sort_tit .sort_item span.active{
  color: #ccc;
}
.prod_listbox{
  width: 100%;
}
.prod_listbox::after{
  content: '';
  display: block;
  clear: both; 
  width: 100%;
  height: 0;
}
.see_more{
  position: relative;
  bottom: 20px;
  width: 100%;
  padding: 50px 0 80px;
  border: 1px solid #222;
  font-size: 19px;
  text-align: center;
}
.see_more a{
  /* display: inline-block;
  width: 95px; */
  padding: 0px 5px 10px;
  text-align: justify;
  /* text-justify: inter-ideograph; */
  text-align-last: justify;
  border-bottom: 1px solid #444;
  letter-spacing: 2px;
  color: #666;
}
.see_more a:hover{
  border-bottom: 1px solid #999;
  color: #ccc;
}
</style>
