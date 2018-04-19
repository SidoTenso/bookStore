<template>
  <nav class="nav_box">
    <table>
      <tr>

        <td class="logo">
          <router-link to="/">
            <img src="@/../static/image/1xlogo.png" alt="">
          </router-link>
        </td>
        <td class="nav_r">
          <table>
            <tr>
              <!-- 导航列表 -->
              <td class="fun_list">
                <ul>
                  <li class="list_item">
                    <router-link to="/photoList">
                    照片
                    </router-link>
                  </li>
                  <li class="list_item">
                    <router-link  to="/pic">
                      版画
                    </router-link>
                  </li>
                  <li class="list_item" @click="upload">
                    上传
                  </li>
                  <li class="list_item">
                    <router-link to="/magin">
                      杂志
                    </router-link>
                  </li>
                  <li class="list_item">
                    <router-link to="/books">
                      图书
                    </router-link>
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
                <template v-if="!$root.$data.isLogined">
                  <div class="login" @click="showModel(1)">登录</div>
                  <div class="register"  @click="showModel(2)">注册</div>
                </template>
                <template v-if="$root.$data.isLogined">
                  <div class="user_box">
                    <div class="username">
                      {{userInfo.userName}}
                    </div>
                  </div>
                </template>
                <div class="clear"></div>
              </td>

            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- 登录模态框 -->
    <transition name="slideFromTop">

      <login-model v-if="isModelShow" @finished = "logined" :modelConfig="modelConfig"></login-model>
    </transition>

    <!-- 上传模态框 -->
    <transition name="rubberBand">
      <upload v-if="isUploadShow"  @unlogin = "showModel(1)" @finished="isUploadShow=false"></upload>
    </transition>

    <!-- 搜索模态框 -->
  

  </nav>
</template>

<script>
import LoginModel from "@/components/LoginModel";
import Upload from "@/components/Upload.vue";
import { fail } from "assert";
export default {
  components: {
    LoginModel,
    Upload
  },
  name: "HelloWorld",
  data() {
    return {
      isModelShow: false,
      isUploadShow: false,
      modelConfig: {
        tit: "登录",
        isRegist: true
      },
      userInfo: {}
    };
  },
  beforeMount() {
    // 检查是否是登陆状态
    this.checkLogin();
  },
  created(){
    // 各种监听
    this.addEvent();
    // console.log(this.$root.$data)
  },
  watch:{
    isUploadShow(){
      if(this.isUploadShow){
        document.body.style.overflow = 'hidden';
      }else{
        document.body.style.overflow = 'scroll';

      }
    }
  },
  methods: {
    showModel(type,callback) {
      this.isModelShow = true;
      switch (type) {
        case 1:
          (this.modelConfig.tit = "登录"), (this.modelConfig.isRegist = false);
          break;
        case 2:
          (this.modelConfig.tit = "注册"), (this.modelConfig.isRegist = true);
          break;
        default:
          break;
      }
    },
    logined(userInfo) {
      if (userInfo !== "cancle") {
        this.userInfo = userInfo;
        // this.isLogined = true;
        this.bus.$emit('login',true)
      }
      this.isModelShow = false;
      this.checkLogin();
    },
    checkLogin() {
      let userId = this.cookies.getCookie('userId');
      let url = 'http://localhost:3000/admin/getUserInfo'
      if(!userId){

        // this.isLogined = false;
         this.bus.$emit('login',false)

      }else{
        this.fetch().post(url,{
          userId
        }).then(res=>{
          console.log(res);
          if(res.data.status == 1){
            // this.isLogined = true;
             this.bus.$emit('login',true)
            this.userInfo = res.data.userInfo;
             this.bus.$emit('setUserInfo',this.userInfo)
          }
        })
        // return this.log
      }
    },

    upload() {
      this.isUploadShow = true;
    },

    addEvent(){
      this.bus.$on('showLogin',(type)=>{
        // console.log(args)
        this.showModel(type)
      })
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav_box {
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  padding: 0 40px;
  overflow: hidden;
  background-color: #000;
  z-index: 1000;
}
.nav_box > table {
  height: 65px;
  width: 100%;
  border-spacing: 00;
}
.nav_box .logo {
  /* float: left;
  max-width: 100px; */
  width: 100px;
  height: 100%;
}
.nav_box .logo img {
  width: 35px;
  height: 35px;
  margin-top: 5px;
}
.nav_box .nav_r {
}
/* 导航列表 */
.nav_box .fun_list {
  /* float: left; */
  min-width: 365px;
  width: 365px;
}
.nav_box .fun_list ul::after {
  content: "";
  width: 100%;
  height: 0;
  display: block;
  clear: both;
}
.nav_box .fun_list ul li {
  position: relative;
  box-sizing: border-box;
  padding: 13px 20px;
  float: left;
  color: #888;
  font-size: 16px;
  cursor: pointer;
}
.nav_box .fun_list ul li a{
  color: #888;
}

/* 搜索框  */
.nav_box .search_box {
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
.login_land {
  width: 150px;
  min-width: 150px;
  color: #aaa;
  font-size: 16px;
  text-align: center;
}
.login_land .login {
  float: left;
  width: 50%;
  cursor: pointer;
}

.login_land .register {
  float: right;
  width: 50%;
  cursor: pointer;
}
.login_land .user_box {
  float: right;
  /* width: 100%; */
  padding: 0 15px;
  cursor: pointer;
  height: 100%;
}
.login_land .user_box .username {
  /* padding: 0 15px; */
  text-align: right;
}
</style>
