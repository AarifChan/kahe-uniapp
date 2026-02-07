<template>
  <view class="favorite">
    <view class="favorite-content">
      <view class="favorite-content-item" @tap.stop="$emit('didClickFavorite')">
        <image
          class="favorite-content-item-img"
          src="https://jms.85gui7.com/kahe-202510/ka-he/mine/favorite.png"
        />
        <text class="favorite-content-item-title">收藏</text>
      </view>
      <view class="favorite-content-item" @tap.stop="$emit('didClickCoupon')">
        <image
          class="favorite-content-item-img"
          src="https://jms.85gui7.com/kahe-202510/ka-he/mine/card.png"
        />
        <text class="favorite-content-item-title">卡券</text>
      </view>
      <view class="favorite-content-item" @tap.stop="$emit('didClickContact')">
        <image
          class="favorite-content-item-img"
          src="https://jms.85gui7.com/kahe-202510/ka-he/mine/contact.png"
        />
        <text class="favorite-content-item-title">联系客服</text>
        <view v-if="unReadNum > 0" class="favorite-content-item-num">{{
          unReadNum
        }}</view>
      </view>
      <!--      <button class="favorite-content-item" openType="contact">-->
      <!--        <image-->
      <!--          class="favorite-content-item-img"-->
      <!--          src="https://jms.85gui7.com/kahe-202510/ka-he/mine/contact.png"-->
      <!--        />-->
      <!--        <text class="favorite-content-item-title">联系客服</text>-->
      <!--      </button>-->
    </view>
  </view>
</template>
<script setup lang="ts">
defineProps({
  unReadNum: {
    default: 0,
    type: Number,
  },
});
defineEmits(["didClickFavorite", "didClickCoupon", "didClickContact"]);
</script>

<style scoped lang="scss">
.favorite {
  margin: 24rpx 24rpx 0 24rpx;
  width: calc(100% - 48rpx);
  position: relative;

  &-content {
    position: relative;
    width: 100%;
    padding: 42rpx 0;
    background: #ffffff;
    box-shadow: 4rpx 4rpx 5rpx 0 rgba(0, 0, 0, 0.13);
    border-radius: 30rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 160rpx;
    border: 2px solid #cda374;

    &-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;
      padding: 0;
      margin: 0;
      border: none;
      background-color: transparent;

      &-img {
        width: 65rpx;
        height: 65rpx;
        margin: 0;
        padding: 0;
      }

      &-title {
        font-size: 24rpx;
        line-height: 24rpx;
        color: #000000;
      }
      &-num {
        position: absolute;
        right: -4rpx;
        top: -4rpx;
        width: 44rpx;
        height: 44rpx;
        text-align: center;
        line-height: 44rpx;
        font-size: 24rpx;
        background-color: red;
        color: #fff;
        border-radius: 22rpx;
      }
    }

    &-item::after {
      padding: 0;
      margin: 0;
      border: none;
      background-color: transparent;

      &-title {
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>
