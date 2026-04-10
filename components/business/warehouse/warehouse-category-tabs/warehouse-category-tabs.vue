<template>
	<view class="warehouse-category-tabs">
		<view class="warehouse-category-tabs__tabs">
			<view
				v-for="(item, index) in tabs"
				:key="item.id || index"
				class="warehouse-category-tabs__tab"
				:class="{ 'warehouse-category-tabs__tab--active': modelValue === index }"
				@tap="handleTabClick(index, item)"
			>
				<text class="warehouse-category-tabs__label">{{ item.label }}<text class="warehouse-category-tabs__count">({{ item.count }})</text></text>
				<view class="warehouse-category-tabs__underline" />
			</view>
		</view>

		<view class="warehouse-category-tabs__vault" @tap="emit('vault-click')">
			<image class="warehouse-category-tabs__vault-icon" src="/static/icons/gift.png" mode="aspectFit" />
			<text class="warehouse-category-tabs__vault-text">{{ vaultLabel }}<text v-if="showVaultCount"> ({{ vaultCount }})</text></text>
			<text class="warehouse-category-tabs__vault-arrow">›</text>
		</view>
	</view>
</template>

<script setup>
defineOptions({
	name: 'WarehouseCategoryTabs'
})

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	},
	tabs: {
		type: Array,
		default: () => []
	},
	vaultLabel: {
		type: String,
		default: 'Thùng bảo mật'
	},
	vaultCount: {
		type: [String, Number],
		default: 0
	},
	showVaultCount: {
		type: Boolean,
		default: true
	}
})

const emit = defineEmits(['update:modelValue', 'change', 'vault-click'])

const handleTabClick = (index, item) => {
	if (props.modelValue === index) {
		return
	}

	emit('update:modelValue', index)
	emit('change', {
		index,
		item
	})
}
</script>

<style lang="scss" scoped>
.warehouse-category-tabs {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 32rpx 32rpx 24rpx;
	column-gap: 16rpx;
}

.warehouse-category-tabs__tabs {
	display: flex;
	align-items: center;
	column-gap: 28rpx;
	height: 46rpx;
	flex: 1;
	min-width: 0;
}

.warehouse-category-tabs__tab {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 10rpx;
	padding: 6rpx 0 12rpx;
	color: #a3a3a3;
}

.warehouse-category-tabs__label,
.warehouse-category-tabs__count {
	font-size: 32rpx;
	font-weight: 500;
	line-height: 1;
	color: inherit;
}

.warehouse-category-tabs__underline {
	width: 38rpx;
	height: 4rpx;
	border-radius: 999rpx;
	background: #ff7b22;
	opacity: 0;
}

.warehouse-category-tabs__tab--active {
	color: #222222;
}

.warehouse-category-tabs__tab--active .warehouse-category-tabs__underline {
	opacity: 1;
}

.warehouse-category-tabs__vault {
	height: 42rpx;
	padding: 0 12rpx;
	border-radius: 999rpx;
	background: #161616;
	display: inline-flex;
	align-items: center;
	column-gap: 8rpx;
	flex-shrink: 0;
	margin-bottom: 8rpx;
}

.warehouse-category-tabs__vault-icon {
	width: 30rpx;
	height: 30rpx;
	display: block;
}

.warehouse-category-tabs__vault-text,
.warehouse-category-tabs__vault-arrow {
	font-size: 18rpx;
	font-weight: 600;
	color: #ffffff;
	line-height: 1;
}
</style>
