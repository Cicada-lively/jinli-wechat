<!-- 详情页 -->
<template>
  <div>
      <!-- <x-header>帮助中心</x-header> -->
      <div class="content">
          <h4>{{detail.title}}</h4>
          <div class="detail" v-html="detail.content"></div>
      </div>
  </div>
</template>

<script>
import { helpDetail} from '@/api/api.js'
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
        helpDetail(id).then(res=>{
            this.detail = res
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
    display: flex;
    list-style: none;
    margin-top: 20px;
    li{
        width: 33%;
        text-align: center;
        i{
            font-size: 28px;
            color: #999;
        }
        span{
            display: block;
            font-size: 13px;
            color: #999;
        }
        b{display: block;
        font-size: 13px;
            color: #555;
        }
    }
}

</style>