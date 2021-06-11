import axios from "axios"

let baseApi = process.env.BASE_API

console.log('baseApi', baseApi)

const instance = axios.create({
    baseURL: baseApi,
    timeout: 30000,
    headers: {
        "content-type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export function POST(url, params) {
    return instance.post(url, params)
}


export default (app) => {
    app.config.globalProperties.$http = instance
}