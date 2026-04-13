const ENV = {
	MODE: import.meta.env.MODE,
	DEV: import.meta.env.DEV,
	VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
	VITE_API_BASE_TEST: import.meta.env.VITE_API_BASE_TEST,
	VITE_API_BASE_PROD: import.meta.env.VITE_API_BASE_PROD,
	VITE_COMPANY_CODE_TEST: import.meta.env.VITE_COMPANY_CODE_TEST,
	VITE_COMPANY_CODE_PROD: import.meta.env.VITE_COMPANY_CODE_PROD,
	VITE_REQUEST_TIMEOUT: import.meta.env.VITE_REQUEST_TIMEOUT,
	VITE_H5_PROXY_ENABLED: import.meta.env.VITE_H5_PROXY_ENABLED,
	VITE_H5_PROXY_PREFIX: import.meta.env.VITE_H5_PROXY_PREFIX,
	VITE_H5_PROXY_TARGET: import.meta.env.VITE_H5_PROXY_TARGET
}

const normalizeAppEnv = (value) => {
	const normalized = String(value || '').trim().toLowerCase()

	if (normalized === 'prod' || normalized === 'production' || normalized === 'release') {
		return 'production'
	}

	return 'test'
}

const getEnvValue = (key, fallback = '') => {
	const value = ENV[key]
	return value === undefined || value === null || value === '' ? fallback : value
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
export const TOKEN_HEADER_KEY = 'token'
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

if (IS_DEV) {
	console.info('[network]', {
		mode,
		appEnv: APP_ENV,
		baseApi: BASE_API,
		useH5Proxy: USE_H5_DEV_PROXY
	})
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
	TOKEN_HEADER_KEY,
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
