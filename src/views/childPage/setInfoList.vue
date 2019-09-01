<!--  -->
<template>
      <div class="infoList">
          <p>确认订阅信息</p>
        <ul class="list">
          <li v-for="(item,index) in subList" :key="index">
            <h5>{{index+1}}.
                <template v-for="sub in item.keywords">
                    <span :key="sub.id">
                        {{sub}}
                    </span>
                </template>
            </h5>
            <div class="setting-content">
                <p>地区：<template v-if="item.area !== undefined && item.area.length>0" > <span v-for="item1 in item.area" :key="item1.id">&nbsp;{{item1.name}}</span></template> <span v-else>无</span></p>
                <p>行业：<template v-if="item.industry !== undefined && item.industry.length>0" > <span v-for="sub1 in item.industry" :key="sub1.id">&nbsp;{{sub1.name}}</span></template> <span v-else>无</span> </p>
                <p>项目类型：<template v-if="item.project !== undefined && item.project.length>0" > <span v-for="line1 in item.project" :key="line1.id">&nbsp;{{line1.name}}</span></template> <span v-else>无</span></p> 
            </div>
          </li>
        </ul>
        <div style="margin-top: 20px; text-align: center;">
            <van-button type="info" size="small" @click="addBookFn" >立即订阅</van-button>
        </div>
        
      </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { subscribesList } from '@/api/api.js'
export default {
  data () {
    return {
     subList: [],
    };
  },
  created() {
    this.getSubList();
  },

  methods: {
    getSubList(){
        subscribesList(getToken()).then( res => {
            this.subList = res.data
        })
    },
    addBookFn(){

    }
  }
}

</script>
<style lang='less' scoped>
.infoList{
    background-color: #fff;
    &>p{
        color: #999;
        font-size: 14px;
        background-color: #fff;
        padding: 10px;
    }
}
.list{
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
</style>