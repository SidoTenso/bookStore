<template>
    <div class="comment_item" :key="comment._id">
        <div>
            <div class="commenter_img">
                <img src="../../static/image/svg/account.svg" alt="">
            </div>
            <div class="comment_info">
                <p class="username">{{comment.user && comment.user.userName}}</p>
                <p class="comment_cont">
                    {{comment.content}}
                    <span class="recomment" @click="showInput(comment.user.id)">回复</span>
                </p>
            </div>
        </div>
        <div class="clear"></div>
        <div class="recom_box">
            <div v-for="(recom,index) in comment.comments" :key="'recom'+index" class="recom_item"> 
                <div class="commenter_img">
                    <img src="../../static/image/svg/account.svg" alt="">
                </div>
                <div class="comment_info">
                    <p class="username">{{recom.owner_user_id && recom.owner_user_id.userName}}</p>
                    <p class="comment_cont">
                        {{recom.content}}
                        <span class="recomment" @click="showInput()">回复</span>
                    </p>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="clear"></div>
        <div v-if="isShowInput" class="input_box">
            <div class="input">
                <input v-model="comentCont" type="text" placeholder="在此回复对方">
            </div>
            <div class="recomment_btn" @click="recoment">发表</div>
        </div>
    </div>
</template>
<script>
export default {
    props:['comment'],
    data(){
        return {
            isShowInput:false,
            target_user: '',
            comentCont: ''
        }
    },
    methods: {
        showInput(id){
            this.isShowInput = true;
            this.target_user = id;
        },
        recoment(){
            if(!this.cookies.getCookie('userId')){
                alert('请先登录')
                return
            }
            this.isShowInput = false;
            this.fetch().post(this.urls.recoment,{
                target_id: this.target_user,
                comwallId: this.comment.comwallId,
                content: this.comentCont
            }).then(res=>{
                console.log(res)
                
            })
        }
    }
}
</script>
<style scoped>
    .comments .comment_item{
        position: relative;
        margin-bottom: 15px;
    }
    .comment_item .commenter_img {
        float: left;
        width: 30px;
        height: 30px;
        margin-right: 13px;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .comment_item .comment_info{
        float: left;
        width: calc(100% - 43px);
        color: #888;
    }
    .comment_item .comment_info p{
        position: relative;
        font-size: 14px;
        line-height: 18px;
    }
    .comment_item .comment_info p .recomment{
        display: none;
        position: absolute;
        color: #3385ff;
        font-size: 14px;
        right: 20px;
        bottom: 2px;
        cursor: pointer;

    }
    .comment_item .comment_info:hover p.comment_cont .recomment{
        display: block;
    }
    .input input{
        box-sizing: border-box;
        width: 360px;
        margin-top: 10px;
        padding: 8px 15px;
        border-radius: 5px;
        border: none;
        outline: none;
        color: #aaa;
        background: rgb(21, 21, 21);
    }
    .recomment_btn{
        display: inline-block;
        font-size: 14px;
        background-color: rgb(18, 18, 18);
        margin-top: 10px;
        color: #999;
        padding: 4px 12px;
        border-radius: 5px;
    }
    .recom_box{
        box-sizing: border-box;
        padding-left: 30px;
        margin-top: 10px;
    }
</style>


