// var apiPath = 'http://store.wealthyman.cn/api/';
// var apiPath= 'http://localhost:49478/api/'

import cfg from './config.js';
import uti from './utils.js'
import md5 from './md5utf8.js'
import us from './user.js'


function request(method, url, data, func, title) {

	// let baseUrl =process.env.NODE_ENV === 'development' ? cfg['httpUrl'] :'http://localhost:3000'

	if (cfg.debug) {
		
	}

	if (title) {
		uni.showLoading({
			title: title
		})
	}

	//遍历对象属性
	var type = 'application/x-www-form-urlencoded';//'application/x-www-form-urlencoded';
	Object.keys(data).forEach(key => {
		if (key)
			type = 'application/json'
	})

	var auth = '';
	if (us.checkLogin()) {
		var info = us.getUserInfo();
		auth = uni.getStorageSync('token');
	}

	uni.request({
		url: cfg['httpUrl'] + url,
		method: method,
		withCredentials: true,
		header: {
			'Content-Type': type,
			//#ifdef MP-WEIXIN
			'Cookie': uni.getStorageSync('cookieKey'),
			//#endif
			'Authorization': 'Bearer ' + auth
		},
		data: data,
		success(res) {
			//#ifdef MP-WEIXIN
			if (!uni.getStorageSync('cookieKey'))
				uni.setStorageSync("cookieKey", res.header["Set-Cookie"]);
			//#endif

			if (title) {
				setTimeout(function() {
					uni.hideLoading()
				}, 100);
			}
			if (cfg.debug) {
				
			}
			if (res && res.statusCode == 200) {
				if (res.data.code == 401) {
					uni.showToast({
						icon: 'none',
						title: '登陆已失效'
					})
					uni.removeStorageSync('token')
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/index'
						})
					}, 1000)
					return;
				}


				return typeof func == "function" && func(res.data);
			} else {
				// uni.reLaunch({
				// 	url: '/pages/404'
				// })
				return typeof func == "function" && func({
					StatusCode: 401,
					msg: '数据格式错误',
					data: {}
				})
			}
		},
		fail(err) {
			uni.showToast({
				title: JSON.stringify(err),
				icon: 'none'
			})

			// uni.reLaunch({
			// 	url: '/pages/404'
			// })

			return typeof func == "function" && func({
				StatusCode: 400,
				msg: '请求异常',
				data: {}
			})
		}
	})
}

function isJSON(str) {
	if (typeof str == 'string') {
		try {
			var obj = JSON.parse(str);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}

		} catch (e) {
			return false;
		}
	} else
		return true;
		
}


export default {
	get(url, data, func, title) {
		request('GET', url, data, function(res) {
			return typeof func == "function" && func(res)
		}, title);
	},
	post(url, data, func, title) {
		request('POST', url, data, function(res) {
			return typeof func == "function" && func(res)
		}, title);
	},
	//读取数据并缓存，每天更新一次
	postAnsy(url, data, func, title) {
		var key = url + md5.md5(url + JSON.stringify(data));
		var old = uti.getStorageSyncTime(key)
		if (old && old.StatusCode == 1) {
			return typeof func == "function" && func(old)
		} else {
			request('POST', url, data, function(res) {
				uti.setStorageSyncSecond(key, res)
				return typeof func == "function" && func(res)
			}, title);
		}
	}
}