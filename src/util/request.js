import axios from 'axios'
import config from '@/config/config'


//创建一个axios实例
const request = axios.create({
    baseURL: config.serverPath,
    timeout: 3000
});

//如果需要用到session，就要配置这个
request.defaults.withCredentials=true

//设置请求拦截器
request.interceptors.request.use(config => {
    //给所有的请求添加token
    config.headers.token = window.sessionStorage.getItem('token')
    //给所有的请求都加上当前请求的页面，用于做数据权限
    config.headers.current_page = window.location.href.split('#').pop()

    return config
})

export default request

