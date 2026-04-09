<template>
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
		<home-language-dropdown
			:show="isLanguageDropdownVisible"
			:top="navbarHeight"
			:locales="supportedLocales"
			:current-locale="locale"
			@close="closeLanguageDropdown"
			@select="handleLocaleSelect"
		/>
		<base-login ref="loginPopupRef" @submit="handleLoginSubmit" />
		<home-hero-banner :list="bannerList" />
		<home-shortcut-grid :loading="loading" @click="handleSectionClick" />
		<home-section-header :list="headerList" />
		<home-category-tabs v-model="currentTabIndex" :loading="loading" @change="handleTabChange" />
		<view class="product-grid">
			<view v-for="(item, index) in productList" :key="item.id || index" class="product-grid__item">
				<home-product-card :item="item" @click="handleProductClick" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAppI18n } from '@/i18n'
import { useAppStore } from '@/stores'
import { getList, getUserDrawLog, getBoxData, } from '@/apis/home'
import { passwordLogin } from '@/apis/user'
import { adaptScheduleBanner, adaptHeaderList, adaptProductList } from './adapter'

const { locale, setLocale, supportedLocales, t } = useAppI18n()
const appStore = useAppStore()
const currentTabIndex = ref(0)
const bannerList = ref([])
const headerList = ref([])
const productList = ref([{}, {}])
const loading = ref(true)
const navbarHeight = ref(88)
const isLanguageDropdownVisible = ref(false)
const loginPopupRef = ref(null)
const localeIconMap = {
	'zh-Hans': '/static/lanuage/zh.webp',
	en: '/static/lanuage/en.webp',
	vi: '/static/lanuage/ms.webp'
}
const currentLocaleIcon = computed(() => {
	return localeIconMap[locale.value] || localeIconMap['zh-Hans']
})

const isLogin = computed(() => appStore.isLogin)

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
	if (item && item.code) {
		setLocale(item.code)
	}
	closeLanguageDropdown()
}
const handleSectionClick = (payload) => {
	console.log('clicked shortcut section', payload)
}

const handleLoginSubmit = (payload) => {
	passwordLogin({mobile: payload.phone, password: payload.password}).then(res => {
	})
}

const handleAuthTap = () => {
	loginPopupRef.value?.open()
}

const handleProductClick = (item) => {
	console.log('clicked product, ready to navigate detail', item.id)
}

const handleTabChange = ({ index, item }) => {
	console.log(item)
	productList.value = []
	fetchProductList(index)
}

const initData = () => {
	loading.value = true
	bannerList.value = []
	headerList.value = []
	productList.value = [{}, {}]
	const promises = [getList(), getBoxData(), getUserDrawLog()]
	Promise.all(promises)
		.then(([listRes, boxDataRes, userDrawLogRes]) => {
			loading.value = false
			bannerList.value = adaptScheduleBanner(listRes)
			headerList.value = adaptHeaderList(userDrawLogRes)
			productList.value = adaptProductList(boxDataRes)
		}).catch((error) => {
			loading.value = false
			console.error('Error fetching home data:', error)
		})
}

const fetchHomeBaseData = () => {

}

const fetchProductList = (categoryId = 0) => {

}

onMounted(() => {
	initData()

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
		height:30px;
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
