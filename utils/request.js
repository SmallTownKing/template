import {
	BASE_API,
	COMPANY_CODE,
	DEFAULT_REQUEST_HEADERS,
	LANG_HEADER_KEY,
	REQUEST_TIMEOUT,
	withBaseApi
} from '@/config/network'
import { getLocale, resolveLocale } from '@/i18n'

const mergeHeaders = (headers = {}) => {
	const currentLang = resolveLocale(getLocale())

	return {
		...DEFAULT_REQUEST_HEADERS,
		...(currentLang ? { [LANG_HEADER_KEY]: currentLang } : {}),
		...headers
	}
}

export const request = (options = {}) => {
	const {
		url = '',
		method = 'GET',
		data,
		header,
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

export default request
