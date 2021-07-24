<template>
  <div class="finish-wrap">
    <div class="center-wrap">
      <h1>树莓派，基于Zabbix的数据采集系统</h1>
      <!--登录框-->
      <div class="box-wrap">
        <!--普通用户-管理员切换-->
        <div>
          <h2>注册</h2>
        </div>
        <!--登录表单-->
        <div class="form">
          <a-form-model
              ref="loginForm"
              :rules="loginForm.rules"
              :model="loginForm.form"
              :label-col="layout.labelCol"
              :wrapper-col="layout.wrapperCol">
            <!-- ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。此时FormModal的注册信息
             为loginForm， $refs是所有注册过ref的集合-->
            <a-form-model-item label="昵称" ref="user" prop="user">
              <a-input v-model="loginForm.form.user" placeholder="请输入您的昵称"><a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/></a-input>
            </a-form-model-item>
            <a-form-model-item label="电话号码" ref="telephone" prop="telephone">
              <a-input v-model="loginForm.form.telephone" placeholder="请输入您的电话号码"><a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)"/></a-input>
            </a-form-model-item>
            <a-form-model-item label="密码" ref="password" prop="password">
              <a-input v-model="loginForm.form.password" type="password" placeholder="请输入您的登录密码"><a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/></a-input>
            </a-form-model-item>
            <a-form-model-item label="确认密码" ref="psw" prop="psw">
              <a-input v-model="loginForm.form.psw" type="password" placeholder="请输入确认密码"><a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/></a-input>
            </a-form-model-item>
            <!--            <a-form-model-item :wrapperCol="itemWrapper" >-->
            <div class="btn_register">
              <a @click="jump()">立即登录</a>
            </div>
            <!--            </a-form-model-item>-->
<!--            <a-form-model-item :wrapperCol="itemWrapper">-->
              <div class="login-button">
                <a-button type="primary" @click="register">注册</a-button>
              </div>
<!--            </a-form-model-item>-->
          </a-form-model>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import { register } from '@/api/user'
import { validMobile } from "@/utils/validate";
export default {
  name: "LoginRegister",
  data(){
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入电话号码'))
      }
      if (!validMobile(value)) {
        return callback(new Error('请输入正确格式电话号码'))
      }
      callback()
    }
    const validatevertify = (rule,value,callback) => {
      if(!value) {
        return callback(new Error('请输入确认密码'))
      }
      if(value !== this.loginForm.form.password) {
        return callback(new Error('两次输入的密码不一致'))
      }
      callback()
    }
    return{
      loginForm: {
        rules: {
          user: [{ required: true, trigger: 'blur',message: '请输入昵称',}],
          telephone: [{ required: true, trigger: 'blur' , validator: validateMobile}],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          psw: [{ required: true, trigger: 'blur' , validator: validatevertify}]
        },
        form: {
          telephone: '',
          password: '',
          psw: '',
          user:'',
        }
      },
      layout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 12 },
      },
      itemWrapper: { span: 24 }
    }
  },
  methods:{
    // createHostGroup:function (){
    //   const _this=this
    //   _this.$store.dispatch('CreateHostGroup').then(function (){
    //     console.log("创建主机群组成功")
    //     _this.createUserGroup()
    //   })
    // },
    // createUserGroup:function (){
    //   const _this=this
    //   _this.$store.dispatch('CreateUserGroup').then(function (){
    //     console.log("创建用户群组成功")
    //     _this.createUser()
    //   })
    // },
    // createUser:function (){
    //   const  auth=this.$store.state.auth
    //   const  userGroupId=this.$store.state.userGroupId
    //   const _this=this
    //   createUser(auth,this.loginForm.form.user,this.loginForm.form.password,userGroupId).then(function (response){
    //     console.log("创建用户成功")
    //     console.log(response.data)
    //     _this.$router.push('/')
    //   })
    // },
    jump(){
      this.$router.push({ path: '/first' })
    },
    // register:function (){
    //   //获取admin令牌
    //   const _this=this
    //   // _this.$store.dispatch('GetAdminAuth').then(function (){
    //   //   console.log(111)
    //   // })
    //
    //   _this.$store.dispatch('GetAdminAuth').then(function (){
    //     console.log(111)
    //   })
    //  _this.createHostGroup()
    //   this.$message.success('注册成功');
    // }

    register() {
      this.loginForm.form.password = md5(this.loginForm.form.password)
      register(this.loginForm.form.user,this.loginForm.form.password,this.loginForm.form.telephone).then(res => {
        console.log(this.loginForm.form.user)
        console.log('注册', res.resultCode)
        if(res.resultCode === '200') {
          console.log(res.resultCode)
          this.$message.success('注册成功');
          this.$router.push({
            name: 'login'
          })
        }
        else{
          this.$message.info('请正确填写相关信息');
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/first.css';
@import '../../assets/css/register.css';
</style>
