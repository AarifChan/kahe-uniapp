<template>
  <view class="box-record">
    <view class="box-record-content">
      <text class="box-record-content-title"
        >{{ item.recordType === 1 ? "发货订单号" : "单号" }}：{{
          item.orderId
        }}</text
      >
      <text class="box-record-content-title"
        >{{ item.recordType === 1 ? "物流单号" : "总价" }}：{{
          item.recordType === 1
            ? item.deliverySn
              ? item.deliverySn + "," + item.deliveryId
              : "未发货"
            : item.totalPrice + ""
        }}</text
      >
      <scroll-view
        class="box-record-content-list"
        :scroll-x="true"
        :enable-flex="true"
        scroll-with-animation
      >
        <view
          class="box-record-content-list-item"
          v-for="(gItem, gIndex) in item.list"
          :key="gIndex"
        >
          <view class="box-record-content-list-item-content">
            <view class="box-record-content-list-item-content-top">
              <image
                class="box-record-content-list-item-content-top-logo"
                :src="gItem.image"
              />

              <image
                class="box-record-content-list-item-content-top-level"
                :src="getLevelImage(gItem?.goods?.level ?? 0)"
              />
              <text class="box-record-content-list-item-content-top-num"
                >x{{ gItem?.num ?? 1 }}</text
              >
            </view>

            <text
              class="box-record-content-list-item-content-title text-flow-ellipsis-single"
              >{{ gItem.name }}</text
            >
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="box-record-num">
      <image class="box-record-num-bg" src="https://jms.85gui7.com/kahe-202510/images/num-bg.png" />
      <text class="box-record-num-title theme-font">共{{ total }}件</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { UIMineBoxRecordModel } from '@/model'

import { computed } from 'vue'
import { useEnum } from '@/composables/enum'
const { getLevelImage } = useEnum()
const props = defineProps({
    item: {
        default: {
        } as UIMineBoxRecordModel,
        type: Object as PropType<UIMineBoxRecordModel>
    }
})

const total = computed(() => {
    let num = 0
    props.item?.list?.forEach((item) => {
        num = num + item.num
    })
    return num
})
</script>

<style lang="scss" scoped>
.box-record {
  width: 100%;
  height: 344rpx;
  position: relative;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 6rpx 0rpx #d4dee9;
  border-radius: 6rpx;
  margin-bottom: 16rpx;
  &-content {
    position: absolute;
    left: 36rpx;
    top: 32rpx;
    width: calc(100% - 50rpx);
    height: 100%;
    display: flex;
    flex-direction: column;
    &-title {
      font-size: 24rpx;
      font-weight: 400;
      color: #1a385b;
    }
    &-list {
      margin-top: 12rpx;
      position: relative;
      width: 100%;
      white-space: nowrap;
      &-item {
        background: #ffffff;
        box-shadow: 0rpx 0rpx 6rpx 0rpx #d4dee9;
        border-radius: 4rpx;
        position: relative;
        display: inline-block;
        margin-right: 8px;
        overflow: hidden;

        &-content {
          position: relative;
          display: flex;
          flex-direction: column;

          &-top {
            width: 152rpx;
            height: 152rpx;
            position: relative;

            &-logo {
              position: absolute;
              left: 0;
              top: 0;
              width: 144rpx;
              height: 144rpx;
              border: 4rpx solid #73b2ff;
              border-radius: 4rpx;
            }
            &-level {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 70rpx;
              height: 50rpx;
            }
            &-num {
              position: absolute;
              right: 4rpx;
              bottom: 4rpx;
              font-size: 24rpx;
              font-weight: 400;
              color: #000000;
            }
          }

          &-title {
            padding: 8rpx 0;
            width: 152rpx;
            font-size: 20rpx;
            text-align: center;
            font-weight: 400;
            color: #000000;
          }
        }
      }
    }
  }
  &-num {
    position: absolute;
    right: 0;
    top: 0;
    width: 141rpx;
    height: 40rpx;
    &-bg {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    &-title {
      position: absolute;
      right: 28rpx;
      top: 0;
      line-height: 40rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #000000;
      text-align: right;
    }
  }
}
</style>
