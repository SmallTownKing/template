import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthPopupStore = defineStore('auth-popup', () => {
	const visible = ref(false)
	const reason = ref('')
	const source = ref('')
	const payload = ref(null)

	const open = (options = {}) => {
		visible.value = true
		reason.value = options.reason || ''
		source.value = options.source || ''
		payload.value = options.payload || null
	}

	const close = () => {
		visible.value = false
		reason.value = ''
		source.value = ''
		payload.value = null
	}

	return {
		visible,
		reason,
		source,
		payload,
		open,
		close
	}
})
