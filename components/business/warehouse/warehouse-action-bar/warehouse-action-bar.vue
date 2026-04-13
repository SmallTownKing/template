<template>
	<view class="warehouse-action-bar">
		<view class="warehouse-action-bar__summary" @tap="emit('toggle-all')">
			<view style="display: flex; align-items: center; column-gap: 8rpx;">
				<view class="warehouse-action-bar__checkbox"
				:class="{ 'warehouse-action-bar__checkbox--checked': checked }">
				<view v-if="checked" class="warehouse-action-bar__checkbox-dot" />
			</view>
			<text class="warehouse-action-bar__select">{{ selectText }}</text>
			</view>
			<view class="warehouse-action-bar__summary-text">
				<view class="warehouse-action-bar__total-row">
					<text class="warehouse-action-bar__total-label">{{ totalLabel }}</text>
					<text class="warehouse-action-bar__total-price">{{ totalPrice }}</text>
				</view>
			</view>
		</view>
		<view class="warehouse-action-bar__buttons">
			<view class="warehouse-action-bar__button warehouse-action-bar__button--light" @tap="emit('analyze')">
				<text class="warehouse-action-bar__button-text">{{ analyzeText }}</text>
			</view>
			<view class="warehouse-action-bar__button warehouse-action-bar__button--dark-alt" @tap="emit('pack')">
				<text class="warehouse-action-bar__button-text warehouse-action-bar__button-text--wrap">{{ packText
					}}</text>
			</view>
			<view class="warehouse-action-bar__button warehouse-action-bar__button--dark" @tap="emit('send')">
				<text class="warehouse-action-bar__button-text">{{ sendText }}</text>
			</view>
			<view class="warehouse-action-bar__button warehouse-action-bar__button--sell" @tap="emit('sell')">
				<view class="warehouse-action-bar__sell-icon" />
				<text class="warehouse-action-bar__button-text">{{ sellText }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
defineOptions({
	name: 'WarehouseActionBar'
})

defineProps({
	checked: {
		type: Boolean,
		default: false
	},
	hasGoods: {
		type: Boolean,
		default: false
	},
	selectText: {
		type: String,
		default: 'Chọn tất cả'
	},
	totalLabel: {
		type: String,
		default: 'Tổng cộng:'
	},
	totalPrice: {
		type: String,
		default: 'RM0.00'
	},
	analyzeText: {
		type: String,
		default: 'Phân tích'
	},
	packText: {
		type: String,
		default: 'Đặt vào hộp\nsố tiền'
	},
	sendText: {
		type: String,
		default: 'Gửi hàng'
	},
	sellText: {
		type: String,
		default: 'Bán'
	}
})

const emit = defineEmits(['toggle-all', 'analyze', 'pack', 'send', 'sell'])
</script>

<style lang="scss" scoped>
.warehouse-action-bar {
	background: #FFF;
	padding: 20rpx 24rpx calc(12rpx + env(safe-area-inset-bottom)) 24rpx;
	box-sizing: border-box;
	flex-shrink: 0;
}

.warehouse-action-bar__summary {
	display: flex;
	align-items: center;
	flex-shrink: 0;
	justify-content: space-between;
	height: 48rpx;
	margin-bottom: 12rpx;
}

.warehouse-action-bar__checkbox {
	width: 24rpx;
	height: 24rpx;
	border-radius: 50%;
	border: 2rpx solid #c7cad2;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #ffffff;
}

.warehouse-action-bar__checkbox--checked {
	border-color: #ff7b22;
}

.warehouse-action-bar__checkbox-dot {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background: #ff7b22;
}

.warehouse-action-bar__summary-text {
	display: flex;
	flex-direction: column;
	row-gap: 6rpx;
}

.warehouse-action-bar__select {
	font-size: 28rpx;
	line-height: 1;
	color: #333333;
}

.warehouse-action-bar__total-row {
	display: flex;
	align-items: baseline;
	column-gap: 6rpx;
}

.warehouse-action-bar__total-label {
	font-size: 20rpx;
	line-height: 1;
	color: #b4b6bf;
}

.warehouse-action-bar__total-price {
	font-size: 32rpx;
	line-height: 1;
	color: #ff4b2b;
}

.warehouse-action-bar__buttons {
	display: flex;
	align-items: stretch;
	column-gap: 12rpx;
	flex: 1;
}

.warehouse-action-bar__button {
	height: 66rpx;
	width: 165rpx;
	border-radius: 6rpx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	column-gap: 12rpx;
	flex: 1;
}

.warehouse-action-bar__button--light {
	background: #101010;
}

.warehouse-action-bar__button--dark-alt,
.warehouse-action-bar__button--dark {
	background: #161616;
}

.warehouse-action-bar__button--sell {
	background: #ff7b22;
}

.warehouse-action-bar__button-text {
	font-size: 22rpx;
	line-height: 1;
	color: #ffffff;
	text-align: center;
}

.warehouse-action-bar__button-text--wrap {
	white-space: pre-line;
	line-height: 1.15;
}

.warehouse-action-bar__sell-icon {
	width: 18rpx;
	height: 14rpx;
	border: 2rpx solid #ffffff;
	border-radius: 4rpx 4rpx 6rpx 6rpx;
	position: relative;
	flex-shrink: 0;
}

.warehouse-action-bar__sell-icon::before {
	content: '';
	position: absolute;
	top: -8rpx;
	left: 2rpx;
	right: 2rpx;
	height: 6rpx;
	border: 2rpx solid #ffffff;
	border-bottom: 0;
	border-radius: 6rpx 6rpx 0 0;
}
</style>
