<template>
	<view class="activity">
		<view class="topBg">
			<uv-navbar title=" " @leftClick="leftClick" left-icon=" " bg-color="none">
				<template #left>
					<view>
						<uv-search placeholder="找找今天去哪里" searchIconColor='#000' :showAction="false" :height='38'
							bgColor='#fff' borderColor='#000' placeholderColor='#cacaca' :disabled="false"
							@click="search">
							<template #prefix>
								<uv-icon name="search" size="26" color="#000" :bold="true"></uv-icon>
							</template>
						</uv-search>
					</view>
				</template>
			</uv-navbar>
			<map style="width: 100%; height: 40vh;" :latitude="latitude" :longitude="longitude" :scale='10'
				:markers='covers'></map>
		</view>
		<!-- 活动分类 -->
		<view class="activityClass">
			<view class="flex">
				<scroll-view scroll-x class="scrollActivity" ref="scrollView" :scroll-left='scrollLeft'
					:scroll-with-animation='true'>
					<view class="scrollCont w94">
						<view class="scrollItem" v-for="(item, index) in list" :key="index"
							:class="activityCurrent == index ? 'scrollItemSelect' : ''" @click="scrollToCenter(index)">
							<view class="flex-alCenter">
								<image src="../../static/tabBar/ic_tabbar_chat_sel.png" mode=""></image>
								<view class="scrollText ml10">{{ item.name }}</view>
								<view class="scrollLine" :style="{ background: bgColor }"
									v-if="activityCurrent == index">
								</view>
							</view>
						</view>

					</view>
				</scroll-view>
				<view class="addClass">
					<view class="poCenter flex-alCenter">
						<view class="addText">广州</view>
						<uv-icon name="arrow-down-fill" color="#000" size="10" :bold="true"></uv-icon>
					</view>
				</view>
			</view>
			<view class="w94 mt30">
				<uv-swiper :list="swiperList" indicator indicatorMode="line" radius='10' circular
					:circular='true'></uv-swiper>
			</view>
		</view>
		<!-- 轮播图 -->

		<view class="actiList w94 mt20" v-for="item in 3">
			<view class="actiListCont w94 ">
				<view class="flex-alCenter">
					<view class="actiImage">
						<image
							src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F754711%2Foriginf438b873412ea932c025fb890ee267af.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNzU0NzExL29yaWdpbmY0MzhiODczNDEyZWE5MzJjMDI1ZmI4OTBlZTI2N2FmLmpwZw%3D%3D%2Fsign%2F607838c27369a33b817e0668eec3fe41.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729853308&t=935ac8c48275523a2324ebfaaf040568"
							mode=""></image>
					</view>
					<view class="actiMsg ml20">
						<view class="actiName flex-all">
							<view class="actiNameText">
								峨眉山徒步打卡...
							</view>
							<view class="actiNameRate">
								<uv-rate activeColor='#0ac896' size='14' :count="count" v-model="value"></uv-rate>
							</view>
						</view>
						<view class="actiLenghtTime flex-alCenter mt10">
							<view class="actiLTItem mr20">
								长度6.0km
							</view>
							<view class="actiLTItem">
								用时2.0h
							</view>
						</view>
						<view class="actiTags mt10">
							单程 | 野花 | 日出 | 峡谷 | 宫殿建筑 | 云海 | 森林 | 历史古迹
						</view>
						<view class="distance mt10 flex-alCenter">
							<view class="distanceIcon">
								<uv-icon name="empty-address" color="#a3a3a3"></uv-icon>
							</view>
							<view class="distanceText ml10">距你128.7km</view>
						</view>
					</view>
				</view>
				<view class="actiLine"></view>
				<view class="actiJoinUser flex-all">
					<view class="joinUserLeft">
						<view class="joinUserHead flex-alCenter">
							<view class="userHeadItem">
								<image
									src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0131%2Fe2c5e7b4j00s846e5000jd000e500dwm.jpg&thumbnail=750x2147483647&quality=75&type=webp"
									mode=""></image>
							</view>
							<view class="userHeadItem">
								<image src="https://pic3.zhimg.com/v2-fd438a38507ee012c3953100aa2d1baa_r.jpg" mode="">
								</image>
							</view>
							<view class="userHeadItem">
								<image
									src="https://img1.baidu.com/it/u=1052567076,3275246168&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
									mode=""></image>
							</view>
							<view class="userHeadText ml10">7人维护了路线，被13874人使用</view>
						</view>
					</view>
					<view class="joinUserRight bold" :style="{color:textColor}">
						<view class="joinUserText">
							查看路线
						</view>
					</view>
				</view>
			</view>

		</view>
		<tabBar :current-page="1"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: '',
				textColor: '',
				latitude: 23.13,
				longitude: 113.26,
				mapMarkers: '',
				covers: [],
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
				scrollLeft: 0,
				value: 3,
				count: 3,
				swiperList: [],
			}
		},
		async onLoad() {
			var that = this
			await this.$onLaunched
			that.bgColor = getApp().globalData.sysConfig.find(item => item.keyName == 'bgColor').context
			that.textColor = getApp().globalData.sysConfig.find(item => item.keyName == 'textColor').context
			that.swiperList = [
				that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName == 'indexSwiper1')
				.context
			]
			that.covers = [{
				id: 0,
				latitude: 23.13,
				longitude: 113.26,
				iconPath: that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName ==
					'mapMarkers').context,
				width: 40,
				height: 40,
				callout: {
					content: '附近有超多人贡献路线,世界辣么大，向快乐出发！',
					bgColor: '#333333',
					anchorY: 10,
					display: 'ALWAYS',
					borderRadius: 20,
					padding: 10,
					color: '#fff'
				}
			}]
		},
		methods: {
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
	.activity {
		overflow: hidden;
		min-height: 100vh;
		background-color: #f0f3f2;
		padding-bottom: 160rpx;

		.topBg {
			height: 40vh;
		}

		// 活动分类
		.activityClass {
			padding: 40rpx 0;
			background-color: #fff;
			border-top-right-radius: 30rpx;
			border-top-left-radius: 30rpx;
			position: relative;
			margin-top: -50rpx;

			.scrollActivity {
				width: 78%;
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
							z-index: 999;

						}

						.scrollText {
							text-align: center;
							position: relative;
							z-index: 999;
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
				width: 160rpx;
				height: 60rpx;
				position: relative;
				z-index: 9999;
				right: 0;
				top: -10rpx;
				background-color: #fff;
			}
		}

		.actiList {
			background-color: #fff;
			padding: 25rpx 0;
			border-radius: 20rpx;

			.actiListCont {
				.actiImage {
					width: 40%;
					height: 230rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 20rpx;
					}
				}

				.actiMsg {
					width: 55%;

					.actiName {
						.actiNameText {
							font-size: 32rpx;
						}
					}

					.actiLenghtTime {
						.actiLTItem {
							background-color: #e6faf4;
							color: #0bca94;
							padding: 10rpx 6rpx;
							border-radius: 10rpx;
							font-size: 25rpx;
						}
					}

					.actiTags {
						color: #a3a3a3;
						font-size: 25rpx;
						line-height: 38rpx;
					}

					.distance {
						.distanceText {
							color: #a3a3a3;
							font-size: 25rpx;
						}
					}
				}

				.actiLine {
					width: 100%;
					height: 2rpx;
					margin: 25rpx 0;
					background-color: #e6e6e6;
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
								color: #a4a5a5;
								transform: scale(.9);
								transform-origin: 0 50%;
							}
						}
					}

					.joinUserRight {
						width: fit-content;
						padding: 15rpx 25rpx;
						border-radius: 100rpx;
						background-color: #000;
						color: #82d67d;
						font-size: 28rpx;

						.joinUserText {
							background-image: linear-gradient(to right, #a6ff92, #4efe91);
							-webkit-background-clip: text;
							background-clip: text;
							color: transparent;
						}
					}
				}
			}
		}
	}
</style>