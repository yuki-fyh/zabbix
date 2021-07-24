<template>
  <div>
    <div class="head">

    </div>
    <div class="content">
        <div class="side">
          <div class="nav">
          </div>
          <div class="nav">

          </div>
          <div class="nav">

          </div>
        </div>
      <div class="inner">
        <ul>
          <li><label>主机名</label><input type="text" v-model="addForm.hostname" placeholder="请输入"></li>
          <li><label>群组</label><input type="text" v-model="addForm.hostGroup" placeholder="请输入"></li>
          <li><label>IP</label><input type="text" v-model="addForm.hostIp" placeholder="请输入"></li>
          <li><button @click="createHost">创建主机</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {createHost} from "@/api/zabbix";

export default {
name: "jiankong",
  data(){
      return{
         addForm:{
            hostname:'',
           hostGroup:'',
           hostIp:''
         }
      }
  },
  methods:{
    createHost:function (){//创建监控项
      const auth=this.$store.state.auth
      createHost(auth,this.addForm).then(function (response){
        console.log("创建成功");
        console.log(response.data)
        console.log(response.data.result)
      }).catch(function (error){
        console.log("创建失败")
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>
*{
  margin-right: 0;
}
body{
  margin: 0;
  padding: 0;
}
.head{
  width: 1550px;
  height: 80px;
  top:0;
  background-color: #2C3E50;
}
.side{
  height: 700px;
  width: 100px;
  background-color:#2C3E50 ;
  display: inline-block;
  vertical-align: top;
}
.nav{
  height: 50px;
  background-color: rgba(255,255,255,0);
  color: #ffff;
  font-size: 15px;
  font-family: 'SimSun';
}
.inner{
  width: 70%;
  height: 600px;
  display: inline-block;
  vertical-align: top;
}
</style>