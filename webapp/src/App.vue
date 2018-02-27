<template>
  <div id="app">
    <router-view></router-view>
    <tabbar>
      <tabbar-item>
        <!-- <img slot="icon" src="../static/img/sprite"> -->
        <span slot="label">Wechat</span>
      </tabbar-item>
    </tabbar>
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
