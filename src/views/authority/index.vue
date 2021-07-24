<template>
  <div>
    <div v-show="flag === true" style="width:100%;height:1036px;background-color:rgba(64,64,64,0.7);position:absolute;z-index:10"></div>
    <a-modal v-model="flag" title="修改" ok-text="提交" cancel-text="取消" @ok="hideModal">
      <div style="width:45%;float:left">
        <label>最大组数：</label>
        <a-input-number id="inputNumber" v-model="value1" :min="1" :max="10000" @change="onChange1" />
<!--        当前值：{{ value1 }}-->
      </div>

      <div style="width:50%;display:inline-block">
        <label>最大主机数：</label>
        <a-input-number id="inputNumber2" v-model="value2" :min="1" :max="10000" @change="onChange2" />
<!--        当前值：{{ value2 }}-->
      </div>
    </a-modal>
    <man_HomePage></man_HomePage>
    <div style="position:absolute;top:79px;left:242px;">
      <span>分配权限</span>
      <div style="position:absolute;left:-6px;top:40px;width:1150px;overflow:hidden">
        <div style="width:1200px;margin:auto">
          <div style="display: inline-block;float:left;margin-top:7px;margin-right:7px">
            <svg t="1626851707857" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2021" width="20" height="20"><path d="M898.34 188.81L538.35 74.51l-359.87 114.3c-13.53 4.27-22.67 16.86-22.55 31.1v454.94c0.72 3.09 17.69 77.98 91.27 150.5 56.61 55.78 192.4 127.48 251.63 158.57 9.25 4.87 13.65 6.65 17.56 8.78l17.57 8.78c4.63 2.49 12.94 2.38 17.57 0l17.57-8.78c34.65-16.97 195-102.9 260.4-167.35 73.71-72.52 90.68-147.41 91.39-150.5V219.91c0.23-14.24-9.02-26.83-22.55-31.1zM542.86 930.98l-0.24-0.12h0.59c-0.23 0.12-0.35 0.12-0.35 0.12z m85.81-264.32h-58.16v81.9c0 18.99-15.43 34.42-34.42 34.42-18.99 0-34.42-15.43-34.42-34.42V537.29c0-0.71 0.12-1.3 0.12-1.9-6.29-1.9-12.58-4.16-18.87-7-21.24-9.73-39.4-27.18-51.51-47-12.58-20.65-19.23-46.53-17.21-70.74 2.37-27.65 12.34-51.75 30.03-73.23 30.62-37.15 86.88-52.22 131.98-35.73 25.52 9.38 46.29 25.05 61.96 47.12 13.77 19.35 20.77 43.44 21.37 67.06 0 0.71 0.12 1.3 0 2.02 0 0.83 0 1.66-0.12 2.49-1.66 52.46-37.74 101.95-89.02 115.61v60.41h58.16c18.99 0 34.42 15.43 34.42 34.42v1.42h0.12c-0.01 18.99-15.44 34.42-34.43 34.42z" p-id="2022" fill="#515151"></path><path d="M577.99 449.1c0.35-0.59 0.71-1.07 0.83-1.19a97.38 97.38 0 0 0 5.58-9.74c1.54-4.39 2.73-8.78 3.68-13.41 0.12-2.25 0.24-4.63 0.36-6.89 0-2.26-0.12-4.63-0.36-6.88-0.83-4.51-2.14-9.02-3.68-13.41a108.73 108.73 0 0 0-4.51-8.19c-0.36-0.36-1.19-1.54-2.61-3.8-1.3-1.43-2.61-2.97-4.03-4.27-1.66-1.66-3.44-3.32-5.34-4.87-0.59-0.35-1.06-0.71-1.19-0.83a97.226 97.226 0 0 0-9.73-5.58c-4.39-1.54-8.78-2.73-13.29-3.68-4.63-0.35-9.26-0.35-13.89 0-4.51 0.83-9.02 2.14-13.29 3.68a108.73 108.73 0 0 0-8.19 4.51c-0.36 0.36-1.54 1.19-3.8 2.61-1.43 1.3-2.97 2.61-4.27 4.03-1.66 1.66-3.32 3.44-4.87 5.34-0.35 0.59-0.71 1.07-0.83 1.19a97.226 97.226 0 0 0-5.58 9.73c-1.54 4.39-2.73 8.78-3.68 13.29-0.35 4.63-0.35 9.26 0 13.89 0.83 4.51 2.14 9.02 3.68 13.29 1.42 2.85 2.85 5.46 4.51 8.19 0.36 0.36 1.19 1.54 2.61 3.8 1.3 1.43 2.61 2.97 4.03 4.27 1.66 1.66 3.44 3.32 5.34 4.87 0.59 0.35 1.07 0.71 1.19 0.83 3.08 2.02 6.41 3.92 9.73 5.58 4.39 1.54 8.78 2.73 13.29 3.68 4.63 0.36 9.26 0.36 13.89 0 4.51-0.83 9.02-2.14 13.29-3.68 2.85-1.42 5.46-2.85 8.19-4.51 0.36-0.36 1.54-1.19 3.8-2.61 1.54-1.19 2.97-2.49 4.27-3.92 1.67-1.64 3.33-3.42 4.87-5.32z" p-id="2023" fill="#515151"></path></svg>
          </div>
          <h2 style="font-weight:600;margin-top:0px;width:200px;float:left">分配权限</h2>
          <!--搜索框-->
          <div style="width:800px;margin-left:36%;margin-top:10px;">
            <a-input-search placeholder="输入关键词查询" style="width: 300px;" @search="onSearch" />

            <!--              <div style="display:inline-block;margin-left:20%">-->
            <!--                <a-button @click="changeflag" type="primary">增添</a-button>-->
            <!--              </div>-->
          </div>
        </div>
        <a-divider />
        <div style="margin-left:10px;width:1136px;float:left">
          <a-table :data-source="data" :columns="columns" :pagination="pagination">

            <div slot="action">
              <a-button @click="changeflag" type="primary" style="width:50px;text-align:center;padding-left:0px;padding-right:0px">修改</a-button>
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
    user: '111',
    authority: '111',
  },
  {
    key: '2',
    index: '1',
    user: '111',
    authority: '111',
  },
  {
    key: '3',
    index: '1',
    user: '111',
    authority: '111',
  },
  {
    key: '3',
    index: '1',
    user: '111',
    authority: '111',
  },
  {
    key: '3',
    index: '1',
    user: '111',
    authority: '111',
  },
  {
    key: '3',
    index: '1',
    user: '111',
    authority: '111',
  },
  {
    key: '3',
    index: '1',
    user: '111',
    authority: '111',
  },
  {
    key: '3',
    index: '1',
    user: '111',
    authority: '111',
  },
  {
    key: '3',
    index: '1',
    user: '111',
    authority: '111',
  }
];

export default {
  components: { man_HomePage },
  data() {
    return {
      value1:1,
      value2:1,
      flag:false,
      flag2:false,
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
          title: '用户名',
          dataIndex: 'user',
          key: 'user',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.user
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
          title: '权限',
          dataIndex: 'authority',
          key: 'authority',
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
