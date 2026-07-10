<template>
  <view class="goodsContent w-full box-border flex pt-20 px-30">
    <view class="goodsContent-list relative flex w-full h-full">
      <view class="goodsContent-list-goods w-full flex flex-wrap relative h-320"
      >
        <view
          v-for="(item, index) in list"
          :key="index"
          class="goodsContent-list-goods-info relative mr-22 mb-18 box-border w-215 h-full"
          :class="{ 'mr-0': (index + 1) % 3 === 0 }"
          @tap.stop="emits('selectItem', item)"
        >
          <view class="goodsContent-list-goods-info-top relative w-full" style="padding-top: 100%;"
          >
            <image
              class="goodsContent-list-goods-info-top-img absolute left-0 top-0 w-full h-full z-0"
              :src="item.logo"
              :lazy-load="true"
            >
            </image>
          </view>
          <view class="goodsContent-list-goods-info-content w-[calc(100%-16rpx)] relative left-9 bottom-0 flex flex-col"
          >
            <text
              class="goodsContent-list-goods-info-content-title mt-8 relative w-160 text-20 font-normal text-[#2356a9] leading-32 text-flow-ellipsis-single"
            >
              {{ item.title }}
            </text>
            <view class="goodsContent-list-goods-info-content-row flex flex-row items-center"
            >
              <image class="goodsContent-list-goods-info-content-row-img mr-4"
                :style="{ width: '19px', height: '11.5px' }"
              />
              <text
                class="goodsContent-list-goods-info-content-row-title text-20 font-normal text-[#2356a9]"
              ></text>
            </view>
            <view class="goodsContent-list-goods-info-content-row flex flex-row items-center"
            >
              <text class="goodsContent-list-goods-info-content-row-title text-20 font-normal text-[#2356a9]"
                >数量:{{ item.num }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import type { UIChestModel } from "@/model";
import type { PropType } from "vue";
const emits = defineEmits(["selectItem"]);
defineProps({
    list: {
        type: Array as PropType<UIChestModel[]>,
        default: () => [],
    },
});
</script>

<style lang="scss" scoped>
</style>
