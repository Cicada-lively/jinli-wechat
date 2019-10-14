<template>
  <div class="extend">
     <div class="echart-wrap" id="echarts" style=" margin: 0 auto; height: 270px; background: #fff;">
    </div>
    <div v-html="content" class="content">
    </div>
    
    <div >
      <h5 style="text-align: center; margin-top: 10px; height: 30px; line-height: 30px;">采购信息预览</h5>
      <van-swipe :height="100" vertical :autoplay="3000" :show-indicators="false" :touchable="true">
        <van-swipe-item v-for="(item,i) in purchasesList" :key="item.id" @click.prevent="detailPageFn(item.id)">
          <div class="pannel"   >
          <p class="title">{{item.title}}</p>
          <div class="key-tag-group">
            <div class="key-tag primary" v-if="purchasesList[i].area_name">{{purchasesList[i].area_name}}</div>
            <div class="key-tag warning" v-if="purchasesList[i].industry_name">{{purchasesList[i].industry_name}}</div>
            <div class="key-tag success" v-if="purchasesList[i].project_name">{{purchasesList[i].project_name}}</div>
          </div>
          <div class="create-time">
            <i class="iconfont icon-time"></i>
            <span>{{purchasesList[i].created_at}}</span>
          </div>
          <div class="dashed-line"></div>
        </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="button-group">
      <button class="introduce" @click="introduceFn">招采介绍</button>
      <button v-if="buttonType" class="dingyue"  @click="dingyueFn">立即试用1</button>
      <button v-if="!buttonType" class="dingyue"  @click="chargeFn">立即续费1</button>
    </div>
    <p v-if="buttonType" style="text-align: center; padding-bottom: 20px;">免费试用有效期至{{lastDate}}</p>
  </div>
</template>

<script>
 var echarts = require('echarts/lib/echarts');
  // 引入折线图
  require('echarts/lib/chart/line');
  // 引入提示框和标题组件
  require('echarts/lib/component/title');
  require('echarts/lib/component/tooltip');
  import { getToken } from '@/utils/auth'
import {getOverview, rechargesTrial } from '@/api/api.js'
export default {
  name: 'extendPage',
  data () {
    return {
      numArr: [0,1,2,3,4,5],
      purchasesList: null,
      content: "",
      total: "",
      i:0,
      echartData: [],
      endDate:'',
      buttonType: true,
      lastDate: ''
    }
  },
  created(){
    this.getPurchasesFn();
    this.getCurrentMonthLast();
  },
  methods: {
    getPurchasesFn(){
      getOverview().then(res=>{
        this.content = res.count.describe;
        this.purchasesList = res.recent_purchases;
        this.$nextTick(function(){
          this.echartData = res.count.history;
          this.initChart()
        })
      })
      let userInfo =  sessionStorage.getItem("userInfo")
      if(userInfo){
          if( JSON.parse(userInfo).vip_type == 'Anonymous'){
            this.buttonType = true
          } else {
            this.buttonType = false
          }
      } else {
         this.buttonType = true
      }
      
    },
    initChart() {
      const dateArr = this.echartData.map(item => {
        return item.date
      })

      const numberArr = this.echartData.map(item => {
        return item.number
      })

      let myChart = echarts.init(document.getElementById('echarts'));
      var option = {
        color: ["#39a9ed"],
        tooltip: {
            trigger: 'axis',
            show: true
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '2%',
          top: '4%',
          containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dateArr
        },
        yAxis: {
            type: 'value',
            splitLine: {
              lineStyle:{
                type: "dotted"
              }
            },
            min: function(value) {
              return value.min - 1000;
            },
            max: function(value) {
                return value.max + 1000;
            }
        },
        series: [{
            data: numberArr,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 1
              }
            }
        }]
      };
      myChart.setOption(option)
    },
    getCurrentMonthLast(){
        var date=new Date();
        var currentMonth=date.getMonth();
        var nextMonth=++currentMonth;
        var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
        var oneDay=1000*60*60*24;
        var lastTime = new Date(nextMonthFirstDay-oneDay);
        var month = parseInt(lastTime.getMonth()+1);
        var day = lastTime.getDate();
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        this.lastDate = date.getFullYear() + '-' + month + '-' + day;
    },
    detailPageFn(id){
      this.$router.push("/purchasesDetail/"+id)
    },
    introduceFn(){
      this.$router.push("/mine/aboutUs")
    },
    dingyueFn(){
      if(getToken()){
         rechargesTrial(getToken()).then(res=>{
          sessionStorage.setItem("userInfo", JSON.stringify(res))
        })
      } 
      sessionStorage.setItem("tryButton", true)
      this.$router.push("/book/myBookSetting")
    },
    chargeFn(){
      this.$router.push("/book/myChargeFee")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content{
  padding: 10px 15px;
  background-color: #fff;
  font-size: 13px;
}
.echart-wrap{
  width: 100%;
  &>div{
    width: 100%;
  }
}
.van-swipe{
  height:200px
}
.button-group{
  width: 100%;
  padding: 12px 20px;
  text-align: center;
  button{
    width: 35%;
    text-align: center;
    color: #fff;
    font-size: 13px;
    height: 38px;
    line-height: 38px;
    border:none;  
    margin: 0 10px;
    &.introduce{
    background-color: rgba(139, 195, 74, 1);
    box-shadow: 1px 1px 5px 0px rgba(139, 195, 74, 1);
  }
  &.dingyue{
    background-color: rgba(51, 125, 248, 1);
    box-shadow: 1px 1px 5px 0px rgba(48, 128, 232, 1);
  }
    
  }
}
.pannel{
  position: relative;
  padding: 14px 0 4px;
  overflow: hidden;
  margin-bottom: 7px;
  background-color: #fff;
  .title{
    padding: 0 20px;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    height:23px;
    overflow: hidden;
    text-overflow:ellipsis; //溢出用省略号显示
    white-space:nowrap; //溢出不换行
  }
  .key-tag-group{
    padding-left: 20px;
    display: inline-block;
    width: 75%;
    box-sizing: border-box;
  }
  .create-time{
    display: inline-block;
    width: 20%;
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
