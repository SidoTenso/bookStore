<template>
    <div class="main_content">
        <div class="title" >
            <canvas class="logo" id="logo"></canvas>
        </div>
        <div class="content">
            <div class="form_group">
                <form action="#" id="user_login">
                    <div class="form_item">
                        <input type="number" id="id" value="userid">
                    </div>
                    <div class="form_item">
                        <input type="text" id="psw" value="password">
                    </div>
                    <div class="form_item">
                        <div class="button submit" data-target="#user_login">
                            登录
                        </div>
                    </div>
                    <div class="form_item">
                        <a href="#">新用户注册</a>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</template>

<script>
import { Group, Cell } from "vux";

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
      this.init()
      },
  methods: {
      init(){
        console.log(document.getElementById("logo"));
        var c = document.getElementById("logo");
        var cxt = c.getContext("2d");
        var img = new Image();
        img.src = "http://localhost:3000/image/logo_style3.png";
        // img.style.widt
        img.onload = function() {
            cxt.drawImage(img, -145, -80,600,300);
        };

      }
  }

};
</script>

<style scope>
.main_content {
  text-align: center;
  background-image: url(../../static/image/login_bg.png);
  background-size: auto 100%;
}
.logo {
  width: 200px;
  height: 200px;
}
</style>
