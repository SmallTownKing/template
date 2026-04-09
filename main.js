import App from './App'
import i18nPlugin from './i18n'
import pinia from './stores'

import { createSSRApp } from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(pinia)
	app.use(i18nPlugin)
	return {
		app
	}
}
