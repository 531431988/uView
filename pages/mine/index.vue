<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-t-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">uView ui</view>
				<view class="u-font-14 u-tips-color">微信号:helang_uView</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<u-cell-group class="u-m-t-20">
			<u-cell-item icon="rmb-circle" title="支付"></u-cell-item>
		</u-cell-group>
		
		<u-cell-group class="u-m-t-20">
			<u-cell-item icon="star" title="收藏"></u-cell-item>
			<u-cell-item icon="photo" title="相册"></u-cell-item>
			<u-cell-item icon="coupon" title="卡券"></u-cell-item>
			<u-cell-item icon="heart" title="关注"></u-cell-item>
		</u-cell-group>
		
		<u-cell-group class="u-m-t-20">
			<u-cell-item icon="setting" title="设置"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png'
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}
.user-box{
	background-color: #fff;
}
</style>