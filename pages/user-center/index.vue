<template>
	<view class="user-center-page">
		<view class="user-center-page__placeholder">
			<text class="user-center-page__title">User Center Page</text>
			<text class="user-center-page__desc">
				页面骨架已创建，后续在这里组装 custom bar 和个人中心业务组件。
			</text>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss">
.user-center-page {
	min-height: 100vh;
	background: #f7f7f7;
}

.user-center-page__placeholder {
	padding: 32rpx;
}

.user-center-page__title {
	display: block;
	font-size: 36rpx;
	font-weight: 700;
	color: #111827;
}

.user-center-page__desc {
	display: block;
	margin-top: 16rpx;
	font-size: 26rpx;
	line-height: 1.7;
	color: #6b7280;
}
</style>
