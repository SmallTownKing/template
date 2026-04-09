import request from '@/utils/request'

const USER_API_PREFIX = ''

export const getBoxData = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/box/getBoxData`, params, options)
}

