import request from '@/utils/request'

const USER_API_PREFIX = ''

export const getSiteInfo = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/config/getSiteInfo`, params, options)
}

