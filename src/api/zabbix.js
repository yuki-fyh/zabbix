import { post } from './api'//导出方法，需要使用{}


const baseUrl = '/api_jsonrpc.php'

/*

/*
* 使用user.login方法，获取验证
* */
export function login() {
    return post(
        baseUrl,
        {
            "jsonrpc":"2.0",
            "method":"user.login",
            "params": {
                "user":'cjw',
                "password":'123456'
            },
            "id": 1
        })
}
export function createHost(auth,hostForm) {
    console.log(auth,"/",hostForm.hostGroup,"/",hostForm.hostname)
    return post(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "host.create",
            "params": {
                "host": hostForm.hostname,   //主机名
                "interfaces": [
                    {
                        "type": 1,
                        "main": 1,
                        "useip": 1,
                        "ip": "192.168.3.1",//Ip
                        "dns": "",
                        "port": "10050"
                    }
                ],
                "groups": [
                    {
                        "groupid": hostForm.hostGroup// 群组
                    }
                ],
                "templates": [
                    {
                        "templateid": "10001"//模板
                    }
                ],
                "inventory_mode": 0,
                "inventory": {
                    "macaddress_a": "01234",
                    "macaddress_b": "56768"
                }
            },
            "auth":auth,
            "id": 1
        })
}//创建主机
/********************************************************************************/


export function getUsers(auth) {
    console.log(auth)
    return post(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "user.get",
            "params": {
                "output": "extend"
            },
            "auth": auth,
            "id": 1
        })
}

export function getIp(auth) {
    console.log(auth)
    return post(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "output": ["host","hostid"],
                /*"selectInterfaces": ["interfaceid", "ip"],*/
                "selectParentTemplates":["templateids"],
                "selectGroups":["groupid"]
                /*"selectGraphs":["graphid"]*/
            },
            "auth": auth,
            "id": 1
        })
}

export function create(auth) {//创建监控项
    console.log(auth)
    return post(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "item.create",
            "params": {
                "name": "Free disk space on $1",
                "key_": "vfs.fs.size[/home/joe/,free]",
                "hostid": "10084",
                "type": 0,
                "value_type": 3,
                "interfaceid": "1",
                "delay": 30
            },
            "auth": auth,
            "id": 3
        })
}

export function addTemplate(auth) {
    console.log(auth)
    return post(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "template.massadd",
            "params": {
                "templates": [
                    {
                        "templateid": "10047"//模板id
                    }
                ],
                "hosts": [
                    {
                        "hostid": "10427"//主机id
                    },
                ]
            },
            "auth": auth,
            "id": 1
        })
}//给主机添加模板


export function GetCPU(auth,hostid) {
    console.log(auth)
    return post(
        baseUrl,
        {
            "jsonrpc": "2.0",
            "method": "item.get",
            "params": {
                "output": "extend",
                "hostids": hostid,
                "search": {
                    "key_": "apache"
                },
                "filter": {
                    "type": "18"
                }
            },
            "auth": "038e1d7b1735c6a5436ee9eae095879e",
            "id": 1
        })
}
