import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
    // 共同的数据
    state: {
        /* 是否登录 */
        isLogin: window.sessionStorage.getItem('login') || false,
        /* 是否收藏企业 */
        isCollect: false,
        /* 所有公司的数据 */
        TableData: [],
        /* 所用用户数据 */
        user: {
            /* 用户账户 */
            account: '',
            /* 用户昵称 */
            name: '',
            /* 用户年龄 */
            age: 0,
            /* 用户性别 */
            sex: '',
        },
    },
    // 共同的action
    actions:{
        doUpdateUser(context,userInfo){
            context.commit("SET_ALL",userInfo)
        }
    },
    // 共同的方法(第一个参数是state,第二个参数是用户传进来的值)
    mutations: {
        //修改登录状态
        changeLogin(state, flag) {
            state.isLogin = flag
        },
        /* 修改收藏状态 */
        changeIsCollect(state, flag) {
            state.isCollect = flag
        },
        /* 修改公司的数据 */
        changeTableData(state, value) {
            state.TableData = value
        },
        /* 修改账户--电话 */
        SET_ACCOUNT(state, account) {
            state.user.account = account
        },
        SET_NAME(state, name) {
            state.user.name = name
        },
        SET_AGE(state, age) {
            state.user.age = age
        },
        SET_SEX(state, sex) {
            state.user.sex = sex
        },
        SET_ALL(state,userInfo){
            state.user=Object.assign(state.user, userInfo)
        }
    },

    // 共同的getters
    getters: {
        allInfo: state => state.user
      }

})