<template>
  <view>
    <view class="relative w-full box-border bg-white rounded-4 border-5 border-[#d3c5a2] p-18 flex flex-row items-center justify-between mb-12" @tap.stop="handleExpand"
    >
      <view class="flex flex-row items-center">
        <image class="w-56 h-56 rounded-full" :src="item.icon" />
        <view class="ml-19 flex flex-col">
          <view class="font-normal text-26 text-black">{{ item.name }}</view>
          <view
            class="relative mt-8 ml-8 w-115 h-27 rounded-14"
            :style="{ backgroundColor: getTagBgColor(item.tag) }"
          >
            <image
              class="absolute -left-22 -top-4 w-44 h-35"
              :src="getTagIcon(item.tag)"
            />
            <text class="absolute left-26 top-0 font-normal text-20 text-white leading-27">{{
              getLevelName(item.tag)
            }}</text>
          </view>
        </view>
      </view>
      <image
        class="w-43 h-20 inline-block"
        :style="{ transform: isExpand ? 'rotate(180deg)' : 'rotate(0)' }"
        src="/static/kahe-202510/ka-he/common/down-arrow.png"
      />
    </view>
    <view v-if="isExpand">
      <goods-row
        v-for="(box, index) in item.box"
        :item="box"
        :key="'index' + index"
        :id="'m' + box.boxId"
        @did-tap-detail="emits('didClickBoxItem', box)"
        @did-tap-select="emits('didSelectBox', box)"
      />
      <empty :show="item.box?.length === 0" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { MerchantBoxModel } from "@/model";

import GoodsRow from "../box/index.vue";
import Empty from "@/components/empty/index.vue";

import {
  getLevelName,
  getTagBgColor,
  getTagIcon,
} from "@/pages/merchant/index";

defineProps({
  item: {
    default: {} as MerchantBoxModel,
    type: Object as PropType<MerchantBoxModel>,
  },
  isExpand: {
    default: false,
    type: Boolean,
  },
});

const emits = defineEmits([
  "didClickBoxItem",
  "didSelectBox",
  "didExpandMerchant",
]);

// const {
//     boxList,
//     clickBoxItem,
//     didSelectBox,
//     loadMerchantBoxList
// } = useBox()

const handleExpand = () => {
  emits("didExpandMerchant");
  // isExpand.value = !isExpand.value
  // if (isExpand.value) {
  //     // loadMerchantBoxList(props.item.id)
  //
  // } else {
  //     boxList.value = []
  // }
};
</script>

<style lang="scss" scoped></style>
