import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({

    
    // 共同的数据
    state: {
        isLogin:window.sessionStorage.getItem('login')||false
    },


    // 共同的方法(第一个参数是state,第二个参数是用户传进来的值)
    mutations: {
        //修改登录状态
        changeLogin(state,flag){
            state.isLogin = flag
        }
    }
       
})