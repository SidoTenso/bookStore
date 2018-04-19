<template>
    <div class="content">
        <div class="banner">

        </div>
        <div class="user_box">
            <div class="user_img">
                <img src="../../static/image/svg/account.svg" alt="">
                
            </div>
            <div class="user_info">
                <div class="userName">	
                    {{userInfo.userName}}
                </div>
                <div class="attention">
                    <span @click="attention">{{attentionMsg}}</span>
                </div>
            </div>
            <div class="userTags">
                <div class="tag">{{getYear(userInfo.creat_time)+'年'}}</div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="main_cont">
            <div class="column">
                <ul>
                    <li :class="{column_item: true, active: pageType == pageTypes[0]}" @click="changeView(pageTypes[0])" >照片</li>
                    <!-- <li class="colulmn_item">待审核</li> -->
                    <li :class="{column_item: true, active: pageType == pageTypes[1]}" @click="changeView(pageTypes[1])">收藏</li>
                    <li :class="{column_item: true, active: pageType == pageTypes[2]}" @click="showFans=true">粉丝</li>
                    <li :class="{column_item: true, active: pageType == pageTypes[3]}" @click="changeView(pageTypes[3])">留言</li>
                    <li :class="{column_item: true, active: pageType == pageTypes[4]}" @click="changeView(pageTypes[4])">个人信息</li>
                </ul>
            </div>
            <div class="content_box">
                <!-- <transition-group :name="AnimateType" tag="div" mode="out-in"> -->
                    <div v-if="pageType == 'photos'" v-for="(chunk,chunkIndex) in chunkArr(photos,3)" :key="'a'+chunkIndex" class="photo_row">
                        <div v-for="(item,index) in chunk" :key = "'img'+index" class="photo_item">

                            <router-link :to="'/photos?id='+item._id">
                                <img :src="urls.server + item.src" alt="">
                            </router-link>
                                
                        </div>
                        <div v-if="photos.length == 0" class="hint_box">
                            暂无作品
                        </div>
                    </div>
                    <div v-if="pageType == 'collect'" v-for="(chunk,chunkIndex) in chunkArr(collects,3)" :key="'collect'+chunkIndex" class="photo_row">
                        <div v-for="(item,index) in chunk" :key = "'img'+index" class="photo_item">
                            <router-link :to="'/photos?id='+item._id">
                                <img :src="urls.server + item.src" alt="">
                            </router-link>
                        </div>
                    </div>
                <!-- </transition-group> -->
                    <div v-if="collects.length == 0 && pageType == 'collect'" class="hint_box">
                        暂无收藏照片
                    </div>
                    <div v-if="photos.length == 0 && pageType == 'photos'" class="hint_box">
                        暂无作品
                    </div>

                    <!-- 粉丝 -->
                    <div  class="fans_box">
                        <fans v-if="showFans" @finish="closeFans" :fansArr="fans"></fans>
                    </div>

                    <!-- 留言 -->
                    <div v-if="pageType == 'comment'" class="comment_box">
                        <div class="tit">留言</div>
                        <div class="com_area">
                            <textarea v-model="comment_cont" placeholder="在这里写下留言"></textarea>
                        </div>
                        <div class="comment_btn" @click="uploadComment">发表</div>
                        <div class="cont_box">
                            <template v-for="(comment,index) in comments">
                                <comment :comment="comment" @commentSuccess="getComments" :key="'comment'+index"></comment>
                            </template>
                        </div>
                    </div>
                    <!-- 个人信息 -->
                    <div v-if="pageType == 'info'" class="personalInfo">
                        <div class="tit">
                            关于
                        </div>
                        {{userInfo.personalInfo|| '暂无该up主信息'}}
                    </div>
                    
                    
            </div>
        </div>

    </div>

  
</template>

