<template>
  <div>
    <p style="position:absolute;top:12px;right:114px;text-align:center;vertical-align:middle;line-height:18px;font-size: 8px;height:6px;background-color:red;border-radius: 5px;width:6px;float:right;margin-top:5px;z-index:1000"></p>
    <div v-show="flag3 === true" style="width:100%;height:1036px;background-color:rgba(64,64,64,0.7);position:absolute;z-index:10"></div>
    <a-modal v-model="flag3" title="修改" ok-text="提交" cancel-text="取消" @ok="hideModal3">
      <a-textarea
          placeholder="请输入修改的内容"
          :auto-size="{ minRows: 3, maxRows: 5 }"
      />
    </a-modal>

    <div v-show="flag === true" style="width:100%;height:1036px;background-color:rgba(64,64,64,0.7);position:absolute;z-index:10"></div>
    <a-modal v-model="flag" title="增添" ok-text="提交" cancel-text="取消" @ok="hideModal">
      <a-textarea
          v-model="addcontent"
          placeholder="请输入询问/申请的内容"
          :auto-size="{ minRows: 3, maxRows: 5 }"
      />
<!--      <a-button>{{ addcontent }}</a-button>-->
    </a-modal>
    <HomePage></HomePage>
    <div style="position:absolute;top:79px;left:242px;">
      <span>申请询问</span>
      <div style="position:absolute;left:-6px;top:40px;width:1150px;overflow:hidden">
<!--        <a-layout-content-->
<!--            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '600px' }"-->
<!--        >-->
          <div style="width:1200px;margin:auto">
            <div style="display: inline-block;float:left;margin-top:7px;margin-right:7px">
              <svg t="1626830415951" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1378" width="20" height="20"><path d="M512 64c247.424 0 448 200.576 448 448s-200.576 448-448 448S64 759.424 64 512 264.576 64 512 64z m2.432 566.357333c-11.626667 0-22.101333 3.477333-30.229333 11.626667-8.149333 7.552-12.224 17.450667-12.224 29.653333 0 11.626667 4.074667 21.525333 12.224 29.653334 8.128 8.149333 18.602667 12.224 30.229333 12.224s22.101333-4.053333 30.250667-11.626667c8.128-8.149333 12.8-18.026667 12.8-30.250667 0-12.202667-4.096-22.101333-12.224-29.653333-8.149333-8.149333-18.602667-11.626667-30.826667-11.626667z m10.453333-340.202666c-43.008 0-76.757333 12.202667-101.162666 37.226666-24.426667 24.405333-36.650667 57.557333-36.650667 100.010667 0 25.6 54.826667 34.325333 61.056 0 0-25.6 5.248-45.354667 15.701333-59.306667 11.648-16.853333 30.826667-25.002667 57.002667-25.002666 20.928 0 37.802667 5.802667 49.429333 17.429333 11.050667 11.648 16.853333 27.349333 16.853334 47.701333 0 15.104-5.802667 29.077333-16.277334 42.453334l-9.877333 11.050666-5.589333 4.970667c-32.746667 29.482667-52.970667 51.712-60.117334 67.136-8.149333 15.104-11.648 33.706667-11.648 55.253333v9.877334h62.229334v-9.898667l0.149333-5.162667c0.64-11.946667 3.562667-23.04 9.173333-33.216 5.226667-10.453333 13.354667-20.928 24.405334-30.229333 27.328-23.850667 43.626667-38.976 48.853333-45.354667 14.528-18.624 22.101333-42.453333 22.101333-70.954666 0-34.901333-11.626667-62.805333-34.901333-83.157334-23.253333-20.949333-53.504-30.826667-90.709333-30.826666z" fill="#515151" p-id="1379"></path></svg>
            </div>
            <h2 style="font-weight:600;width:200px;float:left;">申请询问</h2>
            <!--搜索框-->
            <div style="width:800px;margin-left:36%;margin-top:10px">
              <a-input-search placeholder="输入关键词查询" style="width: 300px;" @search="onSearch" />

              <div style="display:inline-block;margin-left:20%;margin-top:10px">
                <a-button @click="changeflag" type="primary">增添</a-button>
              </div>
            </div>
          </div>
          <a-divider />
          <div style="margin-left:10px;width:1136px;float:left">
            <a-table :data-source="data" :columns="columns" :pagination="pagination">

              <div slot="status" slot-scope="status">
                <span  v-if="status === '已完成'" style="color:#389E0D"><a-tag color="green">已完成</a-tag></span>
                <span  v-else-if="status === '已提交'" style="color:#D4B106"><a-tag color="purple">已提交</a-tag></span>
                <span  v-else-if="status === '被驳回'" style="color:#D4B106"><a-tag color="red">被驳回</a-tag></span>
              </div>

              <div slot="action" slot-scope="action">
                <a-button  v-if="action === '已完成' || action === '被驳回' " @click="hideModal2" type="primary" style="border:#389E0D;background-color:#F5222D;width:50px;text-align:center;padding-left:0px;padding-right:0px;margin-right:5px">删除</a-button>
                <a-button  v-else-if="action === '已提交'" type="primary" style="border:#919191;background-color:#919191;width:50px;text-align:center;padding-left:0px;padding-right:5px;margin-right:5px">删除</a-button>
                <a-button  v-if="action === '已完成' || action === '已提交'" type="primary" style="border:#919191;background-color:#919191;width:50px;text-align:center;padding-left:0px;padding-right:0px">修改</a-button>
                <a-button  v-else-if=" action === '被驳回'" @click="hideModal3" type="primary" style="width:50px;text-align:center;padding-left:0px;padding-right:0px">修改</a-button>
              </div>

              <div
                  slot="filterDropdown"
                  slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                  style="padding: 8px"
              >
                <a-input
                    v-ant-ref="c => (searchInput = c)"
                    :placeholder="`查找${column.title}`"
                    :value="selectedKeys[0]"
                    style="width: 188px; margin-bottom: 8px; display: block;"
                    @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                    @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                />
                <a-button
                    type="primary"
                    icon="search"
                    size="small"
                    style="width: 90px; margin-right: 8px"
                    @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                >
                  查找
                </a-button>
                <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                  重置
                </a-button>
              </div>
              <a-icon
                  slot="filterIcon"
                  slot-scope="filtered"
                  type="search"
                  :style="{ color: filtered ? '#108ee9' : undefined }"
              />
              <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
              v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
                v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                :key="i"
                class="highlight"
            >{{ fragment }}</mark
            >
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
                <template v-else>
                  {{ text }}
                </template>
              </template>
            </a-table>
          </div>
