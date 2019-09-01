<!--订阅设置  -->
<template>
  <div class="booking">
    <div class="article">
      <h4>订阅设置</h4>
      <div>
        <div class="list-wrap">
          <div class="sub-list" v-for="(item,index) in fieldArr" :key="item.id">
            <div class="sub-left">订阅{{index + 1}}</div>
            <div class="sub-mid"  >
              <template v-for="k in item.keywords" >
                <span :key="k">{{k}}</span>
              </template>
            </div>
            <em class="iconfont icon-circle-delete close-icon" @click="deleteSubscribe(item.id)"></em>
            <i class="iconfont icon-filter-o sub-right" @click="addKeyWords('edit',item.id)"></i>
          </div>

          <div class="sub-list" v-for="(item,index) in addFieldArr" :key="`item_${index}}`">
            <div class="sub-left">订阅{{count + index +1}}</div>
            <div class="sub-mid" @click="deleteAdd(index)">
              <span> </span>
            </div>
            <em class="iconfont icon-circle-delete close-icon" @click="deleteList(index)"></em>
            <i class="iconfont icon-filter-o sub-right" @click="addKeyWords('add')"></i>
          </div>

          <van-cell>
            <van-button plain hairline type="primary" size="small" @click="addBookFn" style="margin-left: 63px;">添加</van-button>
          </van-cell>
        </div>

      </div>
      <div class="cell-btn">
          <van-button type="info" size="small">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { subscribesList, subscribesDelete} from '@/api/api.js'
export default {
  data () {
    return {
      fieldArr:  [],
      count: 0,
      addFieldArr: [],
      subListObj: {
        keywords: []
      }
    };
  },
  created() {
    this.getSubscribesList();
  },
  methods: {
    getSubscribesList(){
      subscribesList(getToken()).then(res=>{
        this.fieldArr=res.data;
        this.count = res.data.length;
      })
    },
    addBookFn(){
      this.addFieldArr.push(this.subListObj)
      console.log(this.fieldArr)
    },
    deleteSubscribe(id) {
      subscribesDelete(getToken(),id).then( res => {
        this.$toast(res)
        console.log(res)
      })
    },
    deleteList(num){
      this.addFieldArr.splice(num,1)
    },
    addKeyWords(type,num) {
      if(type == "edit"){
        this.$router.push('/mine/book/'+ type+"?id="+ num)
      }else {
        this.$router.push('/mine/book/'+type)
      }
      
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
.cell-btn{
  margin-top: 40px;
  text-align: center;
}
.list-wrap{
  background-color: #fff;
  padding: 10px 0;
}
.sub-list{
  display: flex;
  background-color: #fff;
  vertical-align: center;
  line-height: 30px;
  margin-top: 8px;
  position: relative;
}
.sub-left{
  width: 80px;
  text-align: center;
}
.sub-right{
  width: 50px;
  text-align: center;
  font-size: 28px;
}
.close-icon{
  width: 25px;
  height: 30px;
  font-size: 20px;
  position: absolute;
  right: 52px;
  color: #ccc;
}
.sub-mid{
  flex: 1;
  padding: 0 40px 0 10px;
  border: 1px solid #ccc;
}

</style>
