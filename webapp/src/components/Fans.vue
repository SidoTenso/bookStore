<template>
  <div class="mask" @click.self="close">
    <div class="fans_box">
        <div class="tit">
            关注
        </div>
        <div v-for="(fan,index) in pageFans" :key="index" class="fans_item">
                <router-link :to="'/userPage?id='+fan._id">
                    <div class="fans_img">
                        <img src="../../static/image/svg/account.svg" alt="">
                    </div>
                    <div class="fans_name">{{fan.userName}}</div>
                    <div class="clear"></div>
                </router-link>
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
            <div v-else class="hint_info">
                暂无粉丝
            </div>
    </div>

  </div>
</template>
<script>
export default {
    props:['fansArr'],
    data(){
        let pageSize = 6;
        return {
            chunkFansArr: this.tools.chunkArr(this.fansArr,pageSize),
            pageSize,
            page: 0
        }
    },
    computed:{
        pageFans(){
            return this.chunkFansArr[this.page]
        }
    },
    methods:{
        gotoPage(value){
            switch (value) {
                case 'next':
                    this.page+1 == this.chunkFansArr.length || this.page++;
                    break;
                case 'prev':
                    this.page == 0 || this.page--;
                    
                    break;
            
                default:
                    this.page = value;
                    break;
            }
        },
        close(){
            this.$emit('finish');
        }
    }

}
</script>
<style scoped>
    .mask{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
    .fans_box{
        position: fixed;
        box-sizing: border-box;
        width: 650px;
        /* min-height: 375px; */
        height: 550px;
        top: 50%;
        left: 50%;
        margin: -275px 0 0 -325px;
        padding: 0 20px;
        background: #121212;
        border-radius: 10px;
        overflow: hidden;
        z-index: 1000;
    }
    .fans_box .tit{
        font-size: 22px;
        color: #ddd;
        font-weight: bold;
        padding-left: 0px;
        margin: 15px 0;
    }
    .fans_box .fans_item{
        box-sizing: border-box;
        width: 100%;
        padding: 8px;
        border-bottom: 1px solid #333;
        background-color: #181818;
        background-color: #121212;
    }
    .fans_box .fans_item:nth-child(odd){
        background-color: #121212;
    }
    .fans_box .fans_item a{
        color: #999;
        font-size: 18px;
    }
    .fans_box .fans_item .fans_img{
        float: left;
        width: 30px;
        height: 30px;
        margin-right: 15px;
    }
    .fans_box .fans_item .fans_img img{
        width: 100%;
        height: 100%;
    }
    .fans_box .fans_item .fans_name{
        float: left;
        font-size: 16px;
        line-height: 30px;
    }
    .fans_box .page_box{
        position: absolute;
        width: 100%;
        height: 30px;
        bottom: 20px;;
        left: 0;
        text-align: center;
        line-height: 30px;
        user-select: none;
    }
    .fans_box .page_box .page_item{
        display: inline-block;
        padding: 3px 10px;
        font-size: 14px;
        background-color: #202020;
        border-radius: 5px;
        cursor: pointer;
        color: #999;
    }
    .fans_box .page_box .page_item.active{
        background-color: #121212;
    }
    .fans_box .page_box .page_item.forb{
        background-color: #121212;
        cursor:not-allowed;
    }
    .fans_box .hint_info{
        margin-top: 55px;
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: #888;
    }

</style>

