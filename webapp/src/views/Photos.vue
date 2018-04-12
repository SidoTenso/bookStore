<template>
  <div class="content">
      <!-- 照片 -->
      <div class="photos_box">
          <!-- <img :src="require('../../static/image/testImg.jpg')" alt=""> -->
          <img :src="urls.server+photoInfo.src" alt="">
      </div>

      <!-- 评论 -->
      <div class="comments">
          <div class="title">
              评论区
          </div>
          <div class="comment_form">
              <textarea v-model="comment_cont" name="" id="" cols="30" rows="10" placeholder="分享您的独特见解吧"></textarea>
              <div class="comment_btn" @click="uploadComment">
                  评论
              </div>
          </div>
          <div class="comment_list">
              <template v-for="comment in photoInfo.comments">
                <div class="comment_item" :key="comment._id">
                    <div class="commenter_img">
                        <img src="../../static/image/svg/account.svg" alt="">
                    </div>
                    <div class="comment_info">
                        <p class="username">{{comment.observer && comment.observer.userName}}</p>
                        <p class="comment_cont">
                            {{comment.comment}}
                        </p>
                    </div>
                    <div class="clear"></div>
                </div>
              </template>
          </div>
      </div>
      <!-- 底部栏 -->
      <div class="bottom_bar">
          <div class="btm_l">
              <div class="photo_name">
                  <span>
                      {{photoInfo.prodName || ''}}
                  </span>
                  <span>
                    <img src="../../static/image/1xselected4.png" alt="">
                  </span>
                    <router-link to="/userpage">
                    {{photoInfo.author && photoInfo.author.userName}}
                    </router-link>
              </div>
          </div>
          <div class="btm_r">
              <router-link to="/buy">Buy</router-link>
              <div class="comment_icon">
                <div class="icon comment"></div>
              </div>
          </div>
      </div>
      
      
  </div>
</template>
<script>
export default {
    data(){
        return {
            id: this.$route.query.id,
            photoInfo: {},
            comment_cont: ''
        }
    },
    created(){
        this.getProdInfo();
        console.log(this.$route)
    },
    methods:{
        getProdInfo(){
            this.fetch().post(this.urls.getPhotoInfo,{
                id: this.id
            }).then(res=>{
                console.log(res)
                this.photoInfo = res.data
            })
        },
        uploadComment(){
            if(this.comment_cont && this.cookies.getCookie('userId')){
                this.fetch().post(this.urls.uploadComment,{
                    comment: this.comment_cont,
                    id: this.id
                }).then(res=>{
                    console.log(res);
                })
            }else if(!this.cookies.getCookie('userId')){
                this.bus.$emit('showLogin',1)
            }
        }
    }
}
</script>
<style scoped>
    .content{
        display: table;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        padding-bottom: 50px;
    }
    .photos_box{
        position: relative;
        display: table-cell;
        width: calc(100% - 500px);
        height: 100%;
        vertical-align: middle;
        text-align: center;
    }
    .photos_box img{
        /* position: absolute;
        top: 50%; */
        /* left: 50%; */
        /* margin-left: -25%; */
        width: 100%;
        /* margin-top: calc(); */
    }
    .comments{
        /* float: left; */
        display: table-cell;
        box-sizing: border-box;
        padding-left: 20px;
        padding-right: 20px;
        width: 500px;
        height: 100%;
        background: linear-gradient(to bottom, rgba(15,15,15,1) 0%,rgba(1,1,1,1) 100%);
    }
    .comments .title{
        font-size: 20px;
        color: #aaa;
        margin: 20px 0;
    }
    .comments .comment_form textarea{
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        border: none;
        padding: 15px;
        border-radius: 5px;
        background-color: rgb(21, 21, 21);
        resize: none;
        color: #666;
    }
    .comments .comment_form textarea:focus{
        /* border: none; */
        border-radius: 5px;
        outline: 1px solid rgba(255, 255, 255, 0.1);
    }
    .comments .comment_form .comment_btn{
        width: 60px;
        height: 35px;
        line-height: 35px;
        color: #999;
        text-align: center;
        margin: 13px 0;
        font-size: 15px;
        background: rgb(18, 18, 18);
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
    }
    .comments .comment_form .comment_btn:hover{
        background: rgb(30, 30, 30);
    }
    .comments .comment_form .comment_btn:active{
        background: rgb(25, 25, 25);
    }
    .comments  .comment_form{
        margin-bottom: 15px;
    }
    .comments .comment_item{
        margin-bottom: 15px;
    }
    .comments .comment_item .commenter_img {
        float: left;
        width: 30px;
        height: 30px;
        margin-right: 13px;
    }
    .comments img{
        width: 100%;
        height: 100%;
    }
    .comments .comment_item .comment_info{
        float: left;
        width: calc(100% - 43px);
        color: #888;
    }
    .comments .comment_item .comment_info p{
        font-size: 14px;
        line-height: 18px;
    }
    
    .bottom_bar{
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50px;
        width: 100%;
        padding: 0 30px 0 50px;
        line-height: 50px;
        color: #ddd;
        font-size: 15px;
        background: linear-gradient(to bottom, rgba(33,33,33,1) 0%,rgba(15,15,15,1) 100%);
    }
    .bottom_bar .btm_l{
        float: left;
    }
    .bottom_bar .btm_r{
        float: right;
    }
    .bottom_bar .photo_name span{
        border-right: 1px solid rgba(0,0,0, 0.1);
    }
    .bottom_bar .photo_name span, .bottom_bar .photo_name a{
        float: left;
        vertical-align: middle;
        line-height: 50px;
        height: 50px;
        padding: 0 15px;
        color: #ddd;
        border-right: 1px solid rgba(0,0,0, 0.1);
    }
    .bottom_bar .photo_name a:hover{
        background: linear-gradient(to bottom, rgba(49,49,49,1) 0%,rgba(19,19,19,1) 100%);
    }
    .bottom_bar .photo_name img{
        position: relative;
        top: -6px;
        height: 50px;
    }
    .bottom_bar .btm_r a{
        vertical-align: middle;
        line-height: 50px;
        height: 50px;
        padding: 0 15px;
        color: #ddd;
        border-right: 1px solid rgba(0,0,0, 0.1);
    }
    .bottom_bar .btm_r .icon{
        height: 50px;
        color: #ddd;
        width: 30px;
        background: url("../../static/image/svg/comments.svg") no-repeat center;
        background-size: 25px;
        cursor: pointer;
    }
    .bottom_bar .btm_r .comment_icon{
        float: left;
        padding: 0 15px;
        border-right: 1px solid rgba(0,0,0, 0.1);
    }
    .bottom_bar .btm_r a{
        float: left;
        height: 100%;
        border-left: 1px solid rgba(0,0,0, 0.1);
    }
    .bottom_bar .btm_r .comment_icon:hover,.bottom_bar .btm_r a:hover{
        background: linear-gradient(to bottom, rgba(49,49,49,1) 0%,rgba(19,19,19,1) 100%);
    }
</style>

