<!-- 我的页面 -->
<template>
  <div>
    <div class="my-info">
      <div class="info-wrap">
        <div class="info-top">
          <div>
            <div class="avatar">
              <img :src="user.avatar" alt="">
            </div>
            <div class="name">{{user.nickname}}</div>
          </div>
          <div class="setting" @click="setFn">
            <i class="iconfont icon-setting"></i><br/>
            设置
          </div>
        </div>
          
        <div class="info-bottom">
          <div class="info-list" @click="validHomeFn()">
            <span>{{user.valid_count}}</span>
            <p>当前有效信息</p>
          </div>
          <div class="info-list" @click="historyFn()">
            <span>{{user.history_count}}</span>
            <p>历史信息</p>
          </div>
        </div>
      </div>

      <div class="vip_wrap">
          <div class="vip_img">
            <i class="iconfont icon-VIP"></i>
            <div class="">
              <h5>VIP会员</h5>
              <p>将于 <span style="color: red;">{{user.vip_end_date}}</span> 到期</p>
            </div>
          </div>
          <div class="charge-btn" @click="goBookCharge">
            立即续费
          </div>
      </div>

      <div class="mine-list">
        <ul >
          <li></li>
          <li @click="bookLink">
            <div class="left">
              <i class="iconfont icon-dingyue"></i>
              <span>招采订阅</span>
            </div>
            <div class="right">
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </li>
          <!-- <li>
            <div class="left">
              <i class="iconfont icon-paper-plane"></i>
              <span>推送设置</span>
            </div>
            <div class="right">
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </li> -->
         
        </ul>
        <ul>
          <li @click="helpLink">
            <div class="left">
              <i class="iconfont icon-help"></i>
              <span>帮助中心</span>
            </div>
            <div class="right">
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </li>
          <li @click="aboutLink">
            <div class="left">
              <i class="iconfont icon-users"></i>
              <span>关于我们</span>
            </div>
            <div class="right">
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </li>
          <li @click="contactLink">
            <div class="left">
              <i class="iconfont icon-phone"></i>
              <span>联系客服</span>
            </div>
            <div class="right">
              0755-26657536
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserInfo} from '@/api/api.js'
import { getToken } from '@/utils/auth'
export default {
  data () {
    return {
      user: {}
    };
  },
  created() {
    this.getUserInfoFn()
  },

  methods: {
    setFn(){
      this.$router.push('/mine/setInfo')
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
    validHomeFn(){
       this.$router.push('/page/index')
    },
    bookLink(){
      this.$router.push('/book/myBookSetting')
    },
    helpLink(){
      this.$router.push('/mine/help')
    },
    aboutLink(){
      this.$router.push('/mine/aboutUs')
    },
    contactLink(){
      this.$router.push()
    },
    historyFn(){
      this.$router.push('/book/historyList')
    },
    goBookCharge(){
      this.$router.push("/book/setInfoList")
    }
  }
}

</script>
<style lang='less' scoped>
.info-wrap{
  width: 100%;padding: 30px; padding-bottom: 50px;
  background-color: #66b0fd;
  box-sizing: border-box; 
  .info-top{
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    .avatar{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #fff;
      display: inline-block;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .name{
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      display: inline-block;
      line-height: 50px;
      margin-left: 20px;
      vertical-align: top;
    }
    .setting{
      width: 40px;
      height: 30px;
      text-align: center;
      color: #fff;
      i{
        font-size: 25px;
      }
    }
  }
  .info-bottom{
    display: flex;
    margin-top: 20px;
    .info-list{
      width: 50%;
      color: #fff;
      text-align: center;
      font-size: 15px;
      &:first-child{
        border-right: 1px solid #fff;
      }
      span{
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
      }

    }
  }
}
.vip_wrap{
  width: 94%;
  padding: 10px 10px;
  position: absolute;
  top: 170px;
  background: #fff;
  box-shadow: 0 10px 10px rgba(156, 156, 156, 0.1);
  display: flex;
  border-radius: 4px;
  left: 3%;
  justify-content: space-between;
  .vip_img{
    display: flex;
    i{
      font-size: 40px;
      display: inline-block;
    }
    div{
      margin-left: 6px;
      h5{
        margin-top: 3px;
      }
      p{
        margin-top: 5px;
      }
    }
  }
  .charge-btn{
    padding: 0 18px;
    background: rgba(139, 195, 74, 1);
    border-radius: 15px;
    height: 32px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    margin-top: 5px;
  }
  
}
.mine-list{
  ul{
    margin-top: 10px;
    background-color: #fff;
    box-shadow: 0 10px 10px rgba(156, 156, 156, 0.1);
    li{
      padding: 0 15px;
      border-bottom: 1px solid #f6f6f6;
      height: 46px;
      line-height: 46px;
      display: flex;
      justify-content: space-between;
      .left{
        i{
          font-size: 20px;
          color: #66b0fd;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .right{
        color: #666;
      }
    }
  }
}

</style>