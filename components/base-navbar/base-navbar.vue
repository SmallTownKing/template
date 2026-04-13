<template>
	<view class="base-navbar">
		<view v-if="fixed && placeholder" class="base-navbar__placeholder" :style="placeholderStyle" />
		<view class="base-navbar__wrap" :class="wrapClasses" :style="[wrapStyleObject, customStyle]">
			<view class="base-navbar__background" :style="backgroundStyleObject" />
			<view class="base-navbar__background-slot">
				<slot name="background" />
			</view>
			<view v-if="safeAreaTop" class="base-navbar__status-bar" :style="statusBarStyle" />
			<view class="base-navbar__main" :class="mainClasses" :style="[mainStyleObject, contentStyle]">
				<view class="base-navbar__side base-navbar__side--left" :style="[leftSideStyleObject, leftStyle]"
					@tap="handleLeftClick">
					<slot name="left">
						<view v-if="hasDefaultLeft" class="base-navbar__action">
							<image v-if="showBackArrow" src="/static/icons/back.png"
								style="width: 40rpx; height: 40rpx;" mode="scaleToFill" />
							<!-- <text v-else-if="leftIcon" class="base-navbar__icon-text" :style="leftIconStyleObject">
								{{ leftIcon }}
							</text>
							<text v-if="leftLabel" class="base-navbar__action-text" :style="leftTextStyleObject">
								{{ leftLabel }}
							</text> -->
						</view>
					</slot>
				</view>
				<view v-if="showCenterArea" class="base-navbar__center"
					:class="{ 'base-navbar__center--left': titleAlign === 'left' }" :style="centerStyleObject"
					@tap="handleTitleClick">
					<slot name="title">
						<view class="base-navbar__title-group"
							:class="{ 'base-navbar__title-group--left': titleAlign === 'left' }">
							<text v-if="title" class="base-navbar__title" :style="[titleStyleObject, titleStyle]">
								{{ title }}
							</text>
							<text v-if="subtitle" class="base-navbar__subtitle"
								:style="[subtitleStyleObject, subtitleStyle]">
								{{ subtitle }}
							</text>
						</view>
					</slot>
				</view>
				<view class="base-navbar__side base-navbar__side--right" :style="[rightSideStyleObject, rightStyle]"
					@tap="handleRightClick">
					<slot name="right">
						<view v-if="hasDefaultRight" class="base-navbar__action base-navbar__action--right">
							<text v-if="rightText" class="base-navbar__action-text" :style="rightTextStyleObject">
								{{ rightText }}
							</text>
							<text v-if="rightIcon" class="base-navbar__icon-text" :style="rightIconStyleObject">
								{{ rightIcon }}
							</text>
						</view>
					</slot>
				</view>
			</view>
			<view v-if="hasBottomSlot" class="base-navbar__bottom">
				<view class="base-navbar__bottom-inner" :style="[bottomStyleObject, bottomStyle]">
					<slot name="bottom" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUpdated, onUnmounted, nextTick, useSlots, getCurrentInstance } from 'vue'

