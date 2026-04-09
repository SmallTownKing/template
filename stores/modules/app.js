import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		locale: '',
		token: '',
		profile: null
	}),
	getters: {
		isLogin: (state) => Boolean(state.token)
	},
	actions: {
		setLocale(locale) {
			this.locale = locale || ''
		},
		setToken(token) {
			this.token = token || ''
		},
		setProfile(profile) {
			this.profile = profile || null
		},
		logout() {
			this.token = ''
			this.profile = null
		}
	},
	persist: {
		key: 'store:app',
		paths: ['locale', 'token', 'profile']
	}
})
