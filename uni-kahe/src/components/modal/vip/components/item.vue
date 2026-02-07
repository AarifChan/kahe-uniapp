<template>
    <view class="vipItem">
        <view class="vipItem-top">
            <image class="vipItem-top-decorate" mode="widthFix" :src="item.image" />
            <text class="vipItem-top-num">{{ item.num }}</text>
        </view>
        <text class="vipItem-title">{{ item.name }}</text>
    </view>
</template>

<script lang="ts" setup>
import type { UIDayVIPItem } from '@/model'
import type { PropType } from 'vue'

defineProps({
    item: {
        default: {
        } as UIDayVIPItem,
        type: Object as PropType<UIDayVIPItem>
    }
})
</script>

<style lang="scss" scoped>
  .vipItem {
    position: relative;
    width: 208rpx;
    height: 248rpx;
    margin-right: 15px;
    display: inline-block;
      border-radius: 2rpx;

      &-top{
          position: relative;
          width: 208rpx;
          height: 208rpx;
          border: 2rpx solid #95c4fe;
          border-radius: 8rpx;
          &-decorate {
              width: 100%;
              height: 100%;
          }
          &-num {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 60rpx;
              height: 30rpx;
              font-size: 21rpx;
              text-align: center;
              font-weight: 400;
              color: #000000;
              background-color: #53A4FF;
              //clip-path: polygon(0 0, 100% 90%, 100% 100%, 90% 100%);
          }
      }

    &-title {
      width: 100%;
      text-align: center;
      font-size: 24rpx;
      font-weight: 400;
      color: #1a385b;
    }
  }
</style>
