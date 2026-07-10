<template>
  <view class="boxItem relative w-full h-324 flex flex-col mb-10 bg-white rounded-30 border-5 border-[#d3c5a2]">
    <view class="boxItem-top relative w-full mt-16 flex flex-row items-center justify-center">
      <image
        class="boxItem-top-image h-192"
        mode="heightFix"
        :src="item?.goods?.image"
        @tap.passive="emits('didTapDetail', item)"
      />
      <view class="boxItem-top-quality absolute left-8 bottom-4px py-4 px-8 text-[#222] text-20 bg-[#f6ac41] rounded-4"
        >{{ getTitleByQuality(item.goods.quality) }}</view>

      <!--            <view class="boxItem-top-levelBg flex justify-center items-center absolute left-0 bottom-8 w-90 h-40 bg-[#95c3f7] rounded-[0rpx_8rpx_0rpx_8rpx]">-->
      <!--                <image mode="heightFix"  class="boxItem-top-levelBg-level h-full" :src="getLevelImage(item?.goods?.level ?? 0)" />-->
      <!--            </view>-->
    </view>
    <view class="boxItem-info mt-24 ml-24 flex flex-col">
      <text class="boxItem-info-title text-16 font-normal text-black text-ellipsis">{{ item?.goods?.name }}</text>
      <view class="boxItem-info-ticket flex flex-row items-center">
        <!--                <image class="boxItem-info-ticket-img w-27 h-28" src="/static/kahe/mine/icon2.png" />-->
        <text class="boxItem-info-ticket-title text-32 font-normal text-black price-font"
        >
          {{ item?.goods?.price ?? 0 }}</text>
      </view>
      <text class="boxItem-info-num text-16 font-normal text-black"
        >数量：{{ item?.num }}</text>
      <text v-if="item?.goods?.type === 1" class="boxItem-info-num text-16 font-normal text-black"
        >仅限发货</text>
    </view>
    <view class="boxItem-lock absolute right-24 bottom-48" @tap.stop="emits('didTapLock', item)">
      <image
        class="boxItem-lock-img w-20 h-30"
        :src="
          item.status === 0
            ? '/static/kahe/box/box-goods-unlock.png'
            : '/static/kahe/box/box-goods-lock.png'
        "
      />
    </view>
    <view class="boxItem-select absolute bottom-16 right-16" @tap.stop="emits('didTapSelect', item)">
      <select-item :is-select="item.selectNum > 0" size="36rpx" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { UserGoodsModel } from "@/model";
import type { PropType } from "vue";
import { useEnum } from "@/composables/enum";
import SelectItem from "@/subPackages/box/box/components/select/index.vue";
import { getTitleByQuality } from "@/utils";
const { getLevelImage } = useEnum();

defineProps({
  item: {
    default: {} as UserGoodsModel,
    type: Object as PropType<UserGoodsModel>,
  },
});

const emits = defineEmits(["didTapSelect", "didTapLock", "didTapDetail"]);
</script>

<style lang="scss" scoped>
</style>
