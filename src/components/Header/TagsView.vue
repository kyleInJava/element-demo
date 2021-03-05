<template>
    <div class="tagsView">
        <span class="tag" :class="homeActive" @click="switchPage('/home')">首页</span>
        <span class="tag" :class="{active: item.isActive}" v-for="item in tagsItems" :key="item.index" 
        @click="switchPage(item.index)">
            {{item.name}} &nbsp;<i class="el-icon-close" @click="delPage(item.index,$event)"></i>
        </span>
    </div>    
</template>

<script>
export default {

    data(){
        return {
            
        }
    },
    computed: {
        // 计算属性的 getter
        tagsItems () {
            // `this` 指向 vm 实例
            return this.$store.state.tagsViews
        },
        //如果当前页面是首页
        homeActive(){
            if(this.$store.state.currentPage == '/home'){
                return  'active'
            }
            return ''
        }
    },
    created(){
        this.$store.commit('initTagsView')
        
    },
    methods:{
        //点击tag后，要切换到对应的页面
        switchPage(index){
            this.$store.commit('switchPage',index)
            //切换页面
            this.$router.push(index)
        },
        //删除tag上面的标签
        delPage(index,event){
            this.$store.commit('delTag',index)
            this.$router.push(this.$store.state.currentPage)
            event.stopPropagation();

        } 
    }

    
}
</script>

<style scoped>

.tagsView{
  height: 36px;
  width:100%;
  font-size : 0;
  box-shadow:0 1px 4px rgb(0 21 41 / 8%);
}

.tag{
    /* display: inline-block; */
    height: 28px;
    padding:4px 5px ;
    margin-left: 4px;
    cursor:pointer;
    border: #d9d4d4 solid 1px;
    font-size: 12px;
    line-height : 36px;
}


.tag > i:hover {
    border-radius:5px;
    background-color: rgb(138, 133, 133);
}

.active{
    background-color: #42b983;
    color: #fff;
}

</style>