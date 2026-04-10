<template>
	<view class="warehouse-top-bar" >
		<view class="warehouse-top-bar__content">
			<text class="warehouse-top-bar__title">{{ title }}</text>
		</view>
	</view>
</template>

<script setup>

defineOptions({
	name: 'WarehouseTopBar'
})

const props = defineProps({
	title: {
		type: String,
		default: 'Kho của tôi'
	}
})

</script>

<style lang="scss" scoped>
.warehouse-top-bar {
	padding: 32rpx 32rpx 26rpx 32rpx;
	height: 46rpx;
	line-height: 46rpx;
}

.warehouse-top-bar__content {
	display: flex;
	align-items: center;
}

.warehouse-top-bar__title {
	font-size: 40rpx;
	font-weight: 700;
	line-height: 1;
	color: #ffffff;
}
</style>
