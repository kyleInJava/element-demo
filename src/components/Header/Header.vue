<template>
    <div>
        <div class="nav-bar">
            <!-- 开关左侧导航菜单 -->
            <div  class="toggle-class"  @click="toggleCollapse">
                <svg-icon class="fold-svg" :icon-class="fold ? 'fold':'unfold'"></svg-icon>
            </div>

            <!-- 面包屑 -->
            <BreadCrumb></BreadCrumb>
            
            <!-- 右侧的全屏、用户名字和头像 -->
            <RightNav></RightNav>

            <!-- 多页标签 -->
            <TagsView></TagsView>
        </div>
        
    </div>
</template>

<script>

import BreadCrumb from '@/components/Header/BreadCrumb.vue'
import RightNav from '@/components/Header/RightNav.vue'
import TagsView from  '@/components/Header/TagsView.vue'

export default {
    props:['fold'],
    data() {
        return {
        }
    },
    components: {
        BreadCrumb,
        RightNav,
        TagsView
    },
    methods:{
      toggleCollapse(){
        //触发toggleCollapse事件
        this.$emit('toggleCollapse')
      }
    }
    
}
</script>


<style scoped>

.nav-bar{
  height: 50px;
  width:100%;
  background-color:rgb(255, 255, 255);
  box-shadow:0 1px 4px rgb(0 21 41 / 8%);
}

.toggle-class{
  margin:10px 15px;
  display: inline-block;
}

.fold-svg{
  width: 30px !important;
  height: 30px !important;
}


</style>