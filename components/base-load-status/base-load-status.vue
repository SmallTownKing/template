<template>
	<view v-if="isVisible" class="base-load-status" :class="[`base-load-status--${status}`]">
		<slot v-if="status === 'loading'" name="loading">
			<view class="base-load-status__loading">
				<view class="base-load-status__dots" :style="dotsStyle">
					<view class="base-load-status__dot base-load-status__dot--first" />
					<view class="base-load-status__dot base-load-status__dot--second" />
					<view class="base-load-status__dot base-load-status__dot--third" />
				</view>
				<text class="base-load-status__loading-text">{{ loadingText }}</text>
			</view>
		</slot>

		<slot v-else-if="status === 'empty'" name="empty">
			<view class="base-load-status__empty" :style="emptyContainerStyle">
				<image v-if="emptyImage" class="base-load-status__empty-image" :src="emptyImage" mode="aspectFit"
					:style="emptyImageStyle" />
				<text class="base-load-status__empty-text">{{ emptyText }}</text>
			</view>
		</slot>

		<slot v-else-if="status === 'finished'" name="finished">
			<view class="base-load-status__finished">
				<view class="base-load-status__finished-line" />
				<text class="base-load-status__finished-text">{{ finishedText }}</text>
				<view class="base-load-status__finished-line" />
			</view>
		</slot>
	</view>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
	name: 'BaseLoadStatus'
})

const toRpxUnit = (value, fallback = '') => {
	if (value === null || value === undefined || value === '') {
		return fallback
	}

	if (typeof value === 'number') {
		return `${value}rpx`
	}

	const normalized = String(value).trim()
	return normalized || fallback
}

const props = defineProps({
	status: {
		type: String,
		default: 'hidden'
	},
	loadingText: {
		type: String,
		default: '\u52A0\u8F7D\u4E2D...'
	},
	finishedText: {
		type: String,
		default: '\u5230\u5E95\u4E86'
	},
	emptyText: {
		type: String,
		default: '\u6682\u65E0\u6570\u636E'
	},
	emptyImage: {
		type: String,
		default: '/static/images/empty-state-box.svg'
	},
	emptyImageWidth: {
		type: [String, Number],
		default: 240
	},
	emptyImageHeight: {
		type: [String, Number],
		default: 180
	},
	emptyPaddingTop: {
		type: [String, Number],
		default: 80
	},
	loadingSize: {
		type: [String, Number],
		default: 24
	}
})

const isVisible = computed(() => {
	return props.status !== 'hidden' && props.status !== ''
})

const dotsStyle = computed(() => {
	const size = toRpxUnit(props.loadingSize, '24rpx')

	return {
		height: size
	}
})

const emptyImageStyle = computed(() => {
	return {
		width: toRpxUnit(props.emptyImageWidth, '240rpx'),
		height: toRpxUnit(props.emptyImageHeight, '180rpx')
	}
})

const emptyContainerStyle = computed(() => {
	return {
		paddingTop: toRpxUnit(props.emptyPaddingTop, '80rpx')
	}
})
</script>

<style lang="scss" scoped>
.base-load-status {
	width: 100%;
	box-sizing: border-box;
}

.base-load-status__loading,
.base-load-status__finished,
.base-load-status__empty {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	column-gap: 16rpx;
}

.base-load-status__loading {
	padding: 20rpx 0;
}

.base-load-status__dots {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 10rpx;
}

.base-load-status__dot {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background: #ff6b00;
	opacity: 0.28;
	animation: base-load-status-dot 1s ease-in-out infinite;
}

.base-load-status__dot--second {
	animation-delay: 0.16s;
}

.base-load-status__dot--third {
	animation-delay: 0.32s;
}

.base-load-status__loading-text {
	font-size: 24rpx;
	color: #a0a7b4;
}

.base-load-status__finished {
	gap: 20rpx;
	padding: 20rpx 0;
}

.base-load-status__finished-line {
	width: 64rpx;
	height: 2rpx;
	background: #d9dde5;
	border-radius: 999rpx;
}

.base-load-status__finished-text {
	font-size: 24rpx;
	color: #a0a7b4;
	line-height: 1;
}

.base-load-status__empty {
	flex-direction: column;
	padding-bottom: 48rpx;
}

.base-load-status__empty-image {
	display: block;
}

.base-load-status__empty-text {
	margin-top: 20rpx;
	font-size: 26rpx;
	color: #a0a7b4;
	line-height: 1.4;
	text-align: center;
}

@keyframes base-load-status-dot {
	0%,
	80%,
	100% {
		opacity: 0.28;
		transform: translateY(0) scale(0.9);
	}

	40% {
		opacity: 1;
		transform: translateY(-6rpx) scale(1);
	}
}
</style>
