import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({


    // 共同的数据
    state: {
        //是否显示默认页面或者在search中查询了具体页面
        freeze: window.sessionStorage.getItem('freeze') || 1,

        /* 是否登录 */
        isLogin: window.sessionStorage.getItem('login') || false,


        // search是否跳转到data
        flag:0,

        //折叠框是否展开
        isCollapse:false,


        /* 是否收藏企业 */
        isCollect: false,
        // collectList: [
        //     {
        //         date: "2016-05-02",
        //         name: "王小虎",
        //         province: "成都",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1518 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-04",
        //         name: "小李",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1517 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-01",
        //         name: "张三",
        //         province: "北京",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1519 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "喜羊羊",
        //         province: "重庆",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "灰太狼",
        //         province: "香港",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "红太狼",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "海绵宝宝",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "派大星",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "章鱼哥",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "一十四洲",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "扶华",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-02",
        //         name: "王小虎",
        //         province: "成都",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1518 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-04",
        //         name: "小李",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1517 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-01",
        //         name: "张三",
        //         province: "北京",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1519 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "喜羊羊",
        //         province: "重庆",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "灰太狼",
        //         province: "香港",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "红太狼",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "海绵宝宝",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "派大星",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "章鱼哥",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "一十四洲",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        //     {
        //         date: "2016-05-03",
        //         name: "扶华",
        //         province: "上海",
        //         city: "普陀区",
        //         address: "上海市普陀区金沙江路 1516 弄",
        //         zip: 200333,
        //     },
        // ],

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
    actions: {
        doUpdateUser(context, userInfo) {
            context.commit("SET_ALL", userInfo)
        }
    },


    // 共同的方法(第一个参数是state,第二个参数是用户传进来的值)
    mutations: {


        //修改折叠状态
        changeIsCollapse(state,flag){
            state.isCollapse = flag
        },

        // 修改跳转状态
        changeflag(state){
            state.flag=1
        },

        //修改data页面冻结状态
        changeFreeze(state){
            state.freeze = false
        },

        //修改登录状态
        changeLogin(state, flag) {
            state.isLogin = flag
        },
        /* 修改收藏状态 */
        changeIsCollect(state, flag) {
            state.isCollect = flag
        },
        /* 修改收藏的公司 */
        changeCollectList(state,value){
            /* value中要有
            {
                date: "2016-05-02",
                name: "王小虎",
                province: "成都",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1518 弄",
                zip: 200333,
            },
            */
           state.collectList.push(value)
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
        SET_ALL(state, userInfo) {
            state.user = Object.assign(state.user, userInfo)
        },


    },

    // 共同的getters
    getters: {
        allInfo: state => state.user
    }

})