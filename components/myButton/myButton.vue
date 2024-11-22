<template>
	<view>
		<uv-button type="default" :loading='isLoading' :loadingText="buttonLoading" @click="myButtonBtn" :custom-style="{
			width:widthB,
			height:heightB,
			background: buttonColor,
			padding:padding,
			borderRadius:radiusB + 'rpx',
			border:'none',
			color:buttonTextColor
		}">{{buttonText}}</uv-button>
	</view>
</template>

<script>
	export default {
		props: {
			widthB: {
				type: String
			},
			heightB: {
				type: String
			},
			radiusB: {
				type: Number,
				default: 15
			},
			isLoading: {
				type: Boolean,
				default: false
			},
			buttonText: {
				type: String,
				default: ''
			},
			buttonLoading: {
				type: String,
				default: ''
			},
			buttonColor: {
				type: String,
				default: ''
			},
			buttonTextColor: {
				type: String,
				default: '#fff'
			},
			padding: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			}
		},
		created() {
			
		},
		methods: {
			myButtonBtn() {
				this.$emit('myButtonBtn')
			}
		}
	}
</script>

<style lang="scss">
	::v-deep {
		.uv-button-wrapper {
			.uv-button {
				height: unset;
			}
		}
	}
</style>