<template>
	<view class="lottery-online-bar">
		<view style="height: 44rpx;">
			<image src="/static/icons/online.png" mode="scaleToFill" style="width: 55rpx; height: 44rpx;" />
		</view>
		<image
			src="/static/icons/online-more.png"
			mode="scaleToFill"
			style="width: 17rpx; height: 17rpx;"
		/>
	</view>
</template>

<script setup>
defineOptions({
	name: 'LotteryOnlineBar'
})
</script>

<style lang="scss" scoped>
.lottery-online-bar {
	width: 316rpx;
	height: 50rpx;
	background-color: #FFF;
	border-radius: 7rpx;
	padding: 3rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
