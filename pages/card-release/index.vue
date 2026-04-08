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
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bannerList = ref([])

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
</style>