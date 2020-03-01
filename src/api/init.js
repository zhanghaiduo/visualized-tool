import axios from 'axios';
import { Message } from 'element-ui';
export const req = (config) => {
    if (config.config) {
        const outConfig = config.config; // 取出调用时候传进来的配置
        delete config.config; // config现在只剩api文件中的配置
        if (config.data && outConfig.data) {
            config.data = { // 合并两个config的data
                ...config.data,
                ...outConfig.data,
            };
            delete outConfig.data; // 调用时传进来的config现在只剩除data之外的配置
        } else if (outConfig.data) {
            config.data = outConfig.data;
            delete outConfig.data; // 调用时传进来的config现在只剩除data之外的配置
        }
        config = { // 合并两个config
            ...config,
            ...outConfig,
        };
    }
    return new Promise((resolve, reject) => {
        axios({
            ...config,
        }).then((res) => {
            if (res.data.code != '0000') {
                Message({
                    showClose: true,
                    message: (res.data.msg || '网络异常'),
                    type: 'error',
                    duration: 10000
                })
            }
            resolve(res.data);
        }).catch((err) => {
            Message({
                message: '网络异常',
                type: 'error',
                duration: 10000
            })
            reject(err);
        });
    });
};
