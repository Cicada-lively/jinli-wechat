<!--订阅设置  -->
<template>
  <div class="booking">
    <div class="article">
      <van-row type="flex" justify="space-between" style="padding: 10px 0;">
        <h4>订阅关键词</h4>
        <van-button plain hairline type="info" size="small"  style="margin-right: 10px;" @click="saveSub">保存</van-button>
      </van-row>

      <div class="keywords-wrap">
        <div class="keywords-list" v-for="(item,index) in subObj.keywords" :key="`item_${index}}`">
          <label>关键词{{index+1}}</label>
          <input type="text" :value="item"  @blur="addKeyWords">
          <i class="iconfont icon-circle-delete" @click="deleteKeys(index)"></i>
        </div>
        <div style="padding-left: 70px; margin-top: 20px;">
          <van-button plain hairline type="primary" size="small" @click="addKeysFn">添加</van-button>
        </div>
      </div>

      <div class="book-setting-wrap" @click="hrefPathFn">
        <div class="setting-title">
          <div class="left">
            <i class="iconfont icon-filter"></i>
            <h5>订阅设置</h5>
          </div>
          <span>
           <i class="iconfont icon-arrow-right"></i>
          </span>
        </div>
        <div class="setting-content">
            <p>地区：<template v-if="subObj.area !== undefined && subObj.area.length>0" > <span v-for="item in subObj.area" :key="item.id">&nbsp;{{item.name}}</span></template> <span v-else>无</span></p>
            <p>行业：<template v-if="subObj.industry !== undefined && subObj.industry.length>0" > <span v-for="sub in subObj.industry" :key="sub.id">&nbsp;{{sub.name}}</span></template> <span v-else>无</span> </p>
            <p>项目类型：<template v-if="subObj.project !== undefined && subObj.project.length>0" > <span v-for="line in subObj.project" :key="line.id">&nbsp;{{line.name}}</span></template> <span v-else>无</span></p> 
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { subscribesList,subscribesAdd, subscribesUpdate } from '@/api/api.js'
export default {
  data () {
    return {
      fieldList:  {},
      keywordsArr: [''],
      list: null,
     
    };
  },
  props: {
    editId: String,
    type: String,
    showNum: Number,
    subObj:{
      type: Object,
      default: ()=>({})
    }
  },
  created() {
  },
  methods: {
    addKeyWords(e) {
      let val = e.target.value;
      if(val){
        this.subObj.keywords.push(val);
      }
    },
    // 点击添加按钮
    addKeysFn(){
      this.subObj.keywords.push('')
    },
    // 点击删除按钮
    deleteKeys(i){
      if(this.subObj.keywords.length>1){
        this.subObj.keywords.splice(i,1)
      } else {
        this.$toast("必须有一个关键字！")
      }
    },
    saveSub() {
      let optionArr = []
      if(this.subObj.area.length){
        for(let item of this.subObj.area){
          optionArr.push(item.id)
        }
      }
      if(this.subObj.project.length){
        for(let item of this.subObj.project){
          optionArr.push(item.id)
        }
      }
      if(this.subObj.industry.length){
        for(let item of this.subObj.industry){
          optionArr.push(item.id)
        }
      }
      this.subObj.option_ids = optionArr
      this.fieldList.keywords = this.subObj.keywords;
      this.fieldList.option_ids = optionArr;
      if(this.type == "edit"){
        subscribesUpdate(getToken(),this.editId, this.fieldList).then(res => {
          this.$toast(res)
          this.$router.push("/book/myBookSetting")
        })
      } else {
        subscribesAdd(getToken(),this.fieldList).then(res => {
          this.$toast(res)
          this.$router.push("/book/myBookSetting")
        })
      }
      
    },
    hrefPathFn(){
      this.$emit("update:showNum", 2)
      this.$emit("update:keywords",this.subObj.keywords)
    }
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
.keywords-wrap{
  background-color: #fff;
  padding: 10px 0;
  .keywords-list{
    display: flex;
    height: 30px;
    line-height: 30px;
    margin-top: 8px;
    label{
      font-weight: normal;
      width: 70px;
      padding: 0 8px;
    }
    input{
      flex: 1;
      padding: 0 10px;
    }
    i{
      font-size: 20px;
      color: #ccc;
      width: 30px;
      text-align: center;

    }
  }
}
.book-setting-wrap{
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 10px 0;
  margin-top: 15px;
  .setting-title{
    display: flex;
    justify-content: space-between;
    padding: 4px;
    line-height: 30px;
    .left{
      display: flex;
      i{
        color:#1989fa;
        width: 25px;
        height: 30px;
        font-size: 23px;
      }
      h5{
        font-size: 16px;
        padding-left:5px;
        font-weight: normal;
      }
    }
    
    span{
      i{
        color: #999;
        font-size: 18px;
      }
      
    }
  }
  .setting-content{
    padding-left:30px;
    color: #666;
    line-height: 1.6;
    font-size: 12px;
    p{
      margin-top: 3px;
    }
  }
}

</style>
