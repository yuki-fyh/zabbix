<template>
  <div>
<!--    <a-badge dot>-->
<!--      <a-icon type="notification" :style="{ fontSize: '20px', color: 'white' ,position:'absolute',top:'20px',right:'120px'}"/>-->
<!--    </a-badge>-->
    <a-icon @click="turnto()" type="notification" :style="{ fontSize: '20px', color: 'white' ,position:'absolute',top:'20px',right:'120px'}"/>
     <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <!--      <div class="logo" />-->
        <div id="box1">
          <p v-show="collapsed">xxx</p>
          <p v-show="collapsed == false">xxx</p>
        </div>
<!--        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" id="menu">-->
        <a-menu theme="dark" mode="inline" :default-selected-keys="[key]" id="menu">
          <a-menu-item key="1" @click="run1()">
            <div class="icon2">
              <svg t="1626766970761" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1202" width="15" height="15"><path d="M896 1024H192a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h704a64 64 0 0 1 64 64v896a64 64 0 0 1-64 64zM832 160a32 32 0 0 0-32-32H352a32 32 0 0 0-32 32v449.984a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V160z m0 640a32 32 0 0 0-32-32H255.36A63.328 63.328 0 0 0 192 831.36v1.28A63.328 63.328 0 0 0 255.36 896H800a32 32 0 0 0 32-32v-64z m-160-416h-192a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32z" fill="#ffffff" p-id="1203"></path></svg>
            </div>
            <span v-show="collapsed===false">监控概要</span>
          </a-menu-item>

          <a-sub-menu key="sub">
            <span slot="title">
              <div class="icon2">
               <svg t="1626767565434" class="icon" viewBox="0 0 1286 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4881" width="16" height="16"><path d="M792.260975 437.207122a56.22205 56.22205 0 0 0-29.32832 8.153046l-2.09488-3.453721-141.319474 141.772421c-1.981643 0.113237-4.076523 0.056618-5.888311 0.169855-48.012385 0-87.135685 39.010063-87.192303 87.022448 0 48.069004 39.1233 87.192303 87.192303 87.192304s87.192303-39.1233 87.135685-86.343028a45.464558 45.464558 0 0 0 0.283092-6.228022l131.467876-131.128165a56.618379 56.618379 0 0 0 16.645803-40.255668 56.278669 56.278669 0 0 0-16.702422-40.199049 56.505142 56.505142 0 0 0-40.199049-16.702421z" p-id="4882" fill="#ffffff"></path><path d="M1164.979763 284.733827C970.21254-3.623576 577.337609-79.775296 288.866969 114.822072 0.566184 309.532677-75.642154 702.520845 119.068451 991.048104c9.625124 13.814884 25.081942 22.36426 41.784363 23.156916l0.905894 0.396329h2.491209a53.900697 53.900697 0 0 0 46.540307-80.171624l-1.981643-3.566958a519.303771 519.303771 0 0 1-88.834236-259.708504l57.920601-0.056618c28.139334-1.981643 50.843304-24.742232 52.881566-52.881566a57.184563 57.184563 0 0 0-53.617605-60.921376h-52.994802a520.492757 520.492757 0 0 1 93.420325-227.152936l30.913635 30.857017c21.231892 18.457592 53.334513 18.570828 74.679642 0.33971 23.892956-20.439235 26.723875-56.618379 5.718456-81.190755l-33.857791-34.197501a526.154595 526.154595 0 0 1 289.999337-128.863431l-0.056619 1.641933 0.056619 72.811236c1.981643 28.252571 24.79885 51.013159 53.051421 53.051421a55.54263 55.54263 0 0 0 41.444653-13.871503 57.184563 57.184563 0 0 0 19.589959-39.915957V119.125069l-0.056618-1.472078a524.682517 524.682517 0 0 1 287.904456 126.881787l-36.292381 36.292381c-18.51421 21.684839-18.400973 53.051421 0.283092 74.566405a56.844852 56.844852 0 0 0 81.134137 5.208891l32.442331-32.102621a517.831693 517.831693 0 0 1 95.401969 228.681632l-55.655867 0.056619a57.354418 57.354418 0 0 0-52.881566 52.881566 56.901471 56.901471 0 0 0 53.617605 60.921375h59.789008a519.303771 519.303771 0 0 1-86.116554 255.405507 53.730842 53.730842 0 0 0 54.919827 81.360611 53.504368 53.504368 0 0 0 34.93354-22.307642 629.143426 629.143426 0 0 0-3.566958-700.765675z" p-id="4883" fill="#ffffff"></path></svg>
              </div>
              <span v-show="collapsed===false">资源管理</span>
            </span>
            <a-menu-item key="7">
              操作系统信息
            </a-menu-item>
            <a-menu-item key="8">
              网卡信息
            </a-menu-item>
            <a-menu-item key="9">
              进程信息
            </a-menu-item>
            <a-menu-item key="10">
              处理器信息
            </a-menu-item>
            <a-menu-item key="11">
              内存信息
            </a-menu-item>
            <a-menu-item key="12">
              文件系统信息
            </a-menu-item>
            <a-menu-item key="13">
              Web应用信息
            </a-menu-item>
            <a-menu-item key="14">
              安全信息
            </a-menu-item>
            <a-menu-item key="15">
              Agent信息
            </a-menu-item>
            <a-menu-item key="16">
              端口信息
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item key="3"  @click="run3()">
            <div class="icon2">
              <svg t="1626767590416" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5765" width="18" height="18"><path d="M532 712c12.3 0 22.4-3.9 31.4-11.8 7.8-7.8 12.3-18.5 12.3-30.8s-4.5-22.4-12.3-30.2c-8.4-7.8-19-11.8-31.4-11.8s-22.4 3.9-30.2 11.8c-9 7.8-12.9 17.9-12.9 30.2s3.9 22.4 12.9 30.2c7.8 7.9 17.9 12.4 30.2 12.4z m25.2-138.6l11.5-235c0.7-14.3-10.7-26.2-25-26.2h-23.1c-14.3 0-25.7 12-25 26.2l11.5 235c0.7 13.3 11.6 23.8 25 23.8 13.5 0 24.5-10.5 25.1-23.8zM512 912c-220.9 0-400-179.1-400-400s179.1-400 400-400 400 179.1 400 400-179.1 400-400 400z" p-id="5766" fill="#ffffff"></path></svg>
            </div>
            <span v-show="collapsed===false">异常信息
              <!--              <a-badge count="5" :number-style="{-->
              <!--              height:'10px',-->
              <!--              width:'2px',-->
              <!--              color: '#999',-->
              <!--              // boxShadow: '0 0 0 1px #d9d9d9 inset',-->
              <!--              border:'none',-->
              <!--              size:'small'-->
              <!--              }"/>-->