const props = defineProps({
	title: { type: String, default: '' },
	subtitle: { type: String, default: '' },
	fixed: { type: Boolean, default: true },
	placeholder: { type: Boolean, default: true },
	safeAreaTop: { type: Boolean, default: true },
	autoCapsuleHeight: { type: Boolean, default: true },
	useCapsuleSpace: { type: Boolean, default: true },
	autoNavigate: { type: Boolean, default: true },
	showLeft: { type: Boolean, default: true },
	leftMode: { type: String, default: 'auto' },
	leftText: { type: String, default: '' },
	leftIcon: { type: String, default: '' },
	homeText: { type: String, default: '首页' },
	rightText: { type: String, default: '' },
	rightIcon: { type: String, default: '' },
	showCenter: { type: Boolean, default: true },
	titleAlign: { type: String, default: 'center' },
	height: { type: [Number, String], default: 44 },
	paddingX: { type: [Number, String], default: 16 },
	centerPadding: { type: [Number, String], default: 12 },
	sideWidth: { type: [Number, String], default: 96 },
	leftWidth: { type: [Number, String], default: '' },
	rightWidth: { type: [Number, String], default: '' },
	contentMaxWidth: { type: [Number, String], default: '' },
	bottomHeight: { type: [Number, String], default: 0 },
	zIndex: { type: Number, default: 10 },
	background: { type: String, default: '#ffffff' },
	backgroundImage: { type: String, default: '' },
	backgroundOpacity: { type: Number, default: 1 },
	backgroundBlur: { type: [Number, String], default: 0 },
	showBorder: { type: Boolean, default: true },
	borderColor: { type: String, default: 'rgba(15, 23, 42, 0.08)' },
	shadow: { type: Boolean, default: false },
	shadowColor: { type: String, default: 'rgba(15, 23, 42, 0.08)' },
	titleColor: { type: String, default: '#111827' },
	subtitleColor: { type: String, default: '#6b7280' },
	leftColor: { type: String, default: '#111827' },
	rightColor: { type: String, default: '#111827' },
	titleSize: { type: [Number, String], default: 17 },
	subtitleSize: { type: [Number, String], default: 12 },
	actionSize: { type: [Number, String], default: 14 },
	titleWeight: { type: [Number, String], default: 600 },
	actionGap: { type: [Number, String], default: 8 },
	homePath: { type: String, default: '' },
	homeType: { type: String, default: 'reLaunch' },
	customClass: { type: String, default: '' },
	customStyle: { type: [String, Object], default: '' },
	contentStyle: { type: [String, Object], default: '' },
	titleStyle: { type: [String, Object], default: '' },
	subtitleStyle: { type: [String, Object], default: '' },
	leftStyle: { type: [String, Object], default: '' },
	rightStyle: { type: [String, Object], default: '' },
	bottomStyle: { type: [String, Object], default: '' }
})

const emit = defineEmits(['ready', 'left-click', 'right-click', 'title-click'])

const slots = useSlots()
const instance = getCurrentInstance()
const metrics = reactive({
	statusBarHeight: 0,
	menuHeight: 0,
	capsuleReserveWidth: 0,
	windowWidth: 0
})
const measuredHeight = ref(0)
let _measureTimer = null
let _resizeHandler = null

const toNumber = (value, fallback = 0) => {
	if (value === '' || value === null || value === undefined) return fallback
	const parsed = parseFloat(value)
	return Number.isNaN(parsed) ? fallback : parsed
}

const toCssUnit = (value, fallback = '0px') => {
	if (value === '' || value === null || value === undefined) return fallback
	if (typeof value === 'number') return `${value}px`
	const normalized = String(value).trim()
	if (!normalized) return fallback
	if (/^-?\d+(\.\d+)?$/.test(normalized)) return `${normalized}px`
	return normalized
}

const wrapClasses = computed(() => [
	props.customClass,
	{ 'base-navbar__wrap--fixed': props.fixed }
])

const hasLeftSlot = computed(() => Boolean(slots.left))
const hasBottomSlot = computed(() => Boolean(slots.bottom))
const hasTitleSlot = computed(() => Boolean(slots.title))
const hasDefaultRight = computed(() => !slots.right && Boolean(props.rightText || props.rightIcon))
const showCenterArea = computed(() => props.showCenter && (hasTitleSlot.value || props.title || props.subtitle))

const mainClasses = computed(() => ({
	'base-navbar__main--no-center': !showCenterArea.value
}))

const canGoBack = computed(() => {
	try {
		const pages = getCurrentPages()
		return Array.isArray(pages) && pages.length > 1
	} catch (error) {
		return false
	}
})

const resolvedLeftMode = computed(() => {
	if (!props.showLeft) return 'none'
	if (['back', 'home', 'text', 'none'].includes(props.leftMode)) return props.leftMode
	if (canGoBack.value) return 'back'
	if (props.homePath) return 'home'
	if (props.leftText || props.leftIcon) return 'text'
	return 'none'
})

const showBackArrow = computed(() => resolvedLeftMode.value === 'back' && !props.leftIcon)

const leftLabel = computed(() => {
	if (resolvedLeftMode.value === 'home') return props.leftText || props.homeText
	return props.leftText
})

