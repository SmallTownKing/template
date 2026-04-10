<template>
	<view class="user-benefit-panel">
		<view class="panel-item" style="background: linear-gradient(to right, #FCDDA9 0%, #F2EA97 100%);">
			<view>
				<view></view>
				<view></view>
			</view>
			<image style="width: 64rpx; height: 64rpx;" src="/static/icons/gold.png" mode="scaleToFill" />
		</view>
		<view class="panel-item" style="background: linear-gradient(to right, #FFCE40 0%, #FCE174 100%);">
			<view></view>
			<view></view>
		</view>
	</view>
</template>

<style scoped>
.user-benefit-panel {
	width: 686rpx;
	height: 100rpx;
	border-radius: 16rpx;
	margin-top: 26rpx;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 22rpx;
}

.panel-item {
	width: 334rpx;
	border-radius: 12rpx;
	padding: 16rpx 26rpx 16rpx 16rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>