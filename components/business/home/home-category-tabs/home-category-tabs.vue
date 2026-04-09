<template>
	<view class="custom-tabs" style="position: relative;">
		<view class="fade-mask fade-mask--left" :class="{ 'is-show': showLeftMask && !loading }"></view>

		<scroll-view
			class="tabs-scroll"
			scroll-x
			:show-scrollbar="false"
			:scroll-with-animation="true"
			:scroll-into-view="'tab-' + modelValue"
			@scroll="onScroll"
		>
			<view class="tabs-wrapper">
				<block v-if="loading">
					<view v-for="i in 5" :key="i" class="tab-item skeleton-item">
						<view class="skeleton-content">
							<view class="skeleton-icon"></view>
							<view class="skeleton-text"></view>
						</view>
					</view>
				</block>

				<block v-else>
					<view
						v-for="(item, index) in list"
						:key="index"
						:id="'tab-' + index"
						class="tab-item"
						:class="{ 'tab-item--active': modelValue === index }"
						@click="handleTabClick(index, item)"
					>
						<view class="tab-item__content">
							<image
								v-if="item.icon"
								class="tab-item__icon"
								:src="modelValue === index ? (item.activeIcon || item.icon) : item.icon"
								mode="aspectFit"
								:style="{
									width: (item.iconWidth || 32) + 'rpx',
									height: (item.iconHeight || 32) + 'rpx',
									marginTop: (item.marginTop || 0) + 'rpx',
									marginRight: (item.marginRight !== undefined ? item.marginRight : 10) + 'rpx'
								}"
							/>
							<view class="tab-item__text-wrap">
								<text class="tab-item__text">{{ item.name }}</text>
								<view class="tab-item__line"></view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppI18n } from '@/i18n'

const { t } = useAppI18n()

const list = computed(() => [
	{ id: '1', name: t('home_006'), icon: '/static/images/tabs/1.png', activeIcon: '/static/images/tabs/1-orange.png', iconWidth: 50, iconHeight: 50, marginRight: -1 },
	{ id: '2', name: t('home_007'), icon: '/static/images/tabs/2.png', activeIcon: '/static/images/tabs/2-orange.png', iconWidth: 54, iconHeight: 54, marginRight: 4 },
	{ id: '3', name: t('home_008'), icon: '/static/images/tabs/3.png', activeIcon: '/static/images/tabs/3-orange.png', iconWidth: 66, iconHeight: 66, marginTop: 8, marginRight: -6 },
	{ id: '4', name: t('home_009'), icon: '/static/images/tabs/4.png', activeIcon: '/static/images/tabs/4-orange.png', iconWidth: 36, iconHeight: 36 },
	{ id: '5', name: t('home_010'), icon: '/static/images/tabs/5.png', activeIcon: '/static/images/tabs/5-orange.png', iconWidth: 40, iconHeight: 28 }
])

const props = defineProps({
	modelValue: { type: Number, default: 0 },
	loading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const showLeftMask = ref(false)

const onScroll = (e) => {
	if (props.loading) return
	showLeftMask.value = e.detail.scrollLeft > 10
}

const handleTabClick = (index, item) => {
	if (props.modelValue === index) return
	emit('update:modelValue', index)
	emit('change', { index, item })
}
</script>

<style lang="scss" scoped>
.custom-tabs {
	width: 100%;
	background-color: #f6f7f9;
	box-sizing: border-box;
}

.fade-mask {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 60rpx;
	z-index: 10;
	pointer-events: none;
	opacity: 0;
	transition: opacity 0.3s ease;

	&--left {
		left: 0;
		background: linear-gradient(to right, #f6f7f9 10%, rgba(246, 247, 249, 0) 100%);
	}

	&.is-show {
		opacity: 1;
	}
}

::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}

.tabs-scroll {
	width: 100%;
	white-space: nowrap;
}

.tabs-wrapper {
	display: inline-flex;
	align-items: center;
	height: 88rpx;
	padding: 0 12rpx;
	min-width: 100%;
}

.tab-item {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 16rpx;
	height: 100%;
	flex-shrink: 0;

	&__content {
		display: flex;
		align-items: center;
		height: 100%;
	}

	&__icon {
		flex-shrink: 0;
		display: block;
	}

	&__text-wrap {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	&__text {
		font-size: 28rpx;
		font-weight: bold;
		color: #8c8c8c;
		transition: color 0.2s ease;
		white-space: nowrap;
	}

	&__line {
		position: absolute;
		bottom: 8rpx;
		left: 50%;
		transform: translateX(-50%) scaleX(0);
		width: 40rpx;
		height: 6rpx;
		border-radius: 6rpx;
		background-color: #ff6b00;
		transition: transform 0.2s ease, opacity 0.2s ease;
		opacity: 0;
	}

	&--active {
		.tab-item__text {
			color: #111111;
		}

		.tab-item__line {
			transform: translateX(-50%) scaleX(1);
			opacity: 1;
		}
	}
}

.skeleton-item {
	pointer-events: none;
}

.skeleton-content {
	display: flex;
	align-items: center;
	height: 100%;
}

.skeleton-icon {
	width: 44rpx;
	height: 44rpx;
	border-radius: 50%;
	background-color: #e0e0e0;
	margin-right: 10rpx;
	animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-text {
	width: 80rpx;
	height: 32rpx;
	border-radius: 6rpx;
	background-color: #e0e0e0;
	animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
	0% {
		opacity: 0.8;
	}

	50% {
		opacity: 0.4;
	}

	100% {
		opacity: 0.8;
	}
}
</style>
