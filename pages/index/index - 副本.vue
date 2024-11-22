<template>
	<view class="index" :style="indexBg">
		<!-- 顶部标题 -->
		<view class="topIndex">
			<uv-navbar title=" " left-text=" " left-icon=" " bgColor="unset" :placeholder="true">
				<template #left>
					<view class="topTitle">
						<view class="topTitleText bold">趣玩</view>
						<view class="topTitleLine" :style=" {background:bgColor}"></view>
					</view>
				</template>
			</uv-navbar>
			<!-- 搜索 -->
			<view class="search w94 mt10">
				<uv-search placeholder="搜索俱乐部、活动名称等..." searchIconColor='#000' :showAction="false" :height='38'
					bgColor='#fff' placeholderColor='#cacaca' :disabled="true" @click="search">
					<template #prefix>
						<uv-icon name="search" size="26" color="#000" :bold="true"></uv-icon>
					</template>
				</uv-search>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="w94" style="margin-top: 200rpx;padding-top: 40rpx;">
			<uv-swiper :list="swiperList" indicator indicatorMode="line" radius='10' circular
				:circular='true'></uv-swiper>
		</view>
		<!-- 活动分类 -->
		<view class="activityClass mt30 flex">
			<scroll-view scroll-x class="scrollActivity" ref="scrollView" :scroll-left='scrollLeft'
				:scroll-with-animation='true'>
				<view class="scrollCont w94">
					<view class="scrollItem" v-for="(item, index) in list" :key="index"
						:class="activityCurrent == index ? 'scrollItemSelect' : ''" @click="scrollToCenter(index)">
						<view class="flex-alCenter">
							<image src="../../static/tabBar/ic_tabbar_chat.png" mode=""></image>
							<view class="scrollText ml10">{{ item.name }}</view>
							<view class="scrollLine" :style="{ background: bgColor }" v-if="activityCurrent == index">
							</view>
						</view>
					</view>

				</view>
			</scroll-view>
			<view class="addClass" @click="$refs.popupMy.open()">
				<view class="poCenter">
					<uv-icon name="plus" color="#000" :bold="true"></uv-icon>
				</view>
			</view>
		</view>
		<!-- 时间和地址的选择 -->
		<view class="addressTime">
			<view class="addressTimeCont w90 flex-alCenter">
				<view class="addressTimeItem flex-alCenter mr30">
					<view class="addressTimeItemText mr10">广州市</view>
					<view class="addressTimeItemIcon">
						<uv-icon name="arrow-down-fill" color="#000" size="10"></uv-icon>
					</view>
				</view>
				<view class="addressTimeItem flex-alCenter">
					<view class="addressTimeItemText mr10">时间</view>
					<view class="addressTimeItemIcon">
						<uv-icon name="arrow-down-fill" color="#000" size="10"></uv-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 活动列表 -->
		<view class="activity w94 mt20" v-for="item in 3">
			<view class="activityCont w94">
				<view class="activityItem">
					<view class="actiTitle bold">周二20点-21点同和地铁站网球1对4练习场</view>
					<view class="actiUser mt10 flex-alCenter">
						<view class="actiUserHead">
							<image src="https://img0.baidu.com/it/u=3547227458,4237642149&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067" mode=""></image>
						</view>
						<view class="actiUserName ml20">鲨鱼大哥</view>
						<view class="actiUserLabel ml20" :style="{color:textColor}">#1157人玩过</view>
						<view class="actiUserLabel ml20" :style="{color:textColor}">#网球</view>
					</view>
					<view class="actiTimeAddress mt30 flex-alCenter">
						<view class="actiState" :style="{background:textColor}">报名中</view>
						<view class="actiTA bold ml10">
							周二09.24 20:00 | 7.3km 同和地铁站
						</view>
					</view>
					<view class="actiImage flex-alCenter mt30">
						<view class="actiImageItem mr10">
							<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7e253e77-ed90-4e03-b9bc-6e2e825ea35c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729847389&t=a2c1501dd7e7f401db8fa92265e129c4" mode=""></image>
						</view>
						<view class="actiImageItem mr10">
							<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F6fa455a0-f19e-42c6-9bf9-227c27686b62%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729847389&t=a525db48195bf30ca01593e426843f4f" mode=""></image>
						</view>
						<view class="actiImageItem mr10">
							<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff064ef22-4808-4b52-b132-b84b11bb1d31%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729847389&t=75fbf996d42a5efec542b667e99a9788" mode=""></image>
						</view>
					</view>
					<view class="actiJoinUser flex-all mt20">
						<view class="joinUserLeft">
							<view class="joinUserHead flex-alCenter">
								<view class="userHeadItem">
									<image src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0131%2Fe2c5e7b4j00s846e5000jd000e500dwm.jpg&thumbnail=750x2147483647&quality=75&type=webp" mode=""></image>
								</view>
								<view class="userHeadItem">
									<image src="https://pic3.zhimg.com/v2-fd438a38507ee012c3953100aa2d1baa_r.jpg" mode=""></image>
								</view>
								<view class="userHeadItem">
									<image src="https://img1.baidu.com/it/u=1052567076,3275246168&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800" mode=""></image>
								</view>
								<view class="userHeadItem">
									<image src="https://pic3.zhimg.com/v2-fd438a38507ee012c3953100aa2d1baa_r.jpg" mode=""></image>
								</view>
								<view class="userHeadText ml10">7人已上车</view>
							</view>
						</view>
						<view class="joinUserRight bold" :style="{color:textColor}">
							上车
						</view>
					</view>
				</view>
			</view>
		</view>
		<myPopup ref="popupMy">
			<template #content>
				<view class="bold w94">
					我系的额
				</view>
			</template>
		</myPopup>
		<tabBar :current-page="0"></tabBar>
		<uv-loading-page :loading="!isLoadingSuccess" loading-text="加载中..." font-size="24rpx"></uv-loading-page>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isLoadingSuccess: false,
				indexBg: '',
				bgColor: '',
				textColor:'',
				swiperList: [],
				list: [{
					name: '关注',
				}, {
					name: '推荐',
				}, {
					name: '电影'
				}, {
					name: '科技'
				}, {
					name: '音乐'
				}, {
					name: '美食'
				}, {
					name: '文化'
				}, {
					name: '财经'
				}, {
					name: '手工'
				}],
				activityCurrent: 0,
				scrollLeft: 0
			}
		},
		async onLoad() {
			var that = this
			await that.$onLaunched
			that.isLoadingSuccess = getApp().globalData.isLoadingSuccess
			that.indexBg = 'background:url(' + that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName == 'indexBg').context + ');background-size:cover;background-repeat: no-repeat;'
			that.bgColor = getApp().globalData.sysConfig.find(item => item.keyName == 'bgColor').context
			that.textColor = getApp().globalData.sysConfig.find(item => item.keyName == 'textColor').context
			that.swiperList = [
				that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName == 'indexSwiper1').context
			]
		},
		methods: {
			// 点击搜索框
			search() {

			},
			scrollToCenter(index) {
				// Get the scroll view element
				this.activityCurrent = index
				const scrollView = uni.createSelectorQuery().in(this).select('.scrollActivity');
				console.log(scrollView)
				scrollView.boundingClientRect(data => {
					// Get the scroll item element
					const scrollItem = uni.createSelectorQuery().in(this).select(
						`.scrollItem:nth-child(${index + 1})`);
					scrollItem.boundingClientRect(itemData => {
						const scrollLeft = itemData.left - (data.width - itemData.width) / 2;
						console.log(scrollLeft)
						this.scrollLeft = scrollLeft
					}).exec();
				}).exec();
			},

		}
	}
