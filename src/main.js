import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

import { Icon } from 'ant-design-vue';

Vue.config.productionTip = false;

Vue.use(Antd);

Vue.config.productionTip = false

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
});

new Vue({
  router,  //注入路由器
  store,   //注入全局状态管理
  render: h => h(App),

  el: '#app',
  components: {
    'my-icon': MyIcon,
  },
  template: '<my-icon type="icon-example" />',

}).$mount('#app')
