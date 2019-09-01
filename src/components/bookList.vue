<!--订阅设置  -->
<template>
  <div class="article">
    <van-row type="flex" justify="space-between" style="padding: 10px 0;">
      <h4>订阅关键词：
        <template v-for="item in subObj.keywords">
          <span :key="item">&nbsp;{{item}}</span>
        </template>
      </h4>
      <van-button plain hairline type="info" size="small"  style="margin-right: 10px;" @click="saveSub">保存</van-button>
    </van-row>
    <ul class="list">
      <li @click="settingItemFn('area')" @saveArea="areaHandle">
        <div class="left">
            <div class="icon_word">
                <i class="iconfont icon-location"></i>
                <span>地区</span>
            </div>
            <div class="tab_list">
              <template v-if="subObj.area !== undefined && subObj.area.length>0" > <span v-for="item in subObj.area" :key="item.id">&nbsp;{{item.name}}</span></template> <span v-else>无</span>
               
            </div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </li>
      <li @click="settingItemFn('industry')" @saveIndustry="industryHandle">
        <div class="left">
            <div class="icon_word">
                <i class="iconfont icon-build"></i>
                <span>行业</span>
            </div>
            <div class="tab_list">
              <template v-if="subObj.industry !== undefined && subObj.industry.length>0" > <span v-for="sub in subObj.industry" :key="sub.id">&nbsp;{{sub.name}}</span></template> <span v-else>无</span>

            </div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </li>
      <li @click="settingItemFn('project')"  @saveProject="projectHandle">
        <div class="left">
            <div class="icon_word">
                <i class="iconfont icon-type"></i>
                <span>项目类型</span>
            </div>
            <div class="tab_list">
              <template v-if="subObj.project !== undefined && subObj.project.length>0" > <span v-for="line in subObj.project" :key="line.id">&nbsp;{{line.name}}</span></template> <span v-else>无</span>
                <!-- <span v-for="item in optionList.project" :key="item.id">{{item.name}}</span> -->
            </div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </li>
    </ul>
    <div style="text-align: center; margin-top: 20px; padding-bottom: 20px;">
        <van-button type="info" size="small" @click="returnHandle()">返回</van-button>
      </div>
  </div>
  
</template>

<script>
import { getToken } from '@/utils/auth'
import { subscribesList,subscribesAdd } from '@/api/api.js'

export default {
  data () {
    return {
      fieldArr:  [],
      optionList: {},
      keywords: "",
      areaVal: [],
      industryVal: [],
      projectVal: []
    };
  },
  props: {
    editId: String,
    type: String,
    param: String,
    subObj:{
      type: Object,
      default: ()=>({})
    }
  },
  created() {
    // this.getSubscribesList();
    this.getHelpData();
  },
  methods: {
    getHelpData(){
      console.log(this.subObj)
      
    },
    settingItemFn(param){
      this.$emit("update:showNum", 3)
      this.$emit("update:param",param)
    },
    saveSub(){
      this.$emit("update:showNum", 1)
    },
    areaHandle(val){
      this.subObj.area = val
    },
    industryHandle(val){
      this.subObj.industry = val
    },
    projectHandle(val){
      this.subObj.project = val
    },
    returnHandle(){
      this.$emit("update:showNum", 1)
    }
    // goHelpDetail(id){
    //   this.$router.push("/help/detail/"+id)
    // }
  }
}
</script>
<style lang='less' scoped>
.article{
  h4{
    padding: 5px 20px;
    text-align: left;
    margin-bottom: 5px;
  }
}
.list{
  padding: 10px 0;
  li{
      margin-bottom: 6px;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    .left{
        width:90%;
        .icon_word{
            height: 28px;
            line-height: 28px;
            i{
                color: #409EFF;
                font-size: 20px;
            }
            span{
                color: #333;
            }
        }
        .tab_list{
            height: 22px;
            line-height: 22px;
            overflow: hidden;
            span{
                font-size: 12px;
                margin-right : 6px;
                color: #999;
            }
        }
    }
    &>i{
        line-height: 40px;
    }
    &:last-child{
      border-bottom: none;
    }
  }
}
.vux-header{
  background-color: #409EFF;
}
</style>