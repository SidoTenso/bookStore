<template>
    <div class="con_box">
        <div class="left_nav">
            <div class="overbox">
                <div @click="showtypeChange('all')" :class="'nav_item '+ (showtype == 'all' ?'active':'')">全部</div>
                <div v-for="(value,key,index) in attrType" @click="showtypeChange(key)" :class="'nav_item '+ (showtype == key ?'active':'')" :key="'navitem'+index">{{value}}</div>
            </div>
        </div>
        <div class="right_cont">

            <div class="rt_nav sort_tit">
                <div class="sort_item">
                    <span :class="{active: sort_type == 'popular'}" @click="sortPhotos(1)">流行</span>
                </div>
                <div class="sort_item">
                    <span :class="{active: sort_type == 'lasted'}" @click="sortPhotos(2)">最新</span>
                </div>
                <div class="sort_item">
                    <span :class="{active: sort_type == 'awarded'}" @click="sortPhotos(3)">热议</span>
                </div>
            </div>
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
      showtype: "all",
      sort_type: "popular",
      attrType,
      tempPhotos: [],
      photos: [],
      page: 0,
      pageSize: 15
    };
  },
  created() {
    this.init();
  },
  computed: {
    chunkFansArr() {
      let tempPhotos = []
      if (this.showtype == "all") {
        tempPhotos = this.photos;
      } else {
        tempPhotos = this.photos.filter(item => {
          return item.attr == this.showtype;
        });
      }
      return this.tools.chunkArr(tempPhotos, this.pageSize);
    }
  },
  watch: {
    // showtype() {
    //   if (this.showtype == "all") {
    //     this.tempPhotos = this.photos;
    //   } else {
    //     this.tempPhotos = this.photos.filter(item => {
    //       return item.attr == this.showtype;
    //     });
    //   }
    // }
  },
  methods: {
    init() {
      this.getPhotos();
    },
    getPhotos() {
      this.fetch()
        .post(this.urls.getPhotos)
        .then(res => {
          console.log(res);
          this.photos = res.data.data;
          this.sortPhotos(1);
        //   this.tempPhotos = this.photos;
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
    gotoPage(value){
        switch (value) {
            case 'next':
                if(this.page+1 < this.chunkFansArr.length){
                    this.page++
                }
                break;
            case 'prev':
                if(this.page > 0){
                    this.page--
                }
                break;
        
            default:
                this.page = value;
                break;
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
.left_nav .nav_item.active {
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
</style>
