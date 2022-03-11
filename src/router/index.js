import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
    /* 重定向 这里重定向要定到login , 但是我们先定到home */
    {path:'/',redirect:'/login'},
    /* 登录 */
    {
      path:'/login',component:()=>import('../components/login/Login')
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
        path:'/home/analysis',
        component:()=>import('../views/data_analysis/Analytics')
      },
      /* 用户页面 */
      {
        path:'/home/user',
        component:()=>import('../views/User_Center/User')
      },
      {
        path:'/home/administartor',
        component:()=>import('../views/User_Center/Administrator')
      },
      /* 企业排污 */
      {
        path:'/home/data',
        component:()=>import('../views/Enterprise_sewage/Data'),
        redirect:'/home/data/test1',
        children:[
          {path:'/home/data/test1',component:()=>import('../components/Tested/Test1')},
          {path:'/home/data/test2',component:()=>import('../components/Tested/Test2')}
        ]
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
