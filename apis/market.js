import request from '@/utils/request'

const USER_API_PREFIX = ''

export const saleList = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/market/saleList`, params, options)
}