<!--        </a-layout-content>-->
      </div>
    </div>
  </div>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { addQuery } from '@/api/user'
import moment from 'moment';
import HomePage from '../../components/HomePage'
moment.locale('zh-cn');
const data = [
  {
    key: '1',
    index: '1',
    content: '111',
    status: '已提交',
    back: '111xxx',
    action: '已提交',
  },
  {
    key: '2',
    index: '1',
    content: '111',
    status: '已完成',
    back: '111xxx',
    action: '已完成',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '已完成',
    back: '111xxx',
    action: '已完成',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '已完成',
    back: '111xxx',
    action: '已完成',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '已完成',
    back: '111xxx',
    action: '已完成',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '已完成',
    back: '111xxx',
    action: '已完成',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '已完成',
    back: '111xxx',
    action: '已完成',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '被驳回',
    back: '111xxx',
    action: '被驳回',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '已完成',
    back: '111xxx',
    action: '已完成',
  }
];

export default {
  components: { HomePage },
  data() {
    return {
      addcontent:'',
      flag:false,
      flag2:false,
      flag3:false,
      pagination:{
        defaultPageSize:10,
        showTotal: total => `共 ${total} 条数据`,
        onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize
      },
      data,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          scopedSlots: { customRender: 'time' },
        },
        {
          title: '申请/询问内容',
          dataIndex: 'content',
          key: 'content',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.content
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
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          filters: [
            { text: '已完成', value: '已完成' },
            { text: '已提交', value: '已提交' },
            { text: '被驳回', value: '被驳回' },
          ],
          scopedSlots: { customRender: 'status' },
          onFilter: (value, record) => record.status.indexOf(value) === 0,
          // sorter: (a, b) => a.status.length - b.status.length,
          // sortDirections: ['descend'],
        },
        {
          title: '回复内容',
          dataIndex: 'back',
          key: 'back',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.back
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
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
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
  methods: {
    //增添
    hideModal () {
      addQuery(this.addcontent).then(res => {
        console.log(this.addcontent)
        console.log('增添', res.data)
        if(res.data.resultCode === '200') {
          console.log(res.data.resultCode)
          // alert('增添')
        }
      })

      if(this.flag === true)
        this.flag = false;
      else
        this.flag = true;
      console.log(this.flag)
    },
    hideModal3 () {
      if(this.flag3 === true)
        this.flag3 = false;
      else
        this.flag3 = true;
      console.log(this.flag3)
    },
    hideModal2 () {
      this.$message.success('删除成功');
      // if(this.flag2 === true)
      //   this.flag2 = false;
      // else
      //   this.flag2 = true;
      // console.log(this.flag2)
    },
    changeflag() {
      if(this.flag === true)
        this.flag = false;
      else
        this.flag = true;
      console.log(this.flag)
    },
    changeflag2() {
      if(this.flag2 === true)
        this.flag2 = false;
      else
        this.flag2 = true;
      console.log(this.flag2)
    },
    changeflag3() {
      if(this.flag3 === true)
        this.flag3 = false;
      else
        this.flag3 = true;
      console.log(this.flag3)
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
    },
    onSearch(value) {
      console.log(value);
    },
    onChange(e) {
      console.log('radio checked', e.target.value);
    },
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
    moment,
    onChange_start(time, timeString) {
      console.log(time, timeString);
    },
    onChange_end(time, timeString) {
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
    }
  },
};
</script>
<style>
@import '../../assets/css/abnormal.css';
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
