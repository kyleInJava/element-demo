<template>
    <section>

        <!-- 查询条件区域 -->
        <div class="toolbar">
            <el-form :model="filterForm" :inline="true" label-width="80px" size="mini" >
                <el-form-item label="部门">
                    <DeptTreeInput @setNodeId="setNodeId($event)" ref="deptTree"></DeptTreeInput>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button type="info" icon="el-icon-delete" @click="clearQueryParam">清空</el-button>
                    <el-button type="warning" icon="el-icon-plus" @click="dialogVisible = true">新增公司</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 新增公司弹框 -->
        <el-dialog title="新增公司" :visible.sync="dialogVisible" width="30%" 
            :close-on-click-modal="false"
            @closed="clearData('addDeptFormRef')"
            >
            <el-form ref="addDeptFormRef" :model="addForm" label-width="80px" :rules="addRules" >
                <el-form-item label="公司名称" prop="deptName">
                    <el-input v-model="addForm.deptName" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="addForm.order" @change="handleChange" :min="1" :max="10" label="排序"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :rows="2" v-model="addForm.remark"  placeholder="请输入备注" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddForm()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增部门弹框 -->
        <el-dialog :title="isAdd ? '新增部门' : '修改部门'" :visible.sync="deptDialogVisible" width="30%" 
            :close-on-click-modal="false"
            @closed="clearData('addSubDeptFormRef')"
            >
            <el-form ref="addSubDeptFormRef" :model="subDeptForm" label-width="80px" :rules="addSubDeptRules" >
                <el-form-item label="上级部门">
                    <el-input v-model="subDeptForm.pName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="deptName">
                    <el-input v-model="subDeptForm.deptName" placeholder="请输入部门名称"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="subDeptForm.order" @change="handleChange" :min="1" :max="10" label="排序"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :rows="2" v-model="subDeptForm.remark"  placeholder="请输入备注" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deptDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="isAdd ? submitSubDeptForm() : editDept()">确 定</el-button>
                <!-- <el-button type="primary" @click="submitSubDeptForm()" v-if="!isAdd">确 定</el-button> -->
            </span>
        </el-dialog>

        <!-- 树形列表数据区 -->
        <el-table
            :data="tableData"
            :row-style="{height: '40px'}"
            row-key="id"
            size="mini"
            border
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column prop="name" label="部门名称"  width="180" ></el-table-column>
                <el-table-column label="类型" width="120">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.level == 1 ? 'info' : 'warning'">
                                {{ scope.row.level == 1 ? '公司' : '部门'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="pName" label="上级部门" width="180"> </el-table-column>
                <el-table-column prop="sort" label="排序" width="60"> </el-table-column>
                <el-table-column prop="rmk" label="备注"> </el-table-column>
                <el-table-column prop="updName" label="修改人" width="100"> </el-table-column>
                <el-table-column prop="updtm" label="修改时间" width="160"> </el-table-column>
                <el-table-column prop="" label="操作" width="245">
                    <template  slot-scope="scope">
                        <el-button type="warning" plain size="mini" @click="addSubDept(scope.row)">添加部门</el-button>
                        <el-button type="primary" plain size="mini" @click="editDeptInfo(scope.row)">编辑</el-button>
                        <el-button type="danger" plain size="mini" @click="deleteDept(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
    </section>
</template>

<script>
import DeptTreeInput from '@/components/tree/deptTreeInput.vue'

export default {
    data(){
        return {
            filterForm:{
                name : ''
            },
            tableData: [],
            deptId:null,
            dialogVisible: false,
            deptDialogVisible: false,
            addForm:{
                deptName: '',
                order: 1,
                remark: ''
            },
            subDeptForm:{
                id: '',
                pid: '',
                pName: '',
                deptName: '',
                order: 1,
                remark: ''
            },
            addRules:{
                deptName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                    { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
                ],
                remark: [
                    { max: 20, message: '备注要少于 20 个字符', trigger: 'blur' }
                ]

            },
            addSubDeptRules:{
                deptName: [
                    { required: true, message: '请输入部门名称', trigger: 'blur' },
                    { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
                ],
                remark: [
                    { max: 20, message: '备注要少于 20 个字符', trigger: 'blur' }
                ]

            },
            //根据这个标志来判断是否为新增还是修改
            isAdd: true
            
        }
    },
    components:{
        DeptTreeInput
    },
    created(){
        this.search()
    },
    methods:{
        async search(){
            let param = {}
            if(this.deptId !== null){
                param.id = this.deptId
            }
            let {data : res} = await this.$http.post('/dept/tree',param)
            if(res.code === 0){
                this.tableData = res.data  
            }else{
                this.$message.error(res.msg)
            }
        },
        setNodeId(deptId){
            this.deptId = deptId;
        },
        clearQueryParam(){
            this.deptId = null
            this.$refs.deptTree.clearData();
        },
        handleChange(){
            this.order += this.order;
        },
        clearData(formRef){
            this.$refs[formRef].resetFields();
        },
        submitAddForm(){
            this.$refs.addDeptFormRef.validate(async valid =>{
                if(!valid) return ;
                const param = {
                    pid:'',
                    name:this.addForm.deptName,
                    sort: this.addForm.order,
                    rmk: this.addForm.remark
                }
                const {data : res} =await this.$http.post('dept/add',param);
                if(res.code !== 0){
                    this.$message.error(res.msg)
                }else{
                    this.dialogVisible = false
                    this.$message.success("添加公司成功")
                    this.search();
                }
            })
        },
        addSubDept(row){
            this.isAdd = true
            this.subDeptForm.pName = row.name
            this.subDeptForm.pid = row.id
            this.deptDialogVisible =  true
        },
        submitSubDeptForm(){
            this.$refs.addSubDeptFormRef.validate(async valid =>{
                if(!valid) return ;
                const param = {
                    pid:this.subDeptForm.pid,
                    name:this.subDeptForm.deptName,
                    sort: this.subDeptForm.order,
                    rmk: this.subDeptForm.remark
                }
                const {data : res} =await this.$http.post('dept/add',param);
                if(res.code !== 0){
                    this.$message.error(res.msg)
                }else{
                    this.deptDialogVisible = false
                    this.$message.success("添加部门成功")
                    this.search();
                }
            })
        },
        async editDeptInfo(row){
            
            const{data : res} = await this.$http.post('/dept/get',{id: row.id});
            if(res.code !== 0){
                this.$message.error(res.msg)
            }else{

                this.subDeptForm.id = res.data.id
                this.subDeptForm.pid = res.data.pid
                this.subDeptForm.pName = res.data.pName
                this.subDeptForm.deptName = res.data.name
                this.subDeptForm.order = res.data.sort
                this.subDeptForm.remark = res.data.rmk
                
                this.isAdd = false
                this.deptDialogVisible = true
            }
        },
        async editDept(){
            this.$refs.addSubDeptFormRef.validate(async valid =>{
                if(!valid) return ;
                const param = {
                    id: this.subDeptForm.id,
                    pid:this.subDeptForm.pid,
                    name:this.subDeptForm.deptName,
                    sort: this.subDeptForm.order,
                    rmk: this.subDeptForm.remark
                }
                const {data : res} =await this.$http.post('dept/edit',param);
                if(res.code !== 0){
                    this.$message.error(res.msg)
                }else{
                    this.deptDialogVisible = false
                    this.$message.success("修改部门成功")
                    this.search();
                }
            })
        },
        async deleteDept(row){
            const{data : res} = await this.$http.post('/dept/delete',{id: row.id});
            if(res.code !== 0){
                this.$message.error(res.msg)
            }else{
               this.$message.success("删除成功")
               this.search();
            }
        }
    }
}
</script>

<style scoped>

 
</style>