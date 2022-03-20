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
    redirect:'/home/data',
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
      /*管理员页面*/
      {
        path:'/administartor',
        component:()=>import('../views/User_Center/Administrator'),
        redirect:'/administartor/myhome',
        children:[
          {
            path:'/administartor/myhome',
            component:()=>import('../views/User_Center/MyHome'),
          },
          {
            path:'/administartor/unfinished',
            component:()=>import('../views/User_Center/Unfinished'),
          },
          {
            path:'/administartor/finished',
            component:()=>import('../views/User_Center/Finished')
          }
        ]
      },
      /* 企业排污 */
      {
        path:'/home/data',
        component:()=>import('../views/Enterprise_sewage/Data')
      },
      {
        path:'/home/collect',
        component:()=>import('../views/Enterprise_sewage/Collect')
      },
      {
        path:'/home/search',
        component:()=>import('../views/Enterprise_sewage/Search')
      },
    ]
    }
  
]

const router = new VueRouter({
  routes
})

export default router
