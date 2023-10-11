import axios from "axios";

export const Service = axios.create({
    // baseURL: 'https://www.baidu.com',
    baseURL: process.env.BASE_URL,
    timeout: 8000,
    // method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
})

Service.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err);
})

Service.interceptors.response.use(res => {
    return res.data
}, err => {
    console.log(err)
    return Promise.reject(err);
})