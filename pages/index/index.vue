<template>
	<base-page-shell>
		<view class="home-page">
			<base-navbar left-width="294rpx" right-width="376rpx" shadow @ready="handleNavbarReady">
				<template #left>
					<image class="home-page__logo" src="/static/background/home-head.png" mode="aspectFit" />
				</template>
				<template #right>
					<view class="home-page__actions">
						<view class="home-page__language-trigger" @tap.stop="toggleLanguageDropdown">
							<image class="home-page__language-icon" :src="currentLocaleIcon" mode="aspectFit" />
						</view>
						<view v-if="!isLogin" class="home-page__auth-button" @tap="handleAuthTap">
							<text class="home-page__auth-text">{{ t('home_011') }}</text>
						</view>
					</view>
				</template>
			</base-navbar>
			<home-language-dropdown :show="isLanguageDropdownVisible" :top="navbarHeight" :locales="supportedLocales"
				:current-locale="locale" @close="closeLanguageDropdown" @select="handleLocaleSelect" />
			<home-hero-banner :list="bannerList" />
			<home-shortcut-grid :loading="loading" @click="handleSectionClick" />
			<home-section-header :list="headerList" />
			<home-category-tabs v-model="currentTabIndex" :loading="loading" @ready="handleTabReady"
				@change="handleTabChange" />
			<view class="product-grid">
				<view v-for="(item, index) in productList" :key="item.id || index" class="product-grid__item">
					<home-product-card :item="item" @click="handleProductClick(item)" />
				</view>
			</view>
			<base-load-status v-if="productList.every(item => item.id)" status="finished" />
		</view>
	</base-page-shell>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { onHide, onShow, onUnload } from '@dcloudio/uni-app'
import { useAppI18n } from '@/i18n'
import { useAppStore, useAuthPopupStore } from '@/stores'
import { getList, getUserDrawLog, getBoxData } from '@/apis/home'
import { adaptScheduleBanner, adaptHeaderList, adaptProductList } from './adapter'
import { createHomeSocketEntry } from './socket'

const { locale, setLocale, supportedLocales, t } = useAppI18n()
const appStore = useAppStore()
const authPopupStore = useAuthPopupStore()
const currentTabIndex = ref(0)
const bannerList = ref([])
const headerList = ref([])
const productList = ref([{}, {}, {}, {}])
const loading = ref(true)
const navbarHeight = ref(88)
const isLanguageDropdownVisible = ref(false)
const currentCategoryId = ref(0)
const localeIconMap = {
	'zh-Hans': '/static/lanuage/zh.webp',
	en: '/static/lanuage/en.webp',
	vi: '/static/lanuage/ms.webp'
}

const currentLocaleIcon = computed(() => {
	return localeIconMap[locale.value] || localeIconMap['zh-Hans']
})

const isLogin = computed(() => appStore.isLogin)

const homeSocket = createHomeSocketEntry({
	getCurrentCategoryId: () => currentCategoryId.value,
	onBannerUpdate: (payload) => {
		bannerList.value = adaptScheduleBanner(payload)
	},
	onHeaderUpdate: (payload) => {
		headerList.value = adaptHeaderList(payload)
	},
	onProductUpdate: (payload, meta = {}) => {
		const payloadCategoryId = Number(meta.categoryId || 0)

		if (payloadCategoryId && payloadCategoryId !== currentCategoryId.value) {
			return
		}

		productList.value = adaptProductList(payload)
	}
})

const handleNavbarReady = (payload) => {
	navbarHeight.value = payload.totalHeight || 88
}

const toggleLanguageDropdown = () => {
	isLanguageDropdownVisible.value = !isLanguageDropdownVisible.value
}

const closeLanguageDropdown = () => {
	isLanguageDropdownVisible.value = false
}

const handleLocaleSelect = (item) => {
	if (item?.code) {
		setLocale(item.code)
	}

	closeLanguageDropdown()
}

const handleSectionClick = () => { }

const handleAuthTap = () => {
	authPopupStore.open({
		source: 'home-auth-button'
	})
}

const handleProductClick = (item) => {
	if (!appStore.isLogin) {
		return authPopupStore.open({
			source: 'home-auth-button'
		})
	}
	uni.navigateTo({ url: '/pages/lottery/index?id=' + item.id })
}

const handleTabReady = ({ index, item }) => {
	currentTabIndex.value = index
	currentCategoryId.value = Number(item?.id || 0)
}

const handleTabChange = ({ index, item }) => {
	currentTabIndex.value = index
	currentCategoryId.value = Number(item?.id || 0)
	fetchProductList(item?.id)
}

const initData = () => {
	loading.value = true
	bannerList.value = []
	headerList.value = []
	productList.value = [{}, {}, {}, {}]

	Promise.all([getList(), getBoxData({ category_id: currentCategoryId.value }), getUserDrawLog()])
		.then(([listRes, boxDataRes, userDrawLogRes]) => {
			loading.value = false
			bannerList.value = adaptScheduleBanner(listRes)
			headerList.value = adaptHeaderList(userDrawLogRes)
			productList.value = adaptProductList(boxDataRes)
		})
		.catch((error) => {
			loading.value = false
			console.error('Error fetching home data:', error)
		})
}

const fetchProductList = (categoryId = currentCategoryId.value) => {
	const nextCategoryId = Number(categoryId || 0)

	if (!nextCategoryId) {
		productList.value = []
		return
	}

	productList.value = [{}, {}, {}, {}]
	getBoxData({ category_id: nextCategoryId })
		.then((response) => {
			productList.value = adaptProductList(response)
		})
		.catch((error) => {
			productList.value = []
			console.error('Error fetching product list:', error)
		})
}

watch(
	() => currentCategoryId.value,
	(nextCategoryId) => {
		homeSocket.updateCategory(nextCategoryId)
	}
)

onMounted(() => {
	initData()
})

onShow(() => {
	homeSocket.connect()
})

onHide(() => {
	homeSocket.disconnect()
})

onUnload(() => {
	homeSocket.disconnect()
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

	&__language-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64rpx;
		height: 64rpx;
		border-radius: 14rpx;
		background: #ffffff;
		box-shadow: 0 8rpx 20rpx rgba(15, 23, 42, 0.06);
	}

	&__language-icon {
		width: 32px;
		height: 30px;
		display: block;
	}

	&__actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 24rpx;
		width: 100%;
	}

	&__auth-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 126rpx;
		height: 30px;
		padding: 0 10rpx;
		border-radius: 6rpx;
		background: #101010;
	}

	&__auth-text {
		font-size: 22rpx;
		font-weight: 600;
		line-height: 1;
		color: #ffffff;
		white-space: nowrap;
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
