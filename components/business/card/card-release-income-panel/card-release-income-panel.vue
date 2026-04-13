<template>
	<view class="reward-card">
		<image src="/static/background/card.png" class="reward-card__bg"></image>

		<block v-if="loading">
			<view class="reward-card__content">
				<view class="skeleton-title"></view>
				<view class="skeleton-value"></view>
			</view>
			<view class="skeleton-tag"></view>
		</block>

		<block v-else>
			<view class="reward-card__content">
				<view class="reward-card__title">
					<text class="title-text">{{ title }}</text>
				</view>
				<view class="reward-card__value">
					{{ value }}
				</view>
			</view>

			<view class="reward-card__tag" @click="handleTagClick">
				<text class="tag-icon">📊</text>
				<text class="tag-text">{{ tagText }}</text>
				<text class="tag-arrow">▶</text>
			</view>
		</block>
	</view>
</template>

<script setup>
	const props = defineProps({
		loading: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: 'Bình chọn điểm thưởng'
		},
		value: {
			type: [String, Number],
			default: '36.639.70'
		},
		tagText: {
			type: String,
			default: 'Bảng xếp hạng'
		}
	})

	const emit = defineEmits(['clickTag'])

	const handleTagClick = () => {
		emit('clickTag')
	}
</script>

<style lang="scss" scoped>
	.reward-card {
		position: relative;
		margin: 0 20rpx;
		height: 108rpx;
		background: #FFCE40;
		border-radius: 12rpx;
		padding: 30rpx 24rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		margin-top: 34rpx;

		&__bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 1;
			z-index: 0;
		}

		&__content {
			position: relative;
			z-index: 1;
			display: flex;
			flex-direction: column;
		}

		&__title {
			display: inline-flex;
			flex-direction: column;
			align-items: flex-start;
			margin-bottom: 8rpx;

			.title-text {
				font-size: 28rpx;
				color: #101010;
				height: 32rpx;
				line-height: 32rpx;
				font-weight: bold;
			}
		}

		&__value {
			font-size: 32rpx;
			font-weight: 900;
			color: #111111;
			line-height: 1;
			height: 38rpx;
		}

		/* 右上角黑色标签 */
		&__tag {
			position: absolute;
			top: 0;
			right: 0;
			background-color: #1A1A1A;
			/* 核心：左下角圆角，右上角跟随卡片圆角 */
			border-bottom-left-radius: 12rpx;
			display: flex;
			align-items: center;
			padding: 10rpx 16rpx;
			z-index: 2;

			/* 增加按压反馈 */
			&:active {
				background-color: #333333;
			}

			.tag-icon {
				font-size: 20rpx;
				margin-right: 8rpx;
				color: #FFFFFF;
			}

			.tag-text {
				font-size: 22rpx;
				color: #FFFFFF;
				margin-right: 6rpx;
			}

			.tag-arrow {
				font-size: 18rpx;
				color: #FFFFFF;
				transform: scaleY(1.2);
				/* 让箭头稍微拉长一点点，视需求调整 */
			}
		}

		/* ================= 骨架屏专属样式 ================= */
		.skeleton-title {
			width: 260rpx; /* 模拟标题长度 */
			height: 32rpx;
			background-color: rgba(0, 0, 0, 0.08); /* 配合黄色底图的深色半透明 */
			border-radius: 6rpx;
			margin-bottom: 8rpx;
			animation: skeleton-pulse 1.5s ease-in-out infinite;
		}

		.skeleton-value {
			width: 180rpx; /* 模拟数值长度 */
			height: 32rpx;
			background-color: rgba(0, 0, 0, 0.12);
			border-radius: 6rpx;
			margin-top: 6rpx;
			animation: skeleton-pulse 1.5s ease-in-out infinite;
		}

		.skeleton-tag {
			position: absolute;
			top: 0;
			right: 0;
			width: 180rpx; /* 模拟右上角标签宽度 */
			height: 48rpx;
			background-color: rgba(0, 0, 0, 0.15);
			border-bottom-left-radius: 12rpx;
			z-index: 2;
			animation: skeleton-pulse 1.5s ease-in-out infinite;
		}

		@keyframes skeleton-pulse {
			0% { opacity: 1; }
			50% { opacity: 0.4; }
			100% { opacity: 1; }
		}
	}
</style>
