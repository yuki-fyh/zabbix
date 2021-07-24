<template>
  <div>
    <p v-show="count!=0" style="position:absolute;top:7px;right:102px;text-align:center;vertical-align:middle;line-height:18px;font-size: 8px;height:18px;background-color:red;border-radius: 9px;width:18px;float:right;margin-top:5px;z-index:1000">
      {{ count }}</p>
    <!--    <a-button @click="updateEvent"></a-button>-->
    <div v-show="flag === true" style="width:100%;height:1036px;background-color:rgba(64,64,64,0.7);position:absolute;z-index:10"></div>
    <a-modal v-model="flag" title="发邮件" ok-text="发送" cancel-text="取消" @ok="hideModal">
        <a-textarea
            v-model="message"
            placeholder="Controlled autosize"
            :auto-size="{ minRows: 3, maxRows: 5 }"
        />
    </a-modal>
    <div v-show="flag2 === true" style="width:100%;height:1036px;background-color:rgba(64,64,64,0.7);position:absolute;z-index:10"></div>
    <a-modal v-model="flag2" title="更改" ok-text="保存" cancel-text="取消" @ok="hideModal2(statusN,messageN)" >
      <div style="width:45%;float:left">
        <label>请选择状态：</label>
      ` <a-select default-value="请选择新状态" v-model="statusN" style="margin-left:30px;width: 120px;" @change="handleChange()">
<!--        {{statusN}} ,内容为value-->
<!--        <a-select-option value="0">-->
<!--         请选择新状态-->
<!--        </a-select-option>-->
        <a-select-option value="1">
            未分类
          </a-select-option>
          <a-select-option value="2">
            信息
          </a-select-option>
          <a-select-option value="3">
            一般严重
          </a-select-option>
        <a-select-option value="4">
          严重
        </a-select-option>
        <a-select-option value="5">
          灾难
        </a-select-option>
        </a-select>`
      </div>
      <label>请输入备注：</label>
      <div style="width:50%;display:inline-block">
        <a-textarea
            v-model="messageN"
            placeholder="请输入备注"
            :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </div>
    </a-modal>
    <HomePage></HomePage>
    <div style="position:absolute;top:79px;left:242px;">
      <span>异常信息</span>
      <div style="position:absolute;left:-6px;top:40px;width:1150px;overflow:hidden">
        <div style="width:1200px;margin:auto">
          <div style="display: inline-block;float:left;margin-top:7px;margin-right:7px">
            <svg t="1626771754387" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10352" width="20" height="20"><path d="M532 712c12.3 0 22.4-3.9 31.4-11.8 7.8-7.8 12.3-18.5 12.3-30.8s-4.5-22.4-12.3-30.2c-8.4-7.8-19-11.8-31.4-11.8s-22.4 3.9-30.2 11.8c-9 7.8-12.9 17.9-12.9 30.2s3.9 22.4 12.9 30.2c7.8 7.9 17.9 12.4 30.2 12.4z m25.2-138.6l11.5-235c0.7-14.3-10.7-26.2-25-26.2h-23.1c-14.3 0-25.7 12-25 26.2l11.5 235c0.7 13.3 11.6 23.8 25 23.8 13.5 0 24.5-10.5 25.1-23.8zM512 912c-220.9 0-400-179.1-400-400s179.1-400 400-400 400 179.1 400 400-179.1 400-400 400z" p-id="10353" fill="#515151"></path></svg>
          </div>
          <h2 style="font-weight:600;margin-top:0px;width:200px;float:left">异常信息</h2>
          <!--搜索框-->
          <div style="width:800px;margin-left:36%;margin-top:10px">
            <a-input-search v-model="searchContent" placeholder="输入关键词查询" style="width: 300px;" @search="onSearch" />

            <div style="display:inline-block;margin-left:20%;margin-top:10px">
              <a-radio-group default-value="a" @change="onChange_top">
                <!--                  {{abnormal_value}} table里面设置slot，当值为a、b、c时分别选择不同的显示-->
                <a-radio-button value="a"  @click="iferror=1;display(iferror); ">
                  全部
                </a-radio-button>
                <a-radio-button value="b"  @click="iferror=2;display(iferror);">
                  警告
                </a-radio-button>
                <a-radio-button value="c"  @click="iferror=3;display(iferror);">
                  故障
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>
        </div>
        <a-divider />
        <div style="margin-left:10px;width:1000px;float:left;margin-bottom:20px;margin-top:0px">
          <!--日历-->
          <h3>请选择日期：</h3>

          <!--            可以拿到值，以何种形式传给后端？-->
<!--          <label>开始：</label>-->
          <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px',float:'left'}">
            <a-calendar :value="value_time"  @select="onSelect" :fullscreen="false" @panelChange="onPanelChange" :header-render="headerRender"/>
          </div>
          <div style="padding-left:10px"></div>
<!--          <label>结束：</label>-->
          <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px',float:'left'}">
            <a-calendar :value="value_time2"  @select="onSelect2" :fullscreen="false" @panelChange="onPanelChange2" :header-render="headerRender2"/>
          </div>
          <!--时间选择框-->
          <div style="margin-top:30px">
            <h3>请选择时间：</h3>
