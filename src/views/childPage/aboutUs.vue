<!--  -->
<template>
  <div class="wrap">
      <!-- <x-header>{{aboutList.title}}</x-header> -->
      <div class="article">
        <h4>{{aboutList.title}}</h4>
        <div v-html="aboutList.content"></div>
      </div>
  </div>
</template>

<script>

import { getAboutUs} from '@/api/api.js'
export default {
  data () {
    return {
      aboutList: {}
    };
  },
  created() {
    this.getAboutData();
  },

  methods: {
    getAboutData(){
      getAboutUs().then(res=>{
        this.aboutList = res;
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


</style>