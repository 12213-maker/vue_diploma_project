import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
    /* 重定向 这里重定向要定到login , 但是我们先定到home */
    {path:'/',redirect:'/1login2'},
    /* 登录 */
    {
      path:'/login',component:()=>import('../components/login/Login')
    },
    {
      path:'/1login2',component:()=>import('../components/login/Login2')
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
      /* 企业信息 */
      {
        path:'/home/enterprise_information',
        component:()=>import('../views/Enterprise_Information/Enterprise_information')
      },
      /* 用户页面 */
      {
        path:'/home/user',
        component:()=>import('../views/User_Center/User')
      },
      /* 管理员页面 */
      {
        path:'/home/administartor',
        component:()=>import('../views/User_Center/Administrator'),
        redirect:'/home/administartor/unfinished',
        children:[
          {
            path:'/home/administartor/unfinished',
            component:()=>import('../views/User_Center/Unfinished'),
          },
          {
            path:'/home/administartor/finished',
            component:()=>import('../views/User_Center/Finished')
          }
        ]
      },
      /* 企业排污 */
      {
        path:'/home/data',
        component:()=>import('../views/Enterprise_sewage/Data'),
        redirect:'/home/data/echarts',
        children:[
          {path:'/home/data/echarts',component:()=>import('../components/data-show/Echarts')},
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

const vm = new Vue()

//添加路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path === '/1login2')return next()

  const token = window.sessionStorage.getItem('token')
  if(!token){
  vm.$message.info('请先登录')
  return next('/1login2') 
  }
  next()
  
})

export default router
