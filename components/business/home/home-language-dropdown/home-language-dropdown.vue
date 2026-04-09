<template>
	<view
		v-if="renderPanel"
		class="home-language-dropdown"
		:class="{ 'home-language-dropdown--active': isActive }"
		:style="overlayStyle"
	>
		<view class="home-language-dropdown__mask" @tap="handleClose" />

		<view class="home-language-dropdown__panel" @tap.stop>
			<view
				v-for="item in normalizedLocales"
				:key="item.code"
				class="home-language-dropdown__option"
				:class="{ 'home-language-dropdown__option--active': item.code === currentLocale }"
				@tap="handleSelect(item)"
			>
				<text class="home-language-dropdown__label">{{ item.label || item.code }}</text>
				<view v-if="item.code === currentLocale" class="home-language-dropdown__check" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const TRANSITION_DURATION = 220

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	top: {
		type: [Number, String],
		default: 0
	},
	locales: {
		type: Array,
		default: () => []
	},
	currentLocale: {
		type: String,
		default: ''
	}
})

const emit = defineEmits(['close', 'select'])

const renderPanel = ref(props.show)
const isActive = ref(false)
let transitionTimer = null

const toCssUnit = (value, fallback = '0px') => {
	if (value === '' || value === null || value === undefined) {
		return fallback
	}

	if (typeof value === 'number') {
		return `${value}px`
	}

	const normalized = String(value).trim()
	if (!normalized) {
		return fallback
	}

	if (/^-?\d+(\.\d+)?$/.test(normalized)) {
		return `${normalized}px`
	}

	return normalized
}

const overlayStyle = computed(() => ({
	top: toCssUnit(props.top)
}))

const normalizedLocales = computed(() => {
	return props.locales.map((item) => ({
		code: item.code,
		label: item.label || item.code
	}))
})

const clearTransitionTimer = () => {
	if (!transitionTimer) {
		return
	}

	clearTimeout(transitionTimer)
	transitionTimer = null
}

watch(
	() => props.show,
	(nextValue) => {
		clearTransitionTimer()

		if (nextValue) {
			renderPanel.value = true
			setTimeout(() => {
				isActive.value = true
			}, 16)
			return
		}

		isActive.value = false
		transitionTimer = setTimeout(() => {
			renderPanel.value = false
			transitionTimer = null
		}, TRANSITION_DURATION)
	},
	{
		immediate: true
	}
)

onBeforeUnmount(() => {
	clearTransitionTimer()
})

const handleClose = () => {
	emit('close')
}

const handleSelect = (item) => {
	emit('select', item)
}
</script>

<style lang="scss" scoped>
.home-language-dropdown {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1200;
}

.home-language-dropdown__mask {
	position: absolute;
	inset: 0;
	background: rgba(17, 24, 39, 0.16);
	opacity: 0;
	transition: opacity 0.2s ease;
}

.home-language-dropdown__panel {
	position: relative;
	margin: 16rpx 12rpx 0;
	padding: 14rpx 14rpx 18rpx;
	border-radius: 20rpx;
	background: rgba(255, 255, 255, 0.98);
	box-shadow: 0 24rpx 72rpx rgba(15, 23, 42, 0.16);
	transform: translateY(-24rpx);
	opacity: 0;
	transition:
		transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
		opacity 0.22s ease;
	will-change: transform, opacity;
}

.home-language-dropdown--active {
	.home-language-dropdown__mask {
		opacity: 1;
	}

	.home-language-dropdown__panel {
		transform: translateY(0);
		opacity: 1;
	}
}

.home-language-dropdown__option {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 92rpx;
	padding: 0 28rpx;
	margin-top: 14rpx;
	border-radius: 16rpx;
	background: #f4f6fb;
}

.home-language-dropdown__option:first-child {
	margin-top: 0;
}

.home-language-dropdown__option--active {
	background: #eef2ff;
}

.home-language-dropdown__label {
	font-size: 30rpx;
	font-weight: 500;
	color: #334155;
}

.home-language-dropdown__check {
	width: 20rpx;
	height: 12rpx;
	margin-left: 18rpx;
	border-left: 4rpx solid #ff4d5a;
	border-bottom: 4rpx solid #ff4d5a;
	transform: rotate(-45deg) translateY(-2rpx);
	flex-shrink: 0;
}
</style>
