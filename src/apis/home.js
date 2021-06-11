import { POST } from './http'

/**
 * @desc 用户登录
 * @param params
 * @param {string} params.mode 1=密码登录，2=验证码登录
 * @param {string} params.mobile 用户手机号
 * @param {string} params.password 登录密码
 * @param {string} params.code 短信验证码
 * @returns {Promise<AxiosResponse<any>>}
 */
export function login(params) {
    return POST('/api/login/login', params)
}