<template>
<div>
  <HomePage></HomePage>
   <button @click="getIp">获取数据</button>
  {{item[0]}}
  <button @click="createItem">创建</button>
  <br>
  <button @click="addTemplate">创建</button>

  <router-link to="/jiankong"><span>创建主机</span></router-link>
</div>
</template>

<script>
import HomePage from '../../components/HomePage'
import {getIp,create,addTemplate} from '@/api/zabbix'
export default {
  components: {HomePage},
  name: "login",
  data(){
      return{
        item:[],
      }
  },
  created() {
    this.login()
  },
  methods:{
    login:function (){//获取身份令牌
      // this.$store.dispatch('GetAuth')
    },
    getIp:function (){//获取主机相关信息
      var _this=this
      const auth=this.$store.state.auth
      getIp(auth).then(function (response){
        console.log("获取成功");
        console.log(response.data)
        console.log(response.data.result),
        _this.item=response.data.result
      }).catch(function (error){
        console.log("获取失败")
        console.log(error)
      })
    },
    createItem:function (){//创建监控项
      var _this=this
      const auth=this.$store.state.auth
      create(auth).then(function (response){
        console.log("创建成功");
        console.log(response.data)
        console.log(response.data.result),
            _this.item=response.data.result
      }).catch(function (error){
        console.log("创建失败")
        console.log(error)
      })
    },
    addTemplate:function (){//创建模板
      var _this=this
      const auth=this.$store.state.auth
      addTemplate(auth).then(function (response){
        console.log("添加成功");
        console.log(response.data)
        console.log(response.data.result),
            _this.item=response.data.result
      }).catch(function (error){
        console.log("添加失败")
        console.log(error)
      })
    }
  }
}
</script>

<style>
.login {
  width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  background-position: left top;
  background-color: #242645;
  /*background-image: url("../../assets/hh.jpg");*/
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
#mylogin{
  width: 400px;
  height: 280px;
  margin: 200px auto auto;
  border-radius: 10px;
  border-color:floralwhite;
  background: rgba(255,255,255,0.2);
}
/*.logo{*/
/*  width: 100px;*/
/*  height: 100px;*/
/*  position: relative;*/
/*  top: 50px;*/
/*  left: 150px;*/
/*}*/
.logo img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.loginBox{
  height: 220px;
  background-color: white;
  padding-top: 50px;
}
.box-content{
  width: 350px;
  margin-left: auto;
  margin-right: auto;
}
</style>