const hasDefaultLeft = computed(() => {
	return !hasLeftSlot.value && resolvedLeftMode.value !== 'none' &&
		(showBackArrow.value || props.leftIcon || leftLabel.value || resolvedLeftMode.value === 'back')
})

const navBarHeight = computed(() => Math.max(toNumber(props.height, 44), props.autoCapsuleHeight ? metrics.menuHeight : 0))

const sideBaseWidth = computed(() => Math.max(toNumber(props.sideWidth, 96), props.useCapsuleSpace ? metrics.capsuleReserveWidth : 0))

const resolvedLeftWidth = computed(() => {
	if (props.leftWidth !== '' && props.leftWidth !== null && props.leftWidth !== undefined) return props.leftWidth
	if (props.titleAlign === 'center') return sideBaseWidth.value
	return props.sideWidth
})

const resolvedRightWidth = computed(() => {
	if (props.rightWidth !== '' && props.rightWidth !== null && props.rightWidth !== undefined) return props.rightWidth
	if (props.titleAlign === 'center') return sideBaseWidth.value
	return Math.max(toNumber(props.sideWidth, 96), props.useCapsuleSpace ? metrics.capsuleReserveWidth : 0)
})

const fallbackPlaceholderHeight = computed(() => {
	const segments = []
	if (props.safeAreaTop && metrics.statusBarHeight) {
		segments.push(`${metrics.statusBarHeight}px`)
	}
	segments.push(toCssUnit(navBarHeight.value))
	if (hasBottomSlot.value && toNumber(props.bottomHeight, 0) > 0) {
		segments.push(toCssUnit(props.bottomHeight))
	}
	return segments.length === 1 ? segments[0] : `calc(${segments.join(' + ')})`
})

const placeholderStyle = computed(() => ({
	height: measuredHeight.value ? `${measuredHeight.value}px` : fallbackPlaceholderHeight.value
}))

const wrapStyleObject = computed(() => {
	const style = { zIndex: props.zIndex, color: props.titleColor }
	if (props.fixed) {
		style.top = '0'
		style.left = '0'
		style.right = '0'
	}
	return style
})

const backgroundStyleObject = computed(() => {
	const style = { opacity: props.backgroundOpacity }
	if (props.background) style.background = props.background
	if (props.backgroundImage) {
		style.backgroundImage = `url(${props.backgroundImage})`
		style.backgroundSize = 'cover'
		style.backgroundPosition = 'center'
		style.backgroundRepeat = 'no-repeat'
	}
	if (toNumber(props.backgroundBlur, 0) > 0) {
		const blurValue = toCssUnit(props.backgroundBlur)
		style.backdropFilter = `blur(${blurValue})`
		style.webkitBackdropFilter = `blur(${blurValue})`
	}
	if (props.showBorder) style.borderBottom = `1px solid ${props.borderColor}`
	if (props.shadow) style.boxShadow = `0 12px 32px ${props.shadowColor}`
	return style
})

const statusBarStyle = computed(() => ({ height: `${metrics.statusBarHeight}px` }))

const mainStyleObject = computed(() => {
	const style = {
		height: toCssUnit(navBarHeight.value),
		paddingLeft: toCssUnit(props.paddingX, '16px'),
		paddingRight: toCssUnit(props.paddingX, '16px')
	}
	if (props.contentMaxWidth) {
		style.maxWidth = toCssUnit(props.contentMaxWidth)
		style.margin = '0 auto'
	}
	return style
})

const centerStyleObject = computed(() => ({
	paddingLeft: toCssUnit(props.centerPadding, '12px'),
	paddingRight: toCssUnit(props.centerPadding, '12px')
}))

const leftSideStyleObject = computed(() => ({
	width: toCssUnit(resolvedLeftWidth.value),
	color: props.leftColor
}))

const rightSideStyleObject = computed(() => ({
	width: toCssUnit(resolvedRightWidth.value),
	color: props.rightColor
}))

const backIconStyle = computed(() => ({
	borderLeftColor: props.leftColor,
	borderBottomColor: props.leftColor,
	marginRight: leftLabel.value ? toCssUnit(props.actionGap) : '0'
}))

