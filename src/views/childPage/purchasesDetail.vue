<!-- 详情页 -->
<template>
  <div>
      <!-- <x-header>公告信息</x-header> -->
      <div class="content">
          <h4>{{detail.title}}</h4>
          <div class="time">发布时间：{{detail.created_at}}</div>
          <ul class="tab">
              <li>
                  <div class="tab-name">
                    <i class="iconfont icon-user"></i>
                    <span>采购人</span>
                  </div>
                  <b>{{detail.company_name}}</b>
              </li>
              <li>
                  <div class="tab-name">
                    <i class="iconfont icon-location"></i>
                    <span>所在地区</span>
                  </div>
                  <b>{{detail.area_name}}</b>
              </li>
              <li>
                  <div class="tab-name">
                    <i class="iconfont icon-type"></i>
                    <span>项目类型</span>
                  </div>
                  <b>{{detail.project_name}}</b>
              </li>
          </ul>
          <div class="detail" v-html="detail.content">
          </div>
      </div>
  </div>
</template>

<script>
import { getPurchasesArticle} from '@/api/api.js'
export default {
  data () {
    return {
        detail: {},
    };
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail(){
        let id = this.$route.params.id;
        getPurchasesArticle(id).then(res=>{
            this.detail = res
            console.log(res)
        })
    }
  }
}

</script>
<style lang='less' scoped>
.content{
    padding: 10px 10px;
    h4{ text-align: center; color: #333; font-size: 18px;}
    .time{
        color: #999;
        font-size: 14px;
        text-align: center;
    }
}
.tab{
    list-style: none;
    margin-top: 20px;
    li{
        // width: 33%;
        text-align: center;
        display: flex;
        .tab-name{
            width: 100px;
            text-align: left;
            line-height: 40px;
            i{
                font-size: 28px;
                color: #999;
                vertical-align: middle;
            }
            span{
                width: 80px;
                font-size: 13px;
                color: #999;
            }
        }
        b{
            font-size: 13px;
            color: #555;
            line-height: 40px;
        }
    }
}
.detail {
    padding: 10px;
    font-size: 13px;
    line-height:1.6;
}
h2{
    text-align: center;
}
</style>