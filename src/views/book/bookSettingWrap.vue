<!--  -->
<template>
  <div >
     <book-keywords :showNum.sync = "showNum" :subObj.sync="subObj" :editId ="editId" :type="type" v-if="showNum == 1"></book-keywords>
     <book-list :showNum.sync = "showNum" :param.sync="paramType" :subObj.sync="subObj" :editId ="editId" :type="type" v-if="showNum == 2"></book-list>
     <setting-item :showNum.sync = "showNum" :param="paramType" :subObj.sync="subObj" :editId ="editId" :type="type" v-if="showNum == 3"></setting-item>
  </div>
</template>

<script>  
import BookKeywords from '@/components/bookKeywords.vue'
import BookList from '@/components/bookList.vue'
import SettingItem from '@/components/settingItem.vue'

import { getToken } from '@/utils/auth'
import { subscribesList,subscribesAdd } from '@/api/api.js'
export default {
  data(){
    return {
      fieldArr:  [],
      keywordsArr: [''],
      list: null,
      subObj: {
        keywords: [],
        option_ids:[]
      },
      editId: '',
      type: "",
      showNum: 1,
      paramType: "area"
    };
  },
  components:{
    BookKeywords,
    BookList,
    SettingItem
  },
  created() {
    this.getSubscribesList();
  },
  methods: {
    getSubscribesList(){
      this.type = this.$route.params.type;
      if(this.type == "edit"){
        this.editId = this.$route.query.id;
        subscribesList(getToken()).then(res=>{
          this.fieldArr=res.data;
          this.fieldArr.find(item => {
            if(item.id == this.editId){
              return this.subObj= item
            }
          })
        })
      } else {
        this.subObj.keywords.push('')
      }
    },
  }
}
</script>
<style lang='less' scoped>

</style>