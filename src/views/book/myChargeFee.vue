<!--  -->
<template>
  <div class="infoList">
    <!-- <van-row type="flex" justify="space-between" style="padding: 10px;">
      <p>确认订阅信息</p>
      <van-button plain hairline type="info" size="small"  style="margin-right: 10px;" @click="returnHandle()">返回</van-button>
    </van-row> -->
    <div class="vip_wrap">
        <div class="vip_img">
          <i class="iconfont icon-VIP"></i>
          <div class="">
            <h5>VIP会员</h5>
            <p> <span v-if="dateFlag">已于</span> <span v-else>将于</span>  <span style="color: red;">{{user.vip_end_date}}</span> 到期</p>
          </div>
        </div>
        <div class="charge-btn" @click="editBookSetting">
          修改订阅设置
        </div>
    </div>
    <ul class="list" v-if="subList.length != 0">
      <li v-for="(item,index) in subList" :key="index">
        <h5>{{index+1}}.
            <template v-for="sub in item.keywords">
                <span :key="sub.id">
                    {{sub}}
                </span>
            </template>
        </h5>
        <div class="setting-content">
            <p>地区：<template v-if="item.area !== undefined && item.area.length>0" > <span v-for="item1 in item.area" :key="item1.id">&nbsp;{{item1.name}}</span></template> <span v-else>不限</span></p>
            <p>行业：<template v-if="item.industry !== undefined && item.industry.length>0" > <span v-for="sub1 in item.industry" :key="sub1.id">&nbsp;{{sub1.name}}</span></template> <span v-else>不限</span> </p>
            <p>项目类型：<template v-if="item.project !== undefined && item.project.length>0" > <span v-for="line1 in item.project" :key="line1.id">&nbsp;{{line1.name}}</span></template> <span v-else>不限</span></p> 
        </div>
      </li>
    </ul>
    <div style="text-align: center;" v-else>
      暂无数据
    </div>

    <div class="number-wrap">
      <h4>订阅时长（月）</h4>
      <van-stepper v-model="discount_num" min="1" max="12" :disable-input="true" />
    </div>
    <div class="price-wrap">
      <del>¥ {{this.priceObj.original_price * discount_num}}</del>
      <span>¥ {{this.priceObj.discount_price * (discount_num>10? 10: discount_num) }}</span>
    </div>
    
    
    <div style="margin-top: 10px; text-align: center;">
        <van-button type="info" size="small" @click="addBookFn" >立即续费</van-button>
        <p style="text-align: center; padding-bottom: 20px;">有效期至{{lastDate}}</p>
    </div>
    <div class="agreeBox" style="padding-bottom: 20px;">
        <van-checkbox v-model="checked"> <p>阅读并同意 <router-link to="/agreement">《锦鲤招采服务协议》</router-link> </p></van-checkbox>
    </div>
  
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { subscribesList, rechargesPrice, rechargesPrepay, getUserInfo } from '@/api/api.js'
// import wx from 'weixin-js-sdk';
import { Toast } from 'vant';

export default {
  data () {
    return {
     subList: [],
     priceObj: {
       original_price: '',
       discount_price: ''
     },
     checked: true,
     discount_num: 1,
     user:{},
     dateFlag: true,
    };
  },
  created() {
    this.getSubList();
    this.rechargesPriceFn()
    this.getUserInfoFn()
  },
  computed: {
    lastDate: function(){
      let now;
      if(this.dateFlag){
        now = new Date();
      } else {
        now = new Date(+new Date(this.user.vip_end_date.replace(/-/g,'/')) + 24*60*60*1000)
      }
      let year = now.getFullYear() ;
      let month = now.getMonth()+1;
      let day = now.getDate();
      let newMonth;
      // this.discount_num;
      if(month+this.discount_num<10){
        newMonth = '0'+ month+this.discount_num
      }else if(month+this.discount_num>12){
        newMonth = month+this.discount_num -12
        year = year + 1;
        if(newMonth<10){
          newMonth = '0'+newMonth
        } 
      } else {
        newMonth = month+this.discount_num
      }
      var lastdate = new Date((+new Date(year+'/'+ newMonth +'/01 00:00:00'))-60*100)
      let lastyear = lastdate.getFullYear();
      let lastmonth = lastdate.getMonth()+1;
      let lastday = lastdate.getDate();
      return lastyear+'-'+ lastmonth+'-' +lastday
    },
    
  },
  methods: {
    getSubList(){
        subscribesList(getToken()).then( res => {
            this.subList = res.data
        })
    },
    rechargesPriceFn(){
      rechargesPrice(getToken()).then(res => {
        this.priceObj = res;
      })
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
      this.dateFlag = +new Date() > +new Date(this.user.vip_end_date.replace(/-/g,'/')) ? true: false;
    },
    addBookFn(){
      if(this.checked){
        rechargesPrepay(getToken(),this.discount_num).then(res => {
          this.onBridgeReady(res)
        })
      }else {
        Toast('请先了解并选中协议');
      }
    },
    onBridgeReady(args){
       window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId':args.appId,   //公众号名称，由商户传入     
          'timeStamp': args.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          'nonceStr': args.nonceStr, // 支付签名随机串，不长于 32 位
          'package': args.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          'signType': args.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          'paySign': args.paySign, // 支付签名
        },
        function(res){
          console.log(res)
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
          // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            getUserInfo(getToken()).then(res=>{
              this.user = res
              sessionStorage.setItem("userInfo", JSON.stringify(res))
              this.$router.push('/page/index')
            })
          } 
      }); 
    },
    returnHandle(){
      this.$router.go(-1)
    },
    editBookSetting(){
      this.$router.push('/book/myBookSetting')
    }
  }
}

</script>
<style lang='less' scoped>
  
.infoList{
    background-color: #fff;
    .number-wrap{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding: 5px 10px;
      box-shadow: 5px 8px 12px #ebedf0;
      border-top: 1px solid #f6f6f6;
      background-color: #fff;
      height: 55px;
      line-height: 45px;
    }
    .price-wrap{ 
      text-align: center;
      padding: 10px 0;
      margin: 0 auto;
      margin-top: 20px;
     
      del{
        font-size: 14px;
        color: #f55;
        margin-top: 5px;
      }
      span{
        margin-top: 5px;
        font-size: 20px;
        color: #f55;
        font-weight: bold;
      }
      p{
        font-size: 12px;
        margin-top: 4px;
      }
    }
    &>p{
        color: #999;
        font-size: 14px;
        background-color: #fff;
        padding: 10px;
    }
}
.vip_wrap{
  width: 100%;
  padding: 10px 10px;
  top: 170px;
  background: #fff;
  box-shadow: 1px 2px 5px 0px rgba(230, 230, 230, 1);
  display: flex;
  border-radius: 4px;
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
    color:#0B6AD5;
  }
  
}
.list{
  margin-top: 20px;
    li{
        background-color: #f6f6f6;
        margin-bottom: 5px;
        padding: 10px 0;
        h5{
            width: 100%;
            color: #666;
            font-size: 14px;
            // font-weight: normal;
            padding: 5px 15px;
        }
        p{
            font-size: 12px;
            color: #999;
            padding-left: 20px;
        }
    }
}
.setting-content{
  color: #666;
  line-height: 1.6;
  font-size: 12px;
  padding-left: 6px;
  p{
      margin-top: 3px;
  }
}
.agreeBox{
  margin-top: 20px;
  &>div{
    justify-content: center;
  }
  a{
    color: #1989fa
  }
}

</style>
