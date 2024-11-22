<template>
	<view class="container">
		<!-- 顶部标题 -->
		<!-- #ifdef H5 -->
		<view class="topTitle">
			<view class="txt">消息</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<uv-navbar title=" " @rightClick="rightClick" :autoBack="false" :placeholder="false">
		<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<uv-navbar title=" " @rightClick="rightClick" :autoBack="false" :placeholder="true">
			<!-- #endif -->
				<view slot='left'>
					<view class="leftIcon">
						<view class="leftIconItem" @click="showClear = true">
							<image :src="clearMessage" mode=""></image>
						</view>
					</view>
				</view>
			</uv-navbar>
			<view class="messageState">
				<view class="messageStaetText">
					{{sellectItemText}}
				</view>
				<view class="openSelect" :class="isShowOpenSelect ? 'noOpenSelect' : 'openSelect' ">
					<view class="selectItem" v-for="(item,index) in selectItemList" :key="index"
						@click="selectItem(index,item)">
						<view class="selectItemText">
							{{item}}
						</view>
						<view class="selectItemIcon" v-if="index == current">
							<uv-icon name="checkbox-mark" color="#fff" size="8"></uv-icon>
						</view>
					</view>
				</view>
			</view>
			<template v-if="chatList && chatList.length > 0 && isSuccess">
				<view v-for="(item,index) in chatList" class="cont" @click="openChat(item)" style="position: relative;"
					:key="index">
					<view class="contLeft" style="position: relative;">
						<image :src="item.headImg" style="width: 100%; height: 100%; border-radius: 50%;" mode="">
						</image>
						<view style="position: absolute;top:-5px;right:-10px;">
							<uv-badge type="error" max="99" :value="item.noRead"></uv-badge>
						</view>
					</view>
					<view class="contRight">
						<view class="name">
							<view class="txt">{{item.sendNickName}}</view>
						</view>
						<view class="time">
							<view class="txt">{{item.lastMessageText}}</view>
						</view>
					</view>

					<view style="color:#999;font-size:12px;position: absolute;right:20px;top:10px;">
						{{$uti.getTimeAgo(item.lastTime)}}
					</view>
				</view>
			</template>
			<view v-if="chatList && chatList.length == 0 && isSuccess" class="mt100">
				<uv-empty mode="history" icon="https://cdn.uviewui.com/uview/empty/history.png"></uv-empty>
			</view>
			<view class="mt100" v-if="!isSuccess">
				<uv-loading-icon text="加载中" textSize="30rpx"></uv-loading-icon>
			</view>
			<uv-overlay :show="showClear" @click="showClear = false">
				<uni-transition mode-class="zoom-in" :show="showClear">
					<view style="height: 100vh;position: relative;">
						<view class="tips">
							<view class="title">清除未读</view>
							<view class="content">确定清除所有未读消息？</view>
							<view class="tipsBtn">
								<view class="btnCancel" @click="showClear = false">取消</view>
								<view class="btnConfirm bg-color" @click="clearAllNoRead">清除
								</view>
							</view>
						</view>
					</view>
				</uni-transition>
			</uv-overlay>
			<uv-overlay :show="showEndChat" @click="showEndChat = false">
				<uni-transition mode-class="zoom-in" :show="showEndChat">
					<view style="height: 100vh;position: relative;">
						<view class="tips">
							<view class="title">结束聊天</view>
							<view class="content">确认后聊天将结束，若想重新开始聊天，需要重新申请！同时会解除关注关系</view>
							<view class="tipsBtn">
								<view class="btnCancel" @click="showEndChat = false">取消</view>
								<view class="btnConfirm bg-color" @click="showEndChat= false">确定
								</view>
							</view>
						</view>
					</view>
				</uni-transition>
			</uv-overlay>
			<tabBar :current-page="2" ref="tabBar" @newMsg="newMsg"></tabBar>
	</view>
</template>

