<!--  -->
<template>
  <div>
      <!-- <x-header>帮助中心</x-header> -->
      <div class="article">
        <h4>常见问题</h4>
        <ul class="list">
          <li v-for="item in helpList" :key="item.id" @click="goHelpDetail(item.id)">
            <span>{{item.title}}</span>
            <i class="iconfont icon-arrow-right"></i>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { helpList} from '@/api/api.js'
export default {
  data () {
    return {
      helpList: [],
      page: 1
    };
  },
  created() {
    this.getHeloData();
  },

  methods: {
    getHeloData(){
      helpList(this.page).then(res=>{
        this.helpList = res.data;
      })
    },
    goHelpDetail(id){
      this.$router.push("/help/detail/"+id)
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
.list{
  padding: 10px 0;
  background-color: #fff;
  box-shadow: 0 5px 5px rgba(156, 156, 156, 0.1);
  li{
    border-bottom: 1px solid #f6f6f6;
    padding: 0 15px;
    font-size: 14px;
    color: #666;
    height: 36px;
    line-height: 36px;
    display: flex;
    justify-content: space-between;
    &:last-child{
      border-bottom: none;
    }
  }
}
.vux-header{
  background-color: #409EFF;
}
</style>