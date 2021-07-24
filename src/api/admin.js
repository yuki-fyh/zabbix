import { mypost } from './api'//导出方法，需要使用{}


const baseUrl = '/api_jsonrpc.php'

/*
* 用Admin超级用户  ,使用user.login方法，获取验证
* */
export function adminLogin() {
    return mypost(
        baseUrl,
        {
            "jsonrpc":"2.0",
            "method":"user.login",
            "params": {
                "user":"Admin",
                "password":"zabbix"
            },
            "id": 1
        })
}
/*
* 创建主机群组
* */
export function createHostGroup(auth,data) {
    console.log(auth)
    return mypost(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "hostgroup.create",
            "params": {
                "name": data
                //创建主机群组，群组名是必填项，
                // 通过后台给用户默认设置好
            },
            "auth":auth,
            "id": 1
        })
}
/*
* 创建用户群组，
* 进行的任务：
* 1.设置群组权限  2.将上面分配到的主机机组添加
* 需要数据：1.用户组名称
* */
export function createUserGroup(auth,hostGroupId) {
    return mypost(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "usergroup.create",//创建用户群组
            "params": {
                "name": auth,//创建的用户组的名称
                "rights": {//权限设置
                    "permission": 2,//设置访问主机组的权限,
                    "id": hostGroupId//分配的主机机组的id
                },
            },
            "auth": auth,
            "id": 1
        })
}
/*
* 用Admin超级用户进行登录，
* 创建用户
* 必填数据：用户名，用户群组，密码
* */
export function createUser(auth,username,password,userGroupId) {
    console.log("用户信息",username,"/",auth,"/",password,"/",userGroupId )
    return mypost(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "user.create",
            "params": {
                "alias": username,
                "passwd": password,
                "usrgrps": [
                    {
                        "usrgrpid": userGroupId//用户群组id
                    }
                ],
                "user_medias": [
                    {
                        "mediatypeid": "1",
                        "sendto": [
                            "support@company.com"
                        ],
                        "active": 0,
                        "severity": 63,
                        "period": "1-7,00:00-24:00"
                    }
                ]
            },
            "auth": auth,
            "id": 1
        })
}

/********************************************************************************/

export function getItem(auth,itemid) {
    return mypost(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "history.get",
            "params": {
                "output": "extend",
                "history": 0,
                "hostids": "10084",//zabbix server
                "filter": {
                    "itemid":[ itemid]
                },
                "sortfield": "clock",
                "sortorder": "DESC",
                "limit": 20
            },
            "auth": auth,
            "id": 1
        })
}
