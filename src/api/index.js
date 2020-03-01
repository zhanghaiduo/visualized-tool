
import { req } from 'api/init';
import { getBeforeTime } from 'utils';
let baseUrl = ''

// 获取服务器监控信息
export const getServerData = (data) => req({
    url: `${baseUrl}/monitor/server/data`,
    method: 'get',
    data,
});
// 获取dna服务器监控信息
// export const getServerDna = (data) => req({
//     url: `${baseUrl}/monitor/server/dna`,
//     method: 'get',
//     data,
// });
// 获取memcache服务器监控信息
// export const getServerMemcache = (data) => req({
//     url: `${baseUrl}/monitor/server/memcache`,
//     method: 'get',
//     data,
// });
// 获取ibm服务器监控信息
// export const getServerMq = (data) => req({
//     url: `${baseUrl}/monitor/server/mq/ibm`,
//     method: 'get',
//     data,
// });
// 获取redis服务器监控信息
// export const getServerRedis = (data) => req({
//     url: `${baseUrl}/monitor/server/redis`,
//     method: 'get',
//     data,
// });
// -----
// 交易总数
export const getOrderTotalData = (params) => req({
    url: `${baseUrl}/monitor/dna/order/total`,
    method: 'get',
    params,
});
// 获取短信服务监控信息   在这里写死默认要最近的两小时
export const getSmsData = (params) => req({
    url: `${baseUrl}/monitor/sms/data`,
    method: 'get',
    params: { ...{ frequency: getBeforeTime(2)}, ...{ params }  },
});
// 获取回调监控信息     在这里写死默认要最近的两小时
export const getCallback = (params) => req({
    url: `${baseUrl}/monitor/dna/callback`,
    method: 'get',
    params: { ...{ frequency: getBeforeTime(2)}, ...{ params }  },
});
// 获取通道监控信息
export const getChannel = (params) => req({
    url: `${baseUrl}/monitor/dna/channel/success`,
    method: 'get',
    params,
});
// 获取商户监控信息
export const getMerchantTotal = (params) => req({
    url: `${baseUrl}/monitor/dna/merchant/total`,
    method: 'get',
    params,
});
// 迪士尼
export const getDisney = (params) => req({
    url: `${baseUrl}/monitor/dna/disney`,
    method: 'get',
    params,
});
// 设置刷新时间
export const postFrequency = (data) => req({
    url: `${baseUrl}/setting/homepage/refresh/frequency/set`,
    method: 'post',
    data,
});
// 获取刷新时间
export const getFrequency = (params) => req({
    url: `${baseUrl}/setting/homepage/refresh/frequency/get`,
    method: 'get',
    params
});