<script>
import Fans from'../components/Fans'
import Comment from "../components/Comment"
export default {
  components:{
    Fans,
    Comment
  },
  data() {
    return {
        userInfo:{},
        photos: [],
        collects:[],
        comments:[],
        fans:[],
        pageType: 'photos',
        pageTypes: ['photos','collect','fans','comment','info'],
        AnimateType: 'inTop',
        isAttention: false,
        showFans: false,
        attentionMsg_priv: '关注',
        comment_cont: ''
    };
  },
  created() {
    this.init();
  },
  beforeMount(){

  },
  computed:{
      attentionMsg: {
          get(){
              let masterId = this.$route.query.id;
                let attentions = this.$root.$data.attentions;
                if(attentions.length){
                    attentions.forEach(item=>{
                        if(item == masterId){
                            this.attentionMsg_priv = '已关注'
                        }else{
                            this.attentionMsg_priv = '关注'
                        }
                    })
                }else{
                    this.attentionMsg_priv = '关注'
                }
                return this.attentionMsg_priv;
          },
          set(value){
              this.attentionMsg_priv = value
          }
      },
      
  },
  watch:{
      $route(){
          this.init();
          this.closeFans();
      }
  },
  methods: {
      init(){
          this.getInfo();
          this.getPhotos();
          this.getCollects();
          this.getFans();
          this.getComments();
      },
      getInfo(){
          this.fetch().post(this.urls.getUserInfo ,{
              userId: this.$route.query.id
          }).then(res=>{
              console.log(res)
              if(res.data.status == 1){

                  this.userInfo = res.data.userInfo
              }
          })
      },
      getYear(date){
          if(date){
              return (new Date(date)).getFullYear();
          }else{
              return 2018
          }
      },
      getPhotos(){
          this.fetch().post(this.urls.getphotosById,{
              id: this.$route.query.id,
              limit: 15
          }).then(res=>{
              if(res.data && res.data.status == 1){
                  this.photos = res.data.data;
              }
          })
      },
      getCollects(){
          this.fetch().post(this.urls.getCollect,{
              id: this.$route.query.id,
              limit: 15
          }).then(res=>{
              if(res.data && res.data.status == 1){
                  this.collects = res.data.data.collect;
                  console.log(res)
              }
          })
      },
      getFans(){
          this.fetch().post(this.urls.getfans,{
              id:this.$route.query.id
          }).then(res=>{
              console.log(res)
              this.fans = res.data.data
          })
      },
      chunkArr(arr,size){
          return arr.length == 0?arr: Array.from({length: Math.ceil(arr.length/size)},(value,index)=>arr.slice(index*size,index*size+size))
      },
      changeView(type){
          if(this.pageTypes.indexOf(type)>this.pageTypes.indexOf(this.pageType)){
              this.AnimateType = 'inBottom'
          }else{
              this.AnimateType = 'inTop'
          }
          this.pageType = type;
      },
      attention(){
          if(this.$root.$data.isLogined){
            //   console.log(this.$root.$data, this.$route.query)
              this.isAttention = !this.isAttention;
              this.fetch().post(this.urls.attention,{
                  userId: this.$root.$data.userInfo._id,
                  id: this.$route.query.id
              }).then(res=>{
                //   console.log(res)
                if(res.data.status == 1){
                    this.attentionMsg = res.data.msg
                    this.bus.$emit('getAttentions');
                }
              })
          }else{
              alert('请先登录')
          }
      },
      closeFans(){
        this.showFans = false;
      },
      uploadComment(){
          if(this.cookies.getCookie('userId')){
              this.fetch().post(this.urls.usercomment,{
                  comment: this.comment_cont,
                  id: this.$route.query.id,
              }).then(res=>{
                //   console.log(res)
                this.getComments();
              })
          }else{
              alert('请先登录')
          }
      },
      getComments(){
          this.fetch().post(this.urls.getComments,{
                  id: this.$route.query.id,
                  type: 'user'
              }).then(res=>{
                  console.log(res)
                  if(res.data.status == 1){
                      this.comments = res.data.data
                  }
              })
      }
      
  }
};
</script>

