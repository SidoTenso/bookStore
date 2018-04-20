<template>
    <div class="con_box">
        <div class="left_nav">
            <div class="overbox">
                <!-- <div @click="showtypeChange('all')" :class="'nav_item '+ (showtype == 'all' ?'active':'')">全部</div>
                <div v-for="(value,key,index) in attrType" @click="showtypeChange(key)" :class="'nav_item '+ (showtype == key ?'active':'')" :key="'navitem'+index">{{value}}</div> -->
                <div @click="listType = 'prods',showtype = 'pass'" :class="'nav_item '+ (listType == 'prods' ?'active':'')" >作品</div>
                <div :class="'nav_itemcont '+(listType == 'prods'?'show':'')">
                  <div :class="'nav_item '+ (showtype == 'pass' ?'active':'')" @click="showtypeChange('pass')">已审核</div>
                  <div :class="'nav_item '+ (showtype == 'uncheck' ?'active':'')" @click="showtypeChange('uncheck')">未审核</div>
                  <div :class="'nav_item '+ (showtype == 'collect' ?'active':'')" @click="showtypeChange('collect')">收藏</div>
                </div>
                <div @click="listType = 'setinfo'" :class="'nav_one nav_item '+ (listType == 'setinfo' ?'active':'')">
                  更改个人信息
                </div>

            </div>
        </div>
        <div class="right_cont">

            <div class="rt_nav sort_tit">
                <!-- <div class="sort_item">
                    <span :class="{active: sort_type == 'popular'}" @click="sortPhotos(1)">流行</span>
                </div>
                <div class="sort_item">
                    <span :class="{active: sort_type == 'lasted'}" @click="sortPhotos(2)">最新</span>
                </div>
                <div class="sort_item">
                    <span :class="{active: sort_type == 'awarded'}" @click="sortPhotos(3)">热议</span>
                </div> -->
            </div>
            <div v-if="listType == 'prods'" class="photo">
              <div class="photo_box">
                  <div class="overbox">
                      <template v-for="(item,index) in chunkFansArr[page]">
                          <prod-item :key="item._id" :prodInfo="{img:'http://localhost:3000'+item.src,author: item.author,id: item._id}"></prod-item>
                          <div v-if="index%3 == 2" :class="'clear clear'+index" :key="'clear'+index" ></div>
                      </template>
                  </div>
              </div>
              <div class="page_box" v-if="chunkFansArr.length !== 0">
                  <div :class="'page_item '+ (page== 0?'forb':'')" @click="gotoPage('prev')">
                      上一页
                  </div>
                  <div v-for="spage in chunkFansArr.length"  :class="'page_item '+ (page+1 == spage?'active':'')" :key="'page'+spage"
                      @click="gotoPage(spage-1)">
                      {{spage}}
                  </div>
                  <div :class="'page_item '+ (page+1 == chunkFansArr.length?'forb':'')" @click="gotoPage('next')">
                      下一页
                  </div>
              </div>
            </div>
            <div v-if="listType == 'setinfo'" class="infoSettings">
              <div class="infoshow">
                <div class="form_box">
                  <form action="#" method="post" enctype="multipart/form-data" id="photos_form">
                    <div class="form_row">
                        <div class="label justify">
                          昵称:
                        </div>
                        <div class="inputbox">
                            <input type="text" v-model="userInfo.userName" @focus="formErr = false" name="prodName" min="0" placeholder="您的昵称" autocomplete="off" required>
                        </div>
                        <span class="form_unit"></span>
                        <div v-if="formErr == 'name'" class="infobox">
                          {{errInfo.username}}
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="form_row">
                        <div class="label justify">
                          邮箱:
                        </div>
                        <div class="inputbox" style="border:none;background: inherit;line-height: 37px;">
                            <!-- <input type="email" v-model="userinfo.email" @focus="formErr = false" name="prodName" min="0" placeholder="您的昵称" autocomplete="off" required> -->
                            {{userInfo.email}}
                        </div>
                        <span class="form_unit"></span>
                        <div class="clear"></div>
                    </div>
                    <div class="form_row">
                        <div class="label justify">
                          头像:
                        </div>
                        <div class="inputbox file_box" @click.capture="file_click">
                            <!-- <input type="" name="prodName" min="0" placeholder="您的作品名称" autocomplete="off"> -->
                            <span>{{fileName}}</span> 
                            <input type="file" name="photos" id="photos" accept="image/*" @change="file_change" required>
                        </div>
                        <span class="form_unit"></span>
                        <div v-if="formErr == 'photos'" class="infobox">
                          {{errInfo.photos}}
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div :class="'frowcont '+ (isChangepsw&&'show')">
                      <div class="form_row">
                        <div class="label justify">
                          旧密码:
                        </div>
                        <div class="inputbox">
                           <input type="password" v-model="psw" @focus="formErr = false" name="prodName" min="0" placeholder="旧密码" autocomplete="off" required>
                        </div>
                        <span class="form_unit"></span>
                        <div v-if="formErr == 'psw'" class="infobox">
                          {{errInfo.psw}}
                        </div>
                        <div class="clear"></div>
                      </div>
                      <div class="form_row">
                        <div class="label justify">
                          新密码:
                        </div>
                        <div class="inputbox">
                           <input type="password" v-model="npsw" @focus="formErr = false" name="prodName" min="0" placeholder="新密码" autocomplete="off" required>
                        </div>
                        <span class="form_unit"></span>
                        <div v-if="formErr == 'rpsw'" class="infobox">
                          {{errInfo.psw}}
                        </div>
                        <div class="clear"></div>
                      </div>
                    </div>
                    
                    <div class="form_row">
                      <div class="label justify"></div>
                      <div class="upload btn" @click="change">
                        更改
                      </div>
                      <div class="checkbox">
                        <input type="checkbox" v-model="isChangepsw" name="" id="">更改密码
                      </div>
                    </div>
                  </form>
                </div> 
              </div>
              <div class="infosetting"></div>
            </div>
        </div>

    </div>
  
