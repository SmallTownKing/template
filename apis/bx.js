import request from '@/utils/request'

const USER_API_PREFIX = ''

export const getOneBoxDetail = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/box/getOneBoxDetail`, params, options)
}

export const getSaleBoxOpenLog = (params = {}, options = {}) => {
    return request.get(`${USER_API_PREFIX}/box/getSaleBoxOpenLog`, params, options)
}






