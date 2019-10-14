import router from './router'
import { getToken, setToken } from '@/utils/auth'
import { getUserInfo, rechargesTrial} from '@/api/api.js'


let role;
// 	
const isWechat = () => {
	let ua = window.navigator.userAgent.toLowerCase();
	return ua.match(/MicroMessenger/i) == 'micromessenger';
}

router.beforeEach((to, from, next) => {
	const token = getToken()
	let user = sessionStorage.getItem("userInfo");
	// if(isWechat){
	// 	setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wdXJjaGFzZS5wcXRlY2guY29tLmNuXC93ZWNoYXRcL2FwaVwvdXNlcnNcL2xvZ2luLWJ5LWNvZGUiLCJpYXQiOjE1NjgyMTE0NDYsImV4cCI6MTU4Mzc2MzQ0NiwibmJmIjoxNTY4MjExNDQ2LCJqdGkiOiIwMUVKRWJVYzh0bDRGNzd1Iiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.BbVQ86-ve72coj11V0qyms0OFkxQhx86mTkzvKi9ueg")	
	// }
	if (to.meta.title) {
		document.title = to.meta.title
	}
	if(to.path == "/auth"){
		next()
	} else {
		if(token){
			if(user){
				role = JSON.parse(user).vip_type;
				if(role == "Vip" || role == 'Trial'){
					if(to.path == "/page/index"){
						sessionStorage.setItem("activeIndex",0)
						next()
					} else if(to.path == "/page/search"){
						sessionStorage.setItem("activeIndex",1)
						next()
					} else if(to.path == "/page/mine"){
						sessionStorage.setItem("activeIndex",2)
						next()
					}else if(to.path == "/extendPage") {
						next("/page/index")
					 } else {
						 next()
					 }
				} else if(role == "Expire"){
					if (to.path == "/extendPage") { 
						next()
					} else if(to.path == "/book/myChargeFee"){  
						next()
					} else if(to.path == "/page/index"){
						alert(1)
						next('/extendPage')
					} else {
						next('/extendPage')
					}
				} else {
					if (to.path == "/extendPage") { 
						next()
					} else if(to.path == "/book/myBookSetting"){
						if(from.path == "/extendPage"){
							rechargesTrial(getToken()).then(res=>{
								sessionStorage.setItem("userInfo", JSON.stringify(res))
							})
						}
					} else {
						next('/extendPage')
					}
				}
			}else {
				getUserInfo(token).then(res=>{
					user = res
					sessionStorage.setItem("userInfo", JSON.stringify(res))
				})
				if(to.path == "/extendPage") {
					next()
				 } else {
					 next()
				 }
			}
		} else {
			if( to.path == "/extendPage") {
				next()
			 } else if(to.path == "/book/myBookSetting"){  
				 next('/auth')
			 } else if(to.path == "/page/index"){
				 if(window.location.href.indexOf('?code') == -1){
					next('/extendPage')
				 } else {
					next('/auth')
				 }
			 }
			  else {
				 next('/auth')
			 }
		}
	}

  })

router.afterEach(() => {
    
})