</template>

<script>
import attrType from "../common/photoAttrs";
import ProdItem from "../components/ProdItem";
export default {
  components: {
    ProdItem
  },
  data() {
    return {
      errInfo:{
        username: '用户名长度4-8位',
        psw: '密码长度8-16位',
        photos: '图片过大'
      },
      showtype: "pass",
      sort_type: "popular",
      attrType,
      tempPhotos: [],
      photos: [],
      collect: [],
      userInfo: {},
      page: 0,
      pageSize: 15,
      listType: "prods",
      fileName: '点击上传头像(100kb以内)',
      file: null,
      formErr: '',
      isChangepsw: false,
      psw:'',
      npsw:''
    };
  },
  beforeCreate(){
    if (!this.$root.$data.isLogined) {
      console.log(111);
      location.href = "/";
    }
  },
  created() {
    this.init();
  },
  computed: {
    chunkFansArr() {
      let tempPhotos = [];
      if (this.showtype == "pass") {
        tempPhotos = this.photos.filter(item => {
          return item.status == this.showtype;
        });
      } else if (this.showtype == "collect") {
        tempPhotos = this.collect;
      } else {
        tempPhotos = this.photos.filter(item => {
          return item.status == this.showtype;
        });
      }
      return this.tools.chunkArr(tempPhotos, this.pageSize);
    },
    
  },
  beforeMount() {
    // if (!this.$root.$data.isLogined) {
    //   console.log(111);
    //   location.href = "/";
    // }
  },
  methods: {
    init() {
      this.getPhotos();
      this.getcollect();
      this.getUserInfo();
    },
    getPhotos() {
      this.fetch()
        .post(this.urls.getphotosById, {
          id: this.$root.$data.userInfo._id,
          status: "all"
        })
        .then(res => {
          console.log(res);
          this.photos = res.data.data;
          this.sortPhotos(1);
          //   this.tempPhotos = this.photos;
        });
    },
    getcollect() {
      this.fetch()
        .post(this.urls.getCollect, {
          id: this.$root.$data.userInfo._id
        })
        .then(res => {
          console.log(res);
          this.collect = res.data.data.collect;
        });
    },
    getCurPhoto(arr) {
      let chunkArr = this.tools.chunkArr(arr, this.pageSize);
      return chunkArr[this.page];
    },
    sortPhotos(type) {
      this.photos.sort((a, b) => {
        switch (type) {
          case 1:
            this.sort_type = "popular";
            if (b.likes - a.likes == 0) {
              return b.uploadTime - a.uploadTime;
            } else {
              return b.likes - a.likes;
            }
            break;
          case 2:
            this.sort_type = "lasted";
            if (a.uploadTime) {
              return b.uploadTime - a.uploadTime;
            } else {
              return false;
            }
            break;
          case 3:
            this.sort_type = "awarded";
            if (a.comments) {
              return b.comments.length - a.comments.length;
            } else {
              return false;
            }
            break;

          default:
            break;
        }
      });
      //   this.tempPhotos = this.photos
    },
    showtypeChange(value) {
      this.showtype = value;
      console.log(value);
      // if(this.showtype == "all"){
      //     this.tempPhotos = this.photos;
      // }else{
      //     this.tempPhotos = this.photos.filter(item=>{
      //         return item.attr == this.showtype
      //     })
      // }
    },
    gotoPage(value) {
      switch (value) {
        case "next":
          if (this.page + 1 < this.chunkFansArr.length) {
            this.page++;
          }
          break;
        case "prev":
          if (this.page > 0) {
            this.page--;
          }
          break;

        default:
          this.page = value;
          break;
      }
    },
    getUserInfo() {
      this.fetch().post(this.urls.getUserInfo,{
        userId: this.cookies.getCookie('userId')
      }).then(res=>{
        // console.log(res)
        this.userInfo = res.data.userInfo
      })
    },
    change(){
      let data = {},
        url = this.urls.setUserInfo
      if(!this.userInfo.userName){
        this.formErr = 'name';
        return
      }
      if(this.isChangepsw){
        if(!this.psw || this.psw.length<8 ||this.psw.length>16){
          this.formErr = 'psw';
          return
        }
        if(!this.npsw || this.npsw.length<8 ||this.npsw.length>16){
          this.formErr = 'psw';
          return
        }
        url+='?cp=1';
        data.psw = this.psw;
        data.npsw = this.npsw;
      }
      data.userId = this.userInfo._id;
      data.userName = this.userInfo.userName;
      data.userPic=  this.file;
      // data.
      console.log(data)
      this.fetch().post(url,data).then(res=>{
        console.log(res)
        if(res.data.status == 1){
          alert('更改成功')
        }
      })


    },
    file_click(){
      document.getElementById('photos').click();
    },
    file_change(e){
      if (e.target.files.length !== 0) {
        let file = e.target.files[0];
        if(file.size > 100000){
          this.formErr = 'photos';
          return;
        }else{
          
          this.formErr = null;
        }
        this.fileName = file.name;
        this.file = file;
        let img = new FileReader()
        img.readAsDataURL(file)
        img.onload = e=>{

          this.file = e.currentTarget.result
        }
      }
    }
  }
};
</script>

