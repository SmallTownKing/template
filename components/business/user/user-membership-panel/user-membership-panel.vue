<template>
	<view class="user-membership-panel">
		<image
		 style="position: absolute; right: -32rpx; top: -130rpx; width: 300rpx; height: 300rpx;"
			src="/static/background/v1bg.png"
			mode="scaleToFill"
		/>
		<view style="height: 60rpx; width: 438rpx; display: flex; align-items: baseline; justify-content: space-between;">
			<view style="font-size: 48rpx; color: #132D5D; font-weight: bold;">Lv2</view>
			<view>20XP</view>
		</view>
		<view style="width: 438rpx; border-radius: 12rpx; height: 12rpx; background-color: #132D5D; margin-top: 8rpx;"></view>
		<view style="width: 438rpx; margin-top: 8rpx; height: 24rpx; font-size: 20rpx; display: flex; align-items: center; justify-content: space-between;">
			<view style="color: #132D5D">123</view>
			<view style="color: #132D5D">123</view>
		</view>
	</view>
</template>

<style scoped>
.user-membership-panel {
	margin: 0 32rpx;
	background-image: url('/static/background/vip1bg.png');
	background-size: 100% 334rpx;
	height: 142rpx;
	position: relative;
	padding: 10rpx 0 20rpx 28rpx;
	box-sizing: border-box;
}

</style>