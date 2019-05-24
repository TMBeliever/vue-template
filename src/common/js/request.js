import axios from 'axios';
import { Loading } from 'element-ui';

let [loading, count] = [null, 0];
function closeLoading () {
    if (count <= 0) return;
    count--;
    if (count === 0) {
        setTimeout(() => {
            if (count === 0 && loading) { // 防止接口回调函数里继续调接口
                loading.close();
                loading = null;
            }
        }, 400);
    }
}
// 创建axios 实例
const service = axios.create({
    baseURL: process.env.BASE_URL, // api的base_url
    timeout: 10000 // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(
    config => {
        // 这里可以自定义一些config 配置
        if (!loading) {
            console.log(process.env.BASE_URL);
            loading = Loading.service({
                lock: false,
                text: '拼命加载中...',
                background: 'transparent'
            });
        }
        count++;
        return config;
    },
    error => {
        //  这里处理一些请求出错的情况

        console.log(error);
        Promise.reject(error);
    }
);

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        // 这里处理一些response 正常放回时的逻辑
        closeLoading();
        return res;
    },
    error => {
        // 这里处理一些response 出错时的逻辑
        closeLoading();
        return Promise.reject(error);
    }
);

export default service;
