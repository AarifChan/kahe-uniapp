<template>
    <view class="tall">
        <view class="inGroup">
            <image src="https://jms.85gui7.com/kahe-202510/ka-he/product/gogao.png" class="inGroup-bg" />
            <view class="inGroup-left text-flow-ellipsis-single">{{
                stripHTMLTags(content)
                }}</view>
            <!-- <view class="inGroup-right theme-font">赏品说明</view> -->
        </view>
    </view>

</template>
<script setup lang="ts">
const stripHTMLTags = (html: string) => {
    return html?.replace(/<[^>]*>/g, "") ?? "";
};
defineProps({
    content: {
        default: "",
        type: String,
    },
});
</script>
<style scoped lang="scss">
.tall {
    width: 100%;
    padding: 0 10rpx;
    box-sizing: border-box;

    .inGroup {
        position: relative;
        // background: #fff8e7;
        // box-shadow: 0 4rpx 6rpx 0 rgba(179, 156, 119, 0.56);
        // border-radius: 20rpx;
        display: flex;
        // padding: 20rpx;
        box-sizing: border-box;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 43rpx;

        &-bg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
        }

        &-left {
            position: relative;
            font-family: SimHei;
            font-weight: 400;
            font-size: 14rpx;
            color: #763A1C;
            padding-left: 60rpx;
            // width: calc(100% - 32rpx - 140rpx);
        }

        &-right {
            width: 140rpx;
            height: 50rpx;
            background: #5ad7af;
            box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f;
            border-radius: 20rpx;
            line-height: 50rpx;
            text-align: center;
            font-size: 24rpx;
            color: white;
            @include text-stroke-color(#167069);
        }
    }
}
</style>
