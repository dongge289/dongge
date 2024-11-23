<script>
	//#ifdef H5
	let wx = require('jweixin-module')
	//#endif
	import {
		EventBus
	} from '@/utils/event-bus.js';
	export default {
		globalData: {
			isLoadingSuccess: false,
			sysConfig: ''
		},
		data() {
			return {
				socketTask: null,
			}
		},
		onLaunch: function() {
			this.getSysConfig()
			// #ifdef H5
			uni.hideTabBar()
			// #endif

			// for (let i = 0; i < 100; i++) {
			// 	clearInterval(i);
			// }

			// setInterval(() => {
			// 	if (this.$us.checkLogin()) {
			// 		if (this.socketTask == null || this.socketTask == undefined || this.socketTask == '')
			// 			this.socket();
			// 	} else {
			// 		// 需要登录才能连接socket
			// 	}
			// }, 1000)
		},
		onHide: function() {},
		onUnload: function() {
			this.socketClose()
		},
		methods: {
			getSysConfig() {
				var that = this
				let res = {"code":200,"message":"成功","data":[{"keyName":"indexBg","context":"/cumenFiles/e7db29de93c54fa793b4b3a5eb2c7486.jpg","remark":"首页背景图","type":3,"id":142,"state":2,"createTime":"2024-09-24T17:52:19.72","updateTime":"2024-09-24T17:52:19.72"},{"keyName":"bgColor","context":"#65fc89","remark":"背景颜色","type":2,"id":143,"state":2,"createTime":"2024-09-24T18:33:17.957","updateTime":"2024-09-24T18:33:17.957"},{"keyName":"indexSwiper1","context":"/cumenFiles/251f67ef89ab43ef8f44e0c7f15523d0.jpg","remark":"首页轮播图1","type":3,"id":144,"state":2,"createTime":"2024-09-25T10:53:36.223","updateTime":"2024-09-26T19:13:39.807"},{"keyName":"textColor","context":"#4fc895","remark":"文字颜色","type":2,"id":145,"state":2,"createTime":"2024-09-25T16:22:58.21","updateTime":"2024-09-25T16:22:58.21"},{"keyName":"mapMarkers","context":"/cumenFiles/1de0387f6c6e448f808057cda3085e73.png","remark":"地图标记点图标","type":3,"id":146,"state":2,"createTime":"2024-09-25T17:34:43.387","updateTime":"2024-09-25T17:34:43.387"},{"keyName":"clearMessage","context":"/cumenFiles/f3e7320c7d9c42c2a212607fd11f28db.png","remark":"清除未读消息图标","type":3,"id":147,"state":2,"createTime":"2024-09-26T10:41:04.797","updateTime":"2024-09-26T10:41:04.797"},{"keyName":"userTopBg","context":"/cumenFiles/a81083b602274ad5855ad8c5f90cae5d.png","remark":"个人中心顶部背景图片","type":3,"id":148,"state":2,"createTime":"2024-09-26T11:13:16.07","updateTime":"2024-09-26T11:23:27.06"},{"keyName":"withPaly","context":"/cumenFiles/3a2c691b9c2f4997affc416f0868e907.png","remark":"个人中心一起玩过图标","type":3,"id":149,"state":2,"createTime":"2024-09-26T11:52:15.95","updateTime":"2024-09-26T11:52:15.95"},{"keyName":"liekMe","context":"/cumenFiles/f1cc28a943be4641ac64c60645945dd2.png","remark":"个人中心夸过我图标","type":3,"id":150,"state":2,"createTime":"2024-09-26T11:52:44.107","updateTime":"2024-09-26T11:52:44.107"},{"keyName":"medal","context":"/cumenFiles/923dcb5147c343aca82b15b03735492e.png","remark":"个人中心奖牌图标","type":3,"id":151,"state":2,"createTime":"2024-09-26T11:53:40.813","updateTime":"2024-09-26T11:53:40.813"},{"keyName":"signIconMao","context":"/cumenFiles/efc921a7954f47d7a5c424fb881fe2d6.png","remark":"个人中心个签冒号图标","type":3,"id":152,"state":2,"createTime":"2024-09-26T12:09:27.333","updateTime":"2024-09-26T12:09:27.333"},{"keyName":"signIconWrite","context":"/cumenFiles/e065696682e84fb2b40ea9968455ade8.png","remark":"个人中心个签图标","type":3,"id":153,"state":2,"createTime":"2024-09-26T12:11:54.617","updateTime":"2024-09-26T12:11:54.617"},{"keyName":"piaojia","context":"/cumenFiles/57e80a6f259f42e387f54c6152dc5a80.png","remark":"个人中心票夹","type":3,"id":154,"state":2,"createTime":"2024-09-26T15:39:16.827","updateTime":"2024-09-26T15:39:16.827"},{"keyName":"yingji","context":"/cumenFiles/da33b7516e524ff8b2f82617921102ee.png","remark":"个人中心影集","type":3,"id":155,"state":2,"createTime":"2024-09-26T15:39:36.497","updateTime":"2024-09-26T15:39:36.497"},{"keyName":"order","context":"/cumenFiles/9a4787a5afc34b2ebacb6792f3638b5b.png","remark":"个人中心订单","type":3,"id":156,"state":2,"createTime":"2024-09-26T15:39:58.437","updateTime":"2024-09-26T15:39:58.437"},{"keyName":"zhandui","context":"/cumenFiles/3066954710764827b3d3ecbaa949898d.png","remark":"个人中心战队","type":3,"id":157,"state":2,"createTime":"2024-09-26T15:40:50.323","updateTime":"2024-09-26T15:40:50.323"},{"keyName":"fabu","context":"/cumenFiles/f48e5fe2355c4994a1e1fdacbb708b10.png","remark":"个人中心发布活动","type":3,"id":158,"state":2,"createTime":"2024-09-26T15:41:17.44","updateTime":"2024-09-26T15:41:17.44"},{"keyName":"suo","context":"/cumenFiles/e2e2d22261db49c3aef531eb86f8eea1.png","remark":"个人中心锁","type":3,"id":159,"state":2,"createTime":"2024-09-26T16:06:08.037","updateTime":"2024-09-26T16:06:08.037"}]};
				
						that.globalData.sysConfig = res.data
						that.globalData.isLoadingSuccess = true
						that.$isResolve()
				
				// that.$http.get('/Applet/Config/GetConfigure', {
				// 	keys: 'indexBg,bgColor,indexSwiper1,textColor,mapMarkers,clearMessage,userTopBg,withPaly,liekMe,medal,signIconMao,signIconWrite,fabu,zhandui,order,yingji,piaojia,suo'
				// }, function(res) {
				// 	if (res.code == 200) {
				// 		that.globalData.sysConfig = res.data
				// 		that.globalData.isLoadingSuccess = true
				// 		that.$isResolve()
				// 	}
				// })
			},
			socket() {
				var that = this;
				//建立socket连接
				that.socketTask = uni.connectSocket({
					url: this.$cfg.socketUrl + '?token=' + uni.getStorageSync('token'),
					success(res) {
						//成功后，打开连接 socket连接
						uni.onSocketOpen((res) => {
							that.SocketMessage();
						});
					}
				});
			},
			SocketMessage() {
				let that = this;
				//监听socket
				uni.onSocketMessage((res) => {
					if (res == 'loginOut') {
						that.$us.delUserInfo()
						uni.removeStorageSync('token')
						setTimeout(() => {
							that.$uti.toPage('/pages/login/index')
						}, 500)
					}

					let pages = getCurrentPages();
					let currentPage = pages[pages.length - 1];
					let currentUrl = currentPage.route;
					// that.$uti.alert(currentUrl)
					if (currentUrl == 'subPack/play_message/message') {
						uni.$emit('chatListSocket', res)
					} else if (currentUrl == 'pages/message/index' || currentUrl == 'pages/dynamic/index' ||
						currentUrl == 'pages/user/index' || currentUrl == 'pages/index/index') {
						uni.$emit('tabBarSocket', res)
					}
				})

				uni.onSocketClose((res) => {
					that.socketTask = null;
				})
			},
			socketClose() {
				this.socketTask.close({
					success: function(res) {
						// WebSocket 已关闭
					},
					fail: function(err) {
						// WebSocket 关闭失败
					}
				});
			},
			getName() {
				var that = this
				// that.$http.get('/Applet/Config/GetConfigList', {
				// 	keys: 'bitUnit,integralUnit,commissionUnit,staff_Name'
				// }, function(res) {
				// 	if (res.code == 200) {
				// 		uni.setStorageSync('bitUnit', res.data.find(item => item.sKey == 'bitUnit').sValue)
				// 		uni.setStorageSync('integralUnit', res.data.find(item => item.sKey == 'integralUnit')
				// 			.sValue)
				// 		uni.setStorageSync('commissionUnit', res.data.find(item => item.sKey == 'commissionUnit')
				// 			.sValue)
				// 		uni.setStorageSync('staffName', res.data.find(item => item.sKey == 'staff_Name')
				// 			.sValue)
				// 	}
				// })
			}
		},
		onShow: function() {
			for (let i = 0; i <= 10000; i++) {
				clearTimeout();
				clearInterval();
			}
			var that = this
			if (that.$us.checkLogin()) {
				// 获取名字
				that.getName()
				that.$http.post('/Applet/User/UpdateOrder', {}, function() {})
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						uni.setStorageSync('long', res.longitude)
						uni.setStorageSync('lat', res.latitude)
						that.$http.post('/Applet/User/UpdateLocation', {
							longitude: res.longitude,
							latitude: res.latitude
						}, function(res) {

						})
					}
				});
			}
			setInterval(() => {
				if (that.$us.checkLogin()) {
					uni.getLocation({
						type: 'wgs84',
						success: function(res) {
							that.$http.post('/Applet/User/UpdateLocation', {
								longitude: res.longitude,
								latitude: res.latitude
							}, function(res) {

							})
						}
					});
				} else {
					// 没登录
				}
			}, 1000 * 6 * 10 * 10)
		}
	}
</script>

<style>
	@import url("static/css/index.css");
</style>