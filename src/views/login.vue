<template>
    <jzHeader></jzHeader>
    <div class="login_view">
<!--            <div class="top-banner">-->
<!--                <img :src="topBanner" alt="">-->
<!--            </div>-->
        <div class="title-line">
            <span class="tit">{{loginTypeTitle}}</span>
        </div>
        <div class="login-box">
            <div class="login-form-box">
                <div class="type-tab">
                <span
                    class="type-tab-item"
                    v-for="(item, index) in typeTabList"
                    :class="{'active': typeTab === item.id}"
                    :key="'type-tab-item-' + index"
                    @click="switchTypeTab(index)"
                >{{item.title}}</span>
                </div>
                <div class="form-box" v-show="typeTab === '0'">
                    <el-form :model="loginFormData" :rules="loginFormRules" ref="loginFormPass" label-width="0" :validate-on-rule-change="false">
                        <el-form-item label="" prop="mobile">
                            <el-input :input-style="inputStyle" v-model="loginFormData.mobile" autocomplete="off" maxlength="11" placeholder="你的手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                            <el-input type="password" :input-style="inputStyle" v-model="loginFormData.password" autocomplete="off" placeholder="密码"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="form-box" v-show="typeTab === '1'">
                    <el-form :model="loginFormData" :rules="loginFormRules" ref="loginFormCode" label-width="0" :validate-on-rule-change="false">
                        <el-form-item label="" prop="mobile">
                            <el-input :input-style="inputStyle" v-model="loginFormData.mobile" autocomplete="off" maxlength="11" placeholder="填写常用手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="code">
                            <el-input :input-style="inputStyle" v-model="loginFormData.code" autocomplete="off" placeholder="请输入短信验证码">
                                <template #append>
                                    <el-button type="primary" class="send-code-btn" :class="{'countdown': isCountdown}" @click="validateSendMsgCode">{{isCountdown ? countdownNum + 's' : '获取验证码'}}</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="remember">
                    <div class="remember-tool">
                        <div class="remember-check-box">
                            <el-checkbox class="remember-check" v-model="rememberCheck"></el-checkbox>
                            <div class="remember-check-txt" @click="rememberCheck = !rememberCheck">
                                记住我<span>不是自己的电脑上不要勾选此项</span>
                            </div>
                        </div>
                        <div>
                            <span class="forget-password">忘记密码?</span>
                        </div>
                    </div>

                </div>
                <div class="btn-box">
                    <span class="btn btn-login" @click="validateLogin">登录</span>
                    <span class="btn btn-reg" @click="toRegister">注册</span>
                </div>
            </div>
        </div>
        <jzFooter></jzFooter>
    </div>
</template>

