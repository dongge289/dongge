var key = 'techInfo';
import cfg from './config.js'
export default {
	getId: function() {
		return this.getUserInfo().id;
	},
	getIntId: function() {
		return this.getUserInfo().id;
	},
	getUserInfo: function() {
		return uni.getStorageSync(key);
	},
	delUserInfo: function() {
		return uni.removeStorageSync(key);
	},
	checkLogin: function() {
		return (uni.getStorageSync('token')) ? true : false;
	},
	setUserInfo: function(model) {
		uni.setStorageSync(key, model)
	},
	loginTrue: function() {
		if (!this.checkLogin()) {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
	},
	loginToH5: function(that, func, method) {
		// if (this.checkLogin()) {
		// 	return false;
		// }

		// #ifdef H5
		that.$http.post(method ? method : 'User/AddUser', {
			// storeId: uni.getStorageSync('storeId'),
			code: that.code,
			SuperiorShopId: that.shopId,
			PId: that.pid
			// userName: userInfo.nickName,
			// portrait: userInfo.avatarUrl
		}, function(res) {
			if (!method || method == 'User/AddUser') {
				uni.setStorageSync(key, res.Data);
			} else {
				uni.setStorageSync('storeInfo', res.Data)
			}

			return typeof func == "function" && func(res);
		})


		// #endif


		// #ifdef APP-PLUS
		uni.login({
			success: (res) => {
				if (res.errMsg == "login:ok") {

					that.$http.post('User/AddUser', {
						// storeId: uni.getStorageSync('storeId'),
						code: res.code,
						// userName: userInfo.nickName,
						// portrait: userInfo.avatarUrl
					}, function(res) {
						uni.setStorageSync(key, res.Data);
						return typeof func == "function" && func(res);
					})

				} else {
					uni.showToast({
						icon: 'none',
						title: '系统异常，请联系管理员!'
					})
					return typeof func == "function" && func(null);
				}
			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: '获取code失败'
				})
				return typeof func == "function" && func(null);
			}
		})
		// #endif
	},
	loginIn: function(that, func) {
		if (this.checkLogin()) {
			return false;
		}


		wx.getUserProfile({
			desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				var userInfo = res.userInfo
				uni.login({
					success: (res) => {
						if (res.errMsg == "login:ok") {

							that.$http.post('User/AddUser', {
								// storeId: uni.getStorageSync('storeId'),
								code: res.code,
								// userName: userInfo.nickName,
								// portrait: userInfo.avatarUrl
							}, function(res) {
								uni.setStorageSync(key, res.Data);
								return typeof func == "function" && func(res);
							})

						} else {
							uni.showToast({
								icon: 'none',
								title: '系统异常，请联系管理员!'
							})
							return typeof func == "function" && func(null);
						}
					}
				})
			},
			fail(err) {
			}
		})
	}
}