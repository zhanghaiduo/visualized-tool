const state = {
    result: { // 数据
        channel: {},
        callback: { list: [], warnLevel: 0 },
        serverData: {},
        orderTotalData: { list: [], warnLevel: 0 },
        smsData: { list: [], warnLevel: 0 },
        merchantTotal: {
            callbackCount: {},
            payStateSeries: [],
            totalSeries: { list: [] }
        },
        disney: [],
        frequency: {} 
    },
    other: {
        reload: true, //最外层设置v-if让APP重启
    }
};

const mutations = {
    setData(state, data) {// 设置的data
        state.result[data.key] = data.val;
    },
    setOtherData(state, data) {// 设置other
        state.other[data.key] = data.val;
    },
};

const actions = {

};

const getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
