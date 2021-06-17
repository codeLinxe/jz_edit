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

/**
 * @desc 退出登录
 * @param params
 * @param {string} params.access_token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function logout(params) {
    return POST('/api/login/logout', params)
}

/**
 * @desc 用户注册
 * @param params
 * @param {string} params.mobile 用户登录账号（手机号）
 * @param {string} params.password 密码
 * @param {string} params.name 姓名
 * @param {string} params.code 验证码
 * @returns {Promise<AxiosResponse<any>>}
 */
export function register(params) {
    return POST('/api/login/register', params)
}

/**
 * @desc 发送验证短信
 * @param params
 * @param {string} params.mobile 手机号
 * @returns {Promise<AxiosResponse<any>>}
 */
export function sendMsgCode(params) {
    return POST('/api/normal/sendCode', params)
}

/**
 * @desc 获取用户信息
 * @param params
 * @param {string} params.access_token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserData(params) {
    return POST('/api/user/getUserInfo', params)
}