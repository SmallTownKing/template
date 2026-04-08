<template>
	<view class="home-page">
		<base-navbar left-width="294rpx" right-width="376rpx" shadow>
			<template #left>
				<image class="home-page__logo" src="/static/images/home-head.png" mode="aspectFit" />
			</template>
			<template #right>
				<input class="home-page__search" placeholder="Tìm kiếm..." />
			</template>
		</base-navbar>
		<card-release-hero-banner :list="bannerList" />
		<card-release-income-panel style="margin-top: 34rpx;" />
		<card-release-tabs v-model="currentTab" />
		<view class="product-grid">
			<view class="product-grid__item" v-for="(item, index) in productList" :key="item.id || index">
				<card-release-product-card :item="item"/>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	const currentTab = ref(0)
	const bannerList = ref([])
	const productList = ref([{}, {}])
	const fetchHomeBaseData = () => {
		setTimeout(() => {
			bannerList.value = [{
				id: 1,
				image: 'https://showgo.gg/assets/top-bg-CZrL2P3h.webp'
			}, ]

			productList.value = [{
					id: 1,
					image: 'https://img.showgo.gg/goodsCate/images/20260104/f436244fc21021bc600e72021c7fac5e.webp?v=2026-03-17%2017:57:51',
					stock: '66716',
					title: 'Bút chì nhỏ Shin: Kịch tính cưỡi ngay',
					salesNum: '22418',
					salesText: 'đã bán trong 3 giờ gần đây',
					currency: 'RM',
					price: '0.89'
				},
				{
					id: 2,
					image: 'https://img.showgo.gg/goodsCate/images/20260104/f436244fc21021bc600e72021c7fac5e.webp?v=2026-03-17%2017:57:51',
					stock: '66716',
					title: 'Bút chì nhỏ Shin: Kịch tính cưỡi ngay',
					salesNum: '22418',
					salesText: 'đã bán trong 3 giờ gần đây',
					currency: 'RM',
					price: '0.89'
				}
			]
		}, 3000)
	}
	onMounted(() => {
		fetchHomeBaseData()
	})
</script>

<style lang="scss" scoped>
	.home-page {
		background-color: #f6f6fa;
		min-height: calc(100vh - var(--window-bottom));


		&__logo {
			width: 100%;
			height: 54rpx;
			display: block;
		}

		&__search {
			width: 100%;
			height: 60rpx;
			background-color: #f0f2f5;
			border-radius: 30rpx;
			padding: 0 24rpx;
			font-size: 26rpx;
		}

		.product-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx 22rpx;
			padding: 32rpx;

			&__item {
				width: 100%;
			}
		}
	}
</style>