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
        /* 所用用户数据 */
        // user: {
            
        //     /* 用户账户 */
        //     account: '',
        //     /* 用户昵称 */
        //     name: '',
        //     /* 用户年龄 */
        //     age: 0,
        //     /* 用户性别 */
        //     sex: '',
        // },

        // 用户数据
        user:{
            phoneNumber:'11111',
            userName:'account',
            password:'abc',
            city:'绵阳',
        },
        userList:[
            {
                phone:'12221221',
                account:'234234',
                name:"wuwuuw",
                city:"绵阳",
                age:21,
                sex:'男'
            },
            {
                phone:'12221221',
                account:'234234',
                name:"wuwuuw",
                city:"绵阳",
                age:21,
                sex:'男'
            },
            {
                phone:'12221221',
                account:'234234',
                name:"wuwuuw",
                city:"绵阳",
                age:21,
                sex:'男'
            },
            {
                phone:'12221221',
                account:'234234',
                name:"wuwuuw",
                city:"绵阳",
                age:21,
                sex:'男'
            },
            {
                phone:'12221221',
                account:'234234',
                name:"wuwuuw",
                city:"绵阳",
                age:21,
                sex:'男'
            },
            {
                phone:'12221221',
                account:'234234',
                name:"wuwuuw",
                city:"绵阳",
                age:21,
                sex:'男'
            },
            {
                phone:'12221221',
                account:'234234',
                name:"wuwuuw",
                city:"绵阳",
                age:21,
                sex:'男'
            },
        ]
    },
    // 共同的action
    actions: {
        // 拉取用户信息 需要传api
          pullUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
              this.$request().then(resp => {
                let data = resp.data
                commit("SET_PHONE", data.phoneNumber)
                commit("SET_NAME", data.userName)
                commit("SET_PASSWORD", data.password)
                commit("SET_CITY", data.city)
                return resolve(data)
              }).catch(err => {
                return reject(err)
              })
            })
          },
        // 更新用户信息
        doUpdateUser({ commit }, userInfo) {
            return new Promise(resolve => {
              commit(SET_ALL, userInfo)
              setTimeout(() => {
                resolve()
              }, 1000)
            })
          }
    },


    // 共同的方法(第一个参数是state,第二个参数是用户传进来的值)
    mutations: {
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

        /* 用户信息模块 */

    //   更新用户信息
        SET_ALL(state, userInfo) {
            state.user = Object.assign(state.user, userInfo)
        },
        // 设置手机
        SET_PHONE(state,phoneNumber) {
            state.user.phoneNumber = phoneNumber
          },
        //   设置用户名
        SET_NAME(state, userName) {
            state.user.userName = userName
          },
        //   设置密码
        SET_PASSWORD(state,password){
            state.user.password=password
        },
        // 设置城市
        SET_CITY(state,city){
            state.user.city=city
        },

    },

    // 共同的getters
    getters: {
        allInfo: state => state.user
    }

})