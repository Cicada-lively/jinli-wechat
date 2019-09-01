import request from '@/utils/request'
// 通过code登陆
export function getCode(code) {
  return request({
    url: '/api/users/login-by-code',
    method: 'post',
    data: {
        code
    }
  })
}
// 获取用户信息  
export function getUserInfo(token) {
    return request({
      url: '/api/users/info',
      method: 'get',
      headers: {
        'Authorization': 'Bearer '+token
      }
    })
  }


export function getAuthUrl(path) {
  return request({
    url: '/api/users/auth-url',
    method: 'get',
    params: {
      redirect_uri: path
    }
  })
}
// 招采列表
  export function getPurchases(keyword,page) {
    return request({
      url: '/api/purchases',
      method: 'get',
      params: {
        keyword,
        page
      }
    })
  }
  // 招采详情
  export function getPurchasesArticle(id) {
    return request({
      url: '/api/purchases/'+id,
      method: 'get',
    })
  }

  // 推广页数据
  export function getOverview() {
    return request({
      url: '/api/purchases/overview',
      method: 'get',
    })
  }
  
// 关于我们
  export function getAboutUs() {
    return request({
      url: '/api/articles/key/about-us',
      method: 'get',
    })
  }
// 服务协议
  export function getAgreement() {
    return request({
      url: '/api/articles/key/service-agreement',
      method: 'get',
    })
  }
  // 获取帮助列表
  export function helpList(page) {
    return request({
      url: '/api/articles',
      method: 'get',
      params:{
        page
      }
    })
  }
// 通过id获取帮助内容
  export function helpDetail(id) {
    return request({
      url: '/api/articles/'+id,
      method: 'get',
    })
  }
// 取行业、地区、类型设置
  export function getOption() {
    return request({
      url: '/api/subscribes/option',
      method: 'get',
    })
  }
//更新用户资料
export function setUserInfo(userInfo) {
  return request({
    url: '/api/users/update',
    method: 'patch',
    data: userInfo
  })
}
//获取订阅设置列表
export function subscribesList(token) {
  return request({
    url: '/api/subscribes',
    method: 'get',
    headers: {
      'Authorization': 'Bearer '+token
    }
  })
}
//订阅设置更新
export function subscribesUpdate(token,id,info) {
  return request({
    url: '/api/subscribes/'+id,
    method: 'patch',
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer '+token
    },
    data: info
  })
}
// 订阅设置新增
export function subscribesAdd(token,info) {
  return request({
    url: '/api/subscribes',
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer '+token
    },
    data: info
  })
}
// 订阅设置删除
export function subscribesDelete(token,id) {
  return request({
    url: '/api/subscribes/'+id,
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer '+token
    }
  })
}
