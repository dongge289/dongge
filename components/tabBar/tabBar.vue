<template>
	<view class="tabBar">
		<view class="tabbar-container">
			<block>
				<view class="tabbar-item" style="position: relative;" v-for="(item,index) in tabbarList"
					:class="[item.centerItem ? ' center-item' : '']" @click="changeItem(item)">

					<view class="item-top">
						<image :src="currentItem==item.id?item.selectIcon:item.icon"></image>
					</view>
					<view class="item-bottom" :class="[currentItem==item.id ? 'item-active' : '']">
						<text>{{item.text}}</text>
					</view>

					<view v-if="item.path=='/pages/message/index'" style="position: absolute;top:0px;right:5px;">
						<uv-badge type="error" max="99" :value="noRead"></uv-badge>
					</view>
					<view v-if="item.path=='/pages/dynamic/index'" style="position: absolute;top:0px;right:5px;">
						<uv-badge type="error" max="99" :value="noReadDyn"></uv-badge>
					</view>
				</view>
			</block>
		</view>
	</view>

</template>

<script>
	import {
		func
	} from '../../uni_modules/uv-ui-tools/libs/function/test';

	import {
		EventBus
	} from '@/utils/event-bus.js';

	export default {
		props: {
			currentPage: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				noRead: 0,
				currentItem: 0,
				tabbarList: [],
				noReadDyn: 0,
				sysName: '',
				staffName: '',
			};
		},
		created() {
			let that = this;
			that.getSysConfig()
			// that.getSysName()
			// that.staffName = uni.getStorageSync('staffName')
		},
		mounted() {
			let that = this;
			this.currentItem = this.currentPage;
			// that.getNoReadTotal();
			// that.getNoRedeDyn()
			// uni.$on('tabBarSocket', (res) => {
			// 	that.noRead += 1;

			// 	let pages = getCurrentPages();
			// 	let currentPage = pages[pages.length - 1];
			// 	let currentUrl = currentPage.route;
			// 	if (currentUrl == 'pages/message/index') {
			// 		that.$emit('newMsg', res)
			// 	}
			// });
		},
		methods: {
			getSysName() {
				// var that = this
				// that.$http.get('/Applet/Config/GetConfigList', {
				// 	keys: 'sys_name'
				// }, function(res) {
				// 	if (res.code == 200) {
				// 		that.sysName = res.data[0].sValue
				// 	}
				// })
				that.sysName = '趣玩';
			},
			getSysConfig() {
				var that = this
				
				let res = {"code":200,"message":"成功","data":[{"keyName":"tabBarIndexN","context":"/cumenFiles/048a55fb8dae401b87ec163f99741298.png","remark":"首页tabBar未选中","type":3,"id":133,"state":2,"createTime":"2024-09-24T11:11:27.56","updateTime":"2024-09-24T11:26:01.167"},{"keyName":"tabBarIndexY","context":"/cumenFiles/2ff9656fdb2c48e4839fd57e80a2b1a3.png","remark":"首页tabBar选中","type":3,"id":134,"state":2,"createTime":"2024-09-24T11:26:22.157","updateTime":"2024-09-24T11:26:22.157"},{"keyName":"tabBarActivityY","context":"/cumenFiles/4df3dc9810f84e48a954cc0abfcec805.png","remark":"活动tabBar选中","type":3,"id":135,"state":2,"createTime":"2024-09-24T11:27:29.02","updateTime":"2024-09-24T11:27:29.02"},{"keyName":"tabBarActivityN","context":"/cumenFiles/d63f1672caff4860960e1c99794ca29b.png","remark":"活动tabBar未选中","type":3,"id":136,"state":2,"createTime":"2024-09-24T11:31:43.213","updateTime":"2024-09-24T11:31:43.213"},{"keyName":"tabBarMessageN","context":"/cumenFiles/1ab1824cf0b1424db2df570007d38f72.png","remark":"消息tabBar未选中","type":3,"id":137,"state":2,"createTime":"2024-09-24T11:32:50.617","updateTime":"2024-09-24T11:32:50.617"},{"keyName":"tabBarMessageY","context":"/cumenFiles/8e859871f90b42e6a82b4a05a512756e.png","remark":"消息tabBar选中","type":3,"id":138,"state":2,"createTime":"2024-09-24T11:33:21.577","updateTime":"2024-09-24T11:33:21.577"},{"keyName":"tabBarUserN","context":"/cumenFiles/06d2569b72974525a3580f60ce1671b5.png","remark":"个人中心tabBar未选中","type":3,"id":139,"state":2,"createTime":"2024-09-24T11:34:00.69","updateTime":"2024-09-24T11:34:00.69"},{"keyName":"tabBarUserY","context":"/cumenFiles/145d24a4949c4a0e9b8c0b23f83d5c20.png","remark":"消息tabBar选中","type":3,"id":140,"state":2,"createTime":"2024-09-24T11:34:27.7","updateTime":"2024-09-24T11:34:27.7"},{"keyName":"tabBarPublish","context":"/cumenFiles/5100f575e2c845838800129cab44f3e4.png","remark":"发布活动tabBar","type":3,"id":141,"state":2,"createTime":"2024-09-24T11:47:13.61","updateTime":"2024-09-24T11:47:13.61"}]};
				
						that.tabbarList = [{
								id: 0,
								path: "/pages/index/index",
								icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarIndexN').context,
								selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarIndexY').context,
								text: "首页",
								centerItem: false
							},
							{
								id: 1,
								path: "/pages/activity/index",
								icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarActivityN').context,
								selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarActivityY').context,
								text: "活动",
								centerItem: false
							},
							{
								id: 5,
								path: "/pages/publish/index",
								icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarPublish').context,
								selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarPublish').context,
								text: "",
								centerItem: true
							},
							{
								id: 2,
								path: "/pages/message/index",
								icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarMessageN').context,
								selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarMessageY').context,
								text: "消息",
								centerItem: false
							}, {
								id: 3,
								path: "/pages/user/index",
								icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarUserN').context,
								selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
									'tabBarUserY').context,
								text: "我的",
								centerItem: false
							}
						]
				
				
				// that.$http.get('/Applet/Config/GetConfigure', {
				// 	keys: 'tabBarIndexN,tabBarIndexY,tabBarActivityY,tabBarActivityN,tabBarMessageN,tabBarMessageY,tabBarUserN,tabBarUserY,tabBarPublish'
				// }, function(res) {
				// 	if (res.code == 200) {
				// 		that.tabbarList = [{
				// 				id: 0,
				// 				path: "/pages/index/index",
				// 				icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarIndexN').context,
				// 				selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarIndexY').context,
				// 				text: "首页",
				// 				centerItem: false
				// 			},
				// 			{
				// 				id: 1,
				// 				path: "/pages/activity/index",
				// 				icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarActivityN').context,
				// 				selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarActivityY').context,
				// 				text: "活动",
				// 				centerItem: false
				// 			},
				// 			{
				// 				id: 5,
				// 				path: "/pages/publish/index",
				// 				icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarPublish').context,
				// 				selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarPublish').context,
				// 				text: "",
				// 				centerItem: true
				// 			},
				// 			{
				// 				id: 2,
				// 				path: "/pages/message/index",
				// 				icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarMessageN').context,
				// 				selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarMessageY').context,
				// 				text: "消息",
				// 				centerItem: false
				// 			}, {
				// 				id: 3,
				// 				path: "/pages/user/index",
				// 				icon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarUserN').context,
				// 				selectIcon: that.$cfg.imgUrl + res.data.find(item => item.keyName ==
				// 					'tabBarUserY').context,
				// 				text: "我的",
				// 				centerItem: false
				// 			}
				// 		]
				// 	}
				// })
			},
			getNoRedeDyn() {
				var that = this
				that.$http.get('/Applet/User/GetNoReadTotal', {}, function(res) {
					if (res.code == 200) {
						that.noReadDyn = res.data.replyToMe + res.data.giveNoRead > 99 ? '99+' : res.data
							.replyToMe + res.data.giveNoRead
					}
				})
			},
			removeCnt(cnt) {
				if (this.noRead > 0)
					this.noRead = this.noRead - cnt;
			},
			getNoReadTotal() {
				let that = this;
				that.$http.get('/Applet/Chat/GetNoReadTotal', {}, function(res) {
					if (res.code == 200) {
						that.noRead = res.data;
					}
				})
			},
			changeItem(item) {
				let _this = this;
				// this.getNoRedeDyn()
				// this.getNoReadTotal()
				console.log(this.currentItem)
				uni.switchTab({
					url: item.path
				});

			}
		}
	}
