<template>
  <div>

<!--    <div v-show="flag3 === true" style="width:100%;height:1036px;background-color:rgba(64,64,64,0.7);position:absolute;z-index:10"></div>-->
<!--    <a-modal v-model="flag3" title="修改" ok-text="提交" cancel-text="取消" @ok="hideModal3">-->
<!--      <a-textarea-->
<!--          placeholder="请输入修改的内容"-->
<!--          :auto-size="{ minRows: 3, maxRows: 5 }"-->
<!--      />-->
<!--    </a-modal>-->

    <div v-show="flag === true" style="width:100%;height:1036px;background-color:rgba(64,64,64,0.7);position:absolute;z-index:10"></div>
    <a-modal v-model="flag" title="回复" ok-text="提交" cancel-text="取消" @ok="hideModal">
      <a-textarea
          placeholder="请输入回复的内容"
          :auto-size="{ minRows: 3, maxRows: 5 }"
      />
    </a-modal>

    <man_HomePage></man_HomePage>
    <div style="position:absolute;top:79px;left:242px;">
      <span>审批回复</span>
      <div style="position:absolute;left:-6px;top:40px;width:1150px;overflow:hidden">
        <div style="width:1200px;margin:auto">
          <div style="display: inline-block;float:left;margin-top:7px;margin-right:7px">
            <svg t="1626847355082" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7356" width="20" height="20"><path d="M422.399 601.6V493.323c-79.111-34.622-134.4-113.655-134.4-205.323 0-123.711 100.54-224 224-224 123.711 0 224 100.545 224 224 0 91.814-55.379 170.725-134.4 205.313V601.6h201.472c61.925 0 112.128 49.716 112.128 112.003V825.6H108.801V713.598c0-61.855 50.444-111.998 112.126-111.998h201.472zM153.601 870.4h716.793V960H153.6v-89.6z" p-id="7357" fill="#515151"></path></svg>
          </div>
          <h2 style="font-weight:600;width:200px;float:left">审批回复</h2>
          <!--搜索框-->
          <div style="width:800px;margin-left:36%;margin-top:10px">
            <a-input-search placeholder="输入关键词查询" style="width: 300px;" @search="onSearch" />

            <!--              <div style="display:inline-block;margin-left:20%">-->
            <!--                <a-button @click="changeflag" type="primary">增添</a-button>-->
            <!--              </div>-->
          </div>
        </div>
        <a-divider />
        <div style="margin-left:10px;width:1136px;float:left">
          <a-table :data-source="data" :columns="columns" :pagination="pagination">

            <div slot="status" slot-scope="status">
              <span  v-if="status === '已回复'" style="color:#389E0D"><a-tag color="green">已回复</a-tag></span>
              <span  v-else-if="status === '未回复'" style="color:#D4B106"><a-tag color="red">未回复</a-tag></span>
            </div>

            <div slot="action" slot-scope="action">
              <a-button  @click="hideModal2" type="primary" style="margin-right:10px;border:#389E0D;background-color:#F5222D;width:50px;text-align:center;padding-left:0px;padding-right:0px">删除</a-button>
              <a-button  v-if="action === '未回复'" @click="hideModal" type="primary" style="border:#389E0D;width:50px;text-align:center;padding-left:0px;padding-right:0px">回复</a-button>
              <a-button  v-if="action === '已回复'"  type="primary" style="border:#919191;background-color:#919191;width:50px;text-align:center;padding-left:0px;padding-right:0px">回复</a-button>
<!--              <a-button  v-if="action === '已回复'" type="primary" style="margin-left:5px;border:#389E0D;background-color:#389E0D;width:50px;text-align:center;padding-left:0px;padding-right:0px">修改</a-button>-->
<!--              <a-button  v-else-if="action === '未回复'" @click="hideModal3" type="primary" style="border:#919191;background-color:#919191;margin-left:5px;width:50px;text-align:center;padding-left:0px;padding-right:0px">修改</a-button>-->
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
      </div>
    </div>
  </div>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import man_HomePage from '../../components/man_HomePage'
moment.locale('zh-cn');
const data = [
  {
    key: '1',
    index: '1',
    content: '111',
    status: '已回复',
    back: '111xxx',
    action: '已回复',
  },
  {
    key: '2',
    index: '1',
    content: '111',
    status: '已回复',
    back: '111xxx',
    action: '已回复',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '未回复',
    back: '111xxx',
    action: '未回复',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '未回复',
    back: '111xxx',
    action: '未回复',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '未回复',
    back: '111xxx',
    action: '未回复',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '未回复',
    back: '111xxx',
    action: '未回复',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '未回复',
    back: '111xxx',
    action: '未回复',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '未回复',
    back: '111xxx',
    action: '未回复',
  },
  {
    key: '3',
    index: '1',
    content: '111',
    status: '未回复',
    back: '111xxx',
    action: '未回复',
  }
];

export default {
  components: { man_HomePage },
  data() {
    return {
      flag:false,
      flag2:false,
      flag3:false,
      pagination:{
        defaultPageSize:7,
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
          title: '申请人',
          dataIndex: 'applicationer',
          key: 'applicationer',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.applicationer
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
            { text: '已回复', value: '已回复' },
            { text: '未回复', value: '未回复' },
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
    hideModal3 () {
      if(this.flag3 === true)
        this.flag3 = false;
      else
        this.flag3 = true;
      console.log(this.flag3)
    },
    hideModal () {
      if(this.flag === true)
        this.flag = false;
      else
        this.flag = true;
      console.log(this.flag)
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
    changeflag3() {
      if(this.flag3 === true)
        this.flag3 = false;
      else
        this.flag3 = true;
      console.log(this.flag3)
    },
    changeflag2() {
      if(this.flag2 === true)
        this.flag2 = false;
      else
        this.flag2 = true;
      console.log(this.flag2)
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