<style scoped>
.con_box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #111;
}
.left_nav {
  float: left;
  box-sizing: border-box;
  width: 200px;
  height: 100%;
  overflow: hidden;
  margin-right: -200px;
  background-color: #0c0c0c;
}
.left_nav .overbox {
  width: 220px;
  height: 100%;
  overflow-x: hidden;
}
.left_nav .nav_item {
  padding: 10px 0 10px 20px;
  width: 100%;
  color: #999;
  border-bottom: 1px solid #222;
  background-color: #0c0c0c;
}
.left_nav .nav_itemcont {
  height: 0;
  overflow: hidden;
  transition: all 0.5s linear;
}
.left_nav .nav_itemcont .nav_item {
  padding-left: 35px;
  background-color: #151515;
}
.left_nav .nav_itemcont.show {
  height: 138px;
}
.left_nav .nav_item.active {
  background-color: #090909;
}
.left_nav .nav_item.nav_one.active {
  background-color: #111;
}
.left_nav .nav_itemcont .nav_item.active {
  background-color: #111;
}
.right_cont {
  position: relative;
  margin-left: 220px;
  width: calc(100% - 220px);
  height: 100%;
  background-color: #131313;
}
.sort_tit {
  width: 100%;
  padding: 40px 0 30px;
  font-size: 16px;
  color: #666;
  text-align: center;
}
.sort_tit .sort_item {
  display: inline-block;
  margin: 0 20px;
  cursor: pointer;
}
.sort_tit .sort_item span {
  padding: 7px 0 10px;
  border-bottom: 1px solid #999;
}
.sort_tit .sort_item span.active {
  color: #ccc;
}
.right_cont .photo_box {
  box-sizing: border-box;
  width: 100%;
  height: 485px;
  overflow: hidden;
}
.right_cont .photo_box .overbox {
  width: calc(100% + 20px);
  height: 485px;
  overflow-y: scroll;
}
.page_box {
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0px;
  left: 0;
  text-align: center;
  line-height: 30px;
  user-select: none;
  background-color: #181818;
}
.page_box .page_item {
  display: inline-block;
  padding: 1px 10px;
  font-size: 14px;
  margin-top: 8px;
  background-color: #202020;
  border-radius: 5px;
  cursor: pointer;
  color: #999;
}
.page_box .page_item.active {
  background-color: #121212;
}
.page_box .page_item.forb {
  background-color: #121212;
  cursor: not-allowed;
}

