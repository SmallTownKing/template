<template>
	<base-page-shell>
		<view class="market-page">
			<view style="height: 224rpx;">
				<market-stataus-bar />
				<market-status-tabs v-model="currentTab" />
			</view>
			<scroll-view scroll-y
				style="height: calc(100vh - 224rpx - var(--status-bar-height) - var(--window-bottom));">
				<view
					style="margin: 0 24rpx; padding-bottom: 24rpx; display: flex; flex-direction: column; row-gap: 24rpx;">
					<market-sale-card :dataInfo="cardData" />
				</view>
			</scroll-view>
		</view>
	</base-page-shell>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const currentTab = ref(0)
const cardData = ref({})

onMounted(() => {
	setTimeout(() => {
		cardData.value = {
			userInfo: {
				avatar: 'https://img.showgo.gg/avatar1/default_40.webp',
				username: 'SHOWGER 68217',
				level: '5',
				time: '09 Apr, 04:40:56 PM'
			},
			goodsList: [
				{ image: 'https://img.showgo.gg/cards/4_66376.webp', badgeType: 'lightning', quantity: 1 },
			],
			totalCount: 24,
			totalPrice: '120.00',
			currency: 'RM'
		}
	}, 1500)
})
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
