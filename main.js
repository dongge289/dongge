import App from './App'
import Vue from 'vue'
import './uni.promisify.adaptor'
import uvUI from '@/uni_modules/uv-ui-tools'
// 按钮注册全局
import myButton from '@/components/myButton/myButton.vue'
Vue.component('myButton', myButton)
// 弹窗注册全局
import myPopup from '@/components/myPopup/index.vue'
Vue.component('myPopup', myPopup)
import cfg from './utils/config.js'
import http from './utils/http.js' //通过请求数据方法
import uti from './utils/utils.js' //通用方法
import us from './utils/user.js'
import up from 'utils/upload.js'
import pay from 'utils/unipay.js'
Vue.prototype.$cfg = cfg;
Vue.prototype.$uti = uti;
Vue.prototype.$http = http;
Vue.prototype.$us = us;
Vue.prototype.$up = up;
Vue.prototype.$pay = pay;
Vue.prototype.prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
// 创建promise实例 用于等待app.vue方法执行完
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve;
})
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()