<template>
    <div class="jz-side-nav-warp">
        <div class="jz-side-nav">
            <el-popover
                popper-class="header-popover nav-upload-popover"
                placement="right-start"
                :width="190"
                trigger="hover"
            >
                <template #reference>
                    <div class="nav-upload-btn">
                        <i class="bcc-iconfont bcc-icon-ic_contribute"></i>
                        <span>投稿</span>
                    </div>
                </template>
                <div class="upload-menu-box">
                    <div
                        class="upload-menu-item"
                        v-for="(item, index) in uploadMenu"
                        :key="'upload-menu-item' + index"
                    >
                        <i :class="item.icon"></i>
                        <span class="title">{{item.title}}</span>
                    </div>
                </div>
            </el-popover>
            <el-menu
                :default-active="1"
                class="jz-side-menu"
                text-color="#000"
                active-text-color="#00a1d6"
                @open="handleOpen"
                @close="handleClose">
                <template v-for="(item, index) in menuList" :key="'menu-item-' + index">
                    <el-menu-item :index="index + 1" v-if="!item.submenu">
                        <i class="menu-icon bcc-iconfont bcc-icon-ic_home_"></i>
                        <template #title>{{item.title}}</template>
                    </el-menu-item>
                </template>

            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    name: "jz-nav",
    data() {
        return {
            menuList: [
                {
                    name: 'home',
                    link: '/home',
                    title: '首页',
                    submenu: false,
                }
            ],
            uploadMenu: [
                {
                    name: 'upload-video',
                    title: '视频投稿',
                    icon: 'bcc-iconfont bcc-icon-video_upload2x'
                },
                {
                    name: 'upload-article',
                    title: '文章投稿',
                    icon: 'bcc-iconfont bcc-icon-column__upload2x'
                }
            ]
        }
    },
    methods: {
        handleOpen() {},
        handleClose() {},
    }
}
</script>

<style lang="scss">
.el-popover.nav-upload-popover {
    padding: 0;
    box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
@import "@assets/common/variables.scss";
.jz-side-nav-warp {
    position: fixed;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    top: 0;
    left: 0;
    border-right: 1px solid #e5e9ef;
    background: #fff;
    z-index: 10;
    height: 100%;
    overflow: hidden;
    padding-top: 60px;
    width: 200px;
    border-right: 1px solid #f4f4f4;
    .jz-side-nav {
        width: 100%;
        .nav-upload-btn {
            width: 136px;
            margin: 24px auto 17px;
            border-radius: 2px;
            font-size: 16px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: $-txt-color-blue;
            cursor: pointer;
            >i {
                margin-right: 8px;
                font-size: 18px;
            }
        }
    }
}

.upload-menu-box {
    box-shadow: 0 1px 3px 0 #d6d6d6;
    border-radius: 4px;
    padding: 8px 0;
    background: #fff;
    .upload-menu-item {
        display: flex;
        cursor: pointer;
        user-select: none;
        position: relative;
        justify-content: flex-start;
        align-items: center;
        padding: 8px 16px;
        color: $-txt-color-blue;
        &:hover {
            background: rgb(250, 250, 250);
            >i {
                transform: scale(1.1);
            }
        }
        >i {
            font-size: 22px;
            width: 32px;
            line-height: 32px;
            display: inline-block;
            text-align: center;
            margin-right: 12px;
            transform: scale(1);
            transform-origin: center;
            transition: all 0.2s;
        }
        >.title {
            font-size: 16px;
            color: #212121;
            line-height: 20px;
        }
    }
}

</style>