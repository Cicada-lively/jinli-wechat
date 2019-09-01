<template>
<div>
  
</div>
</template>

<script>

  import { getAuthUrl, getCode, getUserInfo} from '@/api/api.js'
  import { getToken, setToken } from '@/utils/auth'
  export default {
    name: 'auth',
    data () {
      return {
        
      }
    },
    created(){
      this.getAuthCode()
    },
    methods: {
      extractQueryParams(url) {
        let queryParams = {}
        if (url.includes('?')) {
          let queryString = url.substr(url.indexOf('?') + 1)
          let pairs = queryString.split('&')
          for(let pair of pairs) {
            let splitArray = pair.split('=')
            let key = splitArray[0]
            let value = splitArray[1]
            if (value.indexOf('#') > -1) {
              value = value.substring(0, value.indexOf('#'))
            }
            queryParams[key] = value
          }
        }
        return queryParams
      },
      getAuthCode(){
        this.redirectToAuthPageUrl()
      },
      redirectToAuthPageUrl(){
        let authUrl;
        const queryParams =  this.extractQueryParams(window.location.href)
        let code = queryParams.code;
        let token;
        if(!getToken()){
          if(!code){
            getAuthUrl("http://purchase.pqtech.com.cn/wechat").then(res=>{
              console.log(res)
              authUrl=res.auth_url
              window.location.href = authUrl
            })
          } else{
            getCode(code).then(response=>{
              token = response.token
              setToken(token)
              window.location.href="http://purchase.pqtech.com.cn/wechat"
            })
          }
        } else {
          window.location.href="http://purchase.pqtech.com.cn/wechat"
        }
        
      },
    }
  }
</script>

<style lang="less">

</style>