<!--              <p style="margin-left:-20px;text-align:center;vertical-align:middle;line-height:14px;font-size: 8px;height:14px;background-color:red;border-radius: 7px;width:14px;float:right;margin-top:5px;z-index:1000">5</p>-->
            </span>
          </a-menu-item>
          <a-menu-item key="4"  @click="run4()">
            <div class="icon2">
              <svg t="1626767667680" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6720" width="18" height="18"><path d="M599.28 550.325l-88.02-226.372-96.119 180.845-53.647-55.186-90.776 56.565 25.607 14.764 58.172-36.255 70.188 72.267 81.272-152.872 89.862 231.24 76.63-161.338 31.234 66.458 34.24-5.74L672.64 395.86z m267.893 175.414V256.672c0-17.551-13.084-31.741-29.245-31.741H187.113c-16.16 0-29.244 14.191-29.244 31.741v469.067H61.957v38.799c0 17.556 13.104 31.74 29.245 31.74h845.83c16.161 0 29.265-14.185 29.265-31.74v-38.799h-99.123z m-293.149 13.32h-119.8v-20.597h119.8v20.597z m232.98-51.886H218.059V290.367h588.945v396.806z m0 0z" p-id="6721" fill="#ffffff"></path></svg>
            </div>
            <span v-show="collapsed===false">监控机组</span>
          </a-menu-item>
          <a-menu-item key="5"  @click="run5()">
            <div class="icon2">
              <svg t="1626767751118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7621" width="14" height="14"><path d="M512 0C229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512S794.7776 0 512 0z m35.242667 739.1744a34.133333 34.133333 0 0 1-68.266667 0v-15.104a34.133333 34.133333 0 0 1 68.266667 0v15.104z m-0.1536-153.856l0.136533 33.979733a34.133333 34.133333 0 0 1-68.266667 0v-34.116266a68.334933 68.334933 0 0 1 54.5792-66.7648c55.842133-11.298133 90.9312-64.546133 79.9232-121.2416a101.376 101.376 0 0 0-79.496533-79.479467c-31.3344-6.0416-61.883733 1.467733-85.9648 21.2992a102.178133 102.178133 0 0 0-37.3248 79.069867 34.133333 34.133333 0 0 1-68.266667 0c0-51.1488 22.664533-99.1744 62.1568-131.7376s91.409067-45.550933 142.404267-35.6352c66.850133 12.987733 120.490667 66.628267 133.4784 133.461333 17.988267 92.433067-41.847467 182.664533-133.358933 201.1648z" fill="#ffffff" p-id="7622"></path></svg>
            </div>
            <span v-show="collapsed===false">申请询问
