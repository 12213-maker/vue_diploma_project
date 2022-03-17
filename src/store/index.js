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
        collectList: [
            {
                date: "2016-05-02",
                name: "王小虎",
                province: "成都",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1518 弄",
                zip: 200333,
            },
            {
                date: "2016-05-04",
                name: "小李",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1517 弄",
                zip: 200333,
            },
            {
                date: "2016-05-01",
                name: "张三",
                province: "北京",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1519 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "喜羊羊",
                province: "重庆",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "灰太狼",
                province: "香港",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "红太狼",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "海绵宝宝",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "派大星",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "章鱼哥",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "一十四洲",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "扶华",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-02",
                name: "王小虎",
                province: "成都",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1518 弄",
                zip: 200333,
            },
            {
                date: "2016-05-04",
                name: "小李",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1517 弄",
                zip: 200333,
            },
            {
                date: "2016-05-01",
                name: "张三",
                province: "北京",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1519 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "喜羊羊",
                province: "重庆",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "灰太狼",
                province: "香港",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "红太狼",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "海绵宝宝",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "派大星",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "章鱼哥",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "一十四洲",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
            {
                date: "2016-05-03",
                name: "扶华",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1516 弄",
                zip: 200333,
            },
        ],

        /* 所有公司的数据 */
        TableData: [],
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
        }
    }

})