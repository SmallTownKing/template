<template>
	<view class="user-feature-grid">
		<view class="user-feature-grid__header">
			<text class="user-feature-grid__title">{{ pageState.features.title }}</text>
			<view class="user-feature-grid__action" @tap="handleActionTap">
				<view class="user-feature-grid__action-icon" />
				<text class="user-feature-grid__action-text">{{ pageState.features.actionText }}</text>
			</view>
		</view>

		<view class="user-feature-grid__list">
			<view
				v-for="item in pageState.features.items"
				:key="item.key"
				class="user-feature-grid__item"
				@tap="handleFeatureTap(item)"
			>
				<view class="user-feature-grid__icon-wrap">
					<image
						v-if="item.icon"
						class="user-feature-grid__icon-image"
						:src="item.icon"
						mode="aspectFit"
					/>
					<text v-else class="user-feature-grid__icon-text">{{ item.iconText || item.iconLabel || item.label?.slice(0, 1) }}</text>
				</view>
				<text class="user-feature-grid__label">{{ item.label }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { useUserCenterState } from '../user-center.shared'

defineOptions({
	name: 'UserFeatureGrid'
})

const { pageState, runProtectedAction } = useUserCenterState()

const handleActionTap = () => {
	runProtectedAction(() => {
		console.log('user feature action')
	}, 'feature-action')
}

const handleFeatureTap = (item) => {
	if (!item) {
		return
	}

	if (item.auth) {
		runProtectedAction(() => {
			console.log('user feature select', item)
		}, item.key)
		return
	}

	console.log('user feature select', item)
}
</script>

<style lang="scss" scoped>
.user-feature-grid__header {
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.user-feature-grid__title {
	font-size: 34rpx;
	font-weight: 700;
	line-height: 1;
	color: #111113;
}

.user-feature-grid__action {
	height: 48rpx;
	padding: 0 12rpx;
	border-radius: 4rpx;
	background: rgba(17, 17, 19, 0.05);
	display: inline-flex;
	align-items: center;
}

.user-feature-grid__action-icon {
	width: 22rpx;
	height: 18rpx;
	border: 2rpx solid #111113;
	border-radius: 3rpx;
	position: relative;
}

.user-feature-grid__action-icon::before {
	content: '';
	position: absolute;
	left: 50%;
	top: 50%;
	width: 8rpx;
	height: 2rpx;
	background: #111113;
	transform: translate(-50%, -50%);
}

.user-feature-grid__action-text {
	margin-left: 6rpx;
	font-size: 22rpx;
	line-height: 1;
	color: #111113;
}

.user-feature-grid__list {
	margin: 46rpx 10rpx 0;
	display: flex;
	flex-wrap: wrap;
	row-gap: 66rpx;
}

.user-feature-grid__item {
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.user-feature-grid__icon-wrap {
	width: 68rpx;
	height: 68rpx;
	border-radius: 20rpx;
	background: #ffffff;
	box-shadow: inset 0 0 0 2rpx rgba(17, 17, 19, 0.08);
	display: flex;
	align-items: center;
	justify-content: center;
}

.user-feature-grid__icon-image {
	width: 42rpx;
	height: 42rpx;
	display: block;
}

.user-feature-grid__icon-text {
	font-size: 28rpx;
	font-weight: 700;
	line-height: 1;
	color: #111113;
}

.user-feature-grid__label {
	margin-top: 22rpx;
	padding: 0 8rpx;
	min-height: 48rpx;
	font-size: 24rpx;
	line-height: 24rpx;
	color: #111113;
	text-align: center;
}
</style>
