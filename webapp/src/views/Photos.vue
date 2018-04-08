<template>
  <div class="content">
      <!-- 照片 -->
      <div class="photos_box">

      </div>

      <!-- 评论 -->
      <div class="comments">

      </div>
      <!-- 底部栏 -->
      <div class="bottom_bar">

      </div>
      
      
  </div>
</template>
<script>
</script>
<style scoped>
    .content{
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        padding-bottom: 50px;
    }
    .photos_box{
        float: left;
        width: calc(100% - 500px);
        height: 100%;
    }
    .comments{
        float: left;
        width: 500px;
        height: 100%;
        background: linear-gradient(to bottom, rgba(15,15,15,1) 0%,rgba(1,1,1,1) 100%);
    }
    .bottom_bar{
        position: fixed;
        bottom: 0;
        height: 50px;
        width: 100%;
        background: linear-gradient(to bottom, rgba(33,33,33,1) 0%,rgba(15,15,15,1) 100%);
        overflow: hidden;
    }
</style>

