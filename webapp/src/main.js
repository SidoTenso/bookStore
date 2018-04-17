// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import myTools from './plugins/myTools'
import { userInfo } from 'os';


FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.use(myTools);

/* eslint-disable no-new */
new Vue({
  router,
  data: {
    isLogined: false,
    userInfo: {},
    attentions: []
  },
  render: h => h(App),
  created(){
    this.bus.$on('login',(status)=>{
      this.isLogined = status
    })
    this.bus.$on('setUserInfo',(userInfo)=>{
      this.userInfo = userInfo;
      this.getAttentions();
    })
    this.bus.$on('getAttentions',()=>{
      this.getAttentions();
    })
    
  },
  methods:{
    getAttentions(){
      this.fetch().post(this.urls.getAttentions,{
        userId: this.userInfo._id
      }).then(res=>{
        console.log(res)
        this.attentions = res.data.data
      })
    }
  }
}).$mount('#app-box')
