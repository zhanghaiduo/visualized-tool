import Vue from 'vue'
import App from './App.vue'
import store from './store'; // vuex
import './directive';
import 'normalize.css/normalize.css'
import "styles/index.scss";
import animated from 'animate.css';// css动画样式
Vue.use(animated);
import { Progress , Input , Message } from 'element-ui';
Vue.component(Progress.name, Progress);
Vue.component(Input.name, Input);
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
