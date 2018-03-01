<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
import { Tabbar, TabbarItem  } from 'vux'

export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem 
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
<style>
@import '../static/css/global.css'
</style>

