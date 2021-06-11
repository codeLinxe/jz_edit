<template>
    <div class="jz-header">
        <div class="header">

        </div>
    </div>
</template>

<script>
export default {
    name: "jz_header"
}
</script>

<style scoped lang="scss">
.jz-header {
    height: 60px;
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
        }
        .right-block {
            display: flex;
            font-size: 16px;
            color: #757575;
        }
    }
}
</style>