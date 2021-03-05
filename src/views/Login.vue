<template>
  <div class="login-container">
      <div class="login-box">
          <div class="login-box-title">
            <img src="../assets/images/login/logo.png" class="title-img">
            <div class="title-font">
              <span class="login-title-font1">巡查管理系统</span>
              <br>
              <span class="login-title-font2">XUN CHA GUAN LI XI TONG</span>
            </div>
          </div>
          
          <el-form :label-position="labelPosition" ref="loginFormRef" :rules="loginRules" label-width="0" :model="loginForm" class="login-form">
            <el-form-item prop="account">
              <el-input v-model="loginForm.account" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" prefix-icon="el-icon-ice-cream-round" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="warning" @click="resetForm()" class="form-button">重置</el-button>
              <el-button type="success" @click="submitForm('loginForm')"  class="form-button">登录</el-button>
            </el-form-item>
          </el-form>
            
      </div>
      <div class="login-foot">
          <p class="p-copyright">© Copyright 2021. 深圳市鑫梓润智慧城市管家股份有限公司  版权所有 </p>
      </div>
  </div>
  
</template>

<script>

export default {
   name: "login",
    data() {
      return {
        labelPosition: 'right',
        loginForm: {
          account: '13812345678',
          password: '123456'
        },
        loginRules:{
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 6, max: 12, message: '账号长度为6到12位', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '密码长度为6到12位', trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
      //重置表单数据
      resetForm(){
        this.$refs.loginFormRef.resetFields();
      },
      //
      submitForm(){
          //参数校验,这里必须设置为异步，不然无法使用await
          this.$refs.loginFormRef.validate(async valid => {
            //如果没有通过，直接返回
            if(!valid) return;
            //发送登录请求
            const { data: res} =  await this.$http.post('login',{
              username :this.loginForm.account,
              password :this.loginForm.password
            });
            //如果登录失败
            if(res.code !== 0 ){
              this.$message.error(res.msg)
            } else {//登录成功
              const token =  res.data.token;
              //将token保存在sessionStorage
              window.sessionStorage.setItem('token',token);
              this.$store.commit('clear')
              this.$router.push("/index")
            }
          });
          
      }
    }
};
</script>

<style scoped>

.login-container {
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/login/bg.jpg');
}

.login-box{
    width:500px;
    height:432px;
    background-color:#314355;
    border-radius: 0.5em;
    position:absolute;
    left:50%;
    top : 50%;
    transform: translate(-50%,-28%);
}


.login-box-title{
    width:100%;
    height: 128px;
    border-top-right-radius:0.5em;
    border-top-left-radius:0.5em;
    background-color: #3b4a5a;
    color:#fff;
    display: flex;
    align-items: center;
    
}


.title-img{
  width:58px;
  margin-left:82px ;
}

.title-font{
  margin-left: 16px;
}

.login-title-font1{
  font-size: 30px;
  font-weight: 700;
}

.login-title-font2{
  font-size: 14px;
}

.login-form{
  position: absolute;
  bottom: 45px;
  width: 100%;
  padding:0 80px;
  box-sizing: border-box;
}


.login-form >>> .el-input__inner{
  border-radius:20px;
}

.form-button{
  width: 108px;
  margin-left: 35px;
}

.login-foot{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 32px;
    background-color: #3E4F64;
}

.p-copyright{
    text-align: center;
    margin: 0 auto;
    padding: 9px 0;
    font-size: 12px;
    color: #868E97;
}

</style>