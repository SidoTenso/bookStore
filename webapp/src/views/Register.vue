<template>
    <div class="main_content">
        <div class="title" >
            <!-- <canvas class="logo" id="logo"></canvas> -->
            <div class="logo"></div>
        </div>
        <div class="content">
            <div class="form_group">
                <form action="#" id="user_login" v-submit data-action = "http://localhost:3000/register">
                    <div class="form_item borb">
                        <input type="number" id="name" name="username" placeholder="用户昵称">
                    </div>
                    <div class="form_item ">
                        <input type="text" id="psw" name="password" placeholder="密码">
                    </div>
                    <div class="form_item">
                        <button class="button submit" v-press  data-target="#user_login">
                            注册
                        </button>
                    </div>
                    <div class="form_item">
                      <router-link to="/login" class="fl">已有账号？马上去登录</router-link>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</template>

<script>
/**
    指令：
        v-press: 按钮点击变色指令
 */
import { Group, Cell } from "vux";
import axios from "axios";

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      msg: "Hello World!"
    };
  },
  mounted() {
    //   this.init()
  },
  directives: {
    
    press: {
      bind(el, bindding, vnode) {
            
        el.addEventListener("touchstart", function(e) {
            el.style.backgroundColor="rgba(1, 49, 123, 0.52)";
        });
        el.addEventListener("touchend", function(e) {
            el.style.backgroundColor="rgba(31, 84, 167, 0.52)";
        });
      }
    },
    submit: {
      inserted(el, bindding, vnode){
        el.addEventListener('submit',function(e){
          e.preventDefault();
          var inputs = el.querySelectorAll('input'),
              datas = {
                length: 0
              };
          if(inputs){
            [].forEach.call(inputs,function(item){
              datas[item.name] = item.value;
              datas.length+=1;
            })

          }
          console.log(datas)
          axios.post('http://localhost:3000/register?a=666',datas,{
            "Content-Type": 'application/x-www-form-urlencoded'
          }).then(function(data){
            console.log(data)
          })
          
          // console.log(target)

        })
      }
    }
  },
  methods: {
    init() {
      console.log(document.getElementById("logo"));
      var c = document.getElementById("logo");
      var cxt = c.getContext("2d");
      var img = new Image();
      img.src = "http://localhost:3000/image/logo_style3.png";
      // img.style.widt
      img.onload = function() {
        cxt.drawImage(img, -145, -80, 600, 300);
      };
    }
  }
};
</script>

<style scoped>
.main_content {
  box-sizing: border-box;
  padding: 0 8vw;
  text-align: center;
  background-image: url(../../static/image/login_bg.png);
  background-size: auto 100%;
}
.logo {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background: url("http://localhost:3000/image/logo_style3.png") center
    no-repeat;
  background-size: 200% 200%;
  background-position: 50% 50%;
}
.content {
  margin-top: 5vw;
}
.form_group {
  width: 100%;
  /* height:  */
}
.form_group .form_item {
  width: 100%;
}
.form_group .form_item::after {
  display: block;
  content: "";
  width: 100%;
  height: 0;
  clear: both;
}
.form_group .form_item input {
  width: 100%;
  height: 12vw;
  outline: none;
  font-size: 4.5vw;
  background-color: transparent;
  border: none;
  color: #5f7976;
  caret-color: rgb(65, 146, 201);
}
.borb {
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.button {
  width: 100%;
  font-size: 4.5vw;
  text-align: center;
}
.form_group .form_item .submit {
  height: 11vw;
  margin-top: 3vw;
  margin-bottom: 3vw;
  border-radius: 4px;
  line-height: 11vw;
  color: white;
  background-color: rgba(31, 84, 167, 0.521);
}
.form_group .form_item a {
  float: right;
  font-size: 3.75vw;
  color: rgb(7, 68, 160);
}
</style>