const leftIconStyleObject = computed(() => ({
	fontSize: toCssUnit(props.actionSize),
	color: props.leftColor,
	marginRight: leftLabel.value ? toCssUnit(props.actionGap) : '0'
}))

const leftTextStyleObject = computed(() => ({
	fontSize: toCssUnit(props.actionSize),
	color: props.leftColor
}))

const rightTextStyleObject = computed(() => ({
	fontSize: toCssUnit(props.actionSize),
	color: props.rightColor,
	marginRight: props.rightIcon && props.rightText ? toCssUnit(props.actionGap) : '0'
}))

const rightIconStyleObject = computed(() => ({
	fontSize: toCssUnit(props.actionSize),
	color: props.rightColor
}))

const titleStyleObject = computed(() => ({
	color: props.titleColor,
	fontSize: toCssUnit(props.titleSize),
	fontWeight: String(props.titleWeight)
}))

const subtitleStyleObject = computed(() => ({
	color: props.subtitleColor,
	fontSize: toCssUnit(props.subtitleSize)
}))

const bottomStyleObject = computed(() => {
	const style = {
		paddingLeft: toCssUnit(props.paddingX, '16px'),
		paddingRight: toCssUnit(props.paddingX, '16px')
	}
	if (toNumber(props.bottomHeight, 0) > 0) style.minHeight = toCssUnit(props.bottomHeight)
	if (props.contentMaxWidth) {
		style.maxWidth = toCssUnit(props.contentMaxWidth)
		style.margin = '0 auto'
	}
	return style
})

// 方法
const emitReady = () => {
	const totalHeight = measuredHeight.value || navBarHeight.value + (props.safeAreaTop ? metrics.statusBarHeight : 0)
	emit('ready', {
		statusBarHeight: metrics.statusBarHeight,
		navBarHeight: navBarHeight.value,
		capsuleReserveWidth: metrics.capsuleReserveWidth,
		totalHeight
	})
}

const measureNavbar = () => {
	nextTick(() => {
		// 直接使用 instance 内部实例，不使用 instance.proxy
		const query = uni.createSelectorQuery && uni.createSelectorQuery().in(instance)
		if (!query) {
			emitReady()
			return
		}

		query.select('.base-navbar__wrap')
			.boundingClientRect((rect) => {
				if (rect && rect.height) {
					const nextHeight = Math.ceil(rect.height)
					if (nextHeight !== measuredHeight.value) {
						measuredHeight.value = nextHeight
					}
				}
				emitReady()
			})
			.exec()
	})
}

const scheduleMeasure = () => {
	clearTimeout(_measureTimer)
	_measureTimer = setTimeout(() => {
		measureNavbar()
	}, 16)
}

const updateSystemMetrics = () => {
	let systemInfo = {}
	let menuRect = null

	try {
		systemInfo = uni.getSystemInfoSync ? uni.getSystemInfoSync() : {}
	} catch (error) {
		systemInfo = {}
	}

	try {
		if (typeof uni.getMenuButtonBoundingClientRect === 'function') {
			const rect = uni.getMenuButtonBoundingClientRect()
			if (rect && rect.width && rect.height) {
				menuRect = rect
			}
		}
	} catch (error) {
		menuRect = null
	}

	const statusBarHeight = Number(systemInfo.statusBarHeight || 0)
	const windowWidth = Number(systemInfo.windowWidth || systemInfo.screenWidth || 0)
	const menuHeight = menuRect ? Math.max(0, (menuRect.top - statusBarHeight) * 2 + menuRect.height) : 0
	const capsuleGap = menuRect ? Math.max(windowWidth - menuRect.right, 0) : 0
	const capsuleReserveWidth = menuRect ? menuRect.width + capsuleGap * 2 : 0

	metrics.statusBarHeight = statusBarHeight
	metrics.menuHeight = menuHeight
	metrics.capsuleReserveWidth = capsuleReserveWidth
	metrics.windowWidth = windowWidth
}

const refreshMetrics = () => {
	updateSystemMetrics()
	scheduleMeasure()
}

