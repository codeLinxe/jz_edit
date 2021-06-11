<template>
    <div class="jz-header">
        <div class="header">
            <div class="left-block">
                <span>九章创作中心</span>
            </div>
            <div class="right-block">
                <div class="user_box">
                    <el-avatar :size="avatarSize" :src="userAvatar"></el-avatar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@mixins/index'
export default {
    mixins: [mixins],
    name: "jz_header",
    data() {
        return {
            avatarSize: 30
        }
    }
}
</script>

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
        padding: 0 100px 0 32px;
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

            }
        }
    }
}
</style>