.form_box {
  box-sizing: border-box;
  width: 800px;
  height: 400px;
  margin: 0 auto;
  padding-top: 15px;
  font-size: 16px;
  color: #aaa;
  background-color: #282828;
}

.form_box .form_row {
  margin-bottom: 8px;
  height: 38px;
  padding: 0 20px;
}
.form_box .label {
  float: left;
  width: 80px;
  min-height: 1px;
  font-size: 16px;
  color: #aaa;
  line-height: 38px;
  text-align: right;
}
.form_box .inputbox {
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
.form_box .inputbox input {
  line-height: 38px;
  background: inherit;
  border: none;
  color: #aaa;
}
.form_box .inputbox input:focus {
  outline: none;
}
.form_box .inputbox textarea {
  height: 100px;
}
.form_box .inputbox.file_box {
  font-size: 14px;
  color: #666;
  line-height: 38px;
  cursor: pointer;
}
.form_box .inputbox.selector{
  position: relative;
  border-left-color: rgba(51, 51, 51, 0.2);
  border-right-color: rgba(51, 51, 51, 0.2);
  cursor: pointer;
  margin-left: 0;
  font-size: 14px;
  
}
.form_box .inputbox.selector::after{
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  right: 10px;
  top: 15px;
  background-color: #fff;
}
.form_box .inputbox.selector .selected{
  color: #999;
  line-height: 38px;
}
.form_box .optbox{
  position: relative;
  float: left;
  outline: none;
  margin-left: 30px;
}
.form_box .options{
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
.form_box .options .option_item{
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
.form_box .inputbox.textarea {
  height: auto;
}
.form_box .inputbox.file_box input {
  display: block;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
}
.form_box .inputbox.textarea textarea {
  line-height: 25px;
  background: inherit;
  border: none;
  color: #999;
  resize: none;
}
.form_box .inputbox.textarea textarea:focus {
  outline: none;
}
.form_box .infobox {
  float: left;
  line-height: 40px;
  font-size: 14px;
  color: #ff0000bf;
  margin-right: 26px;
  margin-left: 26px;
}
.form_box .btn {
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
.form_box .btn:active {
  background: #515151;
}
.form_box .btn:hover {
  background: #555;
}
.form_box .checkbox{
    float: left;
    margin-left: 20px;
    line-height: 40px;
}
.form_box .checkbox input[type="checkbox"]{
  margin-right: 8px;
}
.form_box .frowcont{
  height: 0;
  overflow: hidden;
  transition: all 0.3s linear;
}
.form_box .frowcont.show{
  height: 92px;
}
</style>
