import {urlencoded,formData} from '../common/fetch'
import urls from '../common/urls'
import Vue from 'vue'
const bus = new Vue();

export default {
    install: function(Vue,options){

        // 操作cookie
        Vue.prototype.cookies = {

            getCookie(name){
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                    if (arr = document.cookie.match(reg)){
                    return decodeURI(arr[2]);
                }else{
                return false
                }
            },

            setCookie(name, value, expiredays){
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
               document.cookie = name + "=" + encodeURI(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
              },
            clearCookie(name){
                var exdate = new Date();
                exdate.setDate(exdate.getDate() - 1);
                var cval=this.getCookie(name);
                if(cval!=null)
                document.cookie= name + "="+cval+";expires="+exdate.toUTCString();
            }
            
        }
        Vue.prototype.fetch = function(contentType){
            switch(contentType){
                case 'formData':
                    return formData
                default: 
                    return urlencoded
            }
        }
        // 所有的url
        Vue.prototype.urls = urls,

        // 中间件传递
        Vue.prototype.bus = bus;

        // 常用函数
        Vue.prototype.tools={
            chunkArr(arr,size){
                let length = Math.ceil(arr.length / size);
                return Array.from({length}).map((item,index)=>{
                    return arr.slice(index*size,(index+1)*size)
                })

            }
        }


    }
}