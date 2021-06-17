<template>
    <div class="jz-footer">
        <div class="b-footer-wrap">
            <div class="top">
                <div>
                    <span>联系电话：4000929777</span>
                </div>
                <div>
                    <span>联系地址：江西省上饶市广丰区芦林街道上广公路南侧鑫城大厦6楼、7楼</span>
                </div>
            </div>
            <div class="bottom">
                <p>
                    <span class="single">网络文化经营许可证：<a href="http://beian.miit.gov.cn">赣ICP备18015084号-1</a></span>
                    <span class="single">赣网文【2019】1855-014号</span>
                    <span>增值电信业务经营许可证：赣B2-20190124</span>
                </p>
                <p>
                    <span>CopyRight</span>&nbsp;
                    ©&nbsp;
                    <span>2013-2021  江西搜搜信息科技有限公司版权所有  All  rights  reserved.</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "jz-footer"
}
</script>

<style lang="scss" scoped>
    .jz-footer {
        margin-top: 300px;
        bottom: 0;
        font: 12px "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
        position: relative;
        background-color: #f6f9fa;
        padding: 30px 0;
        min-width: 999px;
        .b-footer-wrap {
            display: flex;
            flex-direction: column;
            padding-top: 30px;
            color: #999;
            max-width: 1630px;
            min-width: 999px;
            margin: 0 auto;
            .top {
                width: 100%;
                height: 66px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                &::after {
                    content:"";
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1200px;
                    height: 1px;
                    background: #3A3A3A;
                    bottom: 0;
                }
                > p {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:first-child {
                        margin-right: 50px;
                    }
                    > span {
                        font-size: 16px;
                        font-weight: 500;
                        color: #DCDCDC;
                    }
                }
            }
            .bottom {
                width: 100%;
                height: 83px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                p {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:nth-child(1) {
                        margin-bottom: 13px;
                    }
                    span, a {
                        font-size: 14px;
                        font-weight: 500;
                        color: #BBBBBB;
                    }
                    .single {
                        margin-right: 22px;
                        position: relative;
                        &::after {
                            content:"";
                            position: absolute;
                            right: -11px;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 2px;
                            height: 18px;
                            background: #464646;
                        }
                    }
                }
            }
        }
    }
</style>