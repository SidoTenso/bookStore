<template>
  <div class="loginbox" style=" "> 
   <div class="newlogin_inner"> 
    <div style="" class="newmember_dia"> 
     <div style=""> 
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-height: 380px;"> 
       <tbody>
        <tr> 
         <td class="login_l"> 
            <div class="tit">
                {{modelConfig.tit}}
            </div> 
            <div class="titinfo">
                欢迎来到1x 
            </div> 
          </td> 
         <td class="login_r"> 
          <div style=""> 
            <form action="#" @submit="postMsg">

            
           <div v-if="!isLoading" class=""> 
            <center> 
             <div v-if="modelConfig.isRegist" class="input_box"> 
              <input type="text" class="logininput2" v-model="userName" autocomplete="off" placeholder="昵称" spellcheck="false" pattern="[a-zA-z0-9_-]{4,8}" required/> 
             </div> 
             <div class="input_box"> 
              <input type="email" class="logininput2" v-model="email" autocomplete="off" placeholder="邮箱" spellcheck="false" required /> 
             </div> 
             <div class="input_box"> 
              <input type="password" class="logininput2" v-model="psw" placeholder="密码" pattern="[a-zA-z0-9_-]{8,16}" required/> 
             </div> 
             <div v-if="modelConfig.isRegist" class="input_box"> 
              <input type="password" class="logininput2" v-model="repsw" placeholder="确认密码" pattern="[a-zA-z0-9_-]{8,16}" required/> 
             </div> 
             <div class="btn_box"> 
              <button class="login_btn btn">{{modelConfig.tit}}</button> 
              <span class="btn cancle_btn" @click="emitParent('finished','cancle')" style="">取消</span> 
             </div> 
            </center> 
           </div> 
           </form>
           <div v-if="isLoading" class="logining"> 
              <center>
                {{loadingMsg}}
              </center> 
           </div> 
          </div> 
         </td> 
        </tr> 
       </tbody>
      </table> 
     </div> 
    </div> 
   </div> 
   <div class="mask"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["modelConfig"],
  data() {
    return {
      url: {
        login: "http://localhost:3000/admin/login",
        register: "http://localhost:3000/admin/register"
      },
      userName: "",
      email: "",
      psw: "",
      repsw: '',
      isLoading: false,
      loadingMsg: this.modelConfig.tit
    };
  },
  methods: {
    postMsg(e) {
      e.preventDefault();
      if(this.modelConfig.isRegist && this.psw != this.repsw){
        alert('两次密码不一致')
        return

      }
      let url = this.modelConfig.isRegist ? this.url.register : this.url.login;
      this.isLoading = true;
      this.loadingMsg =  this.modelConfig.tit+'中，请稍候...';
      this.fetch().post(url,
          {
            userName: this.userName,
            email: this.email,
            psw: this.psw,
            create_time: Date.now()
          })
        .then(res => {
          // console.log(res);
          if(res.data.status==1){
            // 注册成功 / 登录成功
            this.loadingMsg = this.modelConfig.tit+'成功'
            setTimeout(() => {
              console.log(res)
              this.$emit('finished',res.data.userInfo)
            }, 800);
          }else{
            // 注册失败 / 登录失败
            this.loadingMsg = res.data.msg;
            setTimeout(() => {
              this.isLoading = false;
            }, 1500);
          }

        });
    },
    emitParent(...args){
      this.$emit(...args)
    }
  }
};
</script>
<style scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.newlogin_inner {
  position: relative;
  z-index: 100;
}
.loginbox {
  width: 1000px;
  background: rgba(25, 25, 25, 1);
  border: 0px solid #222;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  left: 50%;
  margin: 0px 0px 0px -450px;
  z-index: 50;
}
.newmember_dia {
  padding: 0px 0px 0px 0px;
}
.login_l {
  width: 50%;
  background: url(../../static/image/loginbg6.jpg);
  background-position: center;
}
.login_l .tit {
  font-family: 微软雅黑;
  font-size: 34px;
  color: #fff;
  margin: 0px 0px 0px 0px;
  line-height: 25px;
  text-align: center;
  padding: 20px 0px 10px 0px;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.8);
}
.login_l .titinfo {
  font-family: 微软雅黑;
  font-size: 16px;
  color: #fff;
  line-height: 25px;
  text-align: center;
  margin: 0px 0px 0px 0px;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.8);
}
.login_r {
  width: 50%;
}
.login_r .cont {
  padding: 60px 30px 20px 30px;
}
.login_r .input_box {
  width: 325px;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  color: #585858;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(22, 22, 22, 1) 100%
  );
  overflow: hidden;
  margin-bottom: 15px;
}
.login_r .errinfo{
  width: 325px;
  height: 25px;
  line-height: 25px;
  text-indent: 10px;
  color: red;
  font-size: 13px;
}
.login_r .input_box.active {
  border: 1px solid #333;
}
.login_r .input_box input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  color: #aaa;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(22, 22, 22, 1) 100%
  );
}
.login_r .btn_box .btn.login_btn {
  padding: 7px 20px;
  background: linear-gradient(
    rgba(70, 70, 70, 0.4),
    rgba(126, 126, 126, 0.4),
    rgba(70, 70, 70, 0.4)

  );
  border-radius: 5px;
  border: none;
  color: #aaa;
}
.login_r .btn_box .btn.cancle_btn {
  padding: 7px 20px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #aaa;
}
.login_r .btn_box .btn {
  color: #aaa;
  cursor: pointer;
  font-size: 14px;
  margin-right: 25px;
}
.login_r .logining {
  font-size: 16px;
  color: #bbb;
  font-family: "ProximaNovaT-Thin";
}
.slideFromTop-enter {
  transition: all 0.73s cubic-bezier(0.73, 1.48, 0, 0.796);
  top: -700px;
}
.slideFromTop-enter-active {
  transition: all 0.75s cubic-bezier(0.73, 1.48, 0, 0.79);
}
.slideFromTop-leave {
  transition: all 0.73s cubic-bezier(0.83, 0.36, 0.66, -0.61);
  top: 0;
}
.slideFromTop-leave-active {
  top: -700px;
  transition: all 0.75s cubic-bezier(0.83, 0.36, 0.66, -0.61);
}
</style>