<!--              <p style="margin-left:-20px;text-align:center;vertical-align:middle;line-height:14px;font-size: 8px;height:14px;background-color:#29822f;border-radius: 7px;width:14px;float:right;margin-top:5px;z-index:1000">5</p>-->
            </span>
          </a-menu-item>
          <a-menu-item key="6"  @click="run6()">
            <div class="icon2">
              <svg t="1626767833570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8518" width="17" height="17"><path d="M718.421333 593.664c81.28 31.146667 134.912 88.661333 134.912 175.658667v90.581333c0 43.52-35.285333 78.762667-78.762666 78.762667H249.429333A78.762667 78.762667 0 0 1 170.666667 859.904V769.28c0-87.04 53.632-144.512 134.912-175.658667a37.077333 37.077333 0 0 1 39.850666 8.746667c4.906667 5.034667 9.130667 9.088 12.714667 12.16A235.392 235.392 0 0 0 512 671.488a235.434667 235.434667 0 0 0 157.781333-60.373333c2.56-2.304 5.546667-5.205333 8.96-8.704a36.906667 36.906667 0 0 1 39.68-8.746667zM512 128a196.906667 196.906667 0 0 1 196.906667 196.906667V415.573333a196.906667 196.906667 0 0 1-393.813334 0V324.906667A196.906667 196.906667 0 0 1 512 128z" fill="#ffffff" p-id="8519"></path></svg>
            </div>
            <span v-show="collapsed===false">个人信息</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #03152a; padding: 0">
          <a-icon
              id="icon1"
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
          />
          <svg @click="back()" style="float:right;margin-right:30px;margin-top:20px" t="1626767895315" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9395" width="20" height="20"><path d="M584.470443 677.918c-3.66 0-6.515 0-9.36 0-97.805 0-195.607 0.01-293.414 0-14.5-0.005-23.95-6.65-26.28-18.54-0.458-2.375-0.415-4.87-0.415-7.3-0.018-86.915-0.02-173.825-0.012-260.739 0.003-16.485 8.93-25.255 25.672-25.255 98.247-0.005 196.497-0.005 294.749-0.005 2.645 0 5.31 0 9.06 0 0-2.82 0-5.362 0-7.912 0-77.352-0.01-154.71 0.01-232.069 0-10.645 5.075-19.135 13.67-22.387 9.89-3.745 18.665-2.02 26.12 5.857 4.275 4.517 8.93 8.672 13.32 13.065 55.385 55.265 110.76 110.555 166.13 165.82 71.12 70.965 142.245 141.912 213.365 212.874 11.84 11.802 11.905 24.252 0.205 35.927-101.78 101.605-203.549 203.219-305.359 304.784-28.955 28.885-58.065 57.595-86.995 86.505-7.445 7.45-15.75 10.715-25.915 6.855-9.885-3.75-14.54-11.53-14.54-23.765-0.015-74.905-0.01-149.82-0.01-224.724C584.470443 684.263 584.470443 681.623 584.470443 677.918zM401.643443 106.172c0 29.415 0 58.215 0 87.827-2.882 0-5.477 0-8.07 0-74.465 0-148.93-0.01-223.394 0.005-47.187 0.007-81.935 34.827-81.937 82.107-0.007 163.602 0.293 327.202-0.197 490.791-0.135 43.285 32.795 74.47 63.24 80.165 6.727 1.245 13.677 1.81 20.525 1.825 73.797 0.13 147.597 0.08 221.397 0.08 2.622 0 5.247 0 8.302 0 0 29.325 0 58.115 0 87.325-1.05 0.21-2.275 0.68-3.503 0.68-78.467 0-156.942 0.8-235.389-0.34-76.67-1.1-144.565-59.285-159.197-134.595-2.065-10.61-3.075-21.595-3.087-32.405-0.19-165.385-0.627-330.762 0.102-496.134 0.305-69.077 34.625-118.665 94.56-150.892 21.145-11.375 44.502-16.512 68.577-16.572 77.797-0.21 155.595-0.08 233.394-0.075C398.281443 105.965 399.593443 106.08 401.643443 106.172z" p-id="9396" fill="#ffffff"></path></svg>
        </a-layout-header>
        <!--      面包屑导航-->
        <div id="bread">
          <a-breadcrumb>
            <a-breadcrumb-item href="">
              <a-icon type="home" />
