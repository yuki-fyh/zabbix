<template>
  <div class="finish-wrap">
    <div class="center-wrap">
      <h1>树莓派，基于Zabbix的数据采集系统</h1>
      <!--登录框-->
      <div class="box-wrap">
        <!--普通用户-管理员切换-->
        <div>
          <div class="half-wrap" id="left">
            <div class="" @click="jump()">
              <a><p class="p1">普通用户</p></a>
              <a-divider />
            </div>
          </div>
          <div class="half-wrap" id="right">
            <div class="selected">
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
            <a-form-model-item label="账号" ref="userid" prop="userid">
              <a-input v-model="loginForm.form.useerid" placeholder="请输入您的账号"><a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)"/></a-input>
            </a-form-model-item>
            <a-form-model-item label="密码" ref="password" prop="password">
              <a-input v-model="loginForm.form.password" type="password" placeholder="请输入您的登录密码"><a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/></a-input>
            </a-form-model-item>
<!--            <a-form-model-item :wrapperCol="itemWrapper">-->
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
export default {
  name: "LoginRegister",
  data(){
    return{
      loginForm: {
        rules: {
          userid: [{ required: true, trigger: 'blur',message: '请输入账号', }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        },
        form: {
          userid: '',
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
    jump(){
      this.$router.push({ path: '/first' })
    },
    register () {
      // this.$router.push({ path: '/register' })
      //命名路由带路由参数 需要使用name 进行路由跳转
      this.$router.push({ name: 'register', params: { data: 'hhh' } })
      // 命名路由带查询参数 显示拼接在url上，刷新不丢失
      //   this.$router.push({ name: 'register', query: { data: 'hhh' } })
    },
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
            console.log('登录成功')
            //getInfo
            // this.$store.dispatch('getInfo').then(() => {
            this.$router.push({
              name: 'home'
            })
            // })
          })
          this.$message.success('登录成功');
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
