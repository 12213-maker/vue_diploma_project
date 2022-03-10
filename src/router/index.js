import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
    /* 重定向 这里重定向要定到login , 但是我们先定到home */
    {path:'/',redirect:'/home'},
    /* 登录 */
    {
      path:'/login',component:()=>import('../views/Login')
    },
    /* home以及子组件 */
    {
    path: '/home',
    name: 'Home',
    component: ()=>import('../views/Home'),
    redirect:'/data',
    children:[
      /* 数据分析 */
      {
        path:'/analysis',
        component:()=>import('../views/data_analysis/Analytics')
      },
      /* 用户页面 */
      {
        path:'/user',
        component:()=>import('../views/User_Center/User')
      },
      {
        path:'/administartor',
        component:()=>import('../views/User_Center/Administrator')
      },
      /* 企业排污 */
      {
        path:'/data',
        component:()=>import('../views/Enterprise_sewage/Data')
      },
      {
        path:'/collect',
        component:()=>import('../views/Enterprise_sewage/Collect')
      },
      {
        path:'/search',
        component:()=>import('../views/Enterprise_sewage/Search')
      },
    ]
    }
  
]

const router = new VueRouter({
  routes
})

export default router
