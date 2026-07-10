<template>
  <view class="box-record relative w-full h-344 bg-white shadow-[0rpx_0rpx_6rpx_0rpx_#d4dee9] rounded-6 mb-16">
    <view class="box-record-content absolute left-36 top-32 w-[calc(100%-50rpx)] h-full flex flex-col">
      <text class="box-record-content-title text-24 font-normal text-[#1a385b]"
        >{{ item.recordType === 1 ? "发货订单号" : "单号" }}：{{ item.orderId }}</text>
      <text class="box-record-content-title text-24 font-normal text-[#1a385b]"
        >{{ item.recordType === 1 ? "物流单号" : "总价" }}：{{
          item.recordType === 1
            ? item.deliverySn
              ? item.deliverySn + "," + item.deliveryId
              : "未发货"
            : item.totalPrice + ""
        }}</text>
      <scroll-view
        class="box-record-content-list relative w-full mt-12 whitespace-nowrap"
        :scroll-x="true"
        :enable-flex="true"
        scroll-with-animation
      >
        <view
          class="box-record-content-list-item relative inline-block mr-8 bg-white shadow-[0rpx_0rpx_6rpx_0rpx_#d4dee9] rounded-4 overflow-hidden"
          v-for="(gItem, gIndex) in item.list"
          :key="gIndex"
        >
          <view class="box-record-content-list-item-content relative flex flex-col">
            <view class="box-record-content-list-item-content-top relative w-152 h-152">
              <image
                class="box-record-content-list-item-content-top-logo absolute left-0 top-0 w-144 h-144 border-4 border-[#73b2ff] rounded-4"
                :src="gItem.image"
              />

              <image
                class="box-record-content-list-item-content-top-level absolute bottom-0 left-0 w-70 h-50"
                :src="getLevelImage(gItem?.goods?.level ?? 0)"
              />
              <text class="box-record-content-list-item-content-top-num absolute right-4 bottom-4 text-24 font-normal text-black"
                >x{{ gItem?.num ?? 1 }}</text>
            </view>

            <text
              class="box-record-content-list-item-content-title py-8 w-152 text-20 text-center font-normal text-black text-ellipsis"
              >{{ gItem.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="box-record-num absolute right-0 top-0 w-141 h-40">
      <image class="box-record-num-bg absolute right-0 top-0 w-full h-full" src="/static/kahe-202510/images/num-bg.png" />
      <text class="box-record-num-title absolute right-28 top-0 leading-40 text-24 font-normal text-black text-right theme-font"
        >共{{ total }}件</text>
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
</style>
