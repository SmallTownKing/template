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

		<home-category-tabs v-model="currentTabIndex" @change="handleTabChange" />

		<view class="product-grid">
			<view class="product-grid__item" v-for="(item, index) in productList" :key="item.id || index">
				<home-product-card :item="item" @click="handleProductClick" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// === 响应式数据 ===
const currentTabIndex = ref(0)
const bannerList = ref([])
const headerList = ref([])
const productList = ref([{}, {}, {}, {}])

// === 交互事件 ===
const handleSectionClick = (payload) => {
	console.log('点击了快捷导航:', payload)
}

const handleProductClick = (item) => {
	console.log('点击了商品, 准备跳转详情页, ID:', item.id)
}

// 监听 Tab 切换，触发对应分类的商品请求
const handleTabChange = ({ index, item }) => {
	console.log('切换 Tab:', index, item)
	// 切换时先清空当前列表，让 product-card 触发骨架屏效果
	productList.value = []
	fetchProductList(index)
}

// === 模拟 API 网络请求 ===

// 1. 获取首页基础数据 (轮播图、头条等)
const fetchHomeBaseData = () => {
	setTimeout(() => {
		bannerList.value = [
			{ id: 1, image: 'https://img.showgo.gg/goodsCate/images/20250623/94d85d7694a9bdf3ea08a619d61ecccc.webp?v=1' },
			{ id: 2, image: 'https://img.showgo.gg/goodsCate/images/20250623/94d85d7694a9bdf3ea08a619d61ecccc.webp?v=1' },
			{ id: 3, image: 'https://img.showgo.gg/goodsCate/images/20250623/94d85d7694a9bdf3ea08a619d61ecccc.webp?v=1' }
		]

		headerList.value = [
			{ price: '100.00', name: '张三' },
			{ price: '200.00', name: '李四' },
			{ price: '300.00', name: '王五' }
		]
	}, 3000) // 模拟 300ms 延迟
}

// 2. 获取商品列表数据 (支持根据分类 ID 获取)
const fetchProductList = (categoryId = 0) => {
	productList.value = [{}, {}, {}, {}] // 切换分类时先置空，触发骨架屏效果
	setTimeout(() => {
		// 模拟后端返回的数据
		productList.value = [
			{
				id: 1,
				image: 'https://img.showgo.gg/goodsCate/images/20250623/94d85d7694a9bdf3ea08a619d61ecccc.webp?v=1',
				stock: '66716',
				title: categoryId === 0 ? 'Bút chì nhỏ Shin: Kịch tính cưỡi ngay' : `Sản phẩm danh mục ${categoryId}`,
				salesNum: '22418',
				salesText: 'đã bán trong 3 giờ gần đây',
				currency: 'RM',
				price: '0.89'
			},

		]
	}, 2000) // 模拟 600ms 延迟，展示骨架屏过程
}

// 页面挂载时初始化数据
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

	/* 简单的输入框占位样式，可根据实际组件替换 */
	&__search {
		width: 100%;
		height: 60rpx;
		background-color: #f0f2f5;
		border-radius: 30rpx;
		padding: 0 24rpx;
		font-size: 26rpx;
	}
}

/* 完美复刻你原来的间距，但改用更稳健的 Grid 网格布局 */
.product-grid {
	display: grid;
	/* 声明两列，每列等宽 */
	grid-template-columns: repeat(2, 1fr);
	/* 行间距 20rpx，列间距 22rpx */
	gap: 20rpx 22rpx;
	/* 整体的外边距 */
	padding: 32rpx;

	&__item {
		/* Grid 布局下子元素会自动占满列宽，无需再写死 width: 332rpx */
		width: 100%;
	}
}
</style>