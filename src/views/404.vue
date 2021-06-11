<template>
    <div class="not_found">
        <el-empty :image-size="200" description="页面未找到"></el-empty>
    </div>
</template>

<script>
export default {
    name: "404"
}
</script>

<style lang="scss" scoped>
    .not_found {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>