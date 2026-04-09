import { ref } from 'vue'
import en from './messages/en.json'
import vi from './messages/vi.json'
import zhHans from './messages/zh-Hans.json'
import {
	DEFAULT_LOCALE,
	I18N_STORAGE_KEY,
	LOCALE_ALIASES,
	SUPPORTED_LOCALES,
	TABBAR_I18N_ITEMS
} from './config'

const messages = {
	en,
	vi,
	'zh-Hans': zhHans
}

const localeState = ref(DEFAULT_LOCALE)
let tabBarSyncTimer = null
let tabBarRetryTimer = null

const supportedLocaleMap = SUPPORTED_LOCALES.reduce((result, item) => {
	result[item.code] = true
	return result
}, {})

const getByPath = (source, path) => {
	if (!source || !path) {
		return undefined
	}

	return String(path).split('.').reduce((result, segment) => {
		if (result && Object.prototype.hasOwnProperty.call(result, segment)) {
			return result[segment]
		}

		return undefined
	}, source)
}

const interpolate = (message, params = {}) => {
	if (typeof message !== 'string') {
		return message
	}

	return message.replace(/\{(\w+)\}/g, (match, key) => {
		return Object.prototype.hasOwnProperty.call(params, key) ? params[key] : match
	})
}

export const resolveLocale = (locale) => {
	if (!locale) {
		return DEFAULT_LOCALE
	}

	const normalized = String(locale).trim()
	const aliasLocale = LOCALE_ALIASES[normalized]
	const nextLocale = aliasLocale || normalized

	return supportedLocaleMap[nextLocale] ? nextLocale : DEFAULT_LOCALE
}

const getSystemLocale = () => {
	try {
		if (typeof uni !== 'undefined' && typeof uni.getSystemInfoSync === 'function') {
			const systemInfo = uni.getSystemInfoSync() || {}
			return systemInfo.language || DEFAULT_LOCALE
		}
	} catch (error) {}

	return DEFAULT_LOCALE
}

const getStoredLocale = () => {
	try {
		if (typeof uni !== 'undefined' && typeof uni.getStorageSync === 'function') {
			return uni.getStorageSync(I18N_STORAGE_KEY)
		}
	} catch (error) {}

	return ''
}

export const initLocale = () => {
	localeState.value = resolveLocale(getStoredLocale() || getSystemLocale())
	return localeState.value
}

export const getLocale = () => {
	return localeState.value
}

export const getMessages = () => {
	return messages
}

export const t = (key, params = {}, locale = localeState.value) => {
	const resolvedLocale = resolveLocale(locale)
	const message =
		getByPath(messages[resolvedLocale], key) ??
		getByPath(messages[DEFAULT_LOCALE], key) ??
		key

	return interpolate(message, params)
}

const getCurrentRoute = () => {
	try {
		if (typeof getCurrentPages !== 'function') {
			return ''
		}

		const pages = getCurrentPages() || []
		const currentPage = pages[pages.length - 1]

		return currentPage && currentPage.route ? currentPage.route : ''
	} catch (error) {
		return ''
	}
}

const isTabBarPageRoute = (route) => {
	if (!route) {
		return false
	}

	return TABBAR_I18N_ITEMS.some((item) => item.pagePath === route)
}

const clearTabBarRetryTimer = () => {
	if (!tabBarRetryTimer) {
		return
	}

	clearTimeout(tabBarRetryTimer)
	tabBarRetryTimer = null
}

export const syncTabBarLocale = (locale = localeState.value, options = {}) => {
	if (typeof uni === 'undefined' || typeof uni.setTabBarItem !== 'function') {
		return
	}

	const { retry = 0, retryDelay = 120 } = options
	const currentRoute = getCurrentRoute()

	if (!isTabBarPageRoute(currentRoute)) {
		if (retry > 0) {
			clearTabBarRetryTimer()
			tabBarRetryTimer = setTimeout(() => {
				syncTabBarLocale(locale, {
					retry: retry - 1,
					retryDelay
				})
			}, retryDelay)
		}
		return
	}

	clearTabBarRetryTimer()
	const resolvedLocale = resolveLocale(locale)

	TABBAR_I18N_ITEMS.forEach((item) => {
		const label = t(item.key, {}, resolvedLocale)
		const text = label === item.key ? item.fallback : label

		try {
			const result = uni.setTabBarItem({
				index: item.index,
				text,
				fail: () => {}
			})

			if (result && typeof result.catch === 'function') {
				result.catch(() => {})
			}
		} catch (error) {}
	})
}

const queueSyncTabBarLocale = (locale = localeState.value, delay = 16) => {
	if (tabBarSyncTimer) {
		clearTimeout(tabBarSyncTimer)
		tabBarSyncTimer = null
	}

	tabBarSyncTimer = setTimeout(() => {
		syncTabBarLocale(locale, {
			retry: 6,
			retryDelay: 120
		})
		tabBarSyncTimer = null
	}, delay)
}

export const setLocale = (locale) => {
	const nextLocale = resolveLocale(locale)
	localeState.value = nextLocale

	try {
		if (typeof uni !== 'undefined' && typeof uni.setStorageSync === 'function') {
			uni.setStorageSync(I18N_STORAGE_KEY, nextLocale)
		}
	} catch (error) {}

	queueSyncTabBarLocale(nextLocale)

	return nextLocale
}

export const useAppI18n = () => {
	return {
		locale: localeState,
		t,
		getLocale,
		setLocale,
		resolveLocale,
		messages,
		supportedLocales: SUPPORTED_LOCALES,
		syncTabBarLocale
	}
}

export const i18nPlugin = {
	install(target) {
		initLocale()
		queueSyncTabBarLocale(localeState.value)

		const api = {
			$t: t,
			$getLocale: getLocale,
			$setLocale: setLocale,
			$supportedLocales: SUPPORTED_LOCALES,
			$syncTabBarLocale: syncTabBarLocale
		}

		if (target && target.config && target.config.globalProperties) {
			Object.keys(api).forEach((key) => {
				target.config.globalProperties[key] = api[key]
			})
		}

		if (target && target.prototype) {
			Object.keys(api).forEach((key) => {
				target.prototype[key] = api[key]
			})
		}
	}
}

export default i18nPlugin
