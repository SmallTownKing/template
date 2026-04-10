<template>
	<view class="custom-banner">
		<block v-if="list && list.length > 1">
			<swiper class="swiper-container" autoplay circular :interval="5000" :duration="500" :current="currentIndex"
				@change="onSwiperChange">
				<swiper-item v-for="(item, index) in list" :key="index" @click="handleTap(item, index)">
					<image class="swiper-image" :src="item.image || item" mode="aspectFill" />
				</swiper-item>
			</swiper>
			<view class="indicator-container">
				<view v-for="(item, index) in list" :key="index" class="indicator-dot"
					:class="{ 'indicator-dot--active': currentIndex === index }"></view>
			</view>
		</block>
		<view class="single-container" v-else-if="list && list.length === 1" @click="handleTap(list[0], 0)">
			<image class="swiper-image" :src="list[0].image || list[0]" mode="aspectFill" />
		</view>
		<view class="skeleton-banner" v-else></view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const props = defineProps({
		list: {
			type: Array,
			default: () => []
		}
	})

	const emit = defineEmits(['change', 'click'])
	const currentIndex = ref(0)
	const onSwiperChange = (e) => {
		currentIndex.value = e.detail.current
		emit('change', currentIndex.value)
	}

	const handleTap = (item, index) => {
		emit('click', {
			item,
			index
		})
	}
</script>

<style lang="scss" scoped>
	.custom-banner {
		position: relative;
		width: 100%;
		height: 210rpx;
		margin-top: 32rpx;
		overflow: hidden;
		transform: translateY(0);

		.swiper-container,
		.single-container {
			width: 100%;
			height: 100%;

			.swiper-image {
				height: 100%;
				width: calc(100% - 64rpx);
				margin: 0 32rpx;
				display: block;
				border-radius: 12rpx;
			}
		}

		.indicator-container {
			position: absolute;
			right: 56rpx;
			bottom: 24rpx;
			display: flex;
			align-items: center;
			column-gap: 8rpx;
			z-index: 10;
		}

		.indicator-dot {
			width: 16rpx;
			height: 8rpx;
			background-color: rgba(255, 255, 255, 0.4);
			transform: skewX(-30deg);
			transition: all 0.3s ease-in-out;

			&--active {
				width: 36rpx;
				background-color: #ffffff;
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
			}
		}

		.skeleton-banner {
			height: 100%;
			width: calc(100% - 64rpx);
			margin: 0 32rpx;
			border-radius: 12rpx;
			background-color: #e0e0e0;
			animation: skeleton-pulse 1.5s ease-in-out infinite;
		}

		@keyframes skeleton-pulse {
			0% {
				opacity: 1;
			}

			50% {
				opacity: 0.5;
			}

			100% {
				opacity: 1;
			}
		}
	}
</style>