<!--            {{value_start}}{{ value_end}}-->
            <a-time-picker width="200" placeholder="开始时间" :default-open-value="moment('00:00:00', 'HH:mm:ss')" @change="onChange_start" style="margin-left:10px;margin-right:30px">

            </a-time-picker>
            <a-time-picker width="200" placeholder="结束时间" :default-open-value="moment('00:00:00', 'HH:mm:ss')" @change="onChange_end" >

            </a-time-picker>
          </div>
          <div style="margin-top:30px">
<!--            <h3>or&nbsp;&nbsp;请选择：</h3>-->
<!--            <div style="margin-left:50px">-->
<!--              <a-radio-group v-model="value" @change="onChange">-->
<!--                <a-radio :style="radioStyle" :value="11">-->
<!--                  仅查看当日异常-->
<!--                </a-radio>-->
<!--                <a-radio :style="radioStyle" :value="22">-->
<!--                  仅查看近两日异常-->
<!--                </a-radio>-->
<!--                <a-radio :style="radioStyle" :value="33">-->
<!--                  仅查看近一周异常-->
<!--                </a-radio>-->
<!--                <a-radio :style="radioStyle" :value="44">-->
<!--                  仅查看近一月异常-->
<!--                  &lt;!&ndash;                <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />&ndash;&gt;-->
<!--                </a-radio>-->
<!--                <a-radio :style="radioStyle" :value="55">-->
<!--                  仅查看近一年异常-->
<!--                </a-radio>-->
<!--              </a-radio-group>-->
<!--            </div>-->
            <a-button @click="timeTransform" type="primary" style="float:right;margin-top:10px;margin-right:10px;">
              <span>确定</span>
            </a-button>
            <a-button style="float:right;margin-top:10px;margin-right:10px;" @click="reset">
              重置
            </a-button>
          </div>
        </div>

        <div style="float:left;margin-left:30px;width:800px;margin-top:30px">
<!--          <a-table :data-source="listdata" :columns="columns" :pagination="pagination" :scroll="{ x: 1500, y: 570 }">-->
<!--            <div slot="special" slot-scope="special">-->
<!--              {{special}}-->
<!--            </div>-->
<!--            <div slot="long" slot-scope="long">-->
<!--              {{long}}-->
<!--            </div>-->
<!--            <div slot="time" slot-scope="time">-->
<!--              {{time|formatDate}}-->
<!--            </div>-->

<!--            <div slot="severe"  slot-scope="severe" >-->
<!--                <span v-if="severe === '0'">-->
<!--                  <a-tag color="#fbda00">未分类</a-tag>-->
<!--                </span>-->
<!--              <span v-if="severe === '1'">-->
<!--                  <a-tag color="#f6b500">信息</a-tag>-->
<!--                </span>-->
<!--              <span v-if="severe === '2'">-->
<!--                  <a-tag color="#f69200">警告</a-tag>-->
<!--                </span>-->
<!--              <span v-if="severe === '3'">-->
<!--                  <a-tag color="#ef6800">一般严重</a-tag>-->
<!--                </span>-->
<!--              <span v-if="severe === '4'">-->
<!--                  <a-tag color="#f46430">严重</a-tag>-->
<!--                </span>-->
<!--              <span v-if="severe === '5'">-->
<!--                  <a-tag color="#f41c00">灾难</a-tag>-->
<!--                </span>-->
<!--            </div>-->
<!--            <div slot="status"  slot-scope="status">-->
<!--                <span v-if="status != '0'" style="color:#389E0D">-->
<!--                  <a-tag color="green">已解决</a-tag>-->
<!--                </span>-->
<!--              <span v-if="status === '0'" style="color:#D4B106">-->
<!--                  <a-tag color="red">未解决</a-tag>-->
<!--                </span>-->
<!--            </div>-->
<!--            <div slot="record"  slot-scope="text,record">-->
<!--                <span v-if="record.record != '0' && record.severe != '0'" style="color:#389E0D">-->
<!--                  <a-tag color="blue">已读</a-tag>-->
<!--                </span>-->
<!--              <span v-if="record.record === '0' && record.severe != '0'" style="color:#D4B106" @click="update1(record.index)">-->
<!--                  <a-tag color="purple">未读</a-tag>-->
<!--                </span>-->
<!--              <span v-if="record.severe == '0'" style="color:#808080" @click="update1(record.index)">-->
<!--                  <a-tag color="#808080">无问题</a-tag>-->
<!--              </span>-->
<!--            </div>-->
<!--            <div slot="action" slot-scope="text,record" >-->
<!--              <a-button v-if="record.severe!= '0'" @click="changeflag2(record.index)" type="primary" style="width:45px;text-align:center;padding-left:0px;padding-right:0px;margin-bottom:5px;font-size:14px;height:25px">更改</a-button>-->
<!--              <a-button v-else-if="record.severe== '0'"   type="primary"  style="width:45px;border:#808080;background-color:#808080;text-align:center;padding-left:0px;padding-right:0px;margin-bottom:5px;font-size:14px;height:25px">更改</a-button>-->
<!--              <a-button @click="changeflag(record.index)" type="primary" style="border:#389E0D;background-color:#389E0D;width:45px;text-align:center;padding-left:0px;padding-right:0px;height:30px;font-size:14px">邮件</a-button>-->
<!--            </div>-->
<!--            <div-->
<!--                slot="filterDropdown"-->
<!--                slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"-->
<!--                style="padding: 8px"-->
<!--            >-->
<!--              <a-input-->
<!--                  v-ant-ref="c => (searchInput = c)"-->
<!--                  :placeholder="`查找${column.title}`"-->
<!--                  :value="selectedKeys[0]"-->
<!--                  style="width: 188px; margin-bottom: 8px; display: block;"-->
<!--                  @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"-->
<!--                  @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"-->
<!--              />-->
<!--              <a-button-->
<!--                  type="primary"-->
<!--                  icon="search"-->
<!--                  size="small"-->
<!--                  style="width: 90px; margin-right: 8px"-->
<!--                  @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"-->
<!--              >-->
<!--                查找-->
<!--              </a-button>-->
<!--              <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">-->
<!--                重置-->
<!--              </a-button>-->
<!--            </div>-->
<!--            <a-icon-->
<!--                slot="filterIcon"-->
<!--                slot-scope="filtered"-->
<!--                type="search"-->
<!--                :style="{ color: filtered ? '#108ee9' : undefined }"-->
<!--            />-->
<!--            <template slot="customRender" slot-scope="text, record, index, column">-->
<!--                <span v-if="searchText && searchedColumn === column.dataIndex">-->
<!--                  <template-->
<!--                      v-for="(fragment, i) in text-->
<!--                      .toString()-->
<!--                      .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">-->
<!--                    <mark-->
<!--                        v-if="fragment.toLowerCase() === searchText.toLowerCase()"-->
<!--                        :key="i"-->
<!--                        class="highlight"-->
<!--                    >{{ fragment }}-->
<!--                    </mark>-->
<!--                    <template v-else>{{ fragment }}</template>-->
<!--                  </template>-->
<!--                </span>-->
<!--              <template v-else>-->
<!--                {{ text }}-->
<!--              </template>-->
<!--            </template>-->