<style scoped>
.content {
  box-sizing: border-box;
  height: 100%;
  padding-top: 65px;
}
.banner {
  width: 1200px;
  margin: 35px auto 0;
  height: 250px;
  background-color: rgb(21, 21, 21);
}
.user_box {
  position: relative;
  height: 80px;
  width: 1200px;
  box-sizing: border-box;
  padding: 0 25px;
  margin: 0 auto;
}
.main_count {
  width: 1200px;
  padding: 25px;
  box-sizing: border-box;
}
.user_box .user_img {
  position: relative;
  top: -105px;
  width: 170px;
  height: 170px;
  float: left;
  background-color: rgb(40, 40, 40);
}
.user_box .user_img img {
  width: 100%;
  height: 100%;
}
.user_box .user_info {
  float: left;
  margin-left: 30px;
  font-size: 30px;
  line-height: 80px;
  color: white;
}
.user_box .user_info .userName{
    float: left;
}
.user_box .user_info .attention{
    float: left;
    margin-left: 30px;
    font-size: 15px;
    line-break: 80px;
}
.user_box .user_info .attention span{
    padding: 5px 20px;
    background: #222;
    border-radius: 5px;
    cursor: pointer;
}
.user_box .user_info .attention span:hover{
    background: #333;
}
.user_box .userTags {
  float: right;
  font-size: 15px;
  line-height: 80px;
  color: white;
}
.user_box .userTags .tag {
  display: inline;
  padding: 8px 12px;
  background-color: #333;
  border-radius: 5px;
}
.main_cont{
    min-height: 400px;
}
.main_cont .column {
  width: 775px;
  margin: 25px auto 30px;
}
.main_cont .column ul::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}
.main_cont .column .column_item {
  position: relative;
  float: left;
  box-sizing: border-box;
  width: 155px;
  height: 45px;
  line-height: 45px;
  color: #bbb;
  text-align: center;
  border-right: 2px solid #222;
  background: linear-gradient(
    to bottom,
    rgba(34, 34, 34, 1) 0%,
    rgba(17, 17, 17, 1) 100%
  );
}
.main_cont .column .column_item:last-child {
  border: none;
}
.main_cont .column .column_item.active {
  background: linear-gradient(
    to bottom,
    rgba(37, 37, 37, 1) 0%,
    rgba(34, 34, 34, 1) 100%
  );
  color: #fff;
}
.main_cont .column .column_item::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -22px;
  margin-left: -11px;
  display: block;
  border: 11px solid transparent;
  border-top: 11px solid rgba(34, 34, 34, 0);
}
.main_cont .column .column_item.active::after {
  border-top: 11px solid rgba(34, 34, 34, 1);
}
.main_cont .content_box{
    position: relative;
    width: 1200px;
    min-height: 400px;
    margin: 0 auto;
    overflow: hidden;
}
.main_cont .hint_box{
    margin-top: 80px;
    font-size: 20px;
    color: #999;
    text-align: center;
}
.main_cont .content_box .photo_row {
    width: 100%;
    box-sizing: border-box;
    padding: 55px;
    display: table;
}
.main_cont .content_box .photo_row .photo_item {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.main_cont .content_box .photo_row .photo_item img{
    max-width: 270px;
    max-height: 230px;
}
.comment_box{
    width: 650px;
    margin: 0 auto;
}
.comment_box .tit{
    font-size: 20px;
    line-height: 50px;
    color: #aaa;
    text-align: center;
}
.comment_box .com_area{
    width: 650px;
    height: 65px;
    padding: 10px 20px;
    box-sizing: border-box;
    border: 1px solid #181818;
    background-color: #141414;

}
.comment_box .com_area textarea{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: #999;
    background-color: #141414;
    resize: none;
}
.comment_box .comment_btn{
    width: 65px;
    height: 30px;
    margin-top: 15px;
    text-align: center;
    color: #999;
    background-color: #202020;
    border-radius: 5px;
}
.comment_box .cont_box{
    margin-top: 25px;
}
.personalInfo{
    width: 1200px;
    margin: 25px auto 0;
    font-size: 16px;
    color: #888;
}
.personalInfo .tit{
    font-size: 22px;
    font-weight: bold;
    color: #999;
    margin-bottom: 20px;
}

.inTop-enter-active{
    transition: all 1s linear;
    transform: scale(0.1,0.1) translateY(-1200px);
}
.inTop-enter-to{
    transform: scale(1,1) translateY(0);
}
.inTop-leave-active{
    transition: all 1s linear;
    transform: scale(1,1) translateY(0);
}
.inTop-leave-to{
    transform: scale(0.1,0.1) translateY(1200px);
}
.inBottom-enter-active{
    transition: all 1s linear;
    transform: scale(0.1,0.1) translateY(-1200px);
}
.inBottom-enter-to{
    transform: scale(1,1) translateY(0);
}
.inBottom-leave-active{
    transition: all 1s linear;
    transform: scale(1,1) translateY(0);
}
.inBottom-leave-to{
    transform: scale(0.1,0.1) translateY(1200px);
}
@keyframes inLeftEnter {
    0%{
        transform: scale(0.1,0.1) translateY(-1000px);

    }
    100%{

        transform: scale(1,1) translateY(0);
    }
    
}
@keyframes inLeftLeave {
    0%{
        transform: scale(1,1) translateY(0);

    }
    100%{

        transform: scale(0.1,0.1) translateY(1000px);
    }
    
}
</style>
