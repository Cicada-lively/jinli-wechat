
import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);

var baseUrl = process.env.NODE_ENV === 'production' ? '/wechat' : ''

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // console.log(config)
    // if (true) {
    //   config.headers['Authorization'] = getToken()
    // }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
      if(response.status == '200') {
        return response.data;
      } else if (response.status == '401'){
        Toast('未认证请求');
      } else {
       Toast(response.message);
      }
  },
  error => {
    Toast(error.message);
    return Promise.reject(error)
  }
)

export default service
