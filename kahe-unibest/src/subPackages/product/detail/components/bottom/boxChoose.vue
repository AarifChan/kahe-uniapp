<template>
    <view class="boxChooseBottom">
        <image class="boxChooseBottom-bg" src="https://jms.85gui7.com/kahe/product/normal-bottom-bg1.png" />
        <view class="boxChooseBottom-other" />
        <view class="boxChooseBottom-info">
            <text class="boxChooseBottom-info-title">请选择福袋</text>
            <view class="boxChooseBottom-info-right">
                <image class="boxChooseBottom-info-right-bg" src="https://jms.85gui7.com/kahe/product/chase-btn.png" />
                <text class="boxChooseBottom-info-right-title theme-font">立即购买</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

.boxChooseBottom{
    position: relative;
    display: flex;
    flex-direction: column;

    &-bg{
        width: 750rpx;
        height: 146rpx;
    }
    &-other{
        width: 100%;
        height: env(safe-area-inset-bottom);
        background-color: #393939;
    }
    &-info{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 146rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &-title{
            margin-left: 28rpx;
            font-size: 28rpx;
            font-weight: 400;
            color: #FFFFFF;
        }
        &-right{
            position: relative;
            margin-right: 52rpx;
            width: 300rpx;
            height: 80rpx;
            &-bg{
                width: 100%;
                height: 100%;
            }
            &-title{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                line-height: 70rpx;
                text-align: center;
                font-size: 40rpx;
                font-weight: 400;
                color: #FFFFFF;
                -webkit-text-stroke: 1.5px #000000;
                //text-stroke: 1rpx #000000;
            }
        }
    }
}
</style>
