<template>
	<view class="user">
		<view v-if="isScroll">
			<uv-navbar title=" " @leftClick="leftClick" left-text=" " left-icon=" ">
				<template #center>
					<view class="bold" style="position: relative; z-index: 10;">鲨鱼大哥</view>
				</template>
			</uv-navbar>
		</view>
		<view class="userTopBg">
			
			<uv-swiper height="54vh" :list="swiperList" indicator indicatorMode="line" radius='10' circular
				:circular='true'></uv-swiper>
				<view class="edit">
					编辑
				</view>
				<view class="showImg">
					<view class="showImgItem">
						<image src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0821%2F11ac85c5j00sik0f5002jd000hs00vmm.jpg&thumbnail=660x2147483647&quality=80&type=jpg" mode="aspectFill"></image>
					</view>
				</view>
		</view>
		<view class="userMsg">
			<view class="w94 mt30">
				<view class="userNameSex flex-alCenter">
					<view class="userName bold mr10">
						鲨鱼大哥
					</view>
					<view class="userSex">
						<uv-icon name="woman" :bold="true" color="#ff82b9" size="20"></uv-icon>
					</view>
				</view>
				<view class="userNum mt20 flex-alCenter">
					<view class="userNumItem flex-alCenter mr20" v-for="(item,index) in userNumList" :key="index">
						<view class="num mr10">{{item.value}}</view>
						<view class="title">{{item.title}}</view>
					</view>
				</view>
				<view class="userData mt30 flex-all">
					<view class="userDataItem flex-alCenter">
						<view class="udiIcon">
							<image :src="withPlay" mode=""></image>
						</view>
						<view class="udiNum ml10 bold">2</view>
						<view class="udiText ml10">一起玩过</view>
					</view>
					<view class="userDataItem flex-alCenter">
						<view class="udiIcon">
							<image :src="likeMe" mode=""></image>
						</view>
						<view class="udiNum ml10 bold">3</view>
						<view class="udiText ml10">夸过我</view>
					</view>
					<view class="userDataItem flex-alCenter">
						<view class="udiIcon">
							<image :src="medal" mode=""></image>
						</view>
						<view class="udiNum ml10 bold">15</view>
						<view class="udiText ml10">奖牌</view>
					</view>
				</view>
				<view class="userSign mt40">
					<view class="sign w94">
						<view class="signText">
							<view class="signIcon mr10">
								<image :src="signIconMao" mode=""></image>
							</view>
							我很喜欢运动，会乒乓球，篮球，羽毛球等，希望可以和大家一起玩起来！
							<view class="signIcon" style="transform: translateY(3px);">
								<image :src="signIconWrite" mode=""></image>
							</view>
						</view>
						<view class="label  flex-alCenter">
							<view class="labelItem mr20 mt20" v-for="item in 4">
								马甲线拥有者
							</view>
							<view class="labelItem mt20 flex-alCenter">
								<view class="addIcon mr10">
									<uv-icon name="plus" size="10" bold color="#a3a3a3"></uv-icon>
								</view>
								新增标签
							</view>
						</view>
					</view>
				</view>
				<view class="userCard mt20">
					<view class="w94 flex-all">
						<view class="cardItem" v-for="(item,index) in userCardList" :key="index">
							<view class="cardIcon">
								<image :src="item.icon" mode=""></image>
							</view>
							<view class="cardText mt20">{{item.title}}</view>
						</view>
					</view>
				</view>
				<view class="join mt20">
					<view class="w94">
						<view class="joinTitle bold">
							我参与的
						</view>
						<view class="joinItem mt20">
							<view class="joinItemTop flex-all">
								<view class="flex-alCenter">
									<view class="joinItemTime bold mr20">09月28</view>
									<view class="joinUserLeft">
										<view class="joinUserHead flex-alCenter">
											<view class="userHeadItem">
												<image
													src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0131%2Fe2c5e7b4j00s846e5000jd000e500dwm.jpg&thumbnail=750x2147483647&quality=75&type=webp"
													mode=""></image>
											</view>
											<view class="userHeadItem">
												<image
													src="https://pic3.zhimg.com/v2-fd438a38507ee012c3953100aa2d1baa_r.jpg"
													mode=""></image>
											</view>
											<view class="userHeadItem">
												<image
													src="https://img1.baidu.com/it/u=1052567076,3275246168&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
													mode=""></image>
											</view>
											<view class="userHeadItem">
												<image
													src="https://pic3.zhimg.com/v2-fd438a38507ee012c3953100aa2d1baa_r.jpg"
													mode=""></image>
											</view>
											<view class="userHeadText ml10">和14人一起玩</view>
										</view>
									</view>
								</view>
								<view class="isLook flex-alCenter">
									<view class="isLookIcon mr20">
										<image :src="lock" mode=""></image>
									</view>
									<view class="isLookText">
										公开
									</view>
								</view>
							</view>
							<view class="joinItemBot mt30 ml20 flex-alCenter">
								<view class="joinItemBotLine"></view>
								<view class="joinItemMsg ml50">
									<view class="w94 flex-alCenter">
										<view class="joinItemImg ml20">
											<image
												src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage109.360doc.com%2FDownloadImg%2F2023%2F05%2F3016%2F266802389_10_20230530040615831.jpeg&refer=http%3A%2F%2Fimage109.360doc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729931285&t=20ec2938491ff55a50072afd34cfc673"
												mode=""></image>
										</view>
										<view class="joinItemDetail ml30">
											<view class="jdTitle bold">
												峨眉上徒步行！
											</view>
											<view class="jdAddress flex-alCenter mt30">
												<view class="jdAddressIcon">
													<uv-icon name="empty-address" size="18" color="#a1a1a1"></uv-icon>
												</view>
												<view class="jdAddressText ml10">同和地铁站</view>
											</view>
											<view class="jdUser flex-alCenter mt30">
												<view class="jdUserHead mr20">
													<image
														src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage109.360doc.com%2FDownloadImg%2F2023%2F05%2F3016%2F266802389_10_20230530040615831.jpeg&refer=http%3A%2F%2Fimage109.360doc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1729931285&t=20ec2938491ff55a50072afd34cfc673"
														mode=""></image>
												</view>
												<view class="jdUserName">鲨鱼大哥</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabBar :current-page="3"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userTopBg: '',
				withPlay: '',
				likeMe: '',
				medal: '',
				signIconWrite: '',
				signIconMao: '',
				lock: '',
				userNumList: [{
						title: '关注',
						value: 2
					},
					{
						title: '粉丝',
						value: 0
					},
					{
						title: '加入',
						value: 5
					},
					{
						title: '收藏',
						value: 10
					}
				],
				userCardList: [],
				swiperList: [],
				isScroll:false
			}
		},
		onPageScroll(e) {
			console.log(e)
			if (e.scrollTop > 320) {
				this.isScroll = true
			} else {
				this.isScroll = false
			}
		},
		async onLoad() {
			var that = this
			await this.$onLaunched
			that.userTopBg = 'background:url(' + that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item
				.keyName == 'userTopBg').context + ');background-size:cover;background-repeat: no-repeat;'
			that.withPlay = that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName == 'withPaly')
				.context
			that.likeMe = that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName == 'liekMe')
				.context
			that.medal = that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName == 'medal').context
			that.lock = that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName == 'suo').context
			that.signIconWrite = that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName ==
				'signIconWrite').context
			that.signIconMao = that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName ==
				'signIconMao').context
			that.swiperList = [
				'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0821%2F11ac85c5j00sik0f5002jd000hs00vmm.jpg&thumbnail=660x2147483647&quality=80&type=jpg'
			]
			that.userCardList = [{
					title: '票夹',
					icon: that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName ==
						'piaojia').context
				},
				{
					title: '影集',
					icon: that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName ==
						'yingji').context
				},
				{
					title: '订单',
					icon: that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName ==
						'order').context
				},
				{
					title: '战队',
					icon: that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName ==
						'zhandui').context
				},
				{
					title: '入驻发活动',
					icon: that.$cfg.imgUrl + getApp().globalData.sysConfig.find(item => item.keyName ==
						'fabu').context
				}
			]
		},
		methods: {
			edit() {
				console.log('点击了')
			}
		}
	}
