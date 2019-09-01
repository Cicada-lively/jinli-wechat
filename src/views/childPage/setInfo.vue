<!--个人资料  -->
<template>
  <div class="personInfo">
      <div class="avatar-wrap">
          <div class="avatar">
              <img :src="pObject.avatar" alt="">
          </div>
      </div>
      <div class="wrap">
          <ul>
              <li>
                  <label for="">昵称</label>
                    <div @click="nameInputFn" >
                       <input type="text" ref="nameInput" v-model="pObject.nickname">
                    </div>
              </li>
              <li>
                    <label for="">性别</label>
                    <van-radio-group v-model="pObject.sex" >
                        <van-row type="flex" align="center" style="height: 44px;"> 
                            <van-col span="8"><van-radio name="1">男</van-radio></van-col>
                            <van-col span="8"><van-radio name="2">女</van-radio></van-col>
                        </van-row>
                    </van-radio-group>
              </li>
              <li>
                  <label for="">电话</label>
                    <div @click="phoneInputFn" >
                       <input type="text" placeholder="请输入电话号码" ref="phoneInput" v-model="pObject.phone">
                    </div>
              </li>
              <li>
                  <label for="">单位</label>
                    <div @click="companyInputFn" >
                        <input type="text" placeholder="请输入单位名称" ref="companyInput" v-model="pObject.company">
                    </div>
              </li>
          </ul>
        <div style="text-align: center;"><button @click="savaInfo"> 保存 </button></div>
          
      </div>
  </div>
</template>

<script>
import { getUserInfo, setUserInfo } from '@/api/api.js'
import { getToken } from '@/utils/auth.js'
export default {
  data () {
    return {
      pObject: {
          nickname: "",
          sex: 0,
          phone: "",
          company: ""
      },
    };
  },
  created() {
    this.getInfo();
  },

  methods: {
    companyInputFn(){
        this.$refs.companyInput.focus();
    },
    phoneInputFn(){
        this.$refs.phoneInput.focus();
    },
    nameInputFn(){
        this.$refs.nameInput.focus();
    },
    getInfo(){
      var pObject = sessionStorage.getItem("userInfo")
      if(pObject){
        this.pObject = JSON.parse(pObject)
      } else {
        getUserInfo(getToken()).then(res=>{
          this.pObject = res
          sessionStorage.setItem("userInfo", JSON.stringify(res))
        })
      }
    },
    savaInfo(){
        console.log(this.pObject)
        if(this.pObject.nickname){
            setUserInfo(this.pObject).then(res=>{
                this.$vux.toast.text(res, 'top')
                sessionStorage.setItem("userInfo", JSON.stringify(this.pObject))
                // console.log(res)
            })
        } else {
            this.$vux.toast.text('请输入昵称', 'top')
        }
    }
  }
}

</script>
<style lang='less' scoped>
    .radio-item {
        border: 1px solid #ececec;
        padding: 3px 8px;
        line-height:1.5;
        margin-right: 10px;
    }
    .radio-item-selected {
        border: 1px solid #337DF8;
    }
    .avatar-wrap{
        padding: 30px 0;
        background-color: #fff;
    }
    .avatar{
        margin: 0 auto;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #fff;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .wrap li{
        background-color: #fff;
        margin-bottom: 8px;
        display: flex;
        height: 44px;
        line-height: 44px;
        label{
            width: 30%;
            padding-left: 6%;
            text-align: left;
        }
        &>div{
            width: 68%;
            input{
                width: 100%;
                height: 44px;
                border: none;
                outline: none;
                color: #999;
            }
        }
    }
    .wrap {
        button{ 
            padding: 6px 35px;
            color: #337DF8;
            border: 1px solid #337df8;
            border-radius: 6px;
            background-color: #fff;
            margin-top: 30px;
        }
    }
</style>