const getEventPayload = (source) => ({
	source,
	canGoBack: canGoBack.value,
	leftMode: resolvedLeftMode.value,
	metrics: {
		statusBarHeight: metrics.statusBarHeight,
		navBarHeight: navBarHeight.value,
		capsuleReserveWidth: metrics.capsuleReserveWidth,
		totalHeight: measuredHeight.value || navBarHeight.value + (props.safeAreaTop ? metrics.statusBarHeight : 0)
	}
})

const navigateHome = () => {
	if (!props.homePath) return
	const action = typeof uni[props.homeType] === 'function' ? props.homeType : 'reLaunch'
	uni[action]({
		url: props.homePath,
		fail: () => {
			if (action !== 'reLaunch' && typeof uni.reLaunch === 'function') {
				uni.reLaunch({ url: props.homePath })
			}
		}
	})
}

const handleLeftClick = () => {
	const payload = getEventPayload('left')
	emit('left-click', payload)

	if (!props.autoNavigate) return

	if (resolvedLeftMode.value === 'back') {
		if (canGoBack.value) {
			uni.navigateBack({ delta: 1 })
			return
		}
		if (props.homePath) navigateHome()
		return
	}

	if (resolvedLeftMode.value === 'home') navigateHome()
}

const handleRightClick = () => emit('right-click', getEventPayload('right'))
const handleTitleClick = () => emit('title-click', getEventPayload('title'))

const bindWindowResize = () => {
	if (typeof uni.onWindowResize !== 'function') return
	_resizeHandler = () => refreshMetrics()
	uni.onWindowResize(_resizeHandler)
}

const cleanup = () => {
	clearTimeout(_measureTimer)
	if (_resizeHandler && typeof uni.offWindowResize === 'function') {
		uni.offWindowResize(_resizeHandler)
	}
	_resizeHandler = null
}

// 生命周期
onMounted(() => {
	refreshMetrics()
	bindWindowResize()
})

onUpdated(() => {
	scheduleMeasure()
})

onUnmounted(() => {
	cleanup()
})
</script>

<style lang="scss" scoped>
.base-navbar {
	width: 100%;
}

.base-navbar__placeholder {
	width: 100%;
}

.base-navbar__wrap {
	position: relative;
	width: 100%;
	box-sizing: border-box;
}

.base-navbar__wrap--fixed {
	position: fixed;
}

.base-navbar__background,
.base-navbar__background-slot {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

.base-navbar__background-slot {
	overflow: hidden;
}

.base-navbar__status-bar,
.base-navbar__main,
.base-navbar__bottom {
	position: relative;
	z-index: 1;
}

.base-navbar__main {
	display: flex;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
}

.base-navbar__main--no-center .base-navbar__side--right {
	margin-left: auto;
}

.base-navbar__side {
	height: 100%;
	display: flex;
	align-items: center;
	overflow: hidden;
	flex-shrink: 0;
}

.base-navbar__side--left {
	justify-content: flex-start;
}

.base-navbar__side--right {
	justify-content: flex-end;
}

.base-navbar__center {
	flex: 1;
	min-width: 0;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	overflow: hidden;
}

.base-navbar__center--left {
	justify-content: flex-start;
}

.base-navbar__title-group {
	min-width: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.base-navbar__title-group--left {
	align-items: flex-start;
}

.base-navbar__title,
.base-navbar__subtitle,
.base-navbar__action-text,
.base-navbar__icon-text {
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.base-navbar__title {
	line-height: 1.25;
}

.base-navbar__subtitle {
	line-height: 1.2;
	margin-top: 4px;
}

.base-navbar__action {
	min-width: 0;
	display: inline-flex;
	align-items: center;
}

.base-navbar__action--right {
	justify-content: flex-end;
}

.base-navbar__back-icon {
	width: 10px;
	height: 10px;
	border-left-width: 2px;
	border-left-style: solid;
	border-bottom-width: 2px;
	border-bottom-style: solid;
	box-sizing: border-box;
	transform: rotate(45deg);
	flex-shrink: 0;
}

.base-navbar__bottom {
	width: 100%;
}

.base-navbar__bottom-inner {
	position: relative;
	z-index: 1;
	width: 100%;
	box-sizing: border-box;
	padding-bottom: 12px;
}
</style>