<script>
import jzHeader from "@components/jz-header";
import jzFooter from "@components/jz-footer";
import {login, sendMsgCode, getUserData} from "@apis/home";
export default {
    name: "login",
    components: {
        jzHeader,
        jzFooter
    },
    computed: {
        topBanner() {
            return '//s1.hdslb.com/bfs/static/passport/static/img/rl_top.35edfde.png'
        },
        loginTypeTitle() {
            return this.loginType === '0' ? '登录' : '注册'
        },
        loginFormRules() {
            let result = {}
            const validateTel = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入注册时用的手机号呀'));
                } else if (!this.$utils.isPhoneNum(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback()
                }
            }
            if(this.typeTab === '0') {
                result = {
                    mobile: [
                        { validator: validateTel, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            } else if (this.typeTab === '1') {
                result = {
                    mobile: [
                        { validator: validateTel, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                }
            }
            return result
        }
    },
    data() {
        return {
            loginType: '0', // 0: 登录 1: 注册
            typeTab: '0',
            typeTabList: [
                {id: '0', title: '密码登录'},
                {id: '1', title: '短信登录'},
            ],
            loginFormData: {
                mobile: '',
                code: '',
                password: ''
            },
            inputStyle: {
                'color': '#606266',
                'fontSize': '14px',
                'padding': '10px',
                'height': '40px',
                'borderRadius': '4px'
            },
            isCountdown: false,
            countdownNum: 60,
            countdownTimer: null,
            rememberCheck: true,
        }
    },
    created() {},
    methods: {
        validateLogin() {
            if(this.typeTab === '0') {
                // 密码登录
                this.$refs.loginFormPass.validate(valid => {
                    if(valid) {
                        this.login()
                    } else {
                        return false;
                    }
                })
            } else {
                // 短信登录
                this.$refs.loginFormCode.validate(valid => {
                    if(valid) {
                        this.login()
                    } else {
                        return false;
                    }
                })
            }
        },
        async login() {
            let params = {
                mobile: this.loginFormData.mobile
            }
            if(this.typeTab === '0') {
                params['mode'] = 1
                params['password'] = this.loginFormData.password
            } else {
                params['mode'] = 2
                params['code'] = this.loginFormData.code
            }
            let { data } = await login(params)
            const token = data.access_token
            if(this.rememberCheck) {
                this.$store.commit('setToken', token)
            } else {
                this.$store.commit('setToken', '')
                window.sessionStorage.setItem('token', token)
            }

            this.$message.success('登录成功')
            await this._getUserData();
            await this.$router.push('/')
        },
        async _getUserData() {
            let { data } = await getUserData()
            this.$store.commit('setUserData', data)
        },
        toRegister() {
            this.$router.push('/register');
            return false;
        },
        switchTypeTab(index) {
            let item = this.typeTabList[index] || {}
            this.typeTab = item.id || '0'
            this.$refs.loginFormPass.clearValidate()
            this.$refs.loginFormCode.clearValidate()
        },
        validateSendMsgCode() {
            this.$refs.loginFormCode.validateField('mobile', valid => {
                if(valid === '') {
                    this._sendMsgCode()
                } else {
                    return false
                }
            })
        },
        async _sendMsgCode() {
            if(this.isCountdown) return false;
            let params = {
                mobile: this.loginFormData.mobile
            }
            await sendMsgCode(params)
            this.isCountdown = true
            this.countdownTimer && clearInterval(this.countdownTimer)
            this.countdownTimer = setInterval(() => {
                this.countdownNum--;
                if(this.countdownNum <= 0) {
                    clearInterval(this.countdownTimer)
                    this.countdownTimer = null
                    this.isCountdown = false
                    this.countdownNum = 60
                }
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@assets/common/variables.scss";
    .login_view {
        padding: 60px 0 0 0;
        background: #fff;
        min-width: 1124px;
        display: flow-root;
        min-height: 100%;
        position: relative;
        z-index: 1;
    }
    .top-banner {
        background: $-txt-color-blue;
        height: 86px;
        text-align: center;
        margin-bottom: 20px;
    }
    .title-line {
        width: 980px;
        height: 28px;
        margin: 28px auto;
        border-bottom: 1px solid #ddd;
        text-align: center;
        .tit {
            height: 56px;
            line-height: 56px;
            margin: 0 auto;
            padding: 0 20px;
            font-size: 38px;
            background: #fff;
            text-align: center;
        }
    }
    .login-box {
        position: relative;
        width: 980px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-form-box {
            width: 490px;
            padding: 0 40px;
            margin-top: 50px;
            .type-tab {
                width: 100%;
                display: flex;
                cursor: pointer;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 12px;
                >span {
                    font-size: 14px;
                    color: #555;
                    letter-spacing: 0;
                    margin-right: 20px;
                    &.active {
                        color: $-txt-color-blue;
                    }
                }
            }
            .form-box {
                width: 100%;
                .el-form-item {
                    margin-bottom: 32px;

                    ::v-deep .el-form-item__error {
                        line-height: 32px;
                        padding-top: 0;
                    }
                    ::v-deep .el-input-group__append {
                        background: inherit;
                        width: 0;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        border: none;
                    }
                }
                .send-code-btn {
                    position: absolute;
                    right: 2px;
                    top: 2px;
                    z-index: 3;
                    width: 130px;
                    line-height: 36px;
                    height: 36px;
                    min-height: 0;
                    margin: 0;
                    padding: 0 4px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    background: $-btn-background-blue;
                    color: #fff;
                    border: none;
                }
            }
            .remember {
                margin: 10px 0;
                color: #717171;
                width: 100%;
                font-size: 12px;
                .remember-tool {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .remember-check-box {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        cursor: pointer;
                        .remember-check {
                            margin-right: 8px;
                            height: 14px;
                            display: flex;
                            ::v-deep .el-checkbox__input {
                                height: 14px;
                            }
                        }
                        .remember-check-txt {
                            >span {
                                color: #bbb;
                                margin-left: 10px;
                            }
                        }
                    }
                    .forget-password {
                        color: $-txt-color-blue;
                        cursor: pointer;
                    }
                }
            }
            .btn-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .btn {
                    color: #555;
                    display: inline-block;
                    height: 36px;
                    line-height: 36px;
                    border: 1px solid #ccc;
                    border-radius: 2px;
                    width: 184px;
                    font-size: 14px;
                    text-align: center;
                    cursor: pointer;
                    transition: all .3s;
                    &.btn-login {
                        border: 1px solid $-btn-borderColor-blue;
                        color: #fff;
                        background-color: $-txt-color-blue;
                    }
                }
            }
        }
    }
</style>