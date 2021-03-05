<template>
    <!-- 为了去掉windows的滚动条,所以将导航栏包在里面 -->
      <el-scrollbar  style="height:100%">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            background-color="#304156"
            text-color="#fff"
            active-text-color="#1890ff"
            :collapse="isCollapse"
            unique-opened
            :collapse-transition="false"
            router
            :default-active="activeNav"
            >
            <el-menu-item index='/home' @click="clickFirstPage('/home')" class="homeItem">
                <svg-icon icon-class="dashboard" ></svg-icon>
                <span>首页</span>
            </el-menu-item>
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id"  >
              <template slot="title">
                <svg-icon :icon-class="item.icon"></svg-icon>
                <span class="item-class">{{item.name}}</span>
              </template>
              <el-menu-item class="sub-menu-item" :index="'/'+item.url+'/'+subItem.url" v-for="subItem in item.children" :key="subItem.id" 
                @click="saveNavState('/'+item.url+'/'+subItem.url,subItem.name)">
                <!-- <svg-icon :icon-class="subItem.icon"></svg-icon> -->
                <span class="sub-item-class">{{subItem.name}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        </el-row>
      </el-scrollbar>
</template>

<script>

// 这是左侧导航条组件
export default {
    props:['isCollapse'],
    data() {
      return {
        menuList:[],
      };
    },
    computed:{
       activeNav(){
         return this.$store.state.currentPage;
       }
    },
    created(){
      //获取菜单列表
      this.getMenuList();
      this.$store.commit('initCurrentPage')
    },
    methods:{
      async getMenuList(){
        const {data : res} =await this.$http.post('/menu/tree',{});
        //如果请求不成功
        if(res.code !== 0){
          this.$message.error(res.msg)
        } else{
          this.menuList = res.data;
        }
      },
      //保存当前激活的菜单
      saveNavState(url,name){
        //将当前页数据保存到vuex中
        this.$store.commit('saveCurrentPage',url)
       
        //将页面标签加入到数组中
        let info = {name:name,index: url,isActive: true}
        this.$store.commit('addTagsView',info)
      },
      //点击首页
      clickFirstPage(url){
        this.$store.commit('switchPage',url)
      }
    }
}
</script>

<style scoped>

.homeItem{
  background-color:#304156 !important;
}

.el-menu{
  border:none ;
}

.sub-menu-item{
  background-color:#1f2d3d !important;
}

.el-menu-item:hover{
  background-color:black !important;
}

.el-scrollbar >>> .el-scrollbar__wrap{
  overflow-x: hidden !important;

}

.item-class{
  margin-left:2px;
}

.sub-item-class{
  margin-left:2px;
}


</style>