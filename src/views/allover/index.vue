<template>
<!--  水波图-->
  <div>
    <p style="position:absolute;top:12px;right:114px;text-align:center;vertical-align:middle;line-height:18px;font-size: 8px;height:6px;background-color:red;border-radius: 5px;width:6px;float:right;margin-top:5px;z-index:1000"></p>

    <HomePage></HomePage>
    <div style="position:absolute;top:79px;left:242px;">
      <span>监控概要</span>
      <div style="position:absolute;left:-6px;top:40px;width:1150px;overflow:hidden">
        <div style="width:1200px;margin:auto">
          <div style="display: inline-block;float:left;margin-top:7px;margin-right:7px">
            <svg t="1627011187992" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4759" width="18" height="18"><path d="M896 1024H192a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h704a64 64 0 0 1 64 64v896a64 64 0 0 1-64 64zM832 160a32 32 0 0 0-32-32H352a32 32 0 0 0-32 32v449.984a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V160z m0 640a32 32 0 0 0-32-32H255.36A63.328 63.328 0 0 0 192 831.36v1.28A63.328 63.328 0 0 0 255.36 896H800a32 32 0 0 0 32-32v-64z m-160-416h-192a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32z" fill="#515151" p-id="4760"></path></svg>
          </div>
          <h2 style="font-weight:600;margin-top:0px;width:200px;float:left">监控概要</h2>

        <a-divider />
          <div id="container"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import HomePage from '../../components/HomePage'
import {getItem} from "../../api/admin";
import { Chart } from '@antv/g2';

export default {
  components:{HomePage},
  name: 'antv',
  data(){
    return{
      CPU:[],
    }
  },
  created() {
    this.getAuth()
  },
  methods:{
    getAuth:function (){
      const _this=this
      _this.$store.dispatch('GetAdminAuth').then(function (){
        console.log("获取身份令牌成功")
        _this.getItem()
      })
    },
    getItem:function (){
      const auth=this.$store.state.auth
      const _this=this//解决函数内部this指向问题
      getItem(auth).then(function (response){
        console.log(response.data)
        _this.CPU=response.data.result
        //提取部分属性，并将时间戳转换后存入数组
        _this.CPU=_this.CPU.map((item)=>{
          console.log('item',item)
          const times=new Date(item.clock*1000)
          return Object.assign({},
              {time:(times.toTimeString().substr(0, 8)),
                value:Number(item.value),itemid:item.itemid},)
        })
        _this.chart()
      })
    },
    chart:function() {
      const data=this.CPU.reverse()
      console.log("赋值给data:",data)
      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500,
      });
      chart.data(data);
      chart.scale({
        year: {
          range: [0, 1],
        },
        value: {
          min: 0,
          nice: true,
        },
      });

      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
      });

      chart.axis('value', {
        label: {
          formatter: (val) => {
            return val;
          },
        },
      });

      chart
          .line()
          .position('time*value')
          .color('itemid')
          .shape('split-line');//smooth为平滑曲线

      chart
          .point()
          .position('time*value')
          .color('itemid')
          .shape('circle');
      chart.render();
    },
  }
}
</script>
