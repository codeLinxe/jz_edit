<template>
    <div class="jz-side-nav-warp">
        <div class="jz-side-nav">

        </div>
    </div>
</template>

<script>
export default {
    name: "jz-nav"
}
</script>

<style lang="scss" scoped>
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

    }
}

</style>