<template>
	<view class="card-release-page">
		<view class="card-release-page__placeholder">
			<text class="card-release-page__title">Card Release Page</text>
			<text class="card-release-page__desc">
				页面骨架已创建，后续在这里组装 custom bar 和业务组件。
			</text>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss">
.card-release-page {
	min-height: 100vh;
	background: #f7f7f7;
}

.card-release-page__placeholder {
	padding: 32rpx;
}

.card-release-page__title {
	display: block;
	font-size: 36rpx;
	font-weight: 700;
	color: #111827;
}

.card-release-page__desc {
	display: block;
	margin-top: 16rpx;
	font-size: 26rpx;
	line-height: 1.7;
	color: #6b7280;
}
</style>
