<template>
	<view class="warehouse-content-panel" :style="panelStyle">
		<view v-if="$slots.header" class="warehouse-content-panel__header">
			<slot name="header" />
		</view>

		<scroll-view
			class="warehouse-content-panel__scroll"
			scroll-y
			:lower-threshold="lowerThreshold"
			@scrolltolower="emit('load-more')"
		>
			<view class="warehouse-content-panel__body">
				<slot />
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
	name: 'WarehouseContentPanel'
})

const props = defineProps({
	minHeight: {
		type: [String, Number],
		default: ''
	},
	lowerThreshold: {
		type: Number,
		default: 80
	}
})

const emit = defineEmits(['load-more'])

const panelStyle = computed(() => {
	if (props.minHeight === '' || props.minHeight === null || props.minHeight === undefined) {
		return {}
	}

	if (typeof props.minHeight === 'number') {
		return {
			minHeight: `${props.minHeight}rpx`
		}
	}

	return {
		minHeight: String(props.minHeight)
	}
})
</script>

<style lang="scss" scoped>
.warehouse-content-panel {
	background: #f6f6fa;
	border-radius: 24rpx 24rpx 0 0;
	overflow: hidden;
	min-height: 0;
	display: flex;
	flex-direction: column;
}

.warehouse-content-panel__header {
	flex-shrink: 0;
	background: #f6f6fa;
}

.warehouse-content-panel__scroll {
	flex: 1;
	height: 0;
	min-height: 0;
}

.warehouse-content-panel__body {
	min-height: 100%;
	padding: 0 20rpx;
}
</style>
