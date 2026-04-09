<template>
	<view class="base-page-shell">
		<slot />
		<base-login
			:model-value="authPopupVisible"
			:phone="phone"
			@update:modelValue="handlePopupVisibleChange"
			@update:phone="handlePhoneChange"
			@submit="handleLoginSubmit"
		/>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { passwordLogin } from '@/apis/user'
import { useAppStore, useAuthPopupStore } from '@/stores'

defineOptions({
	name: 'BasePageShell'
})

const appStore = useAppStore()
const authPopupStore = useAuthPopupStore()
const phone = ref('')

const authPopupVisible = computed(() => authPopupStore.visible)

const handlePopupVisibleChange = (visible) => {
	if (visible) {
		authPopupStore.open({
			reason: authPopupStore.reason,
			source: authPopupStore.source,
			payload: authPopupStore.payload
		})
		return
	}

	authPopupStore.close()
}

const handlePhoneChange = (value) => {
	phone.value = value || ''
}

const handleLoginSubmit = async (payload) => {
	try {
		const response = await passwordLogin(
			{
				mobile: payload.phone,
				password: payload.password
			},
			{
				skipAuthPopup: true
			}
		)
		const token = response?.data?.token || ''
		const userInfo = response?.data?.userInfo || {}

		if (response?.code !== 200 || !token) {
			uni.showToast({
				title: response?.msg || 'Login failed',
				icon: 'none'
			})
			return
		}

		appStore.setUserInfo({
			...userInfo,
			token
		})
		authPopupStore.close()
		phone.value = ''
		uni.showToast({
			title: 'Login success',
			icon: 'none'
		})
	} catch (error) {
		uni.showToast({
			title: error?.msg || error?.message || 'Login failed',
			icon: 'none'
		})
	}
}
</script>

<style lang="scss" scoped>
.base-page-shell {
	min-height: inherit;
}
</style>
