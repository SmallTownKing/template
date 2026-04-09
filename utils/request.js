import {
	BASE_API,
	COMPANY_CODE,
	DEFAULT_REQUEST_HEADERS,
	LANG_HEADER_KEY,
	REQUEST_TIMEOUT,
	TOKEN_HEADER_KEY,
	withBaseApi
} from '@/config/network'
import { getLocale, resolveLocale } from '@/i18n'
import { pinia, useAppStore, useAuthPopupStore } from '@/stores'

const AUTH_FAILURE_CODES = [401, 1001]
const AUTH_FAILURE_MESSAGE_PATTERN = /(token|invalid token|token expired|auth failed|unauthorized)/i

const getAppStore = () => {
	try {
		return useAppStore(pinia)
	} catch (error) {
		return null
	}
}

const getAuthPopupStore = () => {
	try {
		return useAuthPopupStore(pinia)
	} catch (error) {
		return null
	}
}

const getAuthToken = () => {
	const appStore = getAppStore()
	return appStore?.authToken || ''
}

const mergeHeaders = (headers = {}) => {
	const currentLang = resolveLocale(getLocale())
	const currentToken = getAuthToken()

	return {
		...DEFAULT_REQUEST_HEADERS,
		...(currentLang ? { [LANG_HEADER_KEY]: currentLang } : {}),
		...(currentToken ? { [TOKEN_HEADER_KEY]: currentToken } : {}),
		...headers
	}
}

const isAuthFailureResponse = (response, requestUrl = '', skipAuthPopup = false) => {
	if (skipAuthPopup) {
		return false
	}

	const statusCode = Number(response?.statusCode || 0)
	const responseData = response?.data
	const businessCode = Number(responseData?.code)
	const message = String(responseData?.msg || responseData?.message || '')

	if (statusCode === 401) {
		return true
	}

	if (AUTH_FAILURE_CODES.includes(businessCode)) {
		return true
	}

	if (!message) {
		return false
	}

	if (!AUTH_FAILURE_MESSAGE_PATTERN.test(message)) {
		return false
	}

	return !String(requestUrl || '').includes('/login/')
}

const openAuthPopup = (responseData, requestUrl) => {
	const appStore = getAppStore()
	const authPopupStore = getAuthPopupStore()

	appStore?.logout()
	authPopupStore?.open({
		reason: responseData?.msg || 'auth-failed',
		source: requestUrl || ''
	})
}

export const request = (options = {}) => {
	const {
		url = '',
		method = 'GET',
		data,
		header,
		skipAuthPopup = false,
		timeout = REQUEST_TIMEOUT,
		...rest
	} = options

	return new Promise((resolve, reject) => {
		uni.request({
			url: withBaseApi(url),
			method,
			data,
			header: mergeHeaders(header),
			timeout,
			...rest,
			success: (response) => {
				if (isAuthFailureResponse(response, url, skipAuthPopup)) {
					openAuthPopup(response?.data, url)
					reject(response?.data || response)
					return
				}

				resolve(response.data)
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}

request.get = (url, data, options = {}) => {
	return request({
		url,
		data,
		method: 'GET',
		...options
	})
}

request.post = (url, data, options = {}) => {
	return request({
		url,
		data,
		method: 'POST',
		...options
	})
}

request.put = (url, data, options = {}) => {
	return request({
		url,
		data,
		method: 'PUT',
		...options
	})
}

request.delete = (url, data, options = {}) => {
	return request({
		url,
		data,
		method: 'DELETE',
		...options
	})
}

request.baseURL = BASE_API
request.companyCode = COMPANY_CODE
request.getLang = () => resolveLocale(getLocale())
request.getToken = () => getAuthToken()

export default request
