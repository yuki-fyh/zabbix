<template>
  <div>
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
          <div id="container" style="width:200px;height:200px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomePage from '../../components/HomePage'
import { Liquid, measureTextWidth } from '@antv/g2plot';
import {getItem} from "../../api/admin";
export default {
  components:{HomePage},
  name: "chart1",
  data(){
    return{
      vm:'',
    }
  },
  created() {
    this.getAuth()
  },
  methods: {
    getAuth: function () {
      const _this = this
      _this.$store.dispatch('GetAdminAuth').then(function () {
        console.log("获取身份令牌成功")
        _this.getItem()
      })
    },
    getItem: function () {
      const auth = this.$store.state.auth
      const _this = this//解决函数内部this指向问题
      getItem(auth,"29177").then(function (response) {
        console.log(response.data)
        _this.vm = response.data.result
        console.log(_this.vm = _this.vm[0].value/100)

        _this.chart()
      })
    },
    chart: function () {
      const liquidPlot = new Liquid(document.getElementById('container'), {
        percent: this.vm,
        radius: 0.8,
        statistic: {
          title: {
            formatter: () => '磁盘利用率',
            style: ({percent}) => ({
              fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
            }),
          },
          content: {
            style: ({percent}) => ({
              fontSize: 60,
              lineHeight: 1,
              fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
            }),
            customHtml: (container, view, {percent}) => {
              const {width, height} = container.getBoundingClientRect();
              const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
              // const text = `占比 ${(percent * 100).toFixed(0)}%`;
              const text = `占比 ${(percent * 100).toFixed(2)}%`;
              console.log(percent*100)
              const textWidth = measureTextWidth(text, {fontSize: 60});
              const scale = Math.min(d / textWidth, 1);
              return `<div style="width:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${
                  scale <= 1 ? 1 : 'inherit'
              }">${text}</div>`;
            },
          },
        },
        liquidStyle: ({percent}) => {
          return {
            fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
            stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
          };
        },
        color: () => '#5B8FF9',
      });
      liquidPlot.render();

      let data = this.vm
      const interval = setInterval(() => {
        // this.getItem()

        // data += Math.min(Math.random() * 0.1, 0.1);
        if (data < 0.75) {
          liquidPlot.changeData(data);
        } else {
          clearInterval(interval);
        }
      }, 10000);
    }
  }
}
</script>

<style scoped>

</style>
