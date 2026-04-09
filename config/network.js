const normalizeAppEnv = (value) => {
	const normalized = String(value || '').trim().toLowerCase()

	if (normalized === 'prod' || normalized === 'production' || normalized === 'release') {
		return 'production'
	}

	return 'test'
}

const getEnvValue = (key, fallback = '') => {
	try {
		if (typeof import.meta !== 'undefined' && import.meta.env && key in import.meta.env) {
			return import.meta.env[key]
		}
	} catch (error) {}

	return fallback
}

const getBooleanEnvValue = (key, fallback = false) => {
	const value = getEnvValue(key, fallback ? 'true' : 'false')
	return String(value).trim().toLowerCase() === 'true'
}

const getNumberEnvValue = (key, fallback = 15000) => {
	const value = Number(getEnvValue(key, fallback))
	return Number.isFinite(value) ? value : fallback
}

let isH5 = false
// #ifdef H5
isH5 = true
// #endif

const mode = getEnvValue('MODE', 'development')
const defaultAppEnv = mode === 'production' ? 'production' : 'test'

export const APP_ENV = normalizeAppEnv(getEnvValue('VITE_APP_ENV', defaultAppEnv))
export const API_BASE_MAP = {
	test: getEnvValue('VITE_API_BASE_TEST', 'https://test-api.example.com'),
	production: getEnvValue('VITE_API_BASE_PROD', 'https://api.example.com')
}
export const COMPANY_CODE_MAP = {
	test: getEnvValue('VITE_COMPANY_CODE_TEST', ''),
	production: getEnvValue('VITE_COMPANY_CODE_PROD', '')
}
export const COMPANY_CODE_HEADER_KEY = 'company-code'
export const LANG_HEADER_KEY = 'lang'
export const REQUEST_TIMEOUT = getNumberEnvValue('VITE_REQUEST_TIMEOUT', 15000)
export const H5_PROXY_ENABLED = getBooleanEnvValue('VITE_H5_PROXY_ENABLED', true)
export const H5_PROXY_PREFIX = getEnvValue('VITE_H5_PROXY_PREFIX', '/dev-api')
export const H5_PROXY_TARGET = getEnvValue(
	'VITE_H5_PROXY_TARGET',
	API_BASE_MAP.test || 'https://test-api.example.com'
)
export const IS_DEV = getBooleanEnvValue('DEV', mode !== 'production')
export const USE_H5_DEV_PROXY = isH5 && IS_DEV && H5_PROXY_ENABLED
export const BASE_API = USE_H5_DEV_PROXY ? H5_PROXY_PREFIX : API_BASE_MAP[APP_ENV]
export const COMPANY_CODE = COMPANY_CODE_MAP[APP_ENV] || ''
export const DEFAULT_REQUEST_HEADERS = {
	'Content-Type': 'application/json',
	...(COMPANY_CODE ? { [COMPANY_CODE_HEADER_KEY]: COMPANY_CODE } : {})
}

export const withBaseApi = (url = '') => {
	if (!url) {
		return BASE_API
	}

	if (/^https?:\/\//i.test(url)) {
		return url
	}

	if (url.startsWith('/')) {
		return `${BASE_API}${url}`
	}

	return `${BASE_API}/${url}`
}

export default {
	APP_ENV,
	API_BASE_MAP,
	BASE_API,
	COMPANY_CODE_MAP,
	COMPANY_CODE,
	COMPANY_CODE_HEADER_KEY,
	LANG_HEADER_KEY,
	DEFAULT_REQUEST_HEADERS,
	REQUEST_TIMEOUT,
	H5_PROXY_ENABLED,
	H5_PROXY_PREFIX,
	H5_PROXY_TARGET,
	IS_DEV,
	USE_H5_DEV_PROXY,
	withBaseApi
}
