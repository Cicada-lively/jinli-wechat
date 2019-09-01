import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/page/index',
    },
    { path: "/extendPage",
      name: "extendPage",
      component: () =>
      import("@/views/extendPage"),
      meta: {title: "推广页"}
    },
    {
      path: "/page",
      name: "page",
      component: () =>
        import("@/views/home"),
        children: [
          { path: "index",
            component: () =>
            import("@/views/index"),
            meta: {title: "招采列表"}
          },
          { path: "search",
            component: () =>
            import("@/views/search"),
            meta: {title: "搜索"}
          },
          { path: "mine",
            component: () =>
            import("@/views/mine"),
            meta: {title: "我的"}
          },
        ]
    },
    { path: "/mine/aboutUs",
    name: "aboutUs",
    component: () =>
    import("@/views/childPage/aboutUs"),
    meta: {title: "关于我们"}
    },
    { path: "/mine/help",
    name: "help",
    component: () =>
    import("@/views/childPage/help"),
    meta: {title: "帮助中心"}
    },
    { path: "/mine/setInfo",
    name: "setInfo",
    component: () =>
    import("@/views/childPage/setInfo"),
    meta: {title: "个人资料"}
    },
    {
      path: "/help/detail/:id",
      name: "helpDetail",
      component: () =>
        import("@/views/childPage/helpDetail"),
        meta: {title: "帮助中心"}
    },
    { path: "/agreement",
    name: "agreement",
    component: () =>
    import("@/views/childPage/agreement"),
    meta: {title: "服务协议"}
    },
    {
      path: "/purchasesDetail/:id",
      name: "purchasesDetail",
      component: () =>
        import("@/views/childPage/purchasesDetail"),
        meta: {title: "招采详情"}
    },
    { path: "/mine/book/:type",
    name: "book",
    component: () =>
    import("@/views/childPage/bookSetting"),
    meta: {title: "订阅设置"}
    },
    { path: "/book/myBookSetting",
    name: "myBookSetting",
    component: () =>
    import("@/views/childPage/myBookSetting"),
    meta: {title: "招采订阅"}
    },
    { path: "/book/setInfoList",
    name: "setInfoList",
    component: () =>
    import("@/views/childPage/setInfoList"),
    meta: {title: "招采订阅"}
    },
    // { path: "/book/bookAddKeywords/:type",
    // name: "bookKeywords",
    // component: () =>
    // import("@/views/childPage/bookAddKeywords"),
    // meta: {title: "招采订阅"}
    // },
    { path: "/auth",
    name: "auth",
    component: () =>
    import("@/views/childPage/auth"),
    meta: {title: "鉴权"}
    },

    
  ]
})
