<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}" @click.native="clickHomePage">首页</el-breadcrumb-item>
        <el-breadcrumb-item  v-for="item in pathList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>

export default {
    data(){
        return {
            pathList:[]
        }
    },
    created(){
        this.getPathList()
    },
    watch:{
        $route(){
            this.getPathList()
        }
    },
    methods:{
        getPathList(){
            let items = this.$route.matched.filter(item => item.meta && item.meta.title);
            if(this.$route.path === '/home'){
                items = [];
            }
            this.pathList = items;
            
        },
        clickHomePage(){
            this.$store.commit('switchPage','/home')
            event.stopPropagation();
            
        }
    }
}

</script>

<style scoped>
.el-breadcrumb{
  display: inline-block;
  font-size: 17px;
  padding-bottom: 4px;
}

.el-breadcrumb >>> .el-breadcrumb__separator{
    color: black;
    font-weight: 400;
}

</style>