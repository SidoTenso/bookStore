import Axios from "axios";

const urlencoded = Axios.create({
    timeout: 7000, // 请求的超时时间
    // 设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    // 不设置这个服务器不能写cookie到浏览器，并且服务器要设置Access-Control-Allow-Credentials:true
    // Access-Control-Allow-Origin不可以为 '*'，因为 '*' 会和 Access-Control-Allow-Credentials:true 冲突，需配置指定的地址
    withCredentials: true, // 允许携带cookie 
    credentials : 'include',
    transformRequest: [
        function (data) {
            let ret = "";
            for (let it in data) {
                ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
            }
            return ret;
        }
    ]
})

// request拦截器
urlencoded.interceptors.request.use(
    config => {
      // 发送请求之前，要做的业务
      return config
    },
    error => {
      // 错误处理代码
      
      return Promise.reject(error)
    }
  )
  
  // response拦截器
  urlencoded.interceptors.response.use(
    response => {
      // 数据响应之后，要做的业务
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

const formData = Axios.create({
  timeout: 12000,
  withCredentials: true, // 允许携带cookie 
  credentials : 'include',
  headers: {
    "Content-Type": "multipart/form-data"
  }
})
  
  export {
    urlencoded,
    formData
  }
