<template>
	<view class="home-page">
		<base-navbar></base-navbar>
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
	min-height:  calc(100vh - var(--window-bottom));
}

</style>