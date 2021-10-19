import axios from "axios"
const qs = require('qs');
import { ElMessage } from 'element-plus';
import { getStore } from "@store";
import { getRouter } from "../router"

let baseApi = process.env.BASE_API
const store = getStore()
const router = getRouter()

const instance = axios.create({
    baseURL: baseApi,
    timeout: 30000,
    headers: {
        "content-type": "application/x-www-form-urlencoded",
    },
    withCredentials: false
})

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = store.state.token
    const sessionToken = window.sessionStorage.getItem('token')
    const useToken = token ? token : sessionToken
    console.log('config', config)
    if(!config.data) {
        config.data = ''
    }
    if (config.method === 'get' && useToken) {
        config.params = {
            token: useToken,
            ...config.params
        }
    } else if (config.method === 'post' && useToken) {
        let data = qs.parse(config.data)
        config.data = qs.stringify({
            token: useToken,
            ...data
        })
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('response', response)
    if(response.data.status === 200) {
        return response.data;
    } else {
        ElMessage({
            showClose: true,
            message: response.data.msg || '出现异常，请稍后重试',
            type: 'error',
            center: true
        })
        if(response.data.status === 203) {
            // token失效处理
            return router.push('/login')
        }
        return Promise.reject(response.data);
    }
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export function POST(url, params) {
    return instance.post(url, qs.stringify(params))
}

export function GET(url, params) {
    return instance.get(url, {params: params})
}

const httpRequest = instance
httpRequest.$get = GET
httpRequest.$post = POST


export default (app) => {
    app.config.globalProperties.$http = httpRequest
}