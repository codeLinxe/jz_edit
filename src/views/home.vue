<template>
    <jzHeader></jzHeader>
    <jzSideNav></jzSideNav>
    <jzBody>
        <div class="home_page">
            <h1>home page</h1>
        </div>
    </jzBody>
</template>

<script>
import jzHeader from "@components/jz-header";
import jzSideNav from "@components/jz-side-nav"
import jzBody from "@components/jz-body"
export default {
    name: "home",
    components: {
        jzHeader,
        jzSideNav,
        jzBody
    },
}
</script>

<style lang="scss" scoped>

</style>