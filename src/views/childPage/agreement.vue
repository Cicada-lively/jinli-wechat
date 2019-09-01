<!--  -->
<template>
  <div>
      <!-- <x-header>{{agreementList.title}}</x-header> -->
      <div class="article">
        <h4>{{agreementList.title}}</h4>
        <div v-html="agreementList.content"></div>
      </div>
  </div>
</template>

<script>
import { getAgreement } from '@/api/api.js'
export default {
  data () {
    return {
      agreementList: {}
    };
  },
  created() {
    this.getAgreementData();
  },

  methods: {
    getAgreementData(){
      getAgreement().then(res=>{
        this.agreementList = res;
      })
    },
  }
}

</script>
<style lang='less' scoped>
.article{
  padding: 20px 20px;
  h4{
    text-align: left;
    margin-bottom: 10px;
  }
  
}
.vux-header{
  background-color: #409EFF;
}
</style>