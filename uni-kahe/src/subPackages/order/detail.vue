<template>
  <view class="relative w-full h-screen bg-[#f5f5f5]">
    <view class="w-full h-174 bg-gradient-[linear-gradient(90deg,#ffe3bb,#ffc4ca)]" />
    <view class="px-32 pt-32 pb-0 w-full box-border">
      <Item v-if="orderDetail?.blindboxOrder" :item="orderDetail?.blindboxOrder" />
    </view>

    <view class="px-32 py-32 w-full box-border bg-[#f5f5f5]">
      <view class="px-22 w-full bg-white rounded-20">
        <view
          v-for="(row, index) in payInfoRows"
          :key="index"
          class="flex flex-row items-center h-60 justify-start"
          :class="index === payInfoRows.length - 1 ? '' : 'border-b border-[rgba(0,0,0,0.05)]'"
        >
          <view class="font-normal text-24 text-[#010101]">{{ row.name }}</view>
          <view class="ml-120 font-normal text-24 text-[#6c6c6c] leading-60">{{ row.value }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { usePayedOrder } from './index'
  import { onMounted, computed } from 'vue'
  import Item from './components/item.vue'
  import { getPageOptions } from '@/utils/tools'
  const { getOrderDetail, orderDetail } = usePayedOrder()

  const payInfoRows = computed(() => {
    return [
      { name: '订单信息', value: '' },
      { name: '订单编号', value: orderDetail.value?.order.orderId ?? '--' },
      { name: '订单总价', value: orderDetail.value?.order.totalPrice ?? '' },
      { name: '支付金额', value: orderDetail.value?.order.payPrice ?? '' },
      { name: '支付方式', value: '微信支付' },
      { name: '创建时间', value: orderDetail.value?.order.createTime ?? '' },
      { name: '支付时间', value: orderDetail.value?.order.payTime ?? '' },
    ]
  })

  onMounted(() => {
    const orderId = getPageOptions().orderId
    if (orderId) {
      getOrderDetail(orderId)
    }
  })
</script>

<style lang="scss" scoped></style>
