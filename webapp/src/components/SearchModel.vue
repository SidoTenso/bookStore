<template>
    <div class="search_box">
        <div :class="'l_box '+ (isShowMore?'more': '')">
            <div class="first_show">
                <template v-for="(photo,index) in photos.slice(0,6)">
                    <router-link :to="'/photos?id='+photo._id" :key="'otherphoto'+index">
                        <div @click="closeModel" class="photo_item">
                            <table>
                                <div class="imgbox">
                                    <img :src="urls.server+photo.src" alt="">
                                </div>

                            </table>
                            <div class="info">{{photo.prodName}}</div>
                        </div>
                    </router-link>
                </template>
                <div class="clear"></div>
            </div>
            <div v-if="isShowMore" class="other">
                <template v-for="(photo,index) in photos.slice(6)">
                    <router-link :to="'/photos?id='+photo._id" :key="'otherphoto'+index">
                        <div @click="closeModel" class="photo_item">
                            <table>
                                <div class="imgbox">
                                    <img :src="urls.server+photo.src" alt="">
                                </div>

                            </table>
                            <div class="info">{{photo.prodName}}</div>
                        </div>
                    </router-link>
                </template>
                <div class="clear"></div>
            </div>
        </div>
        <div class="r_box">
            <div class="first_show">
                <template  v-for="(author,index) in authors.slice(0,9)" >
                    <router-link :to="'/userpage?id='+author._id" :key="'author'+index">
                    <div @click="closeModel" class="author_item">
                        <div class="userImg">
                            <img src="../../static/image/svg/account.svg" alt="">
                        </div>
                        <div class="userinfo">{{author.userName}}</div>
                    </div>
                    </router-link>
                </template>
                <div class="clear"></div>
            </div>
            <div v-if="isShowMore" class="other">
                <template  v-for="(author,index) in authors.slice(9)">
                    <router-link :to="'/userpage?id='+author._id" :key="'author'+index">
                    <div @click="closeModel" class="author_item">
                        <div class="userImg">
                            <img src="../../static/image/svg/account.svg" alt="">
                        </div>
                        <div class="userinfo">{{author.userName}}</div>
                    </div>
                    </router-link>
                </template>
                <div class="clear"></div>
            </div>
        </div>
        <div class="clear"></div>
        <div v-if="!isShowMore&&( photos.length>6 || authors.length>9)" class="showMore" @click="showMore">
            显示更多
        </div>
        <div class="close" @click="closeModel">
            关闭
        </div>
    </div>

  
</template>

<script>
export default {
    props:['searchkey'],
    data(){
        return {
            isShowMore: false,
            photos:[],
            authors:[],
            timer: 0
        }
    },
    watch:{
        searchkey(){
            clearTimeout(this.timer)
            if(this.searchkey){
                this.timer = setTimeout(() => {
                    console.log(this.searchkey)
                    this.getSearch()
                }, 500);
            }
        }
    },
    created(){
    },
    methods:{
        showMore(){
            this.isShowMore = true;
        },
        closeModel(){
            console.log('aa')
            this.$emit('finished')
        },
        getSearch(){
            this.fetch().post(this.urls.getSearch,{
                searchkey: this.searchkey
            }).then(res=>{
                console.log(res)
                this.authors = res.data.data.authors;
                this.photos = res.data.data.photos;
            })
        }
    }
}
</script>

<style scoped>

.search_box{
    position: fixed;
    width: 100%;
    padding-top: 80px;
    padding-bottom: 35px;
    top: 0;
    background:linear-gradient(to bottom, #090909,#141414);
    z-index: -1;
    color: #999;
}
.search_box .l_box{
    float: left;
    width: 66.66%;
    height: 330px;  
    transition: all 0.25s linear;  
}
.search_box .l_box.more{
    height: calc(100vh - 115px);
}
.search_box .photo_item{
    float: left;
    box-sizing: border-box;
    padding: 0 15px;
    height: 150px;
    width: 33.3%;
    text-align: center;
}
.search_box .photo_item .imgbox{
    display: table-cell;
    width: 100%;
    height: 125px;
    vertical-align: middle;
}
.search_box .photo_item .imgbox img{
    max-width: 100%;
    max-height: 125px;
}
.search_box .photo_item .info{
    font-size: 14px;
    line-height: 22px;
    color: #999;
}

.search_box .r_box{
    float: left;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    border-left: 1px solid #555;
    width: 33.3%;
    max-height: 330px;  
      
}
.search_box .r_box.more{
    height: 550px;
}
.search_box .author_item{
    float: left;
    box-sizing: border-box;
    width: 33.3%;
    height: 90px;
    box-sizing: border-box;
    padding: 0 5px;
    text-align: center;
}
.search_box .author_item .userImg{
    max-height:85px;
    width: 100%; 
}
.search_box .author_item .userImg img{
    width: 50px;
    height: 50px;
}
.search_box .author_item .userinfo{
    color: #999;
}
.search_box .showMore{
    position: absolute;
    width: 86px;
    left: 50%;
    bottom: 15px;
    margin-left: -43px;
    background-color: #333;
    text-align: center;
    border-radius: 10px;
}
.search_box .close{
    position: absolute;
    padding: 0px 15px;
    bottom: 15px;
    right: 15px;
    background-color: #333;;
    border-radius: 5px;
}
.slideFromTop-enter {
  transition: all 0.73s linear;
  top: -700px;
}
.slideFromTop-enter-active {
  transition: all 0.75s linear;
}
.slideFromTop-leave {
  transition: all 0.73s linear;
  top: 0;
}
.slideFromTop-leave-active {
  top: -700px;
  transition: all 0.75s linear;
}
</style>
