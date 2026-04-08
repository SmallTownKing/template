<template>
	<view class="warehouse-page">
		<view class="warehouse-page__placeholder">
			<text class="warehouse-page__title">Warehouse Page</text>
			<text class="warehouse-page__desc">
				页面骨架已创建，后续在这里组装 custom bar 和仓库业务组件。
			</text>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss">
.warehouse-page {
	min-height: 100vh;
	background: #f7f7f7;
}

.warehouse-page__placeholder {
	padding: 32rpx;
}

.warehouse-page__title {
	display: block;
	font-size: 36rpx;
	font-weight: 700;
	color: #111827;
}

.warehouse-page__desc {
	display: block;
	margin-top: 16rpx;
	font-size: 26rpx;
	line-height: 1.7;
	color: #6b7280;
}
</style>
