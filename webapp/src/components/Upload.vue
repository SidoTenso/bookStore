<template>
  <div class="upload_form">
      <div class="tit">
          上传你的作品
      </div>
      <div class="form_box">
          <div class="form_row">
              <div class="label justify">
                作品名称 :
              </div>
              <div class="inputbox">
                  <input type="text" name="prodName" min="0" placeholder="您的作品名称" autocomplete="off">
              </div>
              <span class="form_unit"></span>
              <div class="infobox">
              </div>
              <div class="clear"></div>
          </div>
          <div class="form_row">
              <div class="label justify">
                作品 :
              </div>
              <div class="inputbox">
                  <!-- <input type="" name="prodName" min="0" placeholder="您的作品名称" autocomplete="off"> -->
                  <input type="file" name="" id="">
              </div>
              <span class="form_unit"></span>
              <div class="infobox">
              </div>
              <div class="clear"></div>
          </div>
      </div> 

  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>


<style>
.upload_form {
  position: fixed;
  width: 1000px;
  height: 600px;
  left: 50%;
  top: 50%;
  margin-left: -500px;
  margin-top: -300px;
  background-color: #222;
}
.upload_form .tit{
    font-size: 23px;
    color: #aaa;
    width: 800px;
    margin: 0 auto;
    line-height: 96px;
}
.upload_form .form_box{
    box-sizing: border-box;
    width: 800px;
    height: 400px;
    margin: 0 auto;
    padding-top: 15px;
    font-size: 16px;
    color: #aaa;
    background-color: #282828;
}

.upload_form .form_box .form_row{
    margin-bottom: 8px;
    padding: 0 20px;
}
.upload_form .form_box .label{
    float: left;
    width: 80px;
    font-size: 16px;
    color: #aaa;
    line-height: 38px;
    text-align: right;
}
.upload_form .form_box .inputbox{
    float: left;
    height: 38px;
    margin-left: 30px;
    padding-left: 20px;
    padding-right: 10px;
    border: 1px solid #333;
    border-radius: 3px;
    background: linear-gradient(to bottom, rgba(30, 30, 30, 1) 0%, rgba(35, 35, 35, 1) 100% )
}
.upload_form .form_box .inputbox input{
    line-height: 38px;
    background: inherit;
    border: none;
    color: #aaa;
}
.upload_form .form_box .inputbox input:focus{
    outline: none;
}

.rubberBand-enter-active {
  animation: rubberBand 1s 1;
  animation-fill-mode: both;
}
.rubberBand-leave-active {
  animation: rubberBandLeave 1s 1;
  animation-fill-mode: both;
}
@keyframes rubberBand {
  0% {
    transform: scale(0, 0);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    transform: scale(1, 1);
  }
}
@keyframes rubberBandLeave {
  0% {
    transform: scale(1, 1);
  }

  25% {
    transform: scale3d(1.05, 0.95, 1);
  }

  35% {
    transform: scale3d(0.95, 1.05, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  60% {
    transform: scale3d(0.75, 1.25, 1);
  }

  70% {
    transform: scale3d(1.25, 0.75, 1);
  }

  to {
    transform: scale(0, 0);
  }
}
</style>

