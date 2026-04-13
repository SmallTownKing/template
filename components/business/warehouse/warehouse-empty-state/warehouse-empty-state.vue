<template>
	<view class="warehouse-empty-state">
		<image class="warehouse-empty-state__image" :src="image" mode="aspectFit" />
		<text class="warehouse-empty-state__text">{{ text }}</text>
	</view>
</template>

<script setup>
defineOptions({
	name: 'WarehouseEmptyState'
})

defineProps({
	image: {
		type: String,
		default: '/static/images/warehouse-empty-panda.svg'
	},
	text: {
		type: String,
		default: 'Kho trống rỗng như không~'
	}
})
</script>

<style lang="scss" scoped>
.warehouse-empty-state {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 0;
	padding: 60rpx 32rpx;
	box-sizing: border-box;
}

.warehouse-empty-state__image {
	width: 360rpx;
	height: 420rpx;
	display: block;
}

.warehouse-empty-state__text {
	margin-top: 28rpx;
	font-size: 30rpx;
	line-height: 1.5;
	color: #b4b6bf;
	text-align: center;
}
</style>
