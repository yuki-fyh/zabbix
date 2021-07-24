import request from "@/utils/request";
//zabbix
import myRequest from "@/utils/myRequest";
/**
 * 发送post请求
 * @param url
 * @param data
 * @returns {AxiosPromise}
 */
export function post (url, data) {
    return request({
        url: url,
        method: 'post',
        data
    })
}

export function mypost (url, data) {
    return myRequest({
        url: url,
        method: 'post',
        data
    })
}

