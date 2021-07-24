import Vue from 'vue'
import Vuex from 'vuex'
// import {login} from "@/api/zabbix";
import {login,getInfo} from "@/api/user";
import {adminLogin,createHostGroup,createUserGroup} from"@/api/admin"
import storage from 'store'
import md5 from 'md5'

Vue.use(Vuex)

//state，数据源；
//view，将 state数据源映射到页面；
//actions，用户导致的状态变化。
const store = new Vuex.Store({

    state: {      //状态
        token: '',
        info: {},
        auth:'',
        name:'',
        hostGroupId:'',
        userGroupId:'',
    },
    mutations: { //状态变化
        SET_INFO: (state, info) => {
            state.info = info
        },
        SetAuth (state,auth) {
            state.auth=auth
        },
        SetName (state,name) {
            state.name=name
        },
        SetHostGroupId (state,id) {
            state.hostGroupId=id
        },
        SetUserGroupId (state,id) {
            state.userGroupId=id
        },
        SetUser(state,userInfo){
            state.userInfo=userInfo
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
    },
    actions:{
        GetAdminAuth({commit}){
            return new Promise((resolve,reject) => {
                adminLogin().then(function (response){
                    console.log("222")
                    const author= response.data.result
                    console.log(response)
                    console.log("获取admin令牌成功")
                    console.log(author)
                    commit('SetAuth', author)
                    resolve()
                }).catch(function (error){
                    reject(error)
                })
            })
        },
        //获取用户auth
        GetUserAuth(uname){
            console.log(uname)
            return new Promise((resolve,reject) => {
                login().then(function (response){
                    const author= response.data.result
                    console.log("获取user令牌成功")
                    console.log("用户令牌：",author)
                    store.commit('SetAuth', author)
                    resolve()
                }).catch(function (error){
                    reject(error)
                })
            })
        },
        CreateHostGroup(){
            return new Promise((resolve,reject)=>{
                createHostGroup(store.state.auth,store.state.auth).then(function (response){
                    console.log(response)
                    const groupid = response.data.result.groupids[0];
                    console.log("获得的机组id",groupid)
                    store.commit('SetHostGroupId',groupid)
                    resolve()
                }).catch(function (error){
                    reject(error)
                })
            } )
        },
        CreateUserGroup(){
            return new Promise((resolve, reject) => {
                createUserGroup(store.state.auth,store.state.hostGroupId).then(function (response){
                    console.log(response)
                    const usergroupid=response.data.result.usrgrpids[0]
                    console.log("获得的群组id",usergroupid)
                    store.commit('SetUserGroupId',usergroupid)
                    resolve()
                }).catch(function (error){
                    reject(error)
                })
            })
        },
        login ({commit},userInfo) {
            const { user, password } = userInfo
            console.log(user)
            return new Promise((resolve, reject) => {
                const pwd = md5(password)
                login(user,pwd).then(res => {
                    const data = res.data
                    storage.set('access_token', data['accessToken'])
                    console.log('1:',data['accessToken'])

                    commit('SET_TOKEN', data['accessToken'])

                    console.log('store.state.token',store.state.token)
                    console.log(data['accessToken'])
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getInfo({ commit }) {
            console.log('token', store.state.token)
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    // console.log('token', store.state.token)
                    console.log('info', res)
                    commit('SET_INFO', res.data)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
})

export default store
