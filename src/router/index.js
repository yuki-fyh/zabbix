import Vue from 'vue'
import Router from 'vue-router'
import login from "@/views/login/login";
import jiankong from "@/views/main/jiankong";

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            name: 'first',
            component:() => import('@/views/login/first')
        },
        {
            path: '/first',
            name: 'first',
            component:() => import('@/views/login/first')
        },
        {
            path: '/login',
            name: 'login',
            component:login
        },
        {
            path: '/jiankong',
            name: 'jiankong',
            component:jiankong
        },
        {
            path: '/manager',
            name: 'manager',
            component:() => import('@/views/login/manager')
        },
        {
            path: '/register',
            name: 'register',
            component:() => import('@/views/register/index')
        },
        {
            path: '/abnormal',
            name: 'abnormal',
            component:() => import('@/views/abnormal/index')
        },
        {
            path: '/query',
            name: 'query',
            component:() => import('@/views/query/index')
        },
        {
            path: '/return',
            name: 'return',
            component:() => import('@/views/return/index')
        },
        {
            path: '/authority',
            name: 'authority',
            component:() => import('@/views/authority/index')
        },
        {
            path: '/try',
            name: 'try',
            component:() => import('@/views/try/index')
        },
        {
            path: '/allover',
            name: 'allover',
            component:() => import('@/views/allover/index')
        },
        {
            path: '/chart1',
            name: 'chart1',
            component:() => import('@/views/allover/chart1')
        },
        {
            path: '/add',
            name: 'add',
            component:() => import('@/views/add/add')
        },
        {
            path: '/personal',
            name: 'personal',
            component:() => import('@/views/personal/personal')
        },
        {
            path: '/chart2',
            name: 'chart2',
            component:() => import('@/views/allover/chart2')
        },
        // {
        //     path: '/man_HomePage',
        //     name: 'man_HomePage',
        //     component:() => import('@/components/man_HomePage')
        // },
        {
            path: '/man_personal',
            name: 'man_personal',
            component:() => import('@/views/man_personal/index')
        }
    ]
})
