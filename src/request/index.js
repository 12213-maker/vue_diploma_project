import axios from 'axios'


export default function request(method, url, data, type) {
    if (type == 0) {
    const instance = axios.create({
        baseURL:'/api',
        // timeout: 1000,
        withCredentials:true,//允许跨域携带cookie信息
        headers:{
            'Content-Type': 'application/json'
        }
    })
    /* 请求拦截器 */
    axios.interceptors.request.use(
        //发送之前做些什么
        (config)=>{
            return config
        },
        //请求错误的时候做些什么
        (error)=>{
            console.log(error);
        }
    )

    //响应拦截器
    axios.interceptors.response.use(
        (response)=>{
            return response
        },
        (error)=>{
            console.log(error);

        }
    )

    return instance[method](url,data)


    } 
    else {
        const instance = axios.create({
            baseURL:'/api2',
            withCredentials:true,//允许跨域携带cookie信息
            headers:{
                'Content-Type': 'application/json'
            }
        })

        /* 请求拦截器 */
    instance.interceptors.request.use(
        //发送之前做些什么
        // (config)=>{
        //     return config
        // },

        function (config) {
             
               const token = window.sessionStorage.getItem('token')
               if (token) {
                 config.headers.Authorization = token;
               }
              return config;
            },


        //请求错误的时候做些什么
        (error)=>{
            console.log(error);
        }
    )

    // 响应拦截器
    instance.interceptors.response.use(
        (response)=>{
            return response
        },
        (error)=>{
            console.log(error);

        }
    )

    return instance[method](url,data)

    }
}