</script>

<style lang="scss">
	.index {
		min-height: 100vh;
		padding-bottom: 120rpx;
		.topIndex {
			width: 100%;
			position: fixed;
			top: 0;
			z-index: 999;
			background-color: #d5f7ec;
			padding-bottom: 30rpx;
		}
		// 顶部标题
		.topTitle {
			width: fit-content;
			position: relative;

			.topTitleText {
				font-size: 40rpx;
				position: relative;
				z-index: 999;
			}

			.topTitleLine {
				width: 100%;
				height: 15rpx;
				position: absolute;
				z-index: 1;
				bottom: 10rpx;
			}
		}

		// 活动分类
		.activityClass {
			padding: 30rpx 0;
			background-color: #fff;
			border-top-right-radius: 30rpx;
			border-top-left-radius: 30rpx;
			position: relative;

			.scrollActivity {
				width: 90%;
				white-space: nowrap;

				.scrollCont {
					.scrollItem {
						width: fit-content;
						height: 60rpx;
						margin: 0 16rpx;
						display: inline-block;
						color: #a9a9a9;
						font-size: 30rpx;
						position: relative;

						image {
							width: 40rpx;
							height: 40rpx;
							position: relative;
							z-index: 99;

						}

						.scrollText {
							text-align: center;
							position: relative;
							z-index: 99;
						}

						.scrollLine {
							width: 100%;
							height: 25rpx;
							margin: 0 auto;
							position: absolute;
							z-index: 1;
							bottom: 15rpx;
						}
					}

					.scrollItemSelect {
						color: #000;
						font-weight: bold;
					}

					.scrollItem:nth-child(1) {
						margin-left: 0;
					}

					.scrollItem:last-child {
						margin-right: 50rpx;
					}

				}
			}

			.addClass {
				width: 200rpx;
				height: 60rpx;
				position: relative;
				z-index: 99;
				right: 0;
				top: -10rpx;
				background-color: #fff;
			}
		}
		// 时间和地址选择
		.addressTime {
			background-color: #fff;
			padding-bottom: 30rpx;

			.addressTimeItem {
				width: fit-content;
				font-size: 28rpx;
				background-color: #fafafa;
				padding: 10rpx 25rpx;
				border-radius: 100rpx;
			}
		}
		// 活动列表
		.activity {
			background-color: #fff;
			padding: 30rpx 0;
			border-radius: 20rpx;
			.activityItem {
				.actiTitle {
					font-size: 32rpx;
				}
				.actiUser {
					.actiUserHead {
						width: 70rpx;
						height: 70rpx;
						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.actiUserName {
						color: #b8b8b8;
						font-size: 25rpx;
					}
					.actiUserLabel {
						font-size: 25rpx;
					}
				}
				.actiTimeAddress {
					.actiState {
						width: fit-content;
						padding: 2rpx 10rpx;
						color: #fff;
						font-size: 25rpx;
						border-radius: 5rpx;
						transform: scale(.9);
						transform-origin: 50% 50%;
					}
					.actiTA {
						font-size: 26rpx;
					}
				}
				.actiImage {
					.actiImageItem {
						width: 33%;
						height: 220rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.actiImageItem:first-child image {
						border-top-left-radius: 20rpx;
						border-bottom-left-radius: 20rpx;
					}
					.actiImageItem:last-child image {
						border-top-right-radius: 20rpx;
						border-bottom-right-radius: 20rpx;
						margin-right: 0;
					}
				}
				.actiJoinUser {
					.joinUserLeft {
						.joinUserHead {
							position: relative;
							.userHeadItem {
								width: 40rpx;
								height: 40rpx;
								margin-left: -10rpx;
								position: relative;
								image {
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}
							.userHeadItem:first-child {
								margin-left:0;
							}
							.userHeadText {
								font-size: 25rpx;
								color: #686868;
							}
						}
					}
					.joinUserRight {
						width: fit-content;
						padding: 12rpx 35rpx;
						border-radius: 100rpx;
						background-color: #000;
					}
				}
			}
		}
	}
</style>