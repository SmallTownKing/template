<template>
	<view class="warehouse-notice-bar">
		<view class="warehouse-notice-bar__icon">
			<text class="warehouse-notice-bar__icon-text">✓</text>
		</view>
		<text class="warehouse-notice-bar__text">{{ text }}</text>
	</view>
</template>

<script setup>
defineOptions({
	name: 'WarehouseNoticeBar'
})

defineProps({
	text: {
		type: String,
		default: 'Tất cả sản phẩm, quà tặng, đồ chơi và thẻ bài đều được cấp phép chính thức từ nhà phân phối chính hãng, đảm bảo chất lượng.'
	}
})
</script>

<style lang="scss" scoped>
.warehouse-notice-bar {
	display: flex;
	align-items: flex-start;
	column-gap: 12rpx;
	padding: 0 32rpx 24rpx;
}

.warehouse-notice-bar__icon {
	width: 24rpx;
	height: 24rpx;
	margin-top: 4rpx;
	border-radius: 50%;
	background: linear-gradient(180deg, #3f8cff 0%, #2b68ff 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.warehouse-notice-bar__icon-text {
	font-size: 16rpx;
	font-weight: 700;
	color: #ffffff;
	line-height: 1;
}

.warehouse-notice-bar__text {
	font-size: 20rpx;
	line-height: 1.5;
	color: rgba(255, 255, 255, 0.88);
}
</style>
