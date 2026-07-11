<template>
  <view class="relative w-704 h-371 mb-16">
    <image
      class="relative w-full h-full"
      src="/static/kaju/merchant/card-bg.png"
    />
    <view class="absolute left-0 top-0 w-full h-full flex flex-col">
      <view
        class="relative box-border w-full px-28 py-18 flex flex-row items-center justify-between"
      >
        <view class="flex flex-row items-center">
          <view
            class="relative flex flex-row items-center justify-center w-83 h-83"
          >
            <image
              class="w-full h-full"
              src="/static/kaju/mine/avatar-bg.png"
            />
            <image
              class="absolute left-4 w-72 h-72 rounded-full"
              :src="item.icon"
            />
          </view>

          <view class="ml-24 flex flex-col items-start">
            <text class="font-normal text-24 text-black">{{ item.name }}</text>
            <view
              class="relative mt-8 ml-8 w-115 h-27 rounded-14"
              :style="{ backgroundColor: getTagBgColor(item.tag) }"
            >
              <image
                class="absolute -left-22 -top-4 w-44 h-35"
                :src="getTagIcon(item.tag)"
              />
              <text
                class="absolute left-26 top-0 font-normal text-20 text-white leading-27"
                >{{ getLevelName(item.tag) }}
              </text>
            </view>
          </view>
        </view>
        <view
          class="relative w-140 h-46"
          @tap.stop="emits('didClickInfo', item)"
        >
          <image
            class="w-full h-full"
            src="/static/kaju/merchant/ingroup-btn.png"
          />
          <text
            class="absolute left-0 top-8 w-full text-center font-normal text-24 text-black theme-font"
            >进店看看</text
          >
        </view>
      </view>
      <scroll-view
        class="relative box-border w-full h-294 px-20 whitespace-nowrap"
        :scroll-x="true"
        :enable-flex="true"
      >
        <view
          class="inline-block relative ml-8 mr-16 overflow-hidden"
          v-for="(box, index) in item.box"
          :key="'goods' + box.id"
          :id="'box:' + box.id"
        >
          <Goods :item="box" @tap.stop="emits('didClickItem', box)" />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { type PropType } from "vue";
import Goods from "../goods/index.vue";
import type {
  UIMallListItemModel,
  UIProductModel,
  MerchantInfoModel,
} from "@/model";
import {
  getLevelName,
  getTagBg,
  getTagBgColor,
  getTagIcon,
} from "@/pages/merchant/index";
defineProps({
  item: {
    default: {} as MerchantInfoModel,
    type: Object as PropType<MerchantInfoModel>,
  },
  level: {
    type: Number,
    default: 1,
  },
  list: {
    default: {} as UIProductModel[] | UIMallListItemModel[],
    type: Object as PropType<UIProductModel[] | UIMallListItemModel[]>,
  },
});

const emits = defineEmits(["didClickItem", "didClickInfo"]);
</script>

<style lang="scss" scoped></style>
