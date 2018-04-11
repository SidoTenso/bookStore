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
                  <input type="text" v-model="prodName" name="prodName" min="0" placeholder="您的作品名称" autocomplete="off">
              </div>
              <span class="form_unit"></span>
              <div class="infobox">
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
                  <input type="file" name="photos" id="photos" accept="image/*" @change="file_change" >
              </div>
              <span class="form_unit"></span>
              <div class="infobox">
              </div>
              <div class="clear"></div>
          </div>
          <div class="form_row">
            <div class="label justify">
              描述:
            </div>
            <div class="inputbox textarea">
              <textarea v-model="description" name="" id="" cols="30" rows="10"></textarea>
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      fileName: '点击上传您的文件',
      photos:{},
      prodName: '',
      description: ''
    };
  },
  methods: {
    file_click(e){
      console.log(this);
      console.log(e.currentTarget,e.target,e);
      e.currentTarget.querySelector('input[type="file"]').click()
    },
    file_change(e){
      // console.log(e.target.files)
      if(e.target.files.length !== 0){
        let file = e.target.files[0];
        this.fileName = file.name;
        this.photos = file;
      }
    },
    upload(){
      console.log(this.photos)
      let formData = new FormData();
      formData.append('photos',this.photos)
      formData.append('prodName',this.prodName)
      formData.append('description',this.description)
      console.log(formData.get('photos'))
      this.fetch('formData').post('http://localhost:3000/admin/photos',formData).then(res=>{
        // console.log(res)
        if(res.data.status == 1){
          alert('上传成功')
          this.$emit('finished')
        }
      })
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
    min-height: 1px;
    font-size: 16px;
    color: #aaa;
    line-height: 38px;
    text-align: right;
}
.upload_form .form_box .inputbox{
    float: left;
    height: 38px;
    width: 230px;
    overflow: hidden;
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
.upload_form .form_box .inputbox textarea{
  height: 100px;
}
.upload_form .form_box .inputbox.file_box{
  font-size: 14px;
  color: #666;
  line-height: 38px;
  cursor: pointer;
}
.upload_form .form_box .inputbox.textarea{
  height: auto;
}
.upload_form .form_box .inputbox.file_box input{
  display: block;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;

}
.upload_form .form_box .inputbox.textarea textarea{
    line-height: 25px;
    background: inherit;
    border: none;
    color: #999;
    resize: none;
}
.upload_form .form_box .inputbox.textarea textarea:focus{
  outline: none;
}
.upload_form .form_box .btn{
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
.upload_form .form_box .btn:active{
  background: #515151;

}
.upload_form .form_box .btn:hover{
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

