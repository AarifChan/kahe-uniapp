<script setup lang="ts">
defineProps({
  momey: {
    default: 0,
    type: Number,
  },
  coin: {
    default: 0,
    type: Number,
  },

  integral: {
    default: 0,
    type: Number,
  },
});
const emits = defineEmits(["didClickItem"]);
</script>

<template>
  <view class="coinList">
    <view class="coinListItem">
      <image
        class="bg"
        src="https://jms.85gui7.com/kahe-202510/mine/coin-bg1.png"
      />
      <image
        class="decorate"
        src="https://jms.85gui7.com/kahe-202510/mine/coin1.png"
      />
      <view class="value" style="color: #3b1900">{{ momey }}</view>
      <view class="unit" style="color: #3b1900">无门槛券</view>
    </view>
    <view class="coinListItem">
      <image
        class="bg"
        src="https://jms.85gui7.com/kahe-202510/mine/coin-bg2.png"
      />
      <image
        class="decorate"
        src="https://jms.85gui7.com/kahe-202510/mine/coin2.png"
      />
      <view class="value" style="color: #785020">{{ coin }}</view>
      <view class="unit" style="color: #785020">今日怒气值</view>
    </view>
    <view class="coinListItem" @tap.stop="emits('didClickItem', 'integral')">
      <image
        class="bg"
        src="https://jms.85gui7.com/kahe-202510/mine/coin-bg3.png"
      />
      <image
        class="decorate"
        src="https://jms.85gui7.com/kahe-202510/mine/coin3.png"
      />
      <view class="value" style="color: #226b05">{{ integral }}</view>
      <view class="unit" style="color: #226b05">积分</view>
      <image
        class="action"
        src="https://jms.85gui7.com/kahe-new-mp/ka-he/mine/nav.png"
      />
    </view>
  </view>
</template>

<style scoped lang="scss">
.coinList {
  position: relative;
  padding: 48rpx 24rpx 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.coinListItem {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 156rpx; /* APP 部分 WebView 不稳定支持 aspect-ratio，改用固定高度 */
  overflow: visible;
  &:not(:last-child) {
    margin-right: 24rpx; /* 代替 gap，提升 APP 兼容性 */
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .decorate {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -32rpx;
    width: 75rpx;
    height: 75rpx;
  }
  .unit {
    position: absolute;
    bottom: 30rpx;
    left: 0;
    width: 100%;
    text-align: center;
    font-weight: 400;
    font-size: 22rpx;
  }
  .value {
    position: absolute;
    top: 58rpx;
    left: 0;
    width: 100%;
    text-align: center;
    font-weight: 400;
    font-size: 30rpx;
    font-family: "ZiHunYuWanTi";
  }
  .action {
    position: absolute;
    bottom: 30rpx;
    right: 56rpx;
    width: 24rpx;
    height: 24rpx;
  }
}
</style>
