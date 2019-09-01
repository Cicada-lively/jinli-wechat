
import router from './router'
import { getToken, setToken } from '@/utils/auth'

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }
	const token = getToken() 
	const isWechat = () => {
		let ua = window.navigator.userAgent.toLowerCase();
		return ua.match(/MicroMessenger/i) == 'micromessenger';
	  }
	  // const openid = localStorage.getItem('openid')  
	  if(isWechat()){
		if (!token) {
			if (to.path === '/auth' || to.path == "/extendPage") { 
				next()
			} else {  
			// localStorage.setItem('now_url',to.fullPath) //当前页url与参数放入缓存
			next('/auth')
			} 
		} else { 
			if(to.path == "/page/index"){
				sessionStorage.setItem("activeIndex",0)
			  // this.selectIndex = 0;
			} else if(to.path == "/page/search"){
			  sessionStorage.setItem("activeIndex",1)
			  // this.selectIndex = 1;
			} else if(to.path == "/page/mine"){
			  sessionStorage.setItem("activeIndex",2)
			  // this.selectIndex = 2;
			}
			next()
		}
	  } else {
		  setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wdXJjaGFzZS5wcXRlY2guY29tLmNuXC93ZWNoYXRcL2FwaVwvdXNlcnNcL2xvZ2luLWJ5LWNvZGUiLCJpYXQiOjE1NjY4MjU3NTEsImV4cCI6MTU4MjM3Nzc1MSwibmJmIjoxNTY2ODI1NzUxLCJqdGkiOiJDd2RzSFhUSXJ2U3NsaDYwIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.WMUNl7UiSlaJw4-QdY2liY_AuEasvNryjCL8Zm11uJM");
		if(to.path == "/page/index"){
			sessionStorage.setItem("activeIndex",0)
		} else if(to.path == "/page/search"){
		  sessionStorage.setItem("activeIndex",1)
		} else if(to.path == "/page/mine"){
		  sessionStorage.setItem("activeIndex",2)
		}
		next()
	  }
		

  })

router.afterEach(() => {
    
})
