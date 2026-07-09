<template>
  <view class="w-full box-border flex pt-20 px-30">
    <view class="relative flex w-full h-full">
      <view class="w-full flex flex-wrap relative h-320">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="relative box-border h-full"
          style="margin: 0 22rpx 18rpx 0; width: 215rpx;"
          :style="(index + 1) % 3 === 0 ? 'margin-right: 0;' : ''"
          @tap.stop="emits('selectItem', item)"
        >
          <view class="relative w-full" style="padding-top: 100%;">
            <image
              class="absolute left-0 top-0 w-full h-full z-0"
              :src="item.logo"
              :lazy-load="true"
            >
            </image>
          </view>
          <view class="relative flex flex-col" style="width: calc(100% - 16rpx); left: 9rpx;">
            <text
              class="mt-8 relative w-160 text-20 font-normal text-[#2356a9] leading-32 text-flow-ellipsis-single"
            >
              {{ item.title }}
            </text>
            <view class="flex flex-row items-center">
              <image class="mr-4" style="width: 19px; height: 11.5px;" />
              <text class="text-20 font-normal text-[#2356a9]"></text>
            </view>
            <view class="flex flex-row items-center">
              <text class="text-20 font-normal text-[#2356a9]"
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

<style lang="scss" scoped></style>
