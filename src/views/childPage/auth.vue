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
        user: {}
      }
    },
    // created(){
    //   this.redirectToAuthPageUrl()
    // },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        let fromPath = from.path;
        if(from.path == "/auth" ){
          fromPath = '/'
        }
        if(sessionStorage.getItem("tryButton") ){
          fromPath = '/book/myBookSetting'
        }
        vm.redirectToAuthPageUrl(fromPath)
      })
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
      getUserInfoFn(){
       var user = sessionStorage.getItem("userInfo")
        if(user){
          this.user = JSON.parse(user)
        } else {
          getUserInfo(getToken()).then(res=>{
            this.user = res
            sessionStorage.setItem("userInfo", JSON.stringify(res))
          })
        }
      },
      redirectToAuthPageUrl(path){
        let authUrl;
        const queryParams =  this.extractQueryParams(window.location.href)
        let code = queryParams.code;
        let token;
       
        if(!getToken()){
          if(!code){
            getAuthUrl("http://purchase.pqtech.com.cn/wechat").then(res=>{
              authUrl=res.auth_url
              window.location.href = authUrl
            })
          } else{
            getCode(code).then(response=>{
              token = response.token
              setToken(token)
              this.getUserInfoFn();
              window.location.href="http://purchase.pqtech.com.cn/wechat/#/auth"
            })
          }
        } else {
          if(path == '/book/myBookSetting'){
            var user = sessionStorage.getItem("userInfo")
              if(user){
                var userInfo = JSON.parse(user)
                var role = userInfo.vip_type
                if(role != 'Trial'){
                  path = "/page/index"
                }
              }
          }
          window.location.href="http://purchase.pqtech.com.cn/wechat/#"+path
          
        }
        
      },
    }
  }
</script>

<style lang="less">

</style>
