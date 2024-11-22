<template>
	<view>
		<uv-popup ref="popup" mode='bottom' bgColor='none' :safeAreaInsetBottom='false'>
			<view class="popup1"></view>
			<view class="popup">
				<slot name="content"></slot>
			</view>
		</uv-popup>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			open() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="scss">
	.popup1 {
		width: 100%;
		height: 120rpx;
		background-color: #fff;
		margin-top: 50rpx;
		border-radius: 30rpx;
		transform: skewY(2deg);
	}
	
	.popup {
		width: 100%;
		height: 600rpx;
		background-color: #fff;
		padding: 20rpx 0;
		margin-top: -60rpx;
		position: relative;
		z-index: 1;
	}
</style>