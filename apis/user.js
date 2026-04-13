import request from '@/utils/request'

const USER_API_PREFIX = ''

export const getSiteInfo = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/config/getSiteInfo`, params, options)
}

export const passwordLogin = (data = {}, options = {}) => {
    return request.post(`${USER_API_PREFIX}/login/passwordLogin`, data, {
        skipAuthPopup: true,
        ...options
    })
}

export const getUserInfo = (params = {}, options = {}) => {
	return request.get(`${USER_API_PREFIX}/user/getUserInfo`, params, options)
}

export const getUserAccount = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/account/getUserAccount`, params, options)
}
