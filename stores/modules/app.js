import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const getTokenFromUserInfo = (userInfo) => {
	if (!userInfo || typeof userInfo !== 'object') {
		return ''
	}

	return userInfo.token || ''
}

const resolveAuthToken = (userInfo, profile, token) => {
	return getTokenFromUserInfo(userInfo) || getTokenFromUserInfo(profile) || token || ''
}

export const useAppStore = defineStore(
	'app',
	() => {
		const locale = ref('')
		const token = ref('')
		const userInfo = ref(null)
		const profile = ref(null)

		const authToken = computed(() => {
			return resolveAuthToken(userInfo.value, profile.value, token.value)
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

			if (profile.value && typeof profile.value === 'object') {
				profile.value = {
					...profile.value,
					token: nextToken
				}
			}
		}

		const setLocale = (value) => {
			locale.value = value || ''
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
			profile.value = nextUserInfo

			if (nextToken) {
				token.value = nextToken
			}
		}

		const setProfile = (value) => {
			const nextProfile = value || null
			const nextToken = getTokenFromUserInfo(nextProfile)

			profile.value = nextProfile
			userInfo.value = nextProfile

			if (nextToken) {
				token.value = nextToken
			}
		}

		const logout = () => {
			token.value = ''
			userInfo.value = null
			profile.value = null
		}

		return {
			locale,
			token,
			userInfo,
			profile,
			authToken,
			isLogin,
			setLocale,
			setToken,
			setUserInfo,
			setProfile,
			logout
		}
	},
	{
		persist: {
			key: 'store:app',
			paths: ['locale', 'token', 'userInfo', 'profile']
		}
	}
)
