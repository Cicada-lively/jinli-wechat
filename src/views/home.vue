<!--  -->
<template>
  <div>
    <router-view />
    <van-tabbar v-model="selectIndex" >
      <van-tabbar-item v-for="(item) in tabbarArr" :key="item.id" replace  :to="item.href" >
        <span >{{item.label}}</span>
        <span slot="icon" class ="iconfont" :class="item.className"></span>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>

export default {
  data () {
    return {
      tabbarArr: [{id:'01', label: "首页", className: "icon-home", href: '/page/index'},
          {id:'02', label: "搜索", className: "icon-search", href: '/page/search'},
          {id:'03', label: "我的", className: "icon-user", href: '/page/mine'}],
      selectIndex: 0
    };
  },
  created() {
    this.tabActiveFn();
  },
  computed:{
    
  },
  methods: {
    tabActiveFn(){
      // if(sessionStorage.getItem("activeIndex")){
      //   this.selectIndex = sessionStorage.getItem("activeIndex")
      // }else{
      //    this.selectIndex = 0;
      // }
      let path = this.$route.path;
      if(path == "/page/index"){
        this.selectIndex = 0;
      } else if(path == "/page/search"){
        this.selectIndex = 1;
      } else if(path == "/page/mine"){
        this.selectIndex = 2;
      }
    },
    tabbarFn(index){
      console.log(index)
    }
  }
}

</script>
<style lang='less'>
.pannel{
  position: relative;
  padding: 8px 0 4px;
  overflow: hidden;
  margin-top: 10px;
  background-color: #fff;
  .title{
    padding: 0 20px;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  .key-tag-group{
    padding: 0 20px;
  }
  .time{
    padding: 0 20px;
    color: #909399;
    font-size: 13px;
    line-height: 1.5;
    i{
      display: inline-block;
      vertical-align: middle;
    }
  }
  .mark{
    position: absolute;
    right:-20px;
    bottom: -50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #d7d7d8;
    background-color: #fff;
    .mark-end-bg{
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background-color: #d7d7d8;
      color: #fff;
      // text-align: center;
      font-size: 16px;
      line-height: 60px;
      margin: 5px;
    }
    .mark-bg{
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background-color: rgb(184, 231, 160);
      color: #fff;
      // text-align: center;
      font-size: 16px;
      line-height: 60px;
      margin: 5px;
    }
  }
}
.pannel:after, .pannel:before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    color: #d9d9d9;
}
.pannel:after{
  bottom: 0;
  border-bottom: 1px solid #d9d9d9;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}
.pannel:before{
  top: 0;
  border-top: 1px solid #d9d9d9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}
.key-tag{
  display: inline-block;
  padding: 0 8px;
  height: 20px;
  line-height: 18px;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 6px;
  margin-right: 8px;
  font-size: 12px;
}
.key-tag.primary{
  border-color: #409EFF;
  color: #409EFF;
}
.key-tag.success{
  border-color: #67C23A;
  color: #67C23A;
}
.key-tag.warning{
  border-color: #E6A23C;
  color: #E6A23C;
}
.key-tag.danger{
  border-color: #F56C6C;
  color: #F56C6C;
}
.key-tag.info{
  border-color: #909399;
  color: #909399;
}
</style>