<template>
  <view class="payItem relative w-full box-border p-22 bg-white rounded-20 border-3 border-[#000000] mb-24">
    <view class="payItem-top w-full flex flex-row items-center pb-12 pl-13" :style="{ borderBottom: '1px solid rgba(0,0,0,0.05)' }">
      <image class="payItem-top-icon w-26 h-26" src="/static/kahe-202510/order/item.png" />
      <view class="payItem-top-title ml-8 text-24 text-[#010101]">{{ item.title }}</view>
    </view>
    <view
      class="payItem-content relative box-border py-20 flex flex-row items-center"
      v-for="(goods, zIndex) in goodsList"
      :key="item.id + ':' + zIndex"
    >
      <image class="payItem-content-logo w-162 h-162 rounded-10" :src="goods.goodsDto?.image" />
      <view class="payItem-content-info relative w-full h-140 ml-14 flex flex-col justify-between">
        <view class="payItem-content-info-title text-28 font-normal text-[#010101]">{{ goods.goodsDto?.name }}</view>
        <view class="payItem-content-info-bottom w-full flex flex-row items-center justify-between">
          <view class="payItem-content-info-bottom-price text-30 font-normal text-[#010101]"></view>
          <view class="payItem-content-info-bottom-num text-30 font-normal text-[#010101]">X{{ goods.num }}</view>
        </view>
      </view>
    </view>
    <view class="payItem-bottom theme-font w-full flex flex-row items-center justify-end pt-12" :style="{ borderTop: '1px solid rgba(0,0,0,0.05)' }">
      <view class="payItem-bottom-title text-28 font-normal text-[#010101]">共</view>
      <view class="payItem-bottom-value text-28 font-normal text-[#ff610f]">{{ item.num }}</view>
      <view class="payItem-bottom-title text-28 font-normal text-[#010101]">件</view>
      <view class="payItem-bottom-title text-28 font-normal text-[#010101]">合计</view>
      <view class="payItem-bottom-value text-28 font-normal text-[#ff610f]">¥{{ item.price + item.ticket + item.coin }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue'
  import { ProductGoodsModel, ProductOrderModel } from '@/model'

  const props = defineProps({
    item: {
      default: {},
      type: Object as PropType<ProductOrderModel>
    }
  })

  const goodsList = computed(() => {
    let tmpList = props.item?.goods ?? []
    const mergedMap = tmpList.reduce((acc, current) => {
      if (acc.has(current.id)) {
        const existingItem = acc.get(current.id)!
        existingItem.num += 1
      } else {
        current.num = 1
        acc.set(current.id, {
          ...current
        })
      }
      return acc
    }, new Map<number, ProductGoodsModel>())

    return Array.from(mergedMap.values())
  })
</script>

<style lang="scss" scoped>
</style>
