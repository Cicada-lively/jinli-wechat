<template>
    <div class="wrapper" ref="wrapper">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getPurchasesList"
          :offset="10" >
          <div class="pannel" v-for="item in purchasesList" :key="item.id" @click="detailPageFn(item.id)" >
            <p class="title">{{item.title}}</p>
            <div class="key-tag-group">
              <div class="key-tag primary">{{item.area_name}}</div>
              <div class="key-tag warning" v-if="item.industry_name !== item.title">{{item.industry_name}}</div>
              <div class="key-tag success">{{item.project_name}}</div>
            </div>
            <div class="dashed-line"></div>
            <div class="time"> <i class="mintui mintui-pie1"></i> 截至 {{item.end_time}}</div>
            <div class="mark" v-if="item.industry_name !== item.title">
              <div :class="item.state.sign == 'Progress'? 'mark-bg': 'mark-end-bg'" >
                &nbsp; &nbsp;{{item.state.text}}
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    
</template>

<script>
import {getPurchases} from '@/api/api.js'
export default {
  data () {
    return {
      purchasesList: [],
      page: 1,
      pulldownMsg: '下拉刷新',
      pullupMsg: '上拉加载更多！',
      alertHook: 'none',
      dataFlag: true,
      loading: false,
      finished: false
    };
  },
  methods: {
    getPurchasesList(){
      getPurchases("",this.page).then(res=>{
        this.total = res.meta.last_page
        this.page++;
        this.purchasesList = this.purchasesList.concat(res.data);
         this.loading = false;
         if (this.page >= this.total) {
           console.log(11)
          this.finished = true;
        }
      })
    },
    detailPageFn(id){
      this.$router.push("/purchasesDetail/"+id)
    },
    onRefresh() {
        this.$toast('刷新成功');
        // this.isLoading = false;
        this.purchasesList = []
        this.page = 1;
        this.getPurchasesList()
    }
  }
}

</script>
<style lang='less' scoped>
.wrapper{
  width: 100%;
  overflow: auto;
  height: calc(100% - 55px);
}
.van-list{
  position: absolute;
}
.van-pull-refresh{
  height: 100%;
  overflow: auto;
}


</style>