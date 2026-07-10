<template>
    <view class="merchantCard relative w-full px-15 py-10 box-border grid grid-cols-3 gap-10">
        <view class="merchantCard-item relative w-full h-125 mb-20" @tap.stop="emits('didClickItem', 0)">
            <image class="merchantCard-item-img w-full h-full" src="/static/kahe-202510/ka-he/merchant/item1.png" />

            <!-- <view class="merchantCard-item-title theme-font">福利抽选</view>
      <view class="merchantCard-item-subTitle">0元抽奖品</view> -->
        </view>
        <view class="merchantCard-item relative w-full h-125 mb-20" @tap.stop="emits('didClickItem', 2)">
            <image class="merchantCard-item-img w-full h-full" src="/static/kahe-202510/ka-he/merchant/item2.png" />

            <!-- <view class="merchantCard-item-title theme-font">每日领券</view>
      <view class="merchantCard-item-subTitle">折扣享不停</view> -->
        </view>
        <view class="merchantCard-item relative w-full h-125 mb-20" @tap.stop="emits('didClickItem', 1)">
            <image class="merchantCard-item-img w-full h-full" src="/static/kahe-202510/ka-he/merchant/item3.png" />

            <!-- <view class="merchantCard-item-title theme-font">积分福利</view>
      <view class="merchantCard-item-subTitle">免费兑好礼</view> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
const emits = defineEmits(["didClickItem"]);
</script>

<style lang="scss" scoped>
</style>
