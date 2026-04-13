<template>
	<view class="warehouse-content-panel" :class="{ 'warehouse-content-panel--fill': fillAvailable }" :style="panelStyle">
		<view v-if="$slots.header" class="warehouse-content-panel__header">
			<slot name="header" />
		</view>

		<scroll-view
			v-if="scrollable"
			class="warehouse-content-panel__scroll"
			:class="{ 'warehouse-content-panel__scroll--fill': fillAvailable }"
			scroll-y
			:lower-threshold="lowerThreshold"
			@scrolltolower="emit('load-more')"
		>
			<view class="warehouse-content-panel__body" :class="{ 'warehouse-content-panel__body--fill': fillBody }">
				<slot />
			</view>
		</scroll-view>

		<view v-else class="warehouse-content-panel__body warehouse-content-panel__body--static">
			<slot />
		</view>
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
	},
	fillBody: {
		type: Boolean,
		default: false
	},
	fillAvailable: {
		type: Boolean,
		default: true
	},
	scrollable: {
		type: Boolean,
		default: true
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
}

.warehouse-content-panel--fill {
	min-height: 0;
	display: flex;
	flex-direction: column;
}

.warehouse-content-panel__header {
	flex-shrink: 0;
	background: #f6f6fa;
}

.warehouse-content-panel__scroll {
	height: auto;
}

.warehouse-content-panel__scroll--fill {
	flex: 1;
	height: 0;
	min-height: 0;
}

.warehouse-content-panel__body {
	padding: 0 20rpx;
}

.warehouse-content-panel__body--fill {
	min-height: 100%;
	display: flex;
	flex-direction: column;
}

.warehouse-content-panel__body--static {
	padding: 0 20rpx 20rpx;
}
</style>
