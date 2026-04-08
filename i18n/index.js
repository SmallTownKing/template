import en from './messages/en.json'
import vi from './messages/vi.json'
import zhHans from './messages/zh-Hans.json'
import {
	DEFAULT_LOCALE,
	I18N_STORAGE_KEY,
	LOCALE_ALIASES,
	SUPPORTED_LOCALES
} from './config'

const messages = {
	en,
	vi,
	'zh-Hans': zhHans
}

const localeState = {
	current: DEFAULT_LOCALE
}

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
	localeState.current = resolveLocale(getStoredLocale() || getSystemLocale())
	return localeState.current
}

export const getLocale = () => {
	return localeState.current
}

export const setLocale = (locale) => {
	const nextLocale = resolveLocale(locale)
	localeState.current = nextLocale

	try {
		if (typeof uni !== 'undefined' && typeof uni.setStorageSync === 'function') {
			uni.setStorageSync(I18N_STORAGE_KEY, nextLocale)
		}
	} catch (error) {}

	return nextLocale
}

export const getMessages = () => {
	return messages
}

export const t = (key, params = {}, locale = localeState.current) => {
	const resolvedLocale = resolveLocale(locale)
	const message =
		getByPath(messages[resolvedLocale], key) ??
		getByPath(messages[DEFAULT_LOCALE], key) ??
		key

	return interpolate(message, params)
}

export const useAppI18n = () => {
	return {
		t,
		getLocale,
		setLocale,
		resolveLocale,
		messages,
		supportedLocales: SUPPORTED_LOCALES
	}
}

export const i18nPlugin = {
	install(target) {
		initLocale()

		const api = {
			$t: t,
			$getLocale: getLocale,
			$setLocale: setLocale,
			$supportedLocales: SUPPORTED_LOCALES
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
