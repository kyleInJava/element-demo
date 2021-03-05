<template>
  <el-container>
    <!-- 左侧导航栏 -->
    <el-aside :width="isCollapse ? '64px' : '210px'">
      <NavMenu :isCollapse='isCollapse'></NavMenu>
    </el-aside>
    <!-- 右侧页面内容 -->
    <el-container>
      <!-- 页头内容 -->
      <el-header height="86px">
        <Header :fold='fold' @toggleCollapse='toggleCollapse'></Header>
      </el-header>
      <!-- 页主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>

import NavMenu from '@/components/NavMenu/NavMenu.vue'
import Header from '@/components/Header/Header.vue'

export default {
  data(){
    return {
      isCollapse : false,
      fold: true
    }
  },
  components:{
    NavMenu,
    Header
  },
  methods:{
    toggleCollapse(){
      this.isCollapse = !this.isCollapse;
      this.fold = !this.fold;
    }
  }
};
</script>


<style>

.el-container{
  height: 100%;
}

.el-aside {
  background-color: #304156;
  height: 100%;
}

.el-header{
  padding:0;
}


.toolbar {
  background: #f5fdff;
  border : 1px solid #dfebec;
  margin-bottom: 20px;
  padding-top: 22px;
}

</style>