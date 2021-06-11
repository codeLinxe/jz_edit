<template>
    <jzHeader></jzHeader>
    <jzSideNav></jzSideNav>
    <jzWrapper>
        <div class="home_page">
            <h1>home page</h1>
        </div>
    </jzWrapper>
</template>

<script>
import jzHeader from "@/components/jz-header";
import jzSideNav from "@/components/jz-side-nav"
import jzWrapper from "@/components/jz-wrapper"
export default {
    name: "home",
    components: {
        jzHeader,
        jzSideNav,
        jzWrapper
    },
}
</script>

<style lang="scss" scoped>

</style>