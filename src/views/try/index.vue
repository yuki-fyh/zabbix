<template>
<div>
  <h1>111</h1>
  <a-button @click="GetCPU">1</a-button>
</div>
</template>

<script>
import {GetCPU} from '@/api/zabbix'
export default {
  name: "index",
  data(){
    return{

    }
  },
  methods:{
    GetCPU:function (){//获取主机相关信息
      var _this=this
      const auth=this.$store.state.auth
      // const hostid=this.$store.state.hostGroupId
      // const auth =  '81a5ce6d2e6b1d57b506359a37202ff7'
      GetCPU(auth,1).then(function (response){
        console.log('auth',auth);
        console.log('hostid',34);
        console.log("获取成功");
        console.log(response.data)
        // console.log(response.data.result),
            _this.item=response.data.result
      }).catch(function (error){
        console.log("获取失败")
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>

</style>
