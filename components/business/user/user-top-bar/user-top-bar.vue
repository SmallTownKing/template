<template>
	<view class="user-top-bar">
		<view class="user-top-bar__status" />
		<view v-if="$slots.default" class="user-top-bar__content">
			<slot />
		</view>
	</view>
</template>

<script setup>
defineOptions({
	name: 'UserTopBar'
})
</script>

<style lang="scss" scoped>
.user-top-bar {
	flex-shrink: 0;
}

.user-top-bar__status {
	height: var(--status-bar-height);
}

.user-top-bar__content {
	min-height: 24rpx;
	padding: 0 32rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
