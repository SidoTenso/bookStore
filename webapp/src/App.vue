<template>
  <div id="app">
    <top-nav></top-nav>
    <div class="main_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
export default {
  name: 'app',
  components: {
    TopNav
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #101010;
}
</style>
<style>
@import '../static/css/global.css';
.main_content{
  box-sizing: border-box;
  width: 100%;
  padding-top: 65px;
}
</style>

