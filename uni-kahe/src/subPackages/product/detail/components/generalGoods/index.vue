<template>
  <view class="goodsBox inline-block relative">
    <view class="goodsBox-top relative w-200 h-200 bg-[rgba(253,239,204,0.72)] rounded-10 border-5 border-[#fcd570]">
      <view class="goodsBox-top-after absolute left-0 top-0 right-0 bottom-0 rounded-10 border-4 border-[#e2af2f] pointer-events-none" />
      <view class="goodsBox-top-image absolute left-0 top-0 rounded-12 w-full h-full flex flex-row justify-center items-center">
        <image
          class="goodsBox-top-image-img w-full h-full"
          :src="item.image"
          mode="heightFix"
          :style="{ width: 'calc(100% - 24rpx)', height: 'calc(100% - 24rpx)' }"
        />
      </view>

      <view v-if="!item.isHide && !isInfinite" class="goodsBox-top-numBg absolute right-0 bottom-0 w-87 h-54 z-10">
        <image
          class="goodsBox-top-numBg-bg w-full h-full"
          src="/static/kahe-202510/ka-he/common/num_bg.png"
        />
        <text class="goodsBox-top-numBg-num absolute right-0 bottom-0 w-87 leading-54 text-center text-18 text-black" v-if="item.isSky">{{
          item.num
        }}</text>
        <text class="goodsBox-top-numBg-num absolute right-0 bottom-0 w-87 leading-54 text-center text-18 text-black" v-else-if="item.isStrand"
          >串{{ item.total }}</text
        >
        <text class="goodsBox-top-numBg-num absolute right-0 bottom-0 w-87 leading-54 text-center text-18 text-black" v-else
          >{{ item.last }}/{{ item.total }}</text
        >
      </view>
      <view class="goodsBox-top-quality absolute left-8 py-4 px-8 text-[#222] text-20 bg-[#f6ac41] rounded-4"
        :style="{ bottom: '4px' }"
        >{{
        getTitleByQuality(item.quality)
      }}</view>
      <view class="goodsBox-top-empty absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.73)] flex flex-row justify-center items-center" v-if="item.isSellOut">
        <image
          class="goodsBox-top-empty-img w-132 h-113"
          src="/static/kahe-202510/product/sell-out.png"
        />
      </view>
      <image
        v-if="!item.isHide"
        class="goodsBox-top-level absolute -left-24 -top-24 w-100 h-80 z-10"
        mode="widthFix"
        :src="getLevelImageByLevel(item.level)"
      />
      <image
        v-if="item.isDemon"
        class="goodsBox-top-king absolute -top-36 -right-16 w-107 h-72 z-10"
        src="/static/kahe-202510/common/king.png"
      />
    </view>
    <view class="goodsBox-info mt-8 flex flex-col">
      <view
        class="goodsBox-info-title w-200 text-black text-ellipsis"
        :style="{ color: showPrice ? '#000000' : '#ffffff', fontSize: '10px' }"
        >{{ item.title }}</view
      >
      <view v-if="showPrice">
        <view class="goodsBox-info-priceTip w-200" :style="{ color: '#909090', fontSize: '9px' }" v-if="!item.isHide"
          >套系参与价为本次抽取支付金额，非单卡售价</view
        >
        <view class="goodsBox-info-subTitle" :style="{ color: '#909090', fontSize: '9px' }" v-if="!item.isHide"
          >套系参与价：{{ goodsPrice }}</view
        >
        <view class="goodsBox-info-prob" :style="{ color: '#55d8b0', fontSize: '9px' }" v-if="item.isSky"
          >{{ item.prob }}~{{ item.weight }}抽完赠送</view
        >
        <view class="goodsBox-info-prob" :style="{ color: '#55d8b0', fontSize: '9px' }" v-else-if="item.isSpec">只赠不售</view>
        <view class="goodsBox-info-prob" :style="{ color: '#55d8b0', fontSize: '9px' }" v-else> 获得概率{{ item.prob }}%</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { UIProductBoxModel } from "@/model";
import type { PropType } from "vue";
import { useEnum } from "@/composables/enum";
import { getTitleByQuality } from "@/utils/index";
const { getLevelImageByLevel } = useEnum();

defineProps({
  goodsPrice: {
    default: 0,
    type: Number,
  },
  showPrice: {
    default: true,
    type: Boolean,
  },
  item: {
    default: {} as UIProductBoxModel,
    type: Object as PropType<UIProductBoxModel>,
  },
  info: {
    default: true,
    type: Boolean,
  },
  level: {
    default: true,
    type: Boolean,
  },
  nums: {
    default: true,
    type: Boolean,
  },
  isInfinite: {
    default: false,
    type: Boolean,
  },
  isSelect: {
    default: false,
    type: Boolean,
  },
  quality: {
    default: 0,
    type: Number,
  },
});
</script>

<style lang="scss" scoped>
</style>
