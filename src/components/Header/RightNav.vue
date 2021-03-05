<template>
    <div class="rightNav">
        <!-- 全屏 -->
        <ScreenFull></ScreenFull>
        <!-- 名字 -->
        <div class="userName">
            <span class="userNameSpan">
                {{userName}}
            </span>
        </div>
        
        <!-- 头像 -->
        <HeadImg></HeadImg>
    </div>
</template>
<script>

import ScreenFull from '@/components/Header/ScreenFull.vue'
import HeadImg from '@/components/Header/HeadImg.vue'

export default {
    data() {
        return {
            userName: ''
        }
    },
    components : {
        ScreenFull,
        HeadImg
    },
    created(){
      this.getUserName()
    },
    methods:{
      toggleCollapse(){
        //触发toggleCollapse事件
        this.$emit('toggleCollapse')
      },
      getUserName(){
        this.userName = '超级管理员' //window.localStorage.getItem("userInfo")
      },
    }
    
}
</script>

<style scoped>
.rightNav{
  height: 100%;
  width: 215px;
  float: right;
}

.userName{
  height: 100%;
  width: 100px;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}

.userNameSpan{
  margin-top:13px;
  display:block;
}


</style>