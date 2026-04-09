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
		<home-language-dropdown :show="isLanguageDropdownVisible" :top="navbarHeight" :locales="supportedLocales"
			:current-locale="locale" @close="closeLanguageDropdown" @select="handleLocaleSelect" />
		<base-login ref="loginPopupRef" @submit="handleLoginSubmit" />
		<card-release-hero-banner :list="bannerList" />
		<card-release-income-panel :loading="loading" />
		<card-release-tabs v-model="currentTab" :loading="loading" />
		<view class="product-grid">
			<view class="product-grid__item" v-for="(item, index) in productList" :key="item.id || index">
				<card-release-product-card :item="item" />
			</view>
		</view>
	</view>
</template>

<script setup>
import {
	computed, onMounted, ref
} from 'vue'
import { useAppI18n } from '@/i18n'
import { useAppStore } from '@/stores'
import { adaptProductList, adaptScheduleBanner } from './adapter'
import { getBoxData } from '@/apis/card'

const currentTab = ref(0)
const bannerList = ref([])
const productList = ref([{}, {}])
const loading = ref(true)
const navbarHeight = ref(88)
const isLanguageDropdownVisible = ref(false)
const loginPopupRef = ref(null)
const { locale, setLocale, supportedLocales, t } = useAppI18n()
const appStore = useAppStore()
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

const handleLoginSubmit = (payload) => {
	passwordLogin({mobile: payload.phone, password: payload.password}).then(res => {
	})
}

const handleAuthTap = () => {
	loginPopupRef.value?.open()
}

const handleLocaleSelect = (item) => {
	if (item && item.code) {
		setLocale(item.code)
	}
	closeLanguageDropdown()
}
const initData = () => {
	loading.value = true
	bannerList.value = []
	productList.value = [{}, {}]
	const promises = [getBoxData()]
	Promise.all(promises)
		.then(([boxDataRes]) => {
			loading.value = false
			bannerList.value = adaptScheduleBanner({})
			productList.value = adaptProductList(boxDataRes)
		}).catch((error) => {
			loading.value = false
			console.error('Error fetching home data:', error)
		})
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