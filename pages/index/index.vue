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

		<home-hero-banner :list="bannerList" />

		<home-shortcut-grid @click="handleSectionClick" />

		<home-section-header :list="headerList" />

		<home-category-tabs :loading="loading" v-model="currentTabIndex" @change="handleTabChange" />

		<view class="product-grid">
			<view class="product-grid__item" v-for="(item, index) in productList" :key="item.id || index">
				<home-product-card :item="item" @click="handleProductClick" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	const currentTabIndex = ref(0)
	const bannerList = ref([])
	const headerList = ref([])
	const productList = ref([{}, {}])
	const loading = ref(true)

	const handleSectionClick = (payload) => {
		console.log('点击了快捷导航:', payload)
	}

	const handleProductClick = (item) => {
		console.log('点击了商品, 准备跳转详情页, ID:', item.id)
	}

	const handleTabChange = ({
		index,
		item
	}) => {
		productList.value = []
		fetchProductList(index)
	}
	const fetchHomeBaseData = () => {
		setTimeout(() => {
			bannerList.value = [{
					id: 1,
					image: 'https://img.showgo.gg/brand/images/20260110/083c710596a74eed9945b0bf1b1b336f.webp'
				},
				{
					id: 2,
					image: 'https://img.showgo.gg/brand/images/20251031/b014b489cc4a5c5cfc360309022dc23a.webp'
				},
				{
					id: 3,
					image: 'https://img.showgo.gg/brand/images/20250818/43647e99a86d57f97c9967419ba7fb4f.webp'
				},
				{
					id: 4,
					image: 'https://img.showgo.gg/brand/images/20250812/9c56703fd4efe30f7634c597ff5eccf4.png'
				},
			]

			headerList.value = [{
					avatar: 'https://img.showgo.gg/storage/upload/user/d0d6aa60b1dc5d103835425ccef944bc_69c6787f88a59.jpg',
					price: '100.00',
					name: '张三',
					level: 1,
					prizeImg: 'https://img.showgo.gg/cards/4_66759.webp?x-oss-process=image/resize,p_30'
				},
				{
					avatar: 'https://img.showgo.gg/avatar1/default_21.webp',
					price: '200.00',
					name: '李四',
					level: 10,
					prizeImg: 'https://img.showgo.gg/cards/4_60186.webp?x-oss-process=image/resize,p_30'
				},
				{
					avatar: 'https://img.showgo.gg/avatar1/default_14.webp',
					price: '300.00',
					name: '王五',
					level: 21,
					prizeImg: 'https://img.showgo.gg/cards/4_66324.webp?x-oss-process=image/resize,p_30'
				}
			]

			loading.value = false
		}, 2000)
	}

	const fetchProductList = (categoryId = 0) => {
		productList.value = [{}, {}, ]
		setTimeout(() => {
			productList.value = [{
					id: 1,
					image: 'https://img.showgo.gg/goodsCate/images/20260104/f436244fc21021bc600e72021c7fac5e.webp?v=2026-03-17%2017:57:51',
					stock: '66716',
					title: categoryId === 0 ? 'Bút chì nhỏ Shin: Kịch tính cưỡi ngay' :
						`Sản phẩm danh mục ${categoryId}`,
					salesNum: '22418',
					salesText: 'đã bán trong 3 giờ gần đây',
					currency: 'RM',
					price: '0.89'
				},
				{
					id: 2,
					image: 'https://img.showgo.gg/goodsCate/images/20260104/f436244fc21021bc600e72021c7fac5e.webp?v=2026-03-17%2017:57:51',
					stock: '66716',
					title: categoryId === 0 ? 'Bút chì nhỏ Shin: Kịch tính cưỡi ngay' :
						`Sản phẩm danh mục ${categoryId}`,
					salesNum: '22418',
					salesText: 'đã bán trong 3 giờ gần đây',
					currency: 'RM',
					price: '0.89'
				},

			]
		}, 2000)
	}

	onMounted(() => {
		fetchHomeBaseData()
		fetchProductList(currentTabIndex.value)
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
</style>