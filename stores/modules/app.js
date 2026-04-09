import { defineStore } from 'pinia'

const getTokenFromUserInfo = (userInfo) => {
	if (!userInfo || typeof userInfo !== 'object') {
		return ''
	}

	return userInfo.token || ''
}

const resolveAuthToken = (state) => {
	return getTokenFromUserInfo(state.userInfo) || getTokenFromUserInfo(state.profile) || state.token || ''
}

export const useAppStore = defineStore('app', {
	state: () => ({
		locale: '',
		token: '',
		userInfo: null,
		profile: null
	}),
	getters: {
		authToken: (state) => resolveAuthToken(state),
		isLogin: (state) => Boolean(resolveAuthToken(state))
	},
	actions: {
		setLocale(locale) {
			this.locale = locale || ''
		},
		setToken(token) {
			const nextToken = token || ''
			this.token = nextToken

			if (this.userInfo && typeof this.userInfo === 'object') {
				this.userInfo = {
					...this.userInfo,
					token: nextToken
				}
			}

			if (this.profile && typeof this.profile === 'object') {
				this.profile = {
					...this.profile,
					token: nextToken
				}
			}
		},
		setUserInfo(userInfo) {
			const nextUserInfo = userInfo || null
			const nextToken = getTokenFromUserInfo(nextUserInfo)

			this.userInfo = nextUserInfo
			this.profile = nextUserInfo

			if (nextToken) {
				this.token = nextToken
			}
		},
		setProfile(profile) {
			const nextProfile = profile || null
			const nextToken = getTokenFromUserInfo(nextProfile)

			this.profile = nextProfile
			this.userInfo = nextProfile

			if (nextToken) {
				this.token = nextToken
			}
		},
		logout() {
			this.token = ''
			this.userInfo = null
			this.profile = null
		}
	},
	persist: {
		key: 'store:app',
		paths: ['locale', 'token', 'userInfo', 'profile']
	}
})
