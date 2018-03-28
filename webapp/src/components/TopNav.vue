<template>
  <nav class="nav_box">
    <table>
      <tr>

        <td class="logo">
          <img src="@/../static/image/1xlogo.png" alt="">
        </td>
        <td class="nav_r">
          <table>
            <tr>
              <!-- 导航列表 -->
              <td class="fun_list">
                <ul>
                  <li class="list_item">
                    照片
                  </li>
                  <li class="list_item">
                    版画
                  </li>
                  <li class="list_item">
                    上传
                  </li>
                  <li class="list_item">
                    杂志
                  </li>
                  <li class="list_item">
                    图书
                  </li>
                </ul>
              </td>
              <!-- 搜索栏 -->
              <td class="search_box">
                <div class="search logo">

                </div>
              </td>

              <!-- 登陆栏 -->
              <td class="login_land">
                <div class="login" @click="showModel(1)">登录</div>
                <div class="register"  @click="showModel(2)">注册</div>
                <div class="clear"></div>
              </td>

            </tr>
          </table>
        </td>
      </tr>
    </table>
    <transition name="slideFromTop">

      <login-model v-if="isModelShow" :modelConfig="modelConfig"></login-model>
    </transition>
  

  </nav>
</template>

<script>
import LoginModel from '@/components/LoginModel'
import { fail } from 'assert';
export default {
  components:{
    LoginModel
  },
  name: 'HelloWorld',
  data () {
    return {
      isModelShow: false,
      modelConfig: {
        tit: '登录',
        isRegist: false
      }
    }
  },
  methods: {
    showModel(type){
      this.isModelShow = true;
      switch (type){
        case 1:
          this.modelConfig.tit = '登录',
          this.modelConfig.isRegist = false;
        break;
        case 2:
          this.modelConfig.tit = '注册',
          this.modelConfig.isRegist = true;
        break;
        default: 
        break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav_box{
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  padding: 0 40px;
  overflow: hidden;
  background-color: #000;
}
.nav_box>table{
  height: 65px;
  width: 100%;
  border-spacing: 00;
}
.nav_box .logo{
  /* float: left;
  max-width: 100px; */
  width: 100px;
  height: 100%;
}
.nav_box .logo img{
  width: 35px;
  height: 35px;
  margin-top: 5px;
}
.nav_box .nav_r{
}
/* 导航列表 */
.nav_box .fun_list{
  /* float: left; */
  min-width: 365px;
  width: 365px;

}
.nav_box .fun_list ul::after{
  content: '';
  width: 100%;
  height: 0;
  display: block;
  clear: both;
}
.nav_box .fun_list ul li{
  position: relative;
  box-sizing: border-box;
  padding: 13px 20px;
  float: left;
  color: #888;
  font-size: 16px;
}

/* 搜索框  */
.nav_box .search_box{
}
.nav_box .search_box .logo {
  width: 16px;
  height: 16px;
  margin-top: 3px;
}
.nav_box .logo.search {
  background: url(../../static/image/svg/search.svg);
}
/* 登陆栏 */
.login_land{
  width:150px;
  min-width: 150px;
  color: #aaa;
  font-size: 16px;
  text-align: center;
}
.login_land .login{
  float: left;
  width: 50%;
  cursor: pointer;
}

.login_land .register{
  float: right;
  width: 50%;
  cursor: pointer;
}

.slideFromTop-enter{
  transition: all 5s cubic-bezier(.53,1.6,.92,1.54);
  top:-700px;
}
.slideFromTop-enter-active{
  transition: all 5s cubic-bezier(.53,1.6,.92,1.54);
}
</style>
