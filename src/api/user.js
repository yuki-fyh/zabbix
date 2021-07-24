import {post} from "./api";


// const baseUrl = '/api_jsonrpc.php'

const baseUrl = '/user'

const registerUrl = '/user/registerUser'

const loginUrl = '/user/login'

const displayEventsUrl = '/user/displayEvents'

const updateEventsUrl = '/user/updateEvents'

const addQueryUrl = '?'

const searchEventsUrl = '/user/searchEvents'
/*
* 登录本系统，确认本系统存储有数据，
* =》向zabbix发送登录请求，获取auth
* */
export function userlogin(username,password) {
    return post(
        baseUrl,
        {
            username,password
        })
}

export function register(name,password,telephone) {
    return post(
        registerUrl,
        {
            name,password,telephone
        })
}


export function login(name,password) {
    return post(
        loginUrl,
        {
            name,password
        })
}

export function getInfo () {
    return post(baseUrl + '/getInfo')
}
//展示异常信息
export function displayEvents(time_from,time_till) {
    return post(
        displayEventsUrl,
        {
            time_from,time_till
        })
}
//更新异常信息
export function updateEvents(action,eventids,severity,message) {
    return post(
        updateEventsUrl,
        {
            action,eventids,severity,message
        })
}

export function update1(action,eventids) {
    return post(
        updateEventsUrl,
        {
            action,eventids
        })
}

//增添询问
export function addQuery(content) {
    return post(
        addQueryUrl,
        {
            content
        })
}

//关键字查询
export function searchEvents(key) {
    return post(
        searchEventsUrl,
        {
            key
        })
}
