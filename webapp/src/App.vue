<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view></router-view>
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
@import '../static/css/global.css'
</style>

