<template>
    <div class="jz-body">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "jz-body"
}
</script>

<style lang="scss" scoped>
.jz-body {
    padding: 60px 0 50px 0;
    background: #fafafa;
    margin-left: 200px;
    min-width: 1124px;
    display: flow-root;
    min-height: 100%;
    position: relative;
    z-index: 1;
}
</style>