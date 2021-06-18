<template>
    <div class="jz-header">
        <div class="header">
            <div class="left-block" @click="toHome">
                <span>九章创作中心</span>
            </div>
            <div class="right-block">
                <div v-if="isLogin">
                    <el-popover
                        popper-class="header-popover header-popover-avatar"
                        placement="bottom"
                        :width="144"
                        trigger="hover"
                    >
                        <template #reference>
                            <div class="user_box">
                                <el-avatar :size="avatarSize" :src="userAvatar">
                                    <img :src="defaultAvatar" alt="">
                                </el-avatar>
                                <h5 class="name">{{userName}}</h5>
                            </div>
                        </template>
                        <div class="submenu_box">
                            <div class="content">
                                <div class="link" v-for="(item, index) in submenu" :key="'submenu-item-' + index">
                                    <i :class="item.icon"></i>
                                    <span class="title">{{item.title}}</span>
                                </div>
                            </div>
                            <div class="logout">
                                <div class="line"></div>
                                <div class="link" @click="logout">
                                    <i class="bcc-iconfont bcc-icon-ic_exit"></i>
                                    <span>退出登录</span>
                                </div>
                            </div>
                        </div>
                    </el-popover>
                </div>
                <div class="user_box" v-else>
                    <div class="unlogin-avatar" @click="toLogin">
                        登录
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@mixins/index'
import { logout } from '@apis/home'
export default {
    mixins: [mixins],
    name: "jz_header",
    data() {
        return {
            avatarSize: 30,
            submenu: [
                {
                    name: 'center',
                    title: '个人中心',
                    icon: 'bcc-iconfont bcc-icon-ic_Personalcenter'
                },
                {
                    name: 'management',
                    title: '投稿管理',
                    icon: 'bcc-iconfont bcc-icon-ic_management'
                }
            ]
        }
    },
    methods: {
        toHome() {
            this.$router.push('/home')
        },
        toLogin() {
            this.$router.push('/login')
        },
        async logout() {
            await logout()
            this.$message.success('退出登录成功')
            this.clearData()
            await this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
.el-popover.header-popover {
    padding: 0;
    box-sizing: border-box;
    min-width: 144px;
}

.el-popover.header-popover-avatar {
    padding-top: 7px;
}
</style>

<style scoped lang="scss">
@import "@assets/common/variables.scss";
.jz-header {
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 11;
    min-width: 960px;
    .header {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 32px 0 32px;
        box-sizing: border-box;
        background: #fff;
        box-shadow: 0 2px 10px 0 rgb(0 0 0 / 5%);
        .left-block {
            display: flex;
            align-items: center;
            color: $-txt-color-blue;
            font-size: 22px;
            cursor: pointer;
            font-weight: 600;
            letter-spacing: 2px;
        }
        .right-block {
            display: flex;
            font-size: 16px;
            color: #757575;
            .user_box {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .name {
                    font-size: 14px;
                    letter-spacing: 0;
                    text-align: center;
                    font-weight: 600;
                    margin-left: 10px;
                }
                .unlogin-avatar {
                    cursor: pointer;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    line-height: 36px;
                    font-size: 14px;
                    color: $-txt-color-blue;
                    letter-spacing: 0;
                    background: #f6f6f6;
                    text-align: center;
                    font-weight: 600;
                }
                ::v-deep .el-dropdown {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
}

.submenu_box {
    .link {
        height: 40px;
        cursor: pointer;
        display: flex;
        padding-left: 27px;
        align-items: center;
        color: inherit;
        &:hover {
            background: rgb(250,250,250);
        }
        .bcc-iconfont {
            margin-right: 10px;
            margin-bottom: -2px;
            font-size: 20px;
        }
        .title {
            color: #212121;
        }
    }
    .logout {
        padding: 9px 0 2px;
        .line {
            width: 96px;
            height: 1px;
            margin: 0 auto;
            background: #f4f4f4;
        }
    }
}
</style>