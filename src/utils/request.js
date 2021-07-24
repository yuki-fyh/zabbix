import axios from "axios";
import Qs from "qs";
import { notification } from "ant-design-vue";

import storage from 'store'
//import { notification } from "ant-design-vue";
//import Qs from 'qs'
//import storage from 'store'

// 创建axios实例
const request = axios.create({
    // API请求默认前缀

    baseURL: 'http://10.169.111.59',
    // 请求超时时间
    timeout: 60000,
    // 请求头设置
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
    },
    transformRequest: [
        function (data) {
            // 在请求之前对data传参进行格式转换
            // 将对象序列化成URL的形式，以&进行拼接
            return Qs.stringify(data)
            //post 数据对象属性值含有 `object/array`，
            // 需要将这些属性值转化为 `JSON` 字符串
        }
    ]
})




// 异常拦截处理器
const errorHandler = (error) => {
    console.log(error) // for debug

    notification.error({
        message: 'ERROR',
        description: '无法连接服务'
    })
    return Promise.reject(error)
}

// request interceptor 请求拦截器，在请求发送之前做什么
request.interceptors.request.use(config => {
    const token = storage.get('access_token')
    if (token) {
        config.headers['access_token'] = token
        console.log('if', token)
    }
    console.log('1',token)
    console.log(config)
    return config
}, errorHandler)

// response interceptor 响应拦截器
request.interceptors.response.use(response => {
    const res = response.data
    console.log(res)
    if(res.resultCode != 200 && res.resultCode != 111){
        notification.error({
            message: 'ERROR',
            description: res.msg || '发生未知错误'
        })
        return Promise.reject(res.msg || 'Error')
    } else {
        return res
    }
},errorHandler)

export default request
