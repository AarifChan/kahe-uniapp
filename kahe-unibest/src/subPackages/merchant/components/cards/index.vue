<template>
    <view class="merchantCard">
        <view class="merchantCard-item" @tap.stop="emits('didClickItem', 0)">
            <image class="merchantCard-item-img" src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/item1.png" />

            <!-- <view class="merchantCard-item-title theme-font">福利抽选</view>
      <view class="merchantCard-item-subTitle">0元抽奖品</view> -->
        </view>
        <view class="merchantCard-item" @tap.stop="emits('didClickItem', 2)">
            <image class="merchantCard-item-img" src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/item2.png" />

            <!-- <view class="merchantCard-item-title theme-font">每日领券</view>
      <view class="merchantCard-item-subTitle">折扣享不停</view> -->
        </view>
        <view class="merchantCard-item" @tap.stop="emits('didClickItem', 1)">
            <image class="merchantCard-item-img" src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/item3.png" />

            <!-- <view class="merchantCard-item-title theme-font">积分福利</view>
      <view class="merchantCard-item-subTitle">免费兑好礼</view> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
const emits = defineEmits(["didClickItem"]);
</script>

<style lang="scss" scoped>
.merchantCard {
    position: relative;
    width: 100%;
    padding: 10rpx 15rpx;
    box-sizing: border-box;
    display: grid;
    gap: 10rpx;
    grid-template-columns: repeat(3, 1fr);

    &-item {
        position: relative;
        width: 100%;
        height: 125rpx;
        margin-bottom: 20rpx;

        &-img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
