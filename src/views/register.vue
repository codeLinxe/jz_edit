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
                    <div class="form-box">
                        <el-form :model="loginFormData" :rules="loginFormRules" ref="loginForm" label-width="0" :validate-on-rule-change="false">
                            <el-form-item label="" prop="name">
                                <el-input :input-style="inputStyle" v-model="loginFormData.name" autocomplete="off" placeholder="昵称"></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="password">
                                <el-input type="password" :input-style="inputStyle" v-model="loginFormData.password" autocomplete="off" placeholder="密码(6-16个字符组成，区分大小写)"></el-input>
                            </el-form-item>
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
                        <div class="register-agree">
                            <el-checkbox class="register-agree-check" v-model="agreeCheck"></el-checkbox>
                            <div class="register-agree-txt" @click="agreeCheck = !agreeCheck">
                                我已同意<span @click.stop="toAgreeLink(1)">《九章创作中心用户使用协议》</span>和<span @click.stop="toAgreeLink(2)">《九章创作中心隐私政策》</span>
                            </div>
                        </div>
                        <el-button type="primary" class="register-btn" :disabled="!agreeCheck"  @click="validateRegister">注册</el-button>
                        <div class="register_pc_direct_login">
                            <router-link to="/login">已有账号，直接登录></router-link>
                        </div>
                    </div>
                </div>
            </div>
            <jzFooter></jzFooter>
        </div>
</template>

<script>
import jzHeader from "@components/jz-header";
import jzFooter from "@components/jz-footer";
import { sendMsgCode, register } from "@apis/home";
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
    },
    data() {
        const validateTel = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写常用的手机号'));
            } else if (!this.$utils.isPhoneNum(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback()
            }
        }
        const validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请告诉我你的昵称吧'));
            } else if (value.length > 16) {
                callback(new Error('昵称过长'));
            } else {
                callback();
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value === '' || value.length < 6) {
                callback(new Error('密码不能小于6个字符'));
            } else if (value.length > 16) {
                callback(new Error('密码不能大于16个字符'));
            } else {
                callback();
            }
        }
        return {
            loginFormRules: {
                name: [
                    { validator: validateName, trigger: 'blur'}
                ],
                mobile: [
                    { validator: validateTel, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur'}
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur'}
                ]
            },
            loginType: '1', // 0: 登录 1: 注册
            loginFormData: {
                name: '',
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
            agreeCheck: false,
        }
    },
    created() {},
    methods: {
        validateRegister() {
            this.$refs.loginForm.validate(valid => {
                if(valid) {
                    this.register()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        async register() {
            let params = {
                mobile: this.loginFormData.mobile,
                password: this.loginFormData.password,
                name: this.loginFormData.name,
                code: this.loginFormData.code,
            }
            await register(params)
            this.$message.success('注册成功')
            setTimeout(() => {
                this.$router.push('/login')
            }, 2000)
        },
        toAgreeLink(type) {
            if (type === 1) {
               // 用户协议
            } else {
                // 隐私协议
            }
        },
        validateSendMsgCode() {
            this.$refs.loginForm.validateField('mobile', valid => {
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
            .form-box {
                width: 100%;
                .el-form-item {
                    margin-bottom: 32px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    ::v-deep .el-form-item__error {
                        line-height: 32px;
                        padding-top: 0;
                        top: 2px;
                        left: 420px;
                        width: 410px;
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
                .register-agree {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 12px;
                    padding: 10px 0;
                    cursor: pointer;
                    .register-agree-check {
                        flex: none;
                        height: 14px;
                        display: flex;
                        margin-right: 5px;
                        ::v-deep .el-checkbox__input {
                            height: 14px;
                        }
                    }
                    .register-agree-txt {
                        flex: 1;
                        overflow: hidden;
                        >span {
                            color: $-txt-color-blue;
                        }
                    }
                }
                .register-btn {
                    width: 100%;
                    height: 40px;
                    &.is-disabled {
                        color: rgba(0,0,0,.25);
                        background-color: #f5f5f5;
                        border-color: #d9d9d9;
                    }
                }
                .register_pc_direct_login {
                    line-height: 40px;
                    text-align: right;
                    width: 100%;
                    height: 40px;
                    margin: 0 auto;
                    >a {
                        font-size: 12px;
                        color: $-txt-color-blue;
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
                    -webkit-transition: all .3s;
                    -o-transition: all .3s;
                    -moz-transition: all .3s;
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