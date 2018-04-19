<template>
  <div class="upload_form">
      <div class="tit">
          上传你的作品
      </div>
      <div class="form_box">
        <form action="#" method="post" enctype="multipart/form-data" id="photos_form">
          <div class="form_row">
              <div class="label justify">
                作品名称:
              </div>
              <div class="inputbox">
                  <input type="text" v-model="prodName" @focus="isPNerr = false" name="prodName" min="0" placeholder="您的作品名称" autocomplete="off" required>
              </div>
              <span class="form_unit"></span>
              <div v-if="isPNerr" class="infobox">
                {{errInfo.prodName}}
              </div>
              <div class="clear"></div>
          </div>
          <div class="form_row">
              <div class="label justify">
                作品:
              </div>
              <div class="inputbox file_box" @click.capture="file_click">
                  <!-- <input type="" name="prodName" min="0" placeholder="您的作品名称" autocomplete="off"> -->
                  <span>{{fileName}}</span> 
                  <input type="file" name="photos" id="photos" accept="image/*" @change="file_change" required>
              </div>
              <span class="form_unit"></span>
              <div v-if="isPhotoerr" class="infobox">
                {{errInfo.photos}}
              </div>
              <div class="clear"></div>
          </div>
          <div class="form_row">
            <div class="label justify">
              类别:
            </div>
            <div class="optbox" tabindex="1" @blur="selectShow = false">
              <div class="inputbox selector" @click="selectShow = !selectShow">
                <div class="selected">{{attrtext}}</div>
              </div>
              <div class="options" v-if="selectShow">
                <div class="overbox">
                  <div class="overcontbox">
                    <div v-for="(value,key,index) in attrs" @click="changeAttr(key)" :key="'option'+index" class="option_item">{{value}}</div>

                  </div>

                </div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="form_row">
            <div class="label justify">
              描述:
            </div>
            <div class="inputbox textarea">
              <textarea v-model="description" @focus="isDescerr = false" name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div v-if="isDescerr" class="infobox">
              {{errInfo.description}}
            </div>
            <div class="clear"></div>
          </div>
          <div class="form_row">
            <div class="label justify"></div>
            <div class="upload btn" @click="upload">
              上传
            </div>
          </div>
        </form>
      </div> 
      <div class="close_btn" @click="finished">

      </div>

  </div>
</template>

