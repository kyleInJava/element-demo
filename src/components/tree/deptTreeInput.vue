//封装input 下拉部门树组件

<template>
    <div>
        <div  @click="toggleDropDown">
            <el-popover
                placement="bottom"
                width="240"
                trigger="click"
                >
                <el-tree
                    :data="deptData"
                    show-checkbox
                    node-key="id"
                    :props="props"
                    ref="deptTree"
                    @check="checkNode"
                >
                </el-tree>

                <el-input v-model="deptName" placeholder="请选择部门" 
                    :readonly = "true" @blur ="down = true" :style="{cursor:pointer }"
                    slot="reference">
                    <i class="el-icon-caret-bottom" slot="suffix" v-if="down"> </i>
                    <i class="el-icon-caret-top" slot="suffix" v-if="!down"> </i>
                </el-input>
            </el-popover>    
        </div>
    </div>
    
    
</template>

<script>

export default {
  data() {
      return {
          down : true,
          pointer: 'pointer',
          deptData: [],
          props: {
            children: 'children',
            label: 'name'
          },
          deptName:""
      }
  },
  created(){
      this.getDeptTree()
  },
  methods:{
      toggleDropDown(){
          this.down = !this.down;
      },
      async getDeptTree(){
          const {data : res} = await this.$http.post('/dept/tree',{});
          //如果请求不成功
          if(res.code !== 0){
            this.$message.error(res.msg)
          } else{
            this.deptData = res.data
            
          }
      },
      checkNode(node){
        this.$refs.deptTree.setCheckedKeys([node.id]);
        this.deptName = node.name
        this.$emit('setNodeId',node.id)
      },
      clearData(){
          this.$refs.deptTree.setCheckedKeys([]);
          this.deptName = ''
          console.log('aaa')
      }
  }
    
}
</script>

<style scoped>

div >>> .el-input__inner{
    cursor: pointer;
}

</style>