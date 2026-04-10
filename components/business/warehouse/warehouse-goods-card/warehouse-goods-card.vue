<template>
	<view class="warehouse-goods-card" :class="{ 'warehouse-goods-card--selected': isSelected }">
		<view class="warehouse-goods-card__media">
			<image class="warehouse-goods-card__image" :src="item.image" mode="aspectFill" />
			<view class="warehouse-goods-card__badge">{{ item.badge || 'SP' }}</view>
			<view class="warehouse-goods-card__stock">{{ item.stockLabel || `x${item.availableCount || 0}` }}</view>
		</view>
		<text class="warehouse-goods-card__title">{{ item.title }}</text>
		<text class="warehouse-goods-card__price">{{ item.displayPrice }}</text>
		<view class="warehouse-goods-card__stepper">
			<view
				class="warehouse-goods-card__stepper-btn warehouse-goods-card__stepper-btn--minus"
				:class="{ 'is-disabled': normalizedSelectedCount <= 0 }"
				@tap.stop="emit('decrease', item)"
			>
				<text class="warehouse-goods-card__stepper-symbol">-</text>
			</view>

			<input
				class="warehouse-goods-card__stepper-value"
				type="number"
				:value="displayCount"
				@input="handleInput"
				@blur="handleBlur"
			/>

			<view
				class="warehouse-goods-card__stepper-btn warehouse-goods-card__stepper-btn--plus"
				:class="{ 'is-disabled': normalizedSelectedCount >= availableCount }"
				@tap.stop="emit('increase', item)"
			>
				<text class="warehouse-goods-card__stepper-symbol">+</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
	name: 'WarehouseGoodsCard'
})

const props = defineProps({
	item: {
		type: Object,
		default: () => ({})
	},
	selectedBorderThreshold: {
		type: Number,
		default: 0
	}
})

const emit = defineEmits(['increase', 'decrease', 'count-change'])

const availableCount = computed(() => {
	return Math.max(0, Number(props.item?.availableCount || 0))
})

const normalizedSelectedCount = computed(() => {
	const numberValue = Number(props.item?.selectedCount)
	if (!Number.isFinite(numberValue)) {
		return 0
	}

	return Math.max(0, Math.floor(numberValue))
})

const displayCount = computed(() => {
	return String(normalizedSelectedCount.value)
})

const isSelected = computed(() => {
	return normalizedSelectedCount.value > props.selectedBorderThreshold
})

const handleInput = (event) => {
	emit('count-change', {
		item: props.item,
		value: event?.detail?.value ?? ''
	})
}

const handleBlur = (event) => {
	emit('count-change', {
		item: props.item,
		value: event?.detail?.value ?? ''
	})
}
</script>

<style lang="scss" scoped>
.warehouse-goods-card {
	border-radius: 8rpx;
	border: 2rpx solid transparent;
	background: #ffffff;
	padding: 2rpx;
	box-sizing: border-box;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.warehouse-goods-card--selected {
	border-color: #ff8e4b;
}

.warehouse-goods-card__media {
	position: relative;
	overflow: hidden;
	border-radius: 8rpx 8rpx 0 0;
	background: linear-gradient(180deg, #f7d9e4 0%, #dbe6ff 100%);
	aspect-ratio: 1 / 1;
}

.warehouse-goods-card__image {
	width: 100%;
	height: 100%;
	display: block;
}

.warehouse-goods-card__badge {
	position: absolute;
	top: 8rpx;
	left: 6rpx;
	height: 26rpx;
	padding: 0 8rpx;
	border-radius: 6rpx;
	background: linear-gradient(180deg, #ff5d43 0%, #ff2f1c 100%);
	font-size: 16rpx;
	font-weight: 700;
	line-height: 26rpx;
	color: #ffffff;
}

.warehouse-goods-card__stock {
	position: absolute;
	right: 0rpx;
	bottom: 0rpx;
	height: 34rpx;
	padding: 0 18rpx;
	border-radius: 8rpx 0 0 0;
	background: rgba(20, 20, 20, 0.68);
	font-size: 22rpx;
	font-style: italic;
	line-height: 34rpx;
	color: #ffffff;
}

.warehouse-goods-card__title {
	display: -webkit-box;
	font-size: 22rpx;
	line-height: 26rpx;
	text-align: center;
	color: #202020;
	overflow: hidden;
	margin: 0 18rpx;
	margin-top: 16rpx;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.warehouse-goods-card__price {
	display: block;
	margin-top: 6rpx;
	font-size: 22rpx;
	text-align: center;
	line-height: 1;
	color: #f72f2b;
}

.warehouse-goods-card__stepper {
	height: 50rpx;
	display: grid;
	margin: 0 18rpx;
	margin-top: 14rpx;
	margin-bottom: 16rpx;
	grid-template-columns: 1fr auto 1fr;
	align-items: center;
	justify-content: space-between;
}

.warehouse-goods-card__stepper-btn {
	height: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #eeeeee;
}

.warehouse-goods-card__stepper-btn--minus,
.warehouse-goods-card__stepper-btn--plus {
	border-radius: 2rpx;
	width: 50rpx;
}

.warehouse-goods-card__stepper-btn.is-disabled {
	opacity: 0.45;
}

.warehouse-goods-card__stepper-symbol {
	font-size: 34rpx;
	font-weight: 600;
	line-height: 1;
	color: #3a3a3a;
}

.warehouse-goods-card__stepper-value {
	min-width: 74rpx;
	width: 74rpx;
	margin: 0 8rpx;
	font-size: 28rpx;
	font-weight: 700;
	line-height: 50rpx;
	border-radius: 2rpx;
	color: #1e1e1e;
	height: 50rpx;
	text-align: center;
	background-color: #eeeeee;
}
</style>
