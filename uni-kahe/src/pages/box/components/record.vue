<template>
  <view class="w-full h-344 relative bg-white shadow-[0rpx_0rpx_6rpx_0rpx_#d4dee9] rounded-6 mb-16">
    <view class="absolute left-36 top-32 flex flex-col" style="width: calc(100% - 50rpx); height: 100%;">
      <text class="text-24 font-normal text-[#1a385b]"
        >{{ item.recordType === 1 ? "发货订单号" : "单号" }}：{{
          item.orderId
        }}</text>
      <text class="text-24 font-normal text-[#1a385b]"
        >{{ item.recordType === 1 ? "物流单号" : "总价" }}：{{
          item.recordType === 1
            ? item.deliverySn
              ? item.deliverySn + "," + item.deliveryId
              : "未发货"
            : item.totalPrice + ""
        }}</text>
      <scroll-view
        class="mt-12 relative w-full whitespace-nowrap"
        :scroll-x="true"
        :enable-flex="true"
        scroll-with-animation
      >
        <view
          class="bg-white shadow-[0rpx_0rpx_6rpx_0rpx_#d4dee9] rounded-4 inline-block mr-8 overflow-hidden"
          v-for="(gItem, gIndex) in item.list"
          :key="gIndex"
        >
          <view class="relative flex flex-col">
            <view class="w-152 h-152 relative">
              <image
                class="absolute left-0 top-0 w-144 h-144 border-4 border-[#73b2ff] rounded-4"
                :src="gItem.image"
              />

              <image
                class="absolute bottom-0 left-0 w-70 h-50"
                :src="getLevelImage(gItem?.goods?.level ?? 0)"
              />
              <text class="absolute right-4 bottom-4 text-24 font-normal text-black"
                >x{{ gItem?.num ?? 1 }}</text
              >
            </view>

            <text
              class="py-8 px-0 w-152 text-20 text-center font-normal text-black text-ellipsis"
              >{{ gItem.name }}</text
            >
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="absolute right-0 top-0 w-141 h-40">
      <image class="absolute right-0 top-0 w-full h-full" src="/static/kahe-202510/images/num-bg.png" />
      <text class="absolute right-28 top-0 leading-40 text-24 font-normal text-black text-right theme-font"
        >共{{ total }}件</text
      >
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

<style lang="scss" scoped></style>