</script>
<style lang="scss">
	view {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	.tabbar-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120rpx;
		/* box-shadow: 0 0 5px #999;  */
		box-shadow: 0px 63rpx 100rpx #dfe6ed;
		border-top: 1px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5rpx 0;
		color: #999999;
		z-index: 10;
		background-color: #fff;
	}

	.tabbar-container .tabbar-item {
		width: 20%;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.tabbar-container .item-active {
		color: #000;
	}

	.tabbar-container .center-item {
		display: block;
		position: relative;
	}

	.tabbar-container .tabbar-item .item-top {
		width: 53rpx;
		height: 53rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.tabbar-container .center-item .item-top {
		flex-shrink: 0;
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		top: -40rpx;
		left: calc(50% - 50rpx);
		border-radius: 50%;
		background-color: #fff;
		// box-shadow: darkgrey 0px 0px 0px 10rpx;
		box-shadow: 0px 3px 10px #999999;
	}

	.tabbar-container .tabbar-item .item-top image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	tabbar-container .tabbar-item:nth-child(3) .item-top image {
		background: #ff0000;

	}

	.tabbar-container .tabbar-item .item-bottom {
		font-size: 28rpx;
		width: 100%;
		padding-top: 5rpx;
	}

	.tabbar-container .center-item .item-bottom {
		position: absolute;
		bottom: 5rpx;
	}
</style>