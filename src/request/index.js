import axios from 'axios'

/* url 是请求地址, params是参数对象格式 */
export default function request(url,params){
    //创建axios实例
    const instance = axios.create({
        baseURL:'/api',
        withCredentials:true,//允许跨域携带cookie信息
        timeout:1000,
        // header: {"Content-Type": "application/json", },
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


    return instance.post(url,params)
}