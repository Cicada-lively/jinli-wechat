<template>
  <div class="wrap">
   <van-row type="flex" justify="space-between" style="padding: 10px;">
      <h4>订阅关键词：
        <template v-for="item in subObj.keywords">
          <span :key="item">{{item}}</span>
        </template>
      </h4>
      <van-button plain hairline type="info" size="small"  @click="returnHandle()">返回</van-button>
    </van-row>

    <div class="content">
      <div class="icon_word" v-if="param=='area'">
          <i class="iconfont icon-location"></i>
          <span >地区</span>
      </div>
      <div class="icon_word" v-else-if="param=='industry'">
          <i class="iconfont icon-build"></i>
          <span>行业</span>
      </div>
      <div class="icon_word" v-else>
          <i class="iconfont icon-type"></i>
          <span>项目类型</span>
      </div>

      <div class="setting" v-for="sub in listArr" :key="sub.id">
        <div class="setting-up-btn iconfont icon-arrow-right" :class="sub.showFlag? 'downIcon': ''"  @click="handleClick(sub.id)"></div>
        <div class="setting-title" >
          <button :val="sub.id" @click="addTubArrHandle(sub.id)" :class="sub.selectFlag? 'selectGreen': ''">{{sub.name}}</button>
          <div style="flex-grow:1" @click="handleClick(sub.id)"></div>
        </div>
        <div class="setting-child-box" v-show="sub.showFlag">
          <template v-for="item in sub.children">
            <div :key="item.id">
              <button :val="item.id" @click="addSubArrFn(item.id)" :class="item.selectFlag? 'selectOrange': ''">{{item.name}}</button>
            </div>
            <!-- v-if="!item.children" <div :key="item.id"  v-else>
              <setting-item-btn :parent="item"></setting-item-btn>
            </div> -->
          </template>
        </div>
      </div>
      <div style="text-align: center; margin-top: 20px; padding-bottom: 20px;">
        <van-button type="info" size="small" @click="saveSubFn">保存 </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import SettingItemBtn from './settingItemBtn.vue'
import { getOption} from '@/api/api.js'
export default {
  name: "SettingItem",
  data () {
    return {
      showChild: false,
      selectId: '',
      listArr:[],
      optionList: [],
      
    };
  },
  props:{
    types: {
      type: String,
      default: "area"
    },
    keywords: {
      type: Array,
      default: ()=>{return []}
    },
    param: String,
    subObj:{
      type: Object,
      default: ()=>({})
    }
  },
  components: {
    SettingItemBtn
  },
  created() {
    this.getListFn();
  },
  methods: {
    getListFn(){
      getOption().then(res=>{
        this.listArr = res[this.param];
         console.log(this.listArr)
        for(var i=0; i<this.listArr.length; i++){
          this.$set(this.listArr[i],"showFlag",false)
          this.$set(this.listArr[i],"selectFlag",false)
          if(this.param == "area"){
            for(let item of this.subObj.area){
              if(item.id == this.listArr[i].id){
                this.$set(this.listArr[i],"selectFlag",true)
              }
            }
          } else if(this.param == "industry"){
            for(let item of this.subObj.industry){
              if(item.id == this.listArr[i].id){
                this.$set(this.listArr[i],"selectFlag",true)
              }
            }
          } else {
            console.log(this.param)
            for(let item of this.subObj.project){
              if(item.id == this.listArr[i].id){
                this.$set(this.listArr[i],"selectFlag",true)
              }
            }
          }
          if(this.listArr[i].children){
            for(let j=0; j<this.listArr[i].children.length; j++){
              this.$set(this.listArr[i].children[j],"selectFlag",false)
              if(this.param == "area"){
                for(let item of this.subObj.area){
                  if(item.id == this.listArr[i].children[j].id){
                    this.$set(this.listArr[i].children[j],"selectFlag",true)
                  }
                }
              } else if(this.param == "industry"){
                for(let item of this.subObj.industry){
                  if(item.id == this.listArr[i].children[j].id){
                    this.$set(this.listArr[i].children[j],"selectFlag",true)
                  }
                }
              } else {
                for(let item of this.subObj.project){
                  if(item.id == this.listArr[i].children[j].id){
                    this.$set(this.listArr[i].children[j],"selectFlag",true)
                  }
                }
              }
            }
          }
          

        }
      })
    },
    handleClick(id){
      this.listArr.find((item,index) => {
        if(item.id == id){
          this.$set(this.listArr[index],"showFlag",!this.listArr[index]["showFlag"])
        }
      })
    },
    saveSubFn(){
      for(var i=0; i<this.listArr.length; i++){
        if(this.listArr[i].selectFlag){
          this.optionList.push({id: this.listArr[i].id, "name": this.listArr[i].name})
        }
          if(this.listArr[i].children){
            for(var j=0; j<this.listArr[i].children.length; j++){
            if(this.listArr[i].children[j].selectFlag){
                this.optionList.push({id:this.listArr[i].children[j].id,"name": this.listArr[i].children[j].name})
            }
          }
        }
      }
      if(this.param == "area"){
        this.subObj.area = this.optionList;
        this.$emit("update: subObj", this.optionList)
      } else if(this.param == "industry"){
        this.subObj.industry = this.optionList;
        this.$emit("update: subObj", this.optionList)
      } else {
        this.subObj.project = this.optionList;
        this.$emit("update: subObj", this.optionList)
      }
      this.$emit("update:showNum", 2)
    },
    addTubArrHandle(id){
      this.listArr.find((item,index) => {
        if(item.id == id){
          this.$set(this.listArr[index],"selectFlag",!this.listArr[index]["selectFlag"])
        }
      })
    },
    addSubArrFn(id){
      for(var i=0; i<this.listArr.length; i++){
        if(this.listArr[i].children) {
          this.listArr[i].children.find((item,index) => {
            if(item.id == id){
              this.$set(this.listArr[i].children[index],"selectFlag",!this.listArr[i].children[index]["selectFlag"])
              return
            }
          })
        }
        
      }
    },
    returnHandle(){
      this.$emit("update:showNum", 2)
    }

  }
}

</script>
<style lang='less' scoped>
.wrap{
  .title{
    display: flex;
    justify-content: space-between;
  }
}
.content{
  background-color: #fff;
  padding: 12px; 
  .icon_word{
    line-height:25px;
    i{
      font-size: 22px;
      color: #999;
    }
  }
}
.setting{
  position: relative;
  padding-bottom: 13px;
  border-bottom: 1px solid #f6f6f6;
  &-up-btn{
    position: absolute;
    top: 4px;
    right: 10px;
    z-index: 4;
  }
  .downIcon{
    transform: rotateZ(90deg);
  }
  &-title{
    position: relative;
    margin-top: 10px;
    display: flex;
    span{
      position: absolute;
      top: 10px;
      right: 10px;
    }
     button{
      background: #f2f2f2;
      border: 0;
      padding: 5px 12px;
      margin-top:4px;
      &.selectGreen{
        background: #8BC34A ;
        color: #fff;
      }
    }
  }
  &-child-box{
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    button{
      background: #f2f2f2;
      border: 0;
      padding: 3px 10px;
      margin-top:4px;
      margin-right: 5px;
       &.selectOrange{
        background: #FF9800;
        color: #fff;
      }
    }
  }
}
</style>