</script>

<style lang="scss">
	.user {
		min-height: 100vh;

		.userTopBg {
			width: 100%;
			height: 54vh;
			position: fixed;
			top: 0;

			.edit {
				position: absolute;
				width: 140rpx;
				height: 70rpx;
				background-color: #222222;
				right: 34rpx;
				bottom: 52rpx;
				border-radius: 100rpx;
				text-align: center;
				line-height: 70rpx;
				color: #1ffd91;
			}
			.showImg {
				position: absolute;
				left: 34rpx;
				bottom: 52rpx;
				.showImgItem {
					width: 80rpx;
					height: 80rpx;
					border: 2rpx solid #fff;
					border-radius: 10rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}

		.userMsg {
			width: 100%;
			height: 120vh;
			margin-top: 52vh;
			background-color: #f9f9f9;
			position: relative;
			z-index: 9;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			overflow: hidden;

			.userName {
				font-size: 32rpx;
			}

			// 粉丝数据等
			.userNum {
				font-size: 25rpx;

				.num {
					color: #333;
				}

				.title {
					color: #a3a3a3;
				}
			}

			// 一起玩过等
			.userData {
				.userDataItem {
					.udiIcon {
						width: 50rpx;
						height: 50rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.udiNum {
						font-size: 33rpx;
					}

					.udiText {
						font-size: 25rpx;
						color: #a3a3a3;
						transform: scale(.9);
						transform-origin: 0 50%;
					}
				}
			}

			// 个签与标签
			.userSign {
				padding: 20rpx 0;
				background: linear-gradient(to bottom, #e1f9f2, #fafefd);
				border-radius: 20rpx;

				.sign {
					.signText {
						font-size: 25rpx;

						.signIcon {
							display: inline-block;
							width: 30rpx;
							height: 30rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}

					.label {
						flex-wrap: wrap;

						.labelItem {
							font-size: 25rpx;
							background-color: #fff;
							color: #a3a3a3;
							padding: 10rpx 15rpx;
							border-radius: 100rpx;
						}
					}
				}
			}

			// 选择项
			.userCard {
				padding: 20rpx 0;
				background: #fff;
				border-radius: 20rpx;

				.cardItem {
					.cardIcon {
						width: 50rpx;
						height: 50rpx;
						margin: 0 auto;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.cardText {
						font-size: 25rpx;
						color: #a3a3a3;
					}
				}
			}

			// 我参与的
			.join {
				padding: 20rpx 0;
				background: #fff;
				border-radius: 20rpx;

				.joinTitle {}

				.joinItem {
					.joinItemTime {}

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

					.isLook {
						.isLookIcon {
							width: 35rpx;
							height: 35rpx;

							image {
								width: 100%;
								height: 100%;

							}
						}

						.isLookText {
							color: #afafaf;
						}
					}

					.joinItemBot {
						width: 100%;

						.joinItemBotLine {
							height: 300rpx;
							width: 1rpx;
							border: 3rpx dashed #ececec;
						}

						.joinItemMsg {
							width: 88%;
							padding: 20rpx 0;
							background-color: #fafafa;
							border-radius: 20rpx;

							.joinItemImg {
								width: 35%;
								height: 180rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 20rpx;
								}
							}

							.joinItemDetail {
								flex-direction: column;
								justify-content: space-between;

								.jdAddress {

									.jdAddressText {
										font-size: 25rpx;
										color: #a1a1a1;
									}
								}

								.jdUser {
									.jdUserHead {
										width: 40rpx;
										height: 40rpx;

										image {
											width: 100%;
											height: 100%;
											border-radius: 50%;
										}
									}

									.jdUserName {
										font-size: 25rpx;
										color: #a1a1a1;
									}
								}
							}
						}
					}

				}
			}
		}
	}
</style>