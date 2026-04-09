import request from '@/utils/request'

const USER_API_PREFIX = ''

export const getList = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/poster/getList`, params, options)
}

export const getUserDrawLog = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/box/getUserDrawLog`, params, options)
}

export const getBoxData = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/box/getBoxData`, params, options)
}


export const getSaleBoxOpenLog = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/box/getOneBoxDetail`, params, options)
}

