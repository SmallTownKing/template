<template>
	<base-page-shell>
		<view class="market-page">
			<view style="height: 224rpx;">
				<market-stataus-bar />
				<market-status-tabs v-model="currentTab" />
			</view>
			<scroll-view v-if="productList.length" scroll-y
				style="height: calc(100vh - 224rpx - var(--status-bar-height) - var(--window-bottom));">
				<view v-for="item, i in productList" :key="i"
					style="margin: 0 24rpx; padding-bottom: 24rpx; display: flex; flex-direction: column; row-gap: 24rpx;">
					<market-sale-card :dataInfo="item" />
				</view>
				<base-load-status status="finished" loadingText="" />
			</scroll-view>
			<view v-else
				style="display: flex; justify-content: center; align-items: center; height: calc(100vh - 224rpx - var(--status-bar-height) - var(--window-bottom));">
				<base-load-status status="loading" loadingText="" />
			</view>
		</view>
	</base-page-shell>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { saleList } from '@/apis/market'
import { adaptProductList } from './adapter'
const currentTab = ref(0)
const productList = ref([])

const initData = () => {
	productList.value = []

	Promise.all([saleList({ page: 1, limit: 10, status: 0 })])
		.then(([listRes]) => {
			productList.value = adaptProductList(listRes)
		})
		.catch((error) => {
			console.error('Error fetching home data:', error)
		})
}

onMounted(() => {
	initData()
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