<script>
import photoAttrs from '../common/photoAttrs'
export default {
  data() {
    return {
      fileName: "点击上传您的文件",
      photos: {},
      prodName: "",
      description: "",
      attrs: photoAttrs,
      attrtext: '请选择',
      attrType: 'else',
      errInfo: {
        prodName: "请输入作品名称",
        photos: "请上传作品",
        description: "请输入作品描述"
      },
      isPNerr: false,
      isPhotoerr: false,
      selectShow: false,
      isDescerr: false
    };
  },
  methods: {
    file_click(e) {
      // console.log(this);
      // console.log(e.currentTarget,e.target,e);
      e.currentTarget.querySelector('input[type="file"]').click();
    },
    file_change(e) {
      // console.log(e.target.files)
      if (e.target.files.length !== 0) {
        let file = e.target.files[0];
        this.fileName = file.name;
        this.photos = file;
        this.isPhotoerr = false;
      }
    },
    upload() {
      console.log(this.photos);
      if (this.cookies.getCookie("userId")) {
        if (this.prodName == "") {
          this.isPNerr = true;
          return;
        }
        if (!File.prototype.isPrototypeOf(this.photos)) {
          this.isPhotoerr = true;
          return;
        }
        if (this.description == "") {
          this.isDescerr = true;
          return;
        }
        if(!this.$root.$data.userInfo.activation){
          alert('请登录邮箱激活账号')
          return;
        }
        let formData = new FormData();
        formData.append("photos", this.photos);
        formData.append("prodName", this.prodName);
        formData.append("description", this.description);
        formData.append("attr", this.attrType);
        console.log(formData.get("photos"));
        this.fetch("formData")
          .post("http://localhost:3000/admin/photos", formData)
          .then(res => {
            console.log(res);
            if (res.data.status == 1) {
              alert("上传成功");
              this.$emit("finished");
            }
          });
      } else {
        alert("请先登录");
        this.$emit("unlogin");
      }
     
    },
    finished(){
      this.$emit("finished")
    },
    changeAttr(value){
      this.attrType = value;
      this.attrtext = this.attrs[value];
      // console.log(this.attrs[value],this.attrs,value)
      this.selectShow = false;
    }
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
  z-index: 51;
}
.upload_form .close_btn{
  position: absolute;
  width: 25px;
  height: 25px;
  top: 15px;
  right: 15px;
  background: url(../../static/image/svg/close.svg) center;
  background-size: contain;
  cursor: pointer;
}
.upload_form .tit {
  font-size: 23px;
  color: #aaa;
  width: 800px;
  margin: 0 auto;
  line-height: 96px;
}
.upload_form .form_box {
  box-sizing: border-box;
  width: 800px;
  height: 400px;
  margin: 0 auto;
  padding-top: 15px;
  font-size: 16px;
  color: #aaa;
  background-color: #282828;
}

.upload_form .form_box .form_row {
  margin-bottom: 8px;
  padding: 0 20px;
}
.upload_form .form_box .label {
  float: left;
  width: 80px;
  min-height: 1px;
  font-size: 16px;
  color: #aaa;
  line-height: 38px;
  text-align: right;
}
.upload_form .form_box .inputbox {
  float: left;
  height: 38px;
  width: 230px;
  overflow: hidden;
  margin-left: 30px;
  padding-left: 20px;
  padding-right: 10px;
  border: 1px solid #333;
  border-radius: 3px;
  background: linear-gradient(
    to bottom,
    rgba(30, 30, 30, 1) 0%,
    rgba(35, 35, 35, 1) 100%
  );
}
.upload_form .form_box .inputbox input {
  line-height: 38px;
  background: inherit;
  border: none;
  color: #aaa;
}
.upload_form .form_box .inputbox input:focus {
  outline: none;
}
.upload_form .form_box .inputbox textarea {
  height: 100px;
}
.upload_form .form_box .inputbox.file_box {
  font-size: 14px;
  color: #666;
  line-height: 38px;
  cursor: pointer;
}
.upload_form .form_box .inputbox.selector{
  position: relative;
  border-left-color: rgba(51, 51, 51, 0.2);
  border-right-color: rgba(51, 51, 51, 0.2);
  cursor: pointer;
  margin-left: 0;
  font-size: 14px;
  
}
.upload_form .form_box .inputbox.selector::after{
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  right: 10px;
  top: 15px;
  background-color: #fff;
}
.upload_form .form_box .inputbox.selector .selected{
  color: #999;
  line-height: 38px;
}
.upload_form .form_box .optbox{
  position: relative;
  float: left;
  outline: none;
  margin-left: 30px;
}
.upload_form .form_box .options{
  position: absolute;
  box-sizing: border-box;
  width: 262px;
  height: 230px;
  top: 40px;
  left: 0px;
  padding: 0 20px;
  background: #1f1f1f;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  cursor: pointer;
  font-size: 14px;
}
.upload_form .form_box .options .option_item{
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #282828;
  
}
.overbox{
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.overbox .overcontbox{
  width: 100%;
  height: 100%;
  padding-right: 20px;
  overflow-y: scroll;
}
.upload_form .form_box .inputbox.textarea {
  height: auto;
}
.upload_form .form_box .inputbox.file_box input {
  display: block;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
}
.upload_form .form_box .inputbox.textarea textarea {
  line-height: 25px;
  background: inherit;
  border: none;
  color: #999;
  resize: none;
}
.upload_form .form_box .inputbox.textarea textarea:focus {
  outline: none;
}
.upload_form .form_box .infobox {
  float: left;
  line-height: 40px;
  font-size: 14px;
  color: #ff0000bf;
  margin-right: 26px;
  margin-left: 26px;
}
.upload_form .form_box .btn {
  float: left;
  margin-left: 30px;
  width: 80px;
  height: 38px;
  line-height: 38px;
  border-radius: 5px;
  background: #454545;
  color: #999;
  cursor: pointer;
  text-align: center;
  user-select: none;
}
.upload_form .form_box .btn:active {
  background: #515151;
}
.upload_form .form_box .btn:hover {
  background: #555;
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

