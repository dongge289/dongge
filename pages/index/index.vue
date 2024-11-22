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
		<!-- <uv-tabs :list="list"></uv-tabs> -->
		<!-- 活动分类 -->
		<view class="activityClass mt30 flex">
			<scroll-view scroll-x class="scrollActivity" ref="scrollActivity" :scroll-left='scrollLeft + 50'
				:scroll-with-animation='true'>
				<view class="scrollCont w94">
					<view class="scrollItem" v-for="(item, index) in list" :key="index" :ref="`scrollItem-${index}`"
						:class="[`scrollItem-${index}`,innerCurrent == index ? 'scrollItemSelect' : '']" @click="clickHandler(item,index)">
						<view class="flex-alCenter">
							<image src="../../static/tabBar/ic_tabbar_chat.png" mode=""></image>
							<view class="scrollText ml10">{{ item.name }}</view>
							<view class="scrollLine" :style="{ background: bgColor }" v-if="innerCurrent == index">
							</view>
						</view>
					</view>

				</view>
			</scroll-view>
			<!-- <view style="width: 100%;">			<uv-tabs :list="list"></uv-tabs></view> -->
			<!-- <view class="addClass" @click="$refs.popupMy.open()">
				<view class="poCenter">
					<uv-icon name="plus" color="#000" :bold="true"></uv-icon>
				</view>
			</view> -->
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
							<image
								src="https://img0.baidu.com/it/u=3547227458,4237642149&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067"
								mode=""></image>
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
							<image
								src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7e253e77-ed90-4e03-b9bc-6e2e825ea35c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729847389&t=a2c1501dd7e7f401db8fa92265e129c4"
								mode=""></image>
						</view>
						<view class="actiImageItem mr10">
							<image
								src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F6fa455a0-f19e-42c6-9bf9-227c27686b62%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729847389&t=a525db48195bf30ca01593e426843f4f"
								mode=""></image>
						</view>
						<view class="actiImageItem mr10">
							<image
								src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff064ef22-4808-4b52-b132-b84b11bb1d31%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729847389&t=75fbf996d42a5efec542b667e99a9788"
								mode=""></image>
						</view>
					</view>
					<view class="actiJoinUser flex-all mt20">
						<view class="joinUserLeft">
							<view class="joinUserHead flex-alCenter">
								<view class="userHeadItem">
									<image
										src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0131%2Fe2c5e7b4j00s846e5000jd000e500dwm.jpg&thumbnail=750x2147483647&quality=75&type=webp"
										mode=""></image>
								</view>
								<view class="userHeadItem">
									<image src="https://pic3.zhimg.com/v2-fd438a38507ee012c3953100aa2d1baa_r.jpg"
										mode=""></image>
								</view>
								<view class="userHeadItem">
									<image
										src="https://img1.baidu.com/it/u=1052567076,3275246168&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
										mode=""></image>
								</view>
								<view class="userHeadItem">
									<image src="https://pic3.zhimg.com/v2-fd438a38507ee012c3953100aa2d1baa_r.jpg"
										mode=""></image>
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
				textColor: '',
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
				},
				{
					name: '手工'
				},
				{
					name: '手工'
				},
				{
					name: '手工'
				},
				{
					name: '手工'
				}],
				activityCurrent: 0,
				// new
				firstTime: true,
				scrollLeft: 0,
				scrollViewWidth: 0,
				lineOffsetLeft: 0,
				tabsRect: {
					left: 0
				},
				innerCurrent: 0,
				moving: false,
				lineWidth:20,
				unit:'px'
			}
		},
		async onLoad() {
			var that = this
			await that.$onLaunched
			that.isLoadingSuccess = getApp().globalData.isLoadingSuccess
			that.indexBg = 'background:url(' + that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item
				.keyName == 'indexBg').context + ');background-size:cover;background-repeat: no-repeat;'
			that.bgColor = getApp().globalData.sysConfig.find(item => item.keyName == 'bgColor').context
			that.textColor = getApp().globalData.sysConfig.find(item => item.keyName == 'textColor').context
			that.swiperList = [
				that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName == 'indexSwiper1')
				.context
			]
		},
		onReady() {
			var that = this
			// that.$nextTick(() => {
			// 	that.resize()
			// })
			// console.log(that.getAllItemRect())
		},
		async mounted() {
			this.init()
		},
		methods: {
			clickHandler(item, index) {
				// 因为标签可能为disabled状态，所以click是一定会发出的，但是change事件是需要可用的状态才发出
				// this.$emit('click', {
				// 	...item,
				// 	index
				// })
				// 如果disabled状态，返回
				if (item.disabled) return
				if(this.innerCurrent != index) {
					this.$emit('change', {
						...item,
						index
					})
				}
				this.innerCurrent = index
				// #ifndef APP-NVUE
				this.$nextTick(()=>{
					this.resize()
				})
				// #endif
				// #ifdef APP-NVUE
				this.$nextTick(()=>{
					// nvue模式下再给点延时，确保万无一失
					this.$uv.sleep(30).then(res=>{
						this.resize()
					});
				})
				// #endif
			},
			// setLineLeft() {
			// 	const tabItem = this.list[this.innerCurrent];
			// 	if (!tabItem) {
			// 		return;
			// 	}
			// 	// 获取滑块该移动的位置
			// 	let lineOffsetLeft = this.list
			// 		.slice(0, this.innerCurrent)
			// 		.reduce((total, curr) => total + curr.rect.width, 0);
			// 	// 获取下划线的数值px表示法
			// 	let lineWidth = this.getPx(this.lineWidth);
			// 	// 如果传的值未带单位+设置了全局单位，则带上单位计算，这样才没有误差
			// 	// if (this.number(this.lineWidth) && this.unit) {
			// 	// 	lineWidth = this.getPx(`${this.lineWidth}${this.unit}`);
			// 	// }
			// 	this.lineOffsetLeft = lineOffsetLeft + (tabItem.rect.width - lineWidth) / 2
			// 	// #ifdef APP-NVUE
			// 	// 第一次移动滑块，无需过渡时间
			// 	this.animation(this.lineOffsetLeft, this.firstTime ? 0 : parseInt(this.duration))
			// 	// #endif
			// 	// 如果是第一次执行此方法，让滑块在初始化时，瞬间滑动到第一个tab item的中间
			// 	// 这里需要一个定时器，因为在非nvue下，是直接通过style绑定过渡时间，需要等其过渡完成后，再设置为false(非第一次移动滑块)
			// 	if (this.firstTime) {
			// 		setTimeout(() => {
			// 			this.firstTime = false
			// 		}, 20);
			// 	}
			// },
			setScrollLeft() {
				// 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
				const tabRect = this.list[this.innerCurrent]
				// 累加得到当前item到左边的距离
				const offsetLeft = this.list
					.slice(0, this.innerCurrent)
					.reduce((total, curr) => {
						return total + curr.rect.width
					}, 0)
				// 此处为屏幕宽度
				const windowWidth = uni.getSystemInfoSync().windowWidth
				// 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
				let scrollLeft = offsetLeft - (this.tabsRect.width - tabRect.rect.width) / 2 - (windowWidth - this.tabsRect.right) / 2 + this.tabsRect.left / 2
				// 这里做一个限制，限制scrollLeft的最大值为整个scroll-view宽度减去tabs组件的宽度
				scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width)
				this.scrollLeft = Math.max(0, scrollLeft)
				console.log(this.scrollLeft,'我')
			},
			number(value) {
			    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
			},
			getPx(value, unit = false) {
				if (this.number(value)) {
					return unit ? `${value}px` : Number(value)
				}
				// 如果带有rpx，先取出其数值部分，再转为px值
				if (/(rpx|upx)$/.test(value)) {
					return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)))
				}
				return unit ? `${parseInt(value)}px` : parseInt(value)
			},
			getRect(selector, all) {
				return new Promise((resolve) => {
					uni.createSelectorQuery()
						.in(this)[all ? 'selectAll' : 'select'](selector)
						.boundingClientRect((rect) => {
							if (all && Array.isArray(rect) && rect.length) {
								resolve(rect)
							}
							if (!all && rect) {
								resolve(rect)
							}
						})
						.exec()
				})
			},
			init() {
				this.$uti.sleep().then(() => {
					this.resize()
				})
			},
			resize() {
				// 如果不存在list，则不处理
				if (this.list.length === 0) {
					return
				}
				Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
					this.tabsRect = tabsRect
					this.scrollViewWidth = 0
					itemRect.map((item, index) => {
						// 计算scroll-view的宽度，这里
						this.scrollViewWidth += item.width
						// 另外计算每一个item的中心点X轴坐标
						this.list[index].rect = item
					})
					// 获取了tabs的尺寸之后，设置滑块的位置
					// this.setLineLeft()
					this.setScrollLeft()
				})
			},
			// 获取导航菜单的尺寸
			getTabsRect() {
				return new Promise(resolve => {
					this.queryRect('scrollActivity').then(size => resolve(size))
				})
			},
			getAllItemRect() {
				return new Promise(resolve => {
					const promiseAllArr = this.list.map((item, index) => this.queryRect(
						`scrollItem-${index}`, true))
					Promise.all(promiseAllArr).then(sizes => resolve(sizes))
				})
			},
			queryRect(el, item) {
				var that = this
				// #ifndef APP-NVUE
				return new Promise(resolve => {
					that.getRect(`.${el}`).then(size => {
						resolve(size)
					})
				})
				// #endif

				// #ifdef APP-NVUE
				return new Promise(resolve => {
					dom.getComponentRect(item ? this.$refs[el][0] : this.$refs[el], res => {
						resolve(res.size)
					})
				})
				// #endif
			},
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
			width: 100%;
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
								margin-left: 0;
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