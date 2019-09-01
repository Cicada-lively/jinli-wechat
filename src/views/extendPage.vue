<template>
  <div class="extend">
     <div class="echart-wrap" id="echarts" style=" margin: 0 auto; height: 270px; background: #fff;">
    </div>
    <div v-html="content" class="content">
    </div>
    <div class="button-group">
      <button class="introduce" @click="introduceFn">招采介绍</button>
      <button class="dingyue"  @click="dingyueFn">立即订阅</button>
    </div>
    <div >
      <van-swipe :height="121" vertical :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(item,i) in purchasesList" :key="item.id">
          <div class="pannel"  @click="detailPageFn(item.id)" >
          <p class="title">{{item.title}}</p>
          <div class="key-tag-group">
            <div class="key-tag primary">{{purchasesList[i].area_name}}</div>
            <div class="key-tag warning">{{purchasesList[i].industry_name}}</div>
            <div class="key-tag success">{{purchasesList[i].project_name}}</div>
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
    
  </div>
</template>

<script>
 var echarts = require('echarts/lib/echarts');
  // 引入折线图
  require('echarts/lib/chart/line');
  // 引入提示框和标题组件
  require('echarts/lib/component/title');
  require('echarts/lib/component/tooltip');
import {getOverview } from '@/api/api.js'
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
    }
  },

  created(){
    this.getPurchasesFn()
  },
  mounted(){
    
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
            trigger: 'axis'
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
    detailPageFn(id){
      this.$router.push("/purchasesDetail/"+id)
    },
    introduceFn(){
      this.$router.push("/page/index")
    },
    dingyueFn(){
      this.$router.push("/mine/book")
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
    // margin: 0 auto;
  }
}
.van-swipe{
  height:242px
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
  margin-top: 10px;
  background-color: #fff;
  .title{
    padding: 0 20px;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    height:43px;
    overflow: hidden;
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
