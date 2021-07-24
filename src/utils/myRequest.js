import axios from "axios";
// import Qs from 'qs'
/*
* 此文件为针对zabbix的请求
* */

// 创建axios实例
const myRequest = axios.create({
    // API请求默认前缀
    baseURL: 'http://10.175.102.192/zabbix/',
    // 请求超时时间
    timeout: 60000,
    // 请求头设置
    headers: {
        'Content-Type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest'
    },
    transformRequest: [
        function (data) {
            // 在请求之前对data传参进行格式转换
            // 将对象序列化成URL的形式，以&进行拼接
            return JSON.stringify(data)
        }
    ]
})
export default myRequest
