<!--订阅设置  -->
<template>
  <div class="booking">
    <div class="article">
      <h4>订阅设置</h4>
      <div>
        <div class="list-wrap">
          <div class="sub-list" v-for="(item,index) in fieldArr" :key="item.id">
            <div class="sub-left">订阅{{index + 1}}</div>
            <div class="sub-mid"  @click="addKeyWords('edit',item.id)">
              {{item.keywords.join('，')}}
              <!-- <template v-for="k in item.keywords" >
                <span :key="k">{{k}}，</span>
              </template> -->
            </div>
            <em class="iconfont icon-circle-delete close-icon" @click="deleteSubscribe(item.id)"></em>
            <i class="iconfont icon-filter-o sub-right" @click="addKeyWords('edit',item.id)"></i>
          </div>

          <div class="sub-list" v-for="(item,index) in addFieldArr" :key="`item_${index}}`">
            <div class="sub-left">订阅{{count + index +1}}</div>
            <div class="sub-mid"  @click="addKeyWords('add')">
              <span> </span>
            </div>
            <em class="iconfont icon-circle-delete close-icon" @click="deleteList(index)"></em>
            <i class="iconfont icon-filter-o sub-right" @click="addKeyWords('add')"></i>
          </div>

          <van-cell>
            <van-button plain hairline type="primary" size="small" @click="addBookFn" style="margin-left: 63px;">+ 添加</van-button>
          </van-cell>
        </div>

      </div>
      <div class="cell-btn" style="padding-bottom: 20px;">
          <van-button type="info" size="small" @click="goSetList">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { subscribesList, subscribesDelete, rechargesTrial} from '@/api/api.js'
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
  beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        let fromPath = from.path;
        if(from.path == "/auth" ){
          rechargesTrial(getToken()).then(res=>{
              sessionStorage.setItem("userInfo", JSON.stringify(res))
              })
        }
      })
    },
  created() {
    this.getSubscribesList();
  },
  methods: {
    getSubscribesList(){
      let user = sessionStorage.getItem("userInfo");
      if(user){
        var role = JSON.parse(user).vip_type;
          if(role == "Expire"){
            this.$router.push('/extendPage')
          } 
      } 
        
      subscribesList(getToken()).then(res=>{
        if(res.data && res.data.length){
          this.fieldArr=res.data;
          this.count = res.data.length;
        }
        else {
          this.addFieldArr.push(this.subListObj)
        }
      })
      if(sessionStorage.getItem("tryButton")){
        sessionStorage.removeItem("tryButton")
      }
        
    },
    addBookFn(){
      this.addFieldArr.push(this.subListObj)
    },
    deleteSubscribe(id) {
      if(this.fieldArr.length>1){
        subscribesDelete(getToken(),id).then( res => {
          this.$toast(res)
          this.getSubscribesList()
        })
      } else {
        this.$toast("必须有一个订阅设置")
      }
      
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
    },
    goSetList(){
      this.$router.push("/book/setInfoList")
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
