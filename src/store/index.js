import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'; // 控制台打印
import data from './data'; // 所有请求数据


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        data, // 所有请求数据
    },
    plugins: [createLogger()],
});