<!--              <span>申请询问</span>-->
            </a-breadcrumb-item>
            <!--          <a-breadcrumb-item href="">-->
            <!--            <a-icon type="user" />-->
            <!--            <span>Application List</span>-->
            <!--          </a-breadcrumb-item>-->
            <!--          <a-breadcrumb-item>-->
            <!--            Application-->
            <!--          </a-breadcrumb-item>-->
          </a-breadcrumb>
        </div>

        <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '1080px' }"
        >

        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer style="background-color: #03152a;height:24px;padding:0px;color:white"><div style="width:18.67px;margin:auto"><span style="text-align: center;margin:auto">@copyright</span></div></a-layout-footer>
  </div>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

export default {
  data() {
    return {
      key:this.$route.params.key,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      zh_CN,
      collapsed: false,
    };
  },
  created(){
    console.log(this.key)
    if(this.key == undefined){
      this.key = '1'
      console.log(this.key)
    }
    console.log(this.key)
  },
  methods: {
    turnto(){
      this.key='3'
      this.$router.push({ name: 'abnormal' ,params: { key: this.key } })
    },
    run1(){
      console.log("111")
      this.key='1'
      console.log(this.key)
      this.$router.push({ name: 'allover',params: { key: this.key }  })
      this.key='1'
    },
    back() {
      this.$router.push({ name: 'first' })
    },
    run3(){
      console.log("111")
      this.key='3'
      console.log(this.key)
      this.$router.push({ name: 'abnormal',params: { key: this.key }  })
      this.key='3'
    },
    run4(){
      console.log("111")
      this.key='4'
      console.log(this.key)
      this.$router.push({ name: 'add',params: { key: this.key }  })
      this.key='4'
    },
    run5(){
      console.log("111")
      this.key='5'
      console.log(this.key)
      this.$router.push({ name: 'query',params: { key: this.key }  })
      this.key='5'
    },
    run6(){
      console.log("111")
      this.key='6'
      console.log(this.key)
      this.$router.push({ name: 'personal',params: { key: this.key }  })
      this.key='6'
    }
  }
};
</script>
<style>
@import '../assets/css/abnormal.css';
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}

.ant-badge-count {
  font-size:10px !important;
}


</style>
