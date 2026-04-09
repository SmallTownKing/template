import { defineStore } from 'pinia'

const createInitialState = () => ({
	visible: false,
	reason: '',
	source: '',
	payload: null
})

export const useAuthPopupStore = defineStore('auth-popup', {
	state: () => createInitialState(),
	actions: {
		open(options = {}) {
			this.visible = true
			this.reason = options.reason || ''
			this.source = options.source || ''
			this.payload = options.payload || null
		},
		close() {
			this.visible = false
			this.reason = ''
			this.source = ''
			this.payload = null
		}
	}
})