<script>
	import {
		func
	} from '../../uni_modules/uv-ui-tools/libs/function/test'
	export default {
		data() {
			return {
				pages: 1,
				rows: 10,
				chatList: [],
				showClear: false,
				showEndChat: false,
				isShowOpenSelect: true,
				selectItemList: [
					'最近聊天', '全部聊天', '星标聊天', '回收站', '互动通知'
				],
				current: 0,
				sellectItemText: '最近聊天',
				showSwipe: true,
				myid: 0,
				socketTask: null,
				isSuccess: true,
				clearMessage: ''
			}
		},
		async onLoad() {
			var that = this
			await that.$onLaunched
			// that.myid = that.$us.getIntId();
			that.clearMessage = that.$cfg.imgUrl +  getApp().globalData.sysConfig.find(item => item.keyName ==
				'clearMessage').context
		},
		onShow() {
			this.reload();
		},
		onHide() {

		},
		methods: {
			reload() {
				this.chatList = [];
				// this.getList();
			},
			isJSON(str) {
				try {
					JSON.parse(str);
					return true;
				} catch (e) {
					return false;
				}
			},
			newMsg(res) {
				//新逻辑
				let that = this;
				let item = JSON.parse(res.data);
				let index = that.chatList.findIndex(_ => _.sendUserId == item.userId);
				let videoRegex = /(\mp4|\avi|\mkv|\MOV)$/i
				let imgRegex = /(\jpg|\jpeg|\png|\gif|\webp)$/i;
				let docRegex = /(\mp3|\AAC|\OGG|\WMA|\Opus|\FLAC|\APE|\xlsx|\m4a|\AMR)$/;
				let msg = ''
				if (that.isJSON(item.message)) {
					if (JSON.parse(item.message).gameName) {
						msg = '[游戏名片]'
					} else if (JSON.parse(item.message).giftsName) {
						msg = '[礼物]'
					} else {
						msg = item.message
					}
				} else if(imgRegex.test(item.message)) {
					msg = '[图片]'
				} else if(videoRegex.test(item.message)) {
					msg = '[视频]'
				}else if(docRegex.test(item.message)) {
					msg = '[语音]'
				}else {
					msg = item.message
				}
				if (index > -1) {
					let model = JSON.parse(JSON.stringify(that.chatList[index]));

					that.chatList.splice(index, 1);
					that.$set(model, 'lastMessageText', msg);
					that.$set(model, 'lastTime', that.$uti.dateFormat(item.createTime, 'yyyy-MM-dd hh:mm:ss'));
					that.$set(model, 'lastMsgType', item.type);
					that.$set(model, 'noRead', (model.noRead && model.noRead > 0 ? (model.noRead + 1) : 1));

					that.chatList.unshift(model);
				}
			},
			clearAllNoRead() {
				let that = this;
				that.$http.post('/Applet/Chat/TotalRead', {}, function(res) {
					if (res.code == 200) {
						that.chatList.forEach(item => {
							item.noRead = 0;
						})
					} else {
						that.$uti.alert('不需要清除哦！')
					}
				})
			},
			openChat(item) {
				if (item.noRead > 0)
					this.$refs.tabBar.removeCnt(item.noRead);

				uni.setStorageSync('headImg', item.headImg)
				uni.setStorageSync('sendNickName', item.sendNickName)
				this.$uti.toPage('/subPack/play_message/message', {
					id: item.sendUserId
				})
			},
			selectItem(index, item) {
				this.current = index
				this.sellectItemText = item
				this.isShowOpenSelect = true
			},
			setStar(index, isStar) {
				this.$set(this.chatList[index], 'isStar', isStar)
			},
			click(e) {
				if (e.index == 0) {
					this.closeCurrent(e.othIndex)
					this.$uti.toPage('/subPack/play_message/userSetting', {
						index: e.othIndex,
						isStar: e.isStar
					})
				}
				if (e.index == 1) {
					this.closeCurrent(e.othIndex)
					this.$set(this.chatList[e.othIndex], 'isStar', !e.isStar)
					if (!e.isStar) {
						setTimeout(() => {
							this.$set(this.chatList[e.othIndex].options1[1], 'text', '取消星标')
						}, 500)
					} else {
						setTimeout(() => {
							this.$set(this.chatList[e.othIndex].options1[1], 'text', '星标聊天')
						}, 500)
					}
				}
				if (e.index == 2) {
					this.closeCurrent(e.othIndex)
					this.showEndChat = true
				}
			},
			// 关闭当前滑出项
			closeCurrent(index) {
				const swipeActionItem = this.$refs.swipeActionItems[index];
				if (swipeActionItem && swipeActionItem.closeHandler) {
					swipeActionItem.closeHandler();
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.container {
		background-size: cover;
		overflow: hidden;
		min-height: 100vh;

		// 顶部标题
		.topTitle {
			padding: 30rpx 0;
			position: relative;

			.icon {
				position: absolute;
				left: 17rpx;
			}

			.txt {
				text-align: center;
			}
		}

		.top {
			width: 94%;
			margin: 0 auto;
			margin-top: 20rpx;
			background-color: #e2ddf6;
			padding: 20rpx 0;
			border-radius: 20rpx;

			.topCont {
				width: 92%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					font-size: 28rpx;
				}

				.right {
					color: #fff;
					font-size: 26rpx;
					padding: 10rpx 15rpx;
					border-radius: 50rpx;
				}
			}
		}

		.leftIcon {
			display: flex;

			.leftIconItem {
				width: 35rpx;
				height: 35rpx;
				margin-right: 30rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.tips {
			width: 70%;
			padding: 60rpx 50rpx;
			border-radius: 20rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;

			.title {
				padding-bottom: 30rpx;
				font-weight: bold;
				text-align: center;
			}

			.content {
				color: #62656f;
				text-align: center;
			}

			.tipsBtn {
				display: flex;
				justify-content: space-between;
				margin-top: 50rpx;

				.btnCancel {
					width: 40%;
					background-color: #f4f5f7;
					text-align: center;
					padding: 25rpx 0;
					border-radius: 20rpx;
					color: #62656f;
				}

				.btnConfirm {
					width: 40%;
					text-align: center;
					padding: 25rpx 0;
					border-radius: 20rpx;
					color: #fff;
				}
			}
		}

		.applyUser {
			width: 92%;
			margin: 0 auto;
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;

			.applyUserItem {
				width: 45%;
				background: linear-gradient(to bottom, #e6e5ff, #f0f0ff, #f5f4ff);
				box-sizing: border-box;
				padding: 30rpx 30rpx;
				border-radius: 20rpx;

				.itemTop {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.itemTitle {
						font-size: 30rpx;
						font-weight: bold;

					}
				}

				.itemBot {
					font-weight: bold;
				}
			}

			.applyUserItem1 {
				width: 45%;
				background: linear-gradient(to bottom, #d2edff, #e0f3ff, #effaff);
				box-sizing: border-box;
				padding: 30rpx 30rpx;
				border-radius: 20rpx;

				.itemTop {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.itemTitle {
						font-size: 30rpx;
						font-weight: bold;

					}
				}

				.itemBot {
					font-weight: bold;
				}
			}
		}

		.messageState {
			width: 92%;
			margin: 0 auto;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 30rpx;
			position: relative;
			z-index: 99;

			.messageStaetText {
				font-size: 30rpx;
				color: #88889c;
			}

			.messageStateIcon {
				width: 40rpx;
				height: 40rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.openSelect {
				width: 200rpx;
				height: 270rpx;
				position: absolute;
				right: 0rpx;
				top: 50rpx;
				background-color: #2c2c48;
				// padding: 30rpx 0;
				border-radius: 15rpx;
				transition: .2s linear;
				color: #fff;
				overflow: hidden;
				box-sizing: border-box;
				padding: 0 20rpx;

				.selectItem {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-top: 20rpx;

					.selectItemText {
						font-size: 25rpx;
						transform: scale(.8);
						transform-origin: 0 0;
					}
				}
			}

			.noOpenSelect {
				height: 0;
				transition: .2s linear;
			}
		}

		//     <!-- 待处理申请 -->
		.apply {
			width: 92%;
			margin: 0 auto;
			padding-top: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.right {
				background-color: #fff;
				font-size: 25rpx;
				padding: 15rpx 20rpx;
				border-radius: 50rpx;
			}
		}

		.cont {
			width: 94%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			margin-top: 0rpx;
			padding: 10rpx 30rpx;

			.contLeft {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.contRight {
				padding-left: 30rpx;
				width: 65%;
				padding-bottom: 20rpx;

				.name {
					padding-top: 15rpx;
					font-size: 30rpx;
					color: #2a2b33;
					display: flex;
					align-items: center;

					.txt {
						padding-right: 10rpx;
					}
				}

				.userMsg {
					font-size: 25rpx;
					color: #b2b5c1;
					padding: 10rpx 0 0 0;
				}

				.time {
					font-size: 25rpx;
					color: #b2b5c1;
					padding: 10rpx 0 0 0;
				}

				.evaImg {
					width: 40%;
					height: 280rpx;
				}

				.label {
					display: flex;

					.labelItem {
						background-color: #efedf2;
						display: flex;
						align-items: center;
						padding: 8rpx 15rpx;
						border-radius: 50rpx;

						.txt {
							font-size: 28rpx;
							color: #6a5ec8;
							padding-left: 10rpx;
						}

						.icon {
							width: 35rpx;
							height: 35rpx;
						}
					}
				}
			}
		}
	}
</style>