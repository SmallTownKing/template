<template>
	<base-page-shell>
		<view class="market-page">
			<view style="height: 224rpx;">
				<market-stataus-bar />
				<market-status-tabs v-model="currentTab" />
			</view>
			<scroll-view scroll-y style="height: calc(100vh - 224rpx - var(--status-bar-height) - var(--window-bottom));">
			</scroll-view>
		</view>
	</base-page-shell>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref(0)
</script>

<style lang="scss">
.market-page {
	background-color: #f6f6fa;
	min-height: calc(100vh - var(--window-bottom));
	background-image: url('/static/background/market-bg.png');
	background-size: 100% 224rpx;
	background-repeat: no-repeat;
}
</style>
