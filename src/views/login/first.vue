<template>
  <div class="finish-wrap">
    <div class="center-wrap">
      <h1>树莓派，基于Zabbix的数据采集系统</h1>
      <!--登录框-->
      <div class="box-wrap">
        <!--普通用户-管理员切换-->
        <div>
          <div class="half-wrap" id="left">
            <div class="selected">
              <a><p class="p1">普通用户</p></a>
              <a-divider />
            </div>
          </div>
          <div class="half-wrap" id="right">
            <div class="" @click="jump()">
              <a><p class="p1">管理员</p></a>
              <a-divider />
            </div>
          </div>
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
            <a-form-model-item label="密码" ref="password" prop="password">
              <a-input v-model="loginForm.form.password" type="password" placeholder="请输入您的登录密码"><a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/></a-input>
            </a-form-model-item>
<!--            <a-form-model-item :wrapperCol="itemWrapper" >-->
              <div class="btn_register">
                <a @click="register">立即注册</a>
              </div>
<!--            </a-form-model-item>-->
<!--            <a-form-model-item :wrapperCol="itemWrapper" id="btn">-->
              <div class="login-button">
                <a-button type="primary" @click="login" >登录</a-button>
              </div>
<!--            </a-form-model-item>-->
          </a-form-model>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {getIp,create,addTemplate} from '@/api/zabbix'
// import {login} from '@/api/user'
// import md5 from 'md5'
export default {
  name: "LoginRegister",
  data(){
    return{
      item:[],
      loginForm: {
        rules: {
          user: [{ required: true, message: '请输入昵称',trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        },
        form: {
          user: '',
          password: ''
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
    // login:function (){
    //   //获取admin令牌
    //   const _this=this
    //   console.log(this.username,this.password)
    //   _this.$store.dispatch('GetUserAuth',{uname:'lhl'}).then(function (){
    //     console.log("登陆成功")
    //     console.log('111',_this.$store.state.auth)
    //     console.log('222',_this.$store.state.hostGroupId)
    //     _this.$router.push({ name: 'abrove'})
    //     this.$message.success('登录成功');
    //   }).catch(function (){
    //     alert("登陆失败")
    //   })
    // },
    // login:function (){//获取身份令牌
    //   this.$store.dispatch('GetAuth')
    //   this.$message.success('登录成功');
    // },
    // getIp:function (){//获取主机相关信息
    //   var _this=this
    //   const auth=this.$store.state.auth
    //   getIp(auth).then(function (response){
    //     console.log("获取成功");
    //     console.log(response.data)
    //     console.log(response.data.result),
    //         _this.item=response.data.result
    //   }).catch(function (error){
    //     console.log("获取失败")
    //     console.log(error)
    //   })
    // },
    // createItem:function (){//创建监控项
    //   var _this=this
    //   const auth=this.$store.state.auth
    //   create(auth).then(function (response){
    //     console.log("创建成功");
    //     console.log(response.data)
    //     console.log(response.data.result),
    //         _this.item=response.data.result
    //   }).catch(function (error){
    //     console.log("创建失败")
    //     console.log(error)
    //   })
    // },
    // addTemplate:function (){//创建模板
    //   var _this=this
    //   const auth=this.$store.state.auth
    //   addTemplate(auth).then(function (response){
    //     console.log("添加成功");
    //     console.log(response.data)
    //     console.log(response.data.result),
    //         _this.item=response.data.result
    //   }).catch(function (error){
    //     console.log("添加失败")
    //     console.log(error)
    //   })
    // },
    jump(){
      this.$router.push({ path: '/manager' })
    },
    register () {
      // this.$router.push({ path: '/register' })
      //命名路由带路由参数 需要使用name 进行路由跳转
      this.$router.push({ name: 'register'})
      // 命名路由带查询参数 显示拼接在url上，刷新不丢失
      //   this.$router.push({ name: 'register', query: { data: 'hhh' } })
    },
    // login() {
    //   this.loginForm.form.password = md5(this.loginForm.form.password)
    //   login(this.loginForm.form.user,this.loginForm.form.password).then(res => {
    //     console.log(this.loginForm.form.user)
    //     console.log('登录', res.data)
    //     if(res.data.resultCode === '200') {
    //       console.log(res.data.resultCode)
    //       alert('注册成功')
    //       this.$router.push({
    //         name: 'login'
    //       })
    //     }
    //   })
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('loginForm', this.loginForm.form)
          // 普通写法
          // login(this.loginForm.form.telephone, md5(this.loginForm.form.password)).then(res => {
          //   console.log('登录', res)
          // })
          // 全局状态管理
          this.$store.dispatch('login',this.loginForm.form).then(() => {

            //getInfo
            this.$store.dispatch('getInfo').then(() => {
              console.log('登录成功')
            this.$router.push({
              name: 'abnormal'
            })
            })
          })
        } else {
          this.$message.info('请正确填写相关信息');
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/first.css';
</style>
