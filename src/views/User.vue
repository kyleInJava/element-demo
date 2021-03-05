<template>
    <section>
        <!-- 查询条件区域 -->
        <div class="toolbar">
            <el-form :model="filterForm" :inline="true" label-width="60px" size="mini" >
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="关键字">
                            <el-input v-model="keyword" placeholder="请输入姓名/手机号" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="状态">
                            <el-select v-model="state" placeholder="请选择状态">
                                <el-option
                                    v-for="item in states"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item >
                            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                            <el-button type="warning" icon="el-icon-plus" @click="dialogVisible = true">增加</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 左边的部门树 -->
        <el-row>
            <el-col :span="4" v-bind:style="{padding:'2px',border:'1px #cdf1fd solid',height:tableHight+'px'}">
                <LeftDeptTree @setDeptId="setDeptId($event)"></LeftDeptTree>
            </el-col>
            <el-col :span="20">
                <!-- 右边的表格 -->
                <el-table
                    :data="deptTableData"
                    style="width: 100%"
                    border
                    stripe
                    size="mini"
                    :highlight-current-row="true"
                    :header-cell-style="{'background-color':'#f5fdff'}"
                    :max-height="tableHight"
                    v-loading="loading"
                    element-loading-background="rgba(0, 0, 0, 0.5)"
                    element-loading-text="图标正在加载中"
                    >
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="mobile"  label="手机号" width="100"></el-table-column>
                    <el-table-column prop="realname" label="姓名" width="70"></el-table-column>
                    <el-table-column label="性别" width="60">
                        <template slot-scope="scope">
                        <el-tag :type="scope.row.sex === 1 ? '' : 'success'">{{scope.row.sex === 1 ? '男' : '女'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="deptName" label="部门" ></el-table-column>
                    <el-table-column prop="roleName" label="角色"></el-table-column>
                    <el-table-column label="状态" width="80">
                        <template slot-scope="scope">
                        <el-tag :type="scope.row.status === 0 ? 'success' : 'danger'">{{scope.row.status === 0 ? '正常' : '禁用'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="230">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="0" @change="stateChange(scope.row)"></el-switch>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="primary" icon="el-icon-edit" plain size="small">编辑</el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="warning" icon="el-icon-key" plain size="small">改密</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[15, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
    </section> 
</template>

<script>

import LeftDeptTree from '@/components/tree/LeftDeptTree.vue'

export default {
   data(){
       return{
           deptid: '',
           keyword : '',
           state: '',
           states:[
               {value: '' ,name: '全部'},
               {vaule: 0 ,name: '正常'},
               {value: 1 ,name: '禁用'}
           ],
           filterForm:{
               keyword:'',
               state: ''
           },
           deptTableData:[],
           pageNum:1,
           pageSize:15,
           total:20,
           loading:false,
           tableHight: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-250
       }
   },
   created(){
       this.search()
   },
   methods:{
       async search(){
           this.loading = true
           const param = {
               deptid: this.deptid,
               keyword: this.keyword,
               status: this.state,
               pageNum: this.pageNum,
               pageSize: this.pageSize,
               
           }
           const {data : res} = await this.$http.post('user/list',param);
           if(res.code !== 0) {
                this.$message.error(res.msg) 
           }else{
               this.deptTableData = res.data.list
               this.pageNum = res.data.pageNum
               this.pageSize = res.data.pageSize
               this.total = res.data.total
           }
           this.loading = false
       },
       handleSizeChange(val) {
        this.pageSize = val
        this.search()
       },
       handleCurrentChange(val) {
        this.pageNum = val
        this.search()
       },
       setDeptId(deptId){
           this.deptid = deptId
           this.search()
       },
       async stateChange(row){
            const {data: res} = await this.$http.post('/user/forbidden',{id: row.id});
            if(res.code !== 0){
                this.$message.error(res.msg)
            }else{
                this.$message.success("状态修改成功")
            }
       }
   },
   components:{
       LeftDeptTree
   }
}
</script>

<style scoped>

.toolbar >>> .el-form{
    padding: 0 22px;
}


.table{
    display: inline-block;
}

.el-pagination{
    float: right;
}


</style>