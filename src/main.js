// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import  './assets/iconfont/iconfont.css'
import  './assets/index.css'
import  './permission'

FastClick.attach(document.body)
Vue.config.productionTip = false

import { List,Tabbar, TabbarItem, PullRefresh, RadioGroup, Radio ,Row, Col,Swipe, SwipeItem, Search , Cell, CellGroup, Field, Icon,Button,Toast } from 'vant';

Vue.use(List).use(Tabbar).use(TabbarItem).use(PullRefresh).use(RadioGroup).use(Radio).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Search).use(Cell).use(CellGroup).use(Field).use(Icon).use(Button).use(Toast);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
