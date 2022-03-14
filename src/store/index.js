import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({

    
    // 共同的数据
    state: {
        /* 是否登录 */
        isLogin:window.sessionStorage.getItem('login')||false,
        /* 是否收藏企业 */
        isCollect:false,
        /* 所有公司的数据 */
        TableData:[],
    },


    // 共同的方法(第一个参数是state,第二个参数是用户传进来的值)
    mutations: {
        //修改登录状态
        changeLogin(state,flag){
            state.isLogin = flag
        },
        /* 修改收藏状态 */
        changeIsCollect(state , flag){
            state.isCollect = flag
        },
        /* 修改公司的数据 */
        changeTableData(state,value){
            state.TableData = value
        }
    }
       
})