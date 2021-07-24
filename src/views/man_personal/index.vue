<template>
  <div>
    <div v-show="flag === true" style="width:100%;height:1036px;background-color:rgba(64,64,64,0.7);position:absolute;z-index:10"></div>
    <a-modal v-model="flag" title="修改" ok-text="提交" cancel-text="取消" @ok="hideModal">
      <!--      <a-textarea-->
      <!--          placeholder="请输入修改的内容"-->
      <!--          :auto-size="{ minRows: 3, maxRows: 5 }"-->
      <!--      />-->
    </a-modal>

    <man_HomePage></man_HomePage>
    <div style="position:absolute;top:79px;left:242px;">
      <span>个人信息</span>
      <div style="position:absolute;left:-6px;top:40px;width:1150px;overflow:hidden">
        <div style="width:1200px;margin:auto">
          <div style="display: inline-block;float:left;margin-top:7px;margin-right:7px">
            <svg t="1626939095337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2704" width="20" height="20"><path d="M718.421333 593.664c81.28 31.146667 134.912 88.661333 134.912 175.658667v90.581333c0 43.52-35.285333 78.762667-78.762666 78.762667H249.429333A78.762667 78.762667 0 0 1 170.666667 859.904V769.28c0-87.04 53.632-144.512 134.912-175.658667a37.077333 37.077333 0 0 1 39.850666 8.746667c4.906667 5.034667 9.130667 9.088 12.714667 12.16A235.392 235.392 0 0 0 512 671.488a235.434667 235.434667 0 0 0 157.781333-60.373333c2.56-2.304 5.546667-5.205333 8.96-8.704a36.906667 36.906667 0 0 1 39.68-8.746667zM512 128a196.906667 196.906667 0 0 1 196.906667 196.906667V415.573333a196.906667 196.906667 0 0 1-393.813334 0V324.906667A196.906667 196.906667 0 0 1 512 128z" fill="#515151" p-id="2705"></path></svg>
          </div>
          <h2 style="font-weight:600;margin-top:0px;width:200px;float:left">个人信息</h2>
          <!--搜索框-->
          <div style="width:800px;margin-left:36%;margin-top:10px">
            <!--            <a-input-search placeholder="输入关键词查询" style="width: 300px;" @search="onSearch" />-->

            <div style="display:inline-block;margin-left:70%;margin-top:10px">
              <a-button type="primary" @click="changeflag">修改</a-button>
            </div>
          </div>
        </div>
        <a-divider />
        <div style="margin-left:10px;height:250px">
          <div style="float:left;width:200px;display:inline-block">
            <img src="../../assets/hh.jpg" height="200" width="200" style="border-radius:100px"/>
          </div>
          <div style="width:700px;float:left;margin-left:60px;margin-top:30px;font-size:1.5em">
            <a-descriptions title="个人信息：">
              <a-descriptions-item label="用户名">
                Zhou Maomao
              </a-descriptions-item>
              <a-descriptions-item label="电话">
                1810000000
              </a-descriptions-item>
              <a-descriptions-item label="学校">
                Hangzhou, Zhejiang
              </a-descriptions-item>
              <a-descriptions-item label="专业">
                empty
              </a-descriptions-item>
              <a-descriptions-item label="地址">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
        <div style="margin-left:60px;width:50%;float:left;margin-left:60px">
          <h3>自我介绍：</h3>
          <p style="color:black;text-align:left;margin-left:20px;">xxxxxx</p>
        </div>
        <div style="margin-left:0px;width:40%;float:left">
          <h3>资料完整度：</h3>
          <div style="width:300px;height:26px;background-color:#dddddd;border-radius:10px"><div style="width:200px;height:26px;background-color:dodgerblue;border-radius:10px"></div></div><span style="font-size:16px;margin-left:10px">80%</span>
        </div>
        <a-button style="border:red;background-color:red;color:white;float:right;margin-top:100px" @click="back()">安全退出</a-button>

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
export default {
  components: { man_HomePage },
  data() {
    return {
      flag:false,
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
          sorter: true,
          scopedSlots: { customRender: 'time' },
        },
        {
          title: '主机',
          dataIndex: 'laptop',
          key: 'laptop',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.age
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
          title: '问题严重性',
          dataIndex: 'severe',
          key: 'severe',
        },
        {
          title: '持续时间',
          dataIndex: 'long',
          key: 'long',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.address
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
            { text: '已解决', value: 'al_resolve' },
            { text: '未解决', value: 'no_resolve' },
          ],
        },
        {
          title: '恢复时间',
          dataIndex: 'backtime',
          key: 'backtime',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.address
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
          title: '标记',
          dataIndex: 'record',
          key: 'reocrd',
          filters: [
            { text: '已读', value: 'al_read' },
            { text: '未读', value: 'no_read' },
          ],
        },
        {
          title: '备注',
          dataIndex: 'special',
          key: 'special',
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
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
    back(){
      this.$router.push({ name: 'manager' })
    },
    hideModal() {
      if(this.flag === false)
        this.flag = true;
      else
        this.flag = false;
      console.log(this.flag)
    },
    changeflag() {
      if(this.flag === false)
        this.flag = true;
      else
        this.flag = false;
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

</style>
