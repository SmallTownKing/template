import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const createInitialUserAccount = () => ({
	balance: '',
	integralBalance: ''
})

const getTokenFromUserInfo = (userInfo) => {
	if (!userInfo || typeof userInfo !== 'object') {
		return ''
	}

	return userInfo.token || ''
}

const resolveAuthToken = (userInfo, token) => {
	return getTokenFromUserInfo(userInfo)  || token || ''
}

export const useAppStore = defineStore(
	'app',
	() => {
		const locale = ref('')
		const token = ref('')
		const userInfo = ref(null)
		const userAccount = ref(createInitialUserAccount())

		const authToken = computed(() => {
			return resolveAuthToken(userInfo.value,  token.value)
		})

		const isLogin = computed(() => {
			return Boolean(authToken.value)
		})

		const syncTokenToProfile = (nextToken) => {
			if (userInfo.value && typeof userInfo.value === 'object') {
				userInfo.value = {
					...userInfo.value,
					token: nextToken
				}
			}
		}

		const setLocale = (value) => {
			locale.value = value || ''
		}

		const setUserAccount = (value) => {
			userAccount.value = {
				...createInitialUserAccount(),
				...(value || {})
			}
		}

		const patchUserAccount = (value) => {
			const nextValue = value && typeof value === 'object' ? value : {}
			userAccount.value = {
				...createInitialUserAccount(),
				...(userAccount.value || {}),
				...nextValue
			}
		}

		const setToken = (value) => {
			const nextToken = value || ''
			token.value = nextToken
			syncTokenToProfile(nextToken)
		}

		const setUserInfo = (value) => {
			const nextUserInfo = value || null
			const nextToken = getTokenFromUserInfo(nextUserInfo)

			userInfo.value = nextUserInfo

			if (nextToken) {
				token.value = nextToken
			}
		}

		const patchUserInfo = (value) => {
			const nextValue = value && typeof value === 'object' ? value : {}
			const nextToken = getTokenFromUserInfo(nextValue)

			userInfo.value = {
				...(userInfo.value || {}),
				...nextValue
			}

			if (nextToken) {
				token.value = nextToken
			}
		}

		const setProfile = (value) => {
			const nextProfile = value || null
			const nextToken = getTokenFromUserInfo(nextProfile)

			userInfo.value = nextProfile

			if (nextToken) {
				token.value = nextToken
			}
		}

		const patchProfile = (value) => {
			const nextValue = value && typeof value === 'object' ? value : {}
			const nextToken = getTokenFromUserInfo(nextValue)

			userInfo.value = {
				...(userInfo.value || {}),
				...nextValue
			}

			if (nextToken) {
				token.value = nextToken
			}
		}

		const setUserSnapshot = (payload = {}) => {
			if (Object.prototype.hasOwnProperty.call(payload, 'token')) {
				setToken(payload.token)
			}

			if (Object.prototype.hasOwnProperty.call(payload, 'userInfo')) {
				setUserInfo(payload.userInfo)
			}

			if (Object.prototype.hasOwnProperty.call(payload, 'userAccount')) {
				setUserAccount(payload.userAccount)
			}
		}

		const patchUserSnapshot = (payload = {}) => {
			if (Object.prototype.hasOwnProperty.call(payload, 'token')) {
				setToken(payload.token)
			}

			if (payload.userInfo && typeof payload.userInfo === 'object') {
				patchUserInfo(payload.userInfo)
			}

			if (payload.userAccount && typeof payload.userAccount === 'object') {
				patchUserAccount(payload.userAccount)
			}
		}

		const logout = () => {
			token.value = ''
			userInfo.value = null
			userAccount.value = createInitialUserAccount()
		}

		return {
			userAccount,
			locale,
			token,
			userInfo,
			authToken,
			isLogin,
			setUserAccount,
			patchUserAccount,
			setLocale,
			setToken,
			setUserInfo,
			patchUserInfo,
			setProfile,
			patchProfile,
			setUserSnapshot,
			patchUserSnapshot,
			logout
		}
	},
	{
		persist: {
			key: 'store:app',
			split: true,
			paths: [
				{
					path: 'locale',
					key: 'locale',
					legacyKeys: ['store:app:locale'],
					raw: true
				},
				{
					path: 'token',
					key: 'token',
					legacyKeys: ['store:app:token'],
					raw: true
				},
				{
					path: 'userInfo',
					key: 'userInfo',
					legacyKeys: ['store:app:userInfo']
				},
				{
					path: 'userAccount',
					key: 'userAccount',
					legacyKeys: ['store:app:userAccount']
				}
			]
		}
	}
)
