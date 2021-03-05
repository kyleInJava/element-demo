<template>
    <div class="left">
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>

        <el-tree
            
            :data="deptData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="deptTree"
            :render-content = renderContent
            @node-click="nodeClick"
            >
            
        </el-tree>

    </div>
</template>

<script>
export default {

    data(){
        return{
            filterText: '',
            deptData:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    
    created(){
        this.getDeptTree();
    },
    watch: {
      filterText(val) {
        this.$refs.deptTree.filter(val);
      }
    },
    methods:{
        async getDeptTree(){
            const {data: res} =  await this.$http.post('/dept/tree',{});
             if(res.code !== 0){
                this.$message.error(res.msg) 
            }else{
                this.deptData = res.data
            }
        },
        filterNode(value, data) {
            console.log(data)
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        renderContent(h, { node, data, store }){
            let i = data.level > 1 ? 'bumen' : 'gongsi';
            return (
                <span>
                    <svg-icon icon-class={i}></svg-icon>&nbsp;&nbsp;
                    <span>{node.label}</span>
                </span>
            );
        },
        nodeClick(data,node,nodeList){
            this.$emit('setDeptId',data.id)
        }
    }

    
}
</script>

<style scoped>

.left{
    padding: 2px;
}


</style>