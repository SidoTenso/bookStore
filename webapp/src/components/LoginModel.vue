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
           <div class=""> 
            <center> 
             <div class="input_box"> 
              <input type="text" class="logininput2" autocomplete="off" placeholder="用户名" spellcheck="false" /> 
             </div> 
             <div class="input_box"> 
              <input type="text" class="logininput2" autocomplete="off" placeholder="邮箱" spellcheck="false" /> 
             </div> 
             <div class="input_box"> 
              <input type="password" class="logininput2" placeholder="密码"/> 
             </div> 
             <div class="btn_box"> 
              <span class="login_btn btn">{{modelConfig.tit}}</span> 
              <span class="btn cancle_btn" style="">取消</span> 
             </div> 
            </center> 
           </div> 
           <div class="logining none"> 
            <center>
              正在{{modelConfig.tit}}，请稍候... 
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
export default {
  props: ['modelConfig'],
  data() {
    return {};
  }
};
</script>
<style scoped>
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.newlogin_inner{
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
.login_r .input_box{
    width: 325px;
    height: 40px;
    line-height: 40px;
    padding:  0 10px;
    color: #585858;
    background: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(22,22,22,1) 100%);
    overflow: hidden;
    margin-bottom: 15px;
}
.login_r .input_box.active{
  border: 1px solid #333;
}
.login_r .input_box input{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: #aaa;
    background: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(22,22,22,1) 100%);
}
.login_r .btn_box .btn.login_btn{
  padding: 7px 20px;
  background:linear-gradient(rgba(70, 70, 70, 0.4),rgba(126, 126, 126, 0.4),rgba(70, 70, 70, 0.4));
  border-radius: 5px;
  color: #aaa;
}
.login_r .btn_box .btn.cancle_btn{
  padding: 7px 20px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #aaa;
}
.login_r .btn_box .btn{
  color: #aaa; 
  cursor: pointer; 
  font-size: 14px;
  margin-right: 25px;
}
.login_r .logining{
  font-size: 16px; 
  color: #bbb; 
  font-family: 'ProximaNovaT-Thin'; 
}
.slideFromTop-enter{
  transition: all 0.73s cubic-bezier(.73,1.48,0,.796);
  top:-700px;
}
.slideFromTop-enter-active{
  transition: all 0.75s cubic-bezier(.73,1.48,0,.79);
}
.slideFromTop-leave{
  transition: all 0.73s cubic-bezier(.83,.36,.66,-0.61);
  top:0;
}
.slideFromTop-leave-active{
  top: -700px;
  transition: all 0.75s cubic-bezier(.83,.36,.66,-0.61);
}
</style>



