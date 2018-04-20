<template>
  <div class="cont">
      <div class="l_cont">
          <template v-for="(magazine,index) in magazines">
            <div :key="'magazine'+ index" :class="'mag_item '+(index== 0? 'bb': '' )">
                <div class="imgbox">
                    <img :src="magazine.img" alt="">

                </div>
                <a :href="magazine.link" target="_blank">
                    <div class="tit">{{magazine.title}}</div>
                </a>
            </div>
            <div class="clear" v-if="index%2 == 0" :key="'clear'+index"></div>
          </template>
      </div>
      <div class="r_cont">
          <div class="tit">
            <a href="/magin" style="">杂志</a>
          </div>
          <div class="desc">
              随时更新最好的策划图片，访谈，教程，新闻和摄影趋势，让您的摄影能力愈发精进
          </div>
          <div class="recom">
              <div class="ltit">本月推荐</div>
              <div class="forun">
                  <a href="https://1x.com/blog/permalink/8366" target="_blank">
                    <div class="forunitem">
                       1. 弗登：一周的摄影师
                    </div>
                  </a>
                  <a href="https://1x.com/blog/permalink/8370" target="_blank">
                    <div class="forunitem">
                       2. 四月份专家眼睛评论论坛：...
                    </div>
                  </a>
                  <a href="https://1x.com/blog/permalink/8365" target="_blank">
                    <div class="forunitem">
                       3. 耶尔Feldstedt：揭示镜头宝贝...
                    </div>
                  </a>
                  <a href="https://1x.com/blog/permalink/8371" target="_blank">
                    <div class="forunitem">
                       4. 摄影师在联合国N展出...
                    </div>
                  </a>
                  <a href="https://1x.com/blog/permalink/8363" target="_blank">
                    <div class="forunitem">
                       5. 使用Lensbaby镜头转换W ...
                    </div>
                  </a>
              </div>
          </div>
          <div class="recom">
              <div class="ltit">本月潮流</div>
              <div class="forun">
                  <a href="https://1x.com/blog/permalink/8382" target="_blank">
                    <div class="forunitem">
                      1. Inge Schuster：本周的摄影师
                    </div>
                  </a>
                  <a href="https://1x.com/blog/permalink/8386" target="_blank">
                    <div class="forunitem">
                        2. Andre Struik：黑白建筑和...
                    </div>
                  </a>
                  <a href="https://1x.com/blog/permalink/8364" target="_blank">
                    <div class="forunitem">
                        3. Lensbaby故事：评论
                    </div>
                  </a>
                  <a href="https://1x.com/blog/permalink/8381" target="_blank">
                    <div class="forunitem">
                        4. Eddy van Gestel：着名的比利时人...
                    </div>
                  </a>
                  <a href="https://1x.com/blog/permalink/8368" target="_blank">
                    <div class="forunitem">
                        5.没有时间没有命运：穿越北麓...
                    </div>
                  </a>

              </div>
          </div>
          
              
      </div>
      <div class="clear"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            magazines: []
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.getmagazine();
        },
        getmagazine(){
            this.fetch().post(this.urls.getmagazines).then(res=>{
                console.log(res)
                if(res.data.status == 1){
                    this.magazines = res.data.data
                }
            })
        }
    }
}
</script>

<style scoped>
    .cont{
        width: 1200px;
        margin: 20px auto 0;
        color: white;
    }
    .cont .l_cont{
        float: left;
        box-sizing: border-box;
        width: 830px;
        border-right: 1px solid #333;
    }
    .cont .l_cont .mag_item{
        float: left;
        box-sizing: border-box;
        width: 350px;
        min-height: 370px;
        max-height: 390px;
        margin-right: 64px;
        font-size: 27px;
        line-height: 33px;
    }
    .cont .l_cont .mag_item a{
        text-decoration: none;
        color: #fff;
    }
    .cont .l_cont .mag_item.bb{
        width: 765px;
        min-height: 560px;
        font-size: 40px;
        line-height: 40px;
        max-height:inherit;
    }
    .cont .l_cont .mag_item .imgbox{
        margin: 25px 0;
        max-height: 250px;
        overflow: hidden;
    }
    .cont .l_cont .mag_item.bb .imgbox{
        max-height: 450px;
        overflow: hidden;
    }
    .cont .l_cont .mag_item .imgbox img{
        width: 350px;
    }
    .cont .l_cont .mag_item.bb .imgbox img{
        width: 765px;
    }
    .cont .l_cont .mag_item .tit{
        margin-bottom: 25px;
    }
    .cont .r_cont{
        float: left;
        box-sizing: border-box;
        width: 370px;
        padding-left: 20px;
    }
    .cont .r_cont a{
        text-decoration: none;
        color: white;
    }
    .cont .r_cont .tit{
        font-size: 40px;
    }
    .cont .r_cont .desc{
        padding: 15px 0px 0px 0px;
        height: 85px;
        font-size: 19px;
        line-height: 25px;
        color: #ddd;
    }
    .cont .r_cont .recom{
        padding-top: 10px;
        
    }
    .cont .r_cont .recom .ltit{
        font-size: 24px;
        margin: 10px 0px 15px 0px;
    }
    .cont .r_cont .recom .forunitem{
        font-size: 16px;
        margin-bottom: 4px;
        color: #aaa;
        line-height: 20px;
    }

    
    
</style>