<!--          </a-table>-->
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import {formatDate} from '../../utils/time'

import { displayEvents,updateEvents,update1,searchEvents} from "@/api/user";
// import { displayEvents } from "@/api/user";
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import HomePage from '../../components/HomePage'
// import {updateEvent} from "../../api/user";
moment.locale('zh-cn');

export default {

  filters: {
    formatDate(time) {
      time = time * 1000
      let date = new Date(time)
      console.log(new Date(time))
      return formatDate(date, 'yyyy-MM-dd')
    }
  },

  components: { HomePage },
  data() {
    return {
      value_time2:'',
      searchContent:'',
      timer: "",//定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
      TimeValue_start:'',
      TimeValue_end:'',
      selectedValue2:'',
      time_start:'',
      time_end:'',
      messageN:'',
      statusN:'',
      eventid:'',
      count:0,
      iferror:1,
      message1:'',
      filteredInfo: null,
      logTime:1609899674000000000,
      abnormal_value:'',
      value_start:'',
      value_end:'',
      value_time:'',
      selectedValue:'',
      listdata:[],
      message2: '请输入备注',
      message: '告警主机:{HOSTNAME1}\n' +
          '告警时间:{EVENT.DATE} {EVENT.TIME}\n' +
          '告警等级:{TRIGGER.SEVERITY}\n' +
          '告警信息: {TRIGGER.NAME}\n' +
          '告警项目:{TRIGGER.KEY1}\n' +
          '问题详情:{ITEM.NAME}:{ITEM.VALUE}\n' +
          '当前状态:{TRIGGER.STATUS}:{ITEM.VALUE1}\n' +
          '事件ID:{EVENT.ID}\n',
      flag: false,
      flag2: false,
      pagination:{
        defaultPageSize:6,
        showTotal: total => `共 ${total} 条数据`,
        onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize
      },
      // data,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          fixed: 'left'
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          scopedSlots: { customRender: 'time' },
          width:168,
          fixed: 'left'
        },
        {
          title: '主机',
          dataIndex: 'laptop',
          key: 'laptop',
          fixed: 'left',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.laptop
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: '问题内容',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' },
          width:500,
        },
        {
          title: '严重性',
          dataIndex: 'severe',
          key: 'severe',
          scopedSlots: { customRender: 'severe' },
          width:100,
          onFilter: (value, record) =>
              record.severe
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible && this.iferror == 2) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: '持续',
          dataIndex: 'long',
          key: 'long',
          scopedSlots: { customRender: 'long' },
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          filters: [
            { text: '已解决', value: '1' },
            { text: '未解决', value: '0' },
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        // {
        //   title: '恢复时间',
        //   dataIndex: 'backtime',
        //   key: 'backtime',
        // },
        {
          title: '标记',
          dataIndex: 'record',
          key: 'record',
          scopedSlots: { customRender: 'record' },
          filters: [
            { text: '已读', value: '1' },
            { text: '未读', value: '0' },
          ],
          onFilter: (value, record) => record.record.indexOf(value) === 0,
        },
        {
          title: '备注',
          dataIndex: 'special',
          key: 'special',
          scopedSlots: { customRender: 'special' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          // width: 45,
        }
      ],
      value_top: 'a',
      value: 1,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      zh_CN,
      collapsed: false,
    };
  },
  created() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      _this.currentTime = //修改数据date
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate() +
          " " +
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ": " +
          new Date().getSeconds();
    }, 1000);
    console.log('current',this.currentTime)
    function dateToMs(date) {
      let result = new Date(date).getTime();
      return result;
    }
    // const data1_timestamp = dateToMs(data1);
    // console.log('timestamp', dateToMs(data1));
    const transformTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const D = date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes();
      // const s = date.getSeconds(); // 秒
      const dateString = Y + M + D + h + m;
      console.log('dateString', dateString); // > dateString 2020-01-10 18:52
      // console.log('dateString3', dateString.substring(0,10)+' '+data3); // > dateString 2020-01-10 18:52
      this.currentTime = dateString
      return this.currentTime;
    }
    transformTimestamp(this.currentTime);
    const data2_timestamp = dateToMs(transformTimestamp(this.currentTime))
    this.currentTime = data2_timestamp
    console.log('currentreal:',this.currentTime)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  mounted(){
    displayEvents(this.TimeValue_start,this.TimeValue_end).then(res =>{
      console.log(this.TimeValue_start,this.TimeValue_end)
      console.log("11222")
      if(res.resultCode === '200') {
        console.log(res.resultCode)
        // alert('获取异常信息')
        console.log(this.$store.state.token)
      }
      console.log('res',res)
      const data1 = res.data
      this.count = 0;
      for (let i = 0; i < data1.length; i++) {
        if(data1[i].acknowledged!=1){
          this.count++
        }
        console.log(data1[i].acknowledges[0])
        if (data1[i].acknowledges != '0') {
          data1[i].acknowledges != '1'
        }
        if (data1[i].acknowledges[0] == undefined) {
          this.message1 = ''
        } else {
          this.message1 = data1[i].acknowledges[0].message
          console.log('yd', this.message1)
        }
        if (this.iferror === 1) {
          this.listdata.push({
            index: data1[i].eventid,
            time: data1[i].clock,//还需要转化
            laptop: data1[i].hosts[0].host,//哪个是主机？
            name: data1[i].name,
            severe: data1[i].severity,
            long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
            status: data1[i].r_eventid,
            // backtime:data1[i].backtime,//
            record: data1[i].acknowledged,//
            special: this.message1,//
            action: data1[i].action,
          })
        } else if (this.iferror === 2) {
          this.listdata = []
          if (data1[i].severity === 2 || data1[i].severity === 3) {
            this.listdata.push({
              index: data1[i].eventid,
              time: data1[i].clock,//还需要转化
              laptop: data1[i].hosts[0].host,//哪个是主机？
              name: data1[i].name,
              severe: data1[i].severity,
              long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
              status: data1[i].r_eventid,
              // backtime:data1[i].backtime,//
              record: data1[i].acknowledged,//
              special: this.message1,//
              action: data1[i].action,
            })
          }
        }
        else {
          this.listdata = []
          if (data1[i].severity === 4 || data1[i].severity === 5) {
            this.listdata.push({
              index: data1[i].eventid,
              time: data1[i].clock,//还需要转化
              laptop: data1[i].hosts[0].host,//哪个是主机？
              name: data1[i].name,
              severe: data1[i].severity,
              long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
              status: data1[i].r_eventid,
              // backtime:data1[i].backtime,//
              record: data1[i].acknowledged,//
              special: this.message1,//
              action: data1[i].action,
            })
          }
          console.log('message', data1[14].acknowledges[0].message)
        }}
    })
    },
  methods: {
    //重置
    reset(){
      console.log("reset")
      // this.value_start = moment('00:00:00', 'HH:mm:ss')
      this.TimeValue_start = ''
      this.TimeValue_end = ''
      this.value_start = ''
      this.value_end = ''
      location.reload();
        displayEvents().then(res =>{
          console.log("11222")
          if(res.resultCode === '200') {
            console.log(res.resultCode)
            // alert('获取异常信息')
            console.log(this.$store.state.token)
          }
          console.log('res',res)
          const data1 = res.data
          this.listdata = []
          for (let i = 0; i < data1.length; i++) {
            console.log(data1[i].acknowledges[0])
            if (data1[i].acknowledges != '0') {
              data1[i].acknowledges != '1'
            }
            if (data1[i].acknowledges[0] == undefined) {
              this.message1 = ''
            } else {
              this.message1 = data1[i].acknowledges[0].message
              console.log('yd', this.message1)
            }
            if (this.iferror === 1) {
              this.listdata.push({
                index: data1[i].eventid,
                time: data1[i].clock,//还需要转化
                laptop: data1[i].hosts[0].host,//哪个是主机？
                name: data1[i].name,
                severe: data1[i].severity,
                long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                status: data1[i].r_eventid,
                // backtime:data1[i].backtime,//
                record: data1[i].acknowledged,//
                special: this.message1,//
                action: data1[i].action,
              })
            } else if (this.iferror === 2) {
              if (data1[i].severity === '2' || data1[i].severity === '3') {
                this.listdata.push({
                  index: data1[i].eventid,
                  time: data1[i].clock,//还需要转化
                  laptop: data1[i].hosts[0].host,//哪个是主机？
                  name: data1[i].name,
                  severe: data1[i].severity,
                  long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                  status: data1[i].r_eventid,
                  // backtime:data1[i].backtime,//
                  record: data1[i].acknowledged,//
                  special: this.message1,//
                  action: data1[i].action,
                })
              }
            }
            else {
              if (data1[i].severity === '4' || data1[i].severity === '5') {
                this.listdata.push({
                  index: data1[i].eventid,
                  time: data1[i].clock,//还需要转化
                  laptop: data1[i].hosts[0].host,//哪个是主机？
                  name: data1[i].name,
                  severe: data1[i].severity,
                  long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                  status: data1[i].r_eventid,
                  // backtime:data1[i].backtime,//
                  record: data1[i].acknowledged,//
                  special: this.message1,//
                  action: data1[i].action,
                })
              }
              console.log('message', data1[14].acknowledges[0].message)
            }
          }
        })
    },
    //查找
    searchEvents() {
      let key = this.searchContent
      console.log(key)
      searchEvents(key).then(res => {
        console.log(key)
        if (res.resultCode === '200') {
          console.log(res.resultCode)
          console.log('res', res)
          const data1 = res.data
          if(data1.length!=0){
            this.listdata = []
            for (let i = 0; i < data1.length; i++) {
              console.log(data1[i].acknowledges[0])
              if (data1[i].acknowledges != '0') {
                data1[i].acknowledges != '1'
              }
              if (data1[i].acknowledges[0] == undefined) {
                this.message1 = ''
              } else {
                this.message1 = data1[i].acknowledges[0].message
                console.log('yd', this.message1)
              }
              if (this.iferror === 1) {
                this.listdata.push({
                  index: data1[i].eventid,
                  time: data1[i].clock,//还需要转化
                  laptop: data1[i].hosts[0].host,//哪个是主机？
                  name: data1[i].name,
                  severe: data1[i].severity,
                  long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                  status: data1[i].r_eventid,
                  // backtime:data1[i].backtime,//
                  record: data1[i].acknowledged,//
                  special: this.message1,//
                  action: data1[i].action,
                })
              } else if (this.iferror === 2) {
                if (data1[i].severity === '2' || data1[i].severity === '3') {
                  this.listdata.push({
                    index: data1[i].eventid,
                    time: data1[i].clock,//还需要转化
                    laptop: data1[i].hosts[0].host,//哪个是主机？
                    name: data1[i].name,
                    severe: data1[i].severity,
                    long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                    status: data1[i].r_eventid,
                    // backtime:data1[i].backtime,//
                    record: data1[i].acknowledged,//
                    special: this.message1,//
                    action: data1[i].action,
                  })
                }
              } else {
                if (data1[i].severity === '4' || data1[i].severity === '5') {
                  this.listdata.push({
                    index: data1[i].eventid,
                    time: data1[i].clock,//还需要转化
                    laptop: data1[i].hosts[0].host,//哪个是主机？
                    name: data1[i].name,
                    severe: data1[i].severity,
                    long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                    status: data1[i].r_eventid,
                    // backtime:data1[i].backtime,//
                    record: data1[i].acknowledged,//
                    special: this.message1,//
                    action: data1[i].action,
                  })
                }
                console.log('message', data1[14].acknowledges[0].message)
              }
              // location.reload();
            }
          }
          else{
            displayEvents(this.TimeValue_start,this.TimeValue_end).then(res =>{
              console.log("11222")
              if(res.resultCode === '200') {
                console.log(res.resultCode)
                // alert('获取异常信息')
                console.log(this.$store.state.token)
              }
              console.log('res',res)
              const data1 = res.data
              this.listdata = []
              for (let i = 0; i < data1.length; i++) {
                console.log(data1[i].acknowledges[0])
                if (data1[i].acknowledges != '0') {
                  data1[i].acknowledges != '1'
                }
                if (data1[i].acknowledges[0] == undefined) {
                  this.message1 = ''
                } else {
                  this.message1 = data1[i].acknowledges[0].message
                  console.log('yd', this.message1)
                }
                if (this.iferror === 1) {
                  this.listdata.push({
                    index: data1[i].eventid,
                    time: data1[i].clock,//还需要转化
                    laptop: data1[i].hosts[0].host,//哪个是主机？
                    name: data1[i].name,
                    severe: data1[i].severity,
                    long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                    status: data1[i].r_eventid,
                    // backtime:data1[i].backtime,//
                    record: data1[i].acknowledged,//
                    special: this.message1,//
                    action: data1[i].action,
                  })
                } else if (this.iferror === 2) {
                  if (data1[i].severity === '2' || data1[i].severity === '3') {
                    this.listdata.push({
                      index: data1[i].eventid,
                      time: data1[i].clock,//还需要转化
                      laptop: data1[i].hosts[0].host,//哪个是主机？
                      name: data1[i].name,
                      severe: data1[i].severity,
                      long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                      status: data1[i].r_eventid,
                      // backtime:data1[i].backtime,//
                      record: data1[i].acknowledged,//
                      special: this.message1,//
                      action: data1[i].action,
                    })
                  }
                }
                else {
                  if (data1[i].severity === '4' || data1[i].severity === '5') {
                    this.listdata.push({
                      index: data1[i].eventid,
                      time: data1[i].clock,//还需要转化
                      laptop: data1[i].hosts[0].host,//哪个是主机？
                      name: data1[i].name,
                      severe: data1[i].severity,
                      long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                      status: data1[i].r_eventid,
                      // backtime:data1[i].backtime,//
                      record: data1[i].acknowledged,//
                      special: this.message1,//
                      action: data1[i].action,
                    })
                  }
                  console.log('message', data1[14].acknowledges[0].message)
                }
              }
            })
          }
        }
      })
    },
    timeTransform(){
      const data1 = this.selectedValue
      const data11 = this.selectedValue2
      const data2 = this.value_start;
      const data3 = this.value_end;
      console.log(data3)
      function dateToMs(date) {
        let result = new Date(date).getTime();
        return result;
      }
      // const data1_timestamp = dateToMs(data1);
      console.log('timestamp', dateToMs(data1));
      const transformTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes();
        // const s = date.getSeconds(); // 秒
        const dateString = Y + M + D + h + m;
        console.log('dateString', dateString.substring(0,10)); // > dateString 2020-01-10 18:52
        console.log('dateString2', dateString.substring(0,10)+' '+data2); // > dateString 2020-01-10 18:52
        // console.log('dateString3', dateString.substring(0,10)+' '+data3); // > dateString 2020-01-10 18:52
        this.selectedValue = dateString.substring(0,10)+' '+data2
        return this.selectedValue;
      }
      const transformTimestamp3 = (timestamp) => {
        const date = new Date(timestamp);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes();
        // const s = date.getSeconds(); // 秒
        const dateString = Y + M + D + h + m;
        console.log('dateString', dateString.substring(0,10)); // > dateString 2020-01-10 18:52
        console.log('dateString3', dateString.substring(0,10)+' '+data3); // > dateString 2020-01-10 18:52
        // console.log('dateString3', dateString.substring(0,10)+' '+data3); // > dateString 2020-01-10 18:52
        this.selectedValue2 = dateString.substring(0,10)+' '+data3
        return this.selectedValue2;
      }
      transformTimestamp(data1);
      transformTimestamp3(data11);
      const data2_timestamp = dateToMs(transformTimestamp(data1))
      const data3_timestamp3 = dateToMs(transformTimestamp3(data11))
      this.TimeValue_start = data2_timestamp/1000
      this.TimeValue_end = data3_timestamp3/1000
      console.log('data3_timestamp1:',data2_timestamp)
      console.log('data3_timestamp2:',data3_timestamp3)

      console.log('2',transformTimestamp(data2_timestamp))
      console.log('3',transformTimestamp3(data3_timestamp3))

      console.log('try',this.TimeValue_start,this.TimeValue_end)
      if(this.searchContent!='')
      {
        this.searchEvents()
      }
      else{
        displayEvents(this.TimeValue_start,this.TimeValue_end).then(res =>{
          console.log('this',this.TimeValue_start,this.TimeValue_end)
          console.log("11222")
          if(res.resultCode === '200') {
            console.log(res.resultCode)
            // alert('获取异常信息')
            console.log(this.$store.state.token)
          }
          console.log('res',res)
          const data1 = res.data
          this.count = 0
          this.listdata = []
          for (let i = 0; i < data1.length; i++) {

            if(data1[i].acknowledged!=1){
              this.count++
            }
            console.log(data1[i].acknowledges[0])
            if (data1[i].acknowledges != '0') {
              data1[i].acknowledges != '1'
            }
            if (data1[i].acknowledges[0] == undefined) {
              this.message1 = ''
            } else {
              this.message1 = data1[i].acknowledges[0].message
              console.log('yd', this.message1)
            }
            if (this.iferror === 1) {
              this.listdata.push({
                index: data1[i].eventid,
                time: data1[i].clock,//还需要转化
                laptop: data1[i].hosts[0].host,//哪个是主机？
                name: data1[i].name,
                severe: data1[i].severity,
                long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                status: data1[i].r_eventid,
                // backtime:data1[i].backtime,//
                record: data1[i].acknowledged,//
                special: this.message1,//
                action: data1[i].action,
              })
            } else if (this.iferror === 2) {
              this.listdata = []
              if (data1[i].severity === 2 || data1[i].severity === 3) {
                this.listdata.push({
                  index: data1[i].eventid,
                  time: data1[i].clock,//还需要转化
                  laptop: data1[i].hosts[0].host,//哪个是主机？
                  name: data1[i].name,
                  severe: data1[i].severity,
                  long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                  status: data1[i].r_eventid,
                  // backtime:data1[i].backtime,//
                  record: data1[i].acknowledged,//
                  special: this.message1,//
                  action: data1[i].action,
                })
              }
            }
            else {
              this.listdata = []
              if (data1[i].severity === 4 || data1[i].severity === 5) {
                this.listdata.push({
                  index: data1[i].eventid,
                  time: data1[i].clock,//还需要转化
                  laptop: data1[i].hosts[0].host,//哪个是主机？
                  name: data1[i].name,
                  severe: data1[i].severity,
                  long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                  status: data1[i].r_eventid,
                  // backtime:data1[i].backtime,//
                  record: data1[i].acknowledged,//
                  special: this.message1,//
                  action: data1[i].action,
                })
              }
              console.log('message', data1[14].acknowledges[0].message)
            }}
        })
      }
    },
    display(iferror){
      if(this.searchContent!='')
      {
        this.searchEvents()
      }
      else{
        displayEvents(this.TimeValue_start,this.TimeValue_end).then(res =>{
        console.log("11222")
        if(res.resultCode === '200') {
          console.log(res.resultCode)
          // alert('获取异常信息')
          console.log(this.$store.state.token)
        }
        console.log('res',res)
        const data1 = res.data
        this.listdata = []
        for (let i = 0; i < data1.length; i++) {
          console.log(data1[i].acknowledges[0])
          if (data1[i].acknowledges != '0') {
            data1[i].acknowledges != '1'
          }
          if (data1[i].acknowledges[0] == undefined) {
            this.message1 = ''
          } else {
            this.message1 = data1[i].acknowledges[0].message
            console.log('yd', this.message1)
          }
          if (iferror === 1) {
            this.listdata.push({
              index: data1[i].eventid,
              time: data1[i].clock,//还需要转化
              laptop: data1[i].hosts[0].host,//哪个是主机？
              name: data1[i].name,
              severe: data1[i].severity,
              long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
              status: data1[i].r_eventid,
              // backtime:data1[i].backtime,//
              record: data1[i].acknowledged,//
              special: this.message1,//
              action: data1[i].action,
            })
          } else if (iferror === 2) {
            if (data1[i].severity === '2' || data1[i].severity === '3') {
              this.listdata.push({
                index: data1[i].eventid,
                time: data1[i].clock,//还需要转化
                laptop: data1[i].hosts[0].host,//哪个是主机？
                name: data1[i].name,
                severe: data1[i].severity,
                long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                status: data1[i].r_eventid,
                // backtime:data1[i].backtime,//
                record: data1[i].acknowledged,//
                special: this.message1,//
                action: data1[i].action,
              })
            }
          }
          else {
            if (data1[i].severity === '4' || data1[i].severity === '5') {
              this.listdata.push({
                index: data1[i].eventid,
                time: data1[i].clock,//还需要转化
                laptop: data1[i].hosts[0].host,//哪个是主机？
                name: data1[i].name,
                severe: data1[i].severity,
                long: (data1[i].ns / 3600000).toFixed(2) + 'h',//哪个是持续时长？
                status: data1[i].r_eventid,
                // backtime:data1[i].backtime,//
                record: data1[i].acknowledged,//
                special: this.message1,//
                action: data1[i].action,
              })
            }
            console.log('message', data1[14].acknowledges[0].message)
          }
        }
      })
      }
    },
    onSelect(value_time) {
      this.value_time = value_time;
      this.selectedValue = value_time;
    },
    onSelect2(value_time2) {
      this.value_time2 = value_time2;
      this.selectedValue2 = value_time2;
    },
    onSelect_start(value_start) {
      this.value_start = value_start;
      this.selectedValue_start = value_start;
    },
    //确认
    update1(eventid) {
      console.log(eventid)
      update1(2,eventid).then(res =>{
        console.log(eventid)
        console.log("11222")
        if(res.resultCode === '111') {
          console.log(res.resultCode)
          // alert('获取异常信息')
          console.log(this.$store.state.token)
          location.reload();
        }
      })
    },
    updateEvent(eventid,messageN,statusN) {
      if(messageN === '' || statusN === ''){
        // alert("必填项！")
        this.$message.info('请填写完整相关信息！');
      }
      else{
        updateEvents(12,eventid,statusN,messageN).then(res =>{
          console.log("11222")
          if(res.resultCode === '200') {
            console.log(res.resultCode)
            // alert('获取异常信息')
            console.log(this.$store.state.token)
            location.reload();
          }
        })
        location.reload();
      }

    },
    // displayEvents(){
    //   console.log('111')
    //   displayEvents().then(res => {
    //     console.log('获取异常信息', res.data)
    //     if(res.resultCode === '200') {
    //       console.log(res.resultCode)
    //       alert('获取异常信息')
    //       console.log(this.$store.state.token)
    //     }
    //     // for(i = 1;i<=)
    //   })
    // },
    hideModal () {
      if(this.flag === true)
        this.flag = false;
      else
        this.flag = true;
      console.log(this.flag)
    },
    hideModal2 () {
      if(this.flag2 === true)
        this.flag2 = false;
      else
        this.flag2 = true;
      this.updateEvent(this.eventid,this.messageN,this.statusN)
    },
    changeflag2(eventid) {
      this.eventid = eventid
      if(this.flag2 === true)
        this.flag2 = false;
      else
        this.flag2 = true;
      console.log(this.flag2)
    },
    changeflag() {
      if(this.flag === true)
        this.flag = false;
      else
        this.flag = true;
      console.log(this.flag)
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    onChange_top(e) {
      console.log(`checked = ${e.target.value}`);
      this.abnormal_value=e.target.value;
    },
    onSearch(value) {
      console.log(value);
      this.searchEvents()
    },
    onChange(e) {
      console.log('radio checked', e.target.value);
    },
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
    onPanelChange2(value, mode) {
      console.log(value, mode);
    },
    moment,
    onChange_start(time, timeString) {
      this.value_start=timeString
      console.log('start',time, timeString);
    },
    onChange_end(time, timeString) {
      this.value_end=timeString
      console.log(time, timeString);
    },
    headerRender({ value, type, onChange, onTypeChange }) {
      const start = 0;
      const end = 12;
      const monthOptions = [];

      const current = value.clone();
      const localeData = value.localeData();
      const months = [];
      for (let i = 0; i < 12; i++) {
        current.month(i);
        months.push(localeData.monthsShort(current));
      }

      for (let index = start; index < end; index++) {
        monthOptions.push(
            <a-select-option class="month-item" key={`${index}`}>
              {months[index]}
            </a-select-option>,
        );
      }
      const month = value.month();

      const year = value.year();
      const options = [];
      for (let i = year - 10; i < year + 10; i += 1) {
        options.push(
            <a-select-option key={i} value={i} class="year-item">
              {i}
            </a-select-option>,
        );
      }
      return (
          <div style={{ padding: '10px' }}>
            <div style={{ marginBottom: '10px' }}>日历</div>
            <a-row type="flex" justify="space-between">
              <a-col>
                <a-radio-group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                  <a-radio-button value="month">月</a-radio-button>
                  <a-radio-button value="year">年</a-radio-button>
                </a-radio-group>
              </a-col>
              <a-col>
                <a-select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    class="my-year-select"
                    onChange={newYear => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                    value={String(year)}
                >
                  {options}
                </a-select>
              </a-col>
              <a-col>
                <a-select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    onChange={selectedMonth => {
                      const newValue = value.clone();
                      newValue.month(parseInt(selectedMonth, 10));
                      onChange(newValue);
                    }}
                >
                  {monthOptions}
                </a-select>
              </a-col>
            </a-row>
          </div>
      );
    },
    headerRender2({ value, type, onChange, onTypeChange }) {
      const start = 0;
      const end = 12;
      const monthOptions = [];

      const current = value.clone();
      const localeData = value.localeData();
      const months = [];
      for (let i = 0; i < 12; i++) {
        current.month(i);
        months.push(localeData.monthsShort(current));
      }

      for (let index = start; index < end; index++) {
        monthOptions.push(
            <a-select-option class="month-item" key={`${index}`}>
              {months[index]}
            </a-select-option>,
        );
      }
      const month = value.month();

      const year = value.year();
      const options = [];
      for (let i = year - 10; i < year + 10; i += 1) {
        options.push(
            <a-select-option key={i} value={i} class="year-item">
              {i}
            </a-select-option>,
        );
      }
      return (
          <div style={{ padding: '10px' }}>
            <div style={{ marginBottom: '10px' }}>日历</div>
            <a-row type="flex" justify="space-between">
              <a-col>
                <a-radio-group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                  <a-radio-button value="month">月</a-radio-button>
                  <a-radio-button value="year">年</a-radio-button>
                </a-radio-group>
              </a-col>
              <a-col>
                <a-select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    class="my-year-select"
                    onChange={newYear => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                    value={String(year)}
                >
                  {options}
                </a-select>
              </a-col>
              <a-col>
                <a-select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    onChange={selectedMonth => {
                      const newValue = value.clone();
                      newValue.month(parseInt(selectedMonth, 10));
                      onChange(newValue);
                    }}
                >
                  {monthOptions}
                </a-select>
              </a-col>
            </a-row>
          </div>
      );
    }
  },
};
</script>
<style scoped>
@import '../../assets/css/abnormal.css';
/*a-layout-content {*/
/*  height:1080px !important;*/
/*}*/
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

</style>
