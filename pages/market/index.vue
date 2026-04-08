<template>
	<view class="market-page">
		<view class="market-page__placeholder">
			<text class="market-page__title">Market Page</text>
			<text class="market-page__desc">
				页面骨架已创建，后续在这里组装 custom bar 和集市业务组件。
			</text>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss">
.market-page {
	min-height: 100vh;
	background: #f7f7f7;
}

.market-page__placeholder {
	padding: 32rpx;
}

.market-page__title {
	display: block;
	font-size: 36rpx;
	font-weight: 700;
	color: #111827;
}

.market-page__desc {
	display: block;
	margin-top: 16rpx;
	font-size: 26rpx;
	line-height: 1.7;
	color: #6b7280;
}
</style>
