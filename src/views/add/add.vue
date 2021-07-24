<template>
  <div>
    <p style="position:absolute;top:12px;right:114px;text-align:center;vertical-align:middle;line-height:18px;font-size: 8px;height:6px;background-color:red;border-radius: 5px;width:6px;float:right;margin-top:5px;z-index:1000"></p>
    <HomePage></HomePage>
    <div style="position:absolute;top:79px;left:242px;">
      <span>监控主机</span>
      <div style="position:absolute;left:-6px;top:40px;width:1150px;overflow:hidden">

        <div style="width:1200px;">
          <div style="display: inline-block;float:left;margin-top:7px;margin-right:7px">
            <svg t="1626920738910" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2827" width="20" height="20"><path d="M599.28 550.325l-88.02-226.372-96.119 180.845-53.647-55.186-90.776 56.565 25.607 14.764 58.172-36.255 70.188 72.267 81.272-152.872 89.862 231.24 76.63-161.338 31.234 66.458 34.24-5.74L672.64 395.86z m267.893 175.414V256.672c0-17.551-13.084-31.741-29.245-31.741H187.113c-16.16 0-29.244 14.191-29.244 31.741v469.067H61.957v38.799c0 17.556 13.104 31.74 29.245 31.74h845.83c16.161 0 29.265-14.185 29.265-31.74v-38.799h-99.123z m-293.149 13.32h-119.8v-20.597h119.8v20.597z m232.98-51.886H218.059V290.367h588.945v396.806z m0 0z" p-id="2828" fill="#515151"></path></svg>
          </div>
          <h2 style="font-weight:600;margin-top:0px;width:200px;float:left">监控机组</h2>
          <!--搜索框-->
          <div style="width:800px;margin-left:36%;margin-top:10px">
            <a-input-search placeholder="输入关键词查询" style="width: 300px;" @search="onSearch" />
            <div style="display:inline-block;margin-left:20%;margin-top:10px">
              <a-button @click="changeflag" type="primary">增添</a-button>
            </div>
          </div>
        </div>
        <div class="content">

          <!--点击增加出现弹窗-->
          <div>
            <div class="mask" v-if="flag" @click="flag===true"></div>
            <a-modal v-model="flag" title="增加" ok-text="保存" cancel-text="关闭" @ok="hideModal">
              <a-input placeholder="请输入IP地址" style="margin-bottom: 20px"></a-input>
              <a-textarea placeholder="请输入备注" :auto-size="{ minRows: 3, maxRows: 5 }"/>
            </a-modal>
          </div>
          <!--点击备注出现弹窗-->
          <div>
            <div class="mask" v-if="flag2" @click="flag2===false"></div>
            <a-modal v-model="flag2" title="备注" ok-text="提交" cancel-text="取消" @ok="hideModal2">
              <a-textarea placeholder="请输入备注" :auto-size="{ minRows: 3, maxRows: 5 }"/>
            </a-modal>
          </div>
          <a-divider />
          <!--table展示数据-->
          <div style="margin-left:10px;width:1136px;float:left">
            <a-table :data-source="data" :columns="columns" :pagination="pagination">

              <div slot="problem">
                <a-tag color="red">
                  1
                </a-tag>
                <a-tag color="orange">
                  2
                </a-tag>
              </div>

              <div slot="img">
                <a-button  style="width:50px;text-align:center;padding-left:0px;padding-right:0px">查看</a-button>
              </div>

              <div slot="action">
                <a-button  type="primary" @click="changeflag2" style="width:50px;text-align:center;padding-left:0px;padding-right:0px">备注</a-button>
                <a-button  @click="changeflag_sc" type="primary" style="border:#389E0D;background-color:#F5222D;width:50px;text-align:center;padding-left:0px;padding-right:0px;margin-left:5px">删除</a-button>
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
  </div>
</template>

<script>
import HomePage from '../../components/HomePage'
// eslint-disable-next-line no-unused-vars
const data=[
      {
        hostid: '1',
        time: '2021/7/20',
        hostname: 'LATop',
        IP: '192.124.174.1',
        problem: '1',
        img:'',
        notes:'没问题',
        action:''
      },
      {
        hostid: '1',
        time: '2021/7/20',
        hostname: 'LATop',
        IP: '192.124.174.1',
        problem: '1',
        img:'',
        notes:'没问题',
        action:''
      },
      {
        hostid: '1',
        time: '2021/7/20',
        hostname: 'LATop',
        IP: '192.124.174.1',
        problem: '1',
        img:'',
        notes:'没问题',
        action:''
      },
    ];

export default {
  name: "add",
  components:{HomePage},
  data(){
      return{
        data,
        flag:false,
        flag2:false,
        collapsed: false,
        showModal:false,
        showAdd:false,
        showNotes:false,
        pagination:{
          pageNo: 1,
          pageSize: 10, // 默认每页显示数量
          //showTotal: total => `Tot ${total} items`, // 显示总数
          onShowSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
          onChange: (current, pageSize) => {
            this.pagination.current=current;
            this.pagination.pageSize=pageSize;
          },//点击页码事件//点击页码事件
          total: 0 //总条数
        },
        columns:[
          {
            title: '序号',
            dataIndex: 'hostid',
            key:'hostid',
          },
          {
            title: '加入时间',
            dataIndex: 'time',
            key:'time',
          },
          {
            title: '主机',
            dataIndex: 'hostname',
            key:'hostname',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) =>
                record.hostname
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
            title: 'IP地址',
            dataIndex: 'IP',
            key:'IP',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) =>
                record.IP
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
            title: '问题',
            dataIndex: 'problem',
            key:'problem',
            scopedSlots:{customRender:'problem'},
          },
          {
            title: '图像',
            dataIndex: 'img',
            key:'img',
            scopedSlots:{customRender:'img'},
          },
          {
            title: '备注',
            dataIndex: 'notes',
            key:'notes',
          },
          {
            title: '操作',//单引号与双引号有区别
            dataIndex: 'action',
            key: 'action',
            scopedSlots:{customRender:'action'},
          },
        ]
      }
  },
  methods:{
    changeflag () {
      if(this.flag == false)
        this.flag = true;
      else
        this.flag = false;
      console.log(this.flag)
    },
    changeflag2 () {
      if(this.flag2 == false)
        this.flag2 = true;
      else
        this.flag2 = false;
      console.log(this.flag2)
    },
    hideModal () {
      if(this.flag == false)
        this.flag = true;
      else
        this.flag = false;
      console.log(this.flag)
    },
    hideModal2 () {
      if(this.flag2 == false)
        this.flag2 = true;
      else
        this.flag2 = false;
      console.log(this.flag2)
    },
    changeflag_sc () {
      this.$message.success('删除成功');
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/abnormal.css";
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  height: 100%;
  transition: color 0.3s;
}
.content{
  height: 700px;
}
/*************弹窗***************/
.mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1
}
.pop {
  background-color: #fff;
  position: fixed;
  top: 40%;
  left: 45%;
  width:200px;
  height:100px;
  z-index: 2;
}
/*****************************/
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

</style>
