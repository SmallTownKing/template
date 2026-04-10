<template>
	<base-page-shell>
		<view class="user-page">
			<user-center-header />
			<user-membership-panel />
			<view style="padding: 36rpx 32rpx; box-sizing: border-box;  height: calc(100vh - var(--status-bar-height) - var(--window-bottom) - 142rpx - 360rpx); background-color: #FFF; border-radius: 20rpx 20rpx 0 0;">
				<user-assets-panel />
				<user-benefit-panel />
				<user-feature-grid />
			</view>
		</view>
	</base-page-shell>
</template>

<style lang="scss" scoped>
.user-page {
	min-height: calc(100vh - var(--status-bar-height) - var(--window-bottom));
	background-image: url('/static/background/userBg.png');
	background-size: 100vw 502rpx;
}
</style>
