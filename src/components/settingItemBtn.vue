<template>
  <div class="list">
    <div @click="handleClickFn()"><button>{{parent.name}}</button></div>

    <div class="list-child-box" v-show="showChild">
      <template v-for="item in parent.children">
        <button v-if="!item.children" :key="item.id">{{item.name}}</button>
        <setting-list-btn v-else :key="item.id" :parent="item"> </setting-list-btn>
      </template>
    </div>
    
  </div>
</template>

<script>

export default {
  name: "SettingItemBtn",
  data () {
    return {
      showChild: false,
    };
  },
  props: {
    parent: {
      type:Object,
      default: () => ({})
    },
    index: Number
  },
  components: {
  },

  created() {},

  methods: {
    handleClickFn(){
      this.showChild = !this.showChild
    }
  }
}

</script>
<style lang='less' scoped>
.list{
    button{
      background: #f2f2f2;
      border: 0;
      padding: 2px 8px;
      margin-top:4px;
    }
}
.list-child-box{
  position: absolute;
  button{
      background: #f2f2f2;
      border: 0;
      padding: 2px 8px;
      margin-top:4px;
    }
}

</style>