import fetch from '../common/fetch'

module.exports = {
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
               document.cookie = name + "=" + encodeURI(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
              },
            
            
        }
        Vue.prototype.fetch = fetch




    }
}