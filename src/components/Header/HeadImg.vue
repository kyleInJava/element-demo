
<template>
  <div class="head">
    <div class="headImg">
        <el-dropdown  @command="handleCommand">
        <img src="@/assets/images/head.jpg" class="headImgClass" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :close-on-click-modal ="false">
      <el-form :model="changePwdform" :rules="changePwdRules" ref="changePwdFormRef" >
        <el-form-item label="当前密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="changePwdform.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
          <el-input v-model="changePwdform.newPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" :label-width="formLabelWidth" prop="newPassword2">
          <el-input v-model="changePwdform.newPassword2" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmChange">确 定</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>





<script>
export default {
    data(){
        return{
          dialogFormVisible: false,
          formLabelWidth: '120px',
          changePwdform: {
            name: '',
            password: '',
            newPassword: '',
            newPassword2: ''
          },
          changePwdRules:{
            password: [
              { required: true, message: '请输入当前密码', trigger: 'blur' },
              { min: 6, max: 12, message: '密码长度为6到12位', trigger: 'blur' }
            ],
            newPassword: [
              { required: true, message: '请输入新密码', trigger: 'blur' },
              { min: 6, max: 12, message: '密码长度为6到12位', trigger: 'blur' }
            ],
            newPassword2: [
              { required: true, message: '请输入重复密码', trigger: 'blur' },
              { min: 6, max: 12, message: '密码长度为6到12位', trigger: 'blur' }
            ]
          }
        }
    },
    methods:{
      handleCommand(command){

        if(command === 'changePwd'){
          this.changePwd();
        }else if(command === 'logout'){
            this.logout()
        }
      },
      changePwd(){
        this.dialogFormVisible = true
        //这样写是为了避免第一次执行这个方法时，表单还没有生成，然后清除表单的时候报错。
        this.$nextTick(()=>{
          this.$refs.changePwdFormRef.resetFields();
        })
      },
      confirmChange(){
        //参数校验,这里必须设置为异步，不然无法使用await
        this.$refs.changePwdFormRef.validate(async valid => {
          //如果没有通过，直接返回
          if(!valid) return;
          //发送登录请求
          const { data: res} =  await this.$http.post('/user/password2',{
            oldPwd :this.changePwdform.password,
            newPwd :this.changePwdform.newPassword
          });
          //如果登录失败
          if(res.code !== 0 ){
            this.$message.error(res.msg)
          } else {//登录成功
            this.dialogFormVisible = false
            this.$router.push('/login')
          }
        });
        
      },
      async logout(){
          const { data: res} =  await this.$http.post('/logout',{});
          if(res.code !== 0 ){
            this.$message.error(res.msg)
          } else {//登录成功
            this.$router.push('/login')
          }
      }
    }

}
</script>

<style scoped>

.head{
  width: 75px;
  display: inline-block;
}

.headImg{
  height: 100%;
  width: 100%;
  display: inline-block;
  vertical-align: top;
}

.headImgClass{
  margin-top:2px;
  width:46px;
  height: 46px;
}
</style>