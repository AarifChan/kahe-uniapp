<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    @close="emits('update:show', false)"
    bg-color="transparent"
  >
    <view class="relative w-680 h-914">
      <image
        class="relative w-full h-full"
        src="/static/kahe-202510/ka-he/product/swap-bg.png"
      />
      <view class="absolute left-0 top-0 w-full h-full flex flex-col">
        <view class="mt-67 ml-67 flex flex-row items-center justify-start">
          <view
            class="mr-36 flex flex-row items-center"
            v-for="(item, index) in sortList"
            :key="'sorted-item' + index"
            @tap.stop="didTapSort(index)"
          >
            <text
              class="text-32 font-normal text-[#ba936c]"
              :class="sortIndex === index ? 'text-[#562516]' : ''"
              >#{{ item.title }}</text
            >
            <image
              class="w-24 h-27"
              :src="
                index === sortIndex
                  ? '/static/kahe-202510/ka-he/product/sort.png'
                  : '/static/kahe-202510/ka-he/product/un-sort.png'
              "
            />
          </view>
        </view>

        <scroll-view
          class="flex-nowrap mt-24 ml-54 h-64 whitespace-nowrap"
          style="width: calc(100% - 90rpx)"
          :enable-flex="true"
          :scroll-x="true"
        >
          <view
            class="mr-24 inline-block text-center w-195 h-60 text-[#3c3c3c] leading-60 rounded-2 border-2 border-[#ba936c] bg-transparent"
            v-for="(item, index) in boxRangeList"
            :key="index"
            :class="tabIndex === index ? 'text-[#562516] font-bold' : ''"
            @tap.stop="tabTapAction(index)"
            >{{ item.title }}</view
          >
        </scroll-view>

        <scroll-view
          class="ml-68 relative flex-nowrap mt-24 h-50 whitespace-nowrap"
          style="width: calc(100% - 68rpx - 16rpx)"
          :enable-flex="true"
          :scroll-x="true"
        >
          <view
            class="inline-block mr-27 leading-50 text-28 font-normal text-[rgba(124,63,44,0.55)]"
            v-for="(item, index) in levelList"
            :key="'swap-enum-item' + index"
            :class="levelIndex === index ? 'text-[#562516]' : ''"
            @tap.stop="tabLevelOption(index)"
            >{{ getNormalLevelNameByLevel(item.level) }}</view
          >
        </scroll-view>

        <scroll-view
          :enable-flex="true"
          :scroll-y="true"
          scroll-with-animation
          class="py-24 px-48 relative w-full h-628"
        >
          <view
            class="relative inline-block w-full aspect-ratio-[618/199] mb-24"
            v-for="(item, index) in boxList"
            :key="'boxList-item' + index"
            @tap.stop="didSelectBox(index)"
          >
            <image
              class="w-full h-full"
              src="/static/kahe-202510/ka-he/product/swap-item.png"
            />
            <view
              class="absolute right-0 top-0 w-full h-full flex flex-col items-center justify-between"
            >
              <view
                class="py-18 px-30 box-border w-full flex flex-row items-center justify-between"
              >
                <view class="font-normal text-25 text-[#562516]"
                  >#{{ item.boxSeqNo }}</view
                >
                <view class="font-normal text-22 text-[#ff6600]"
                  >余{{ item.num }}抽</view
                >
              </view>
              <scroll-view
                class="relative w-full py-8 px-40 box-border"
                style="height: calc(100% - 100rpx)"
                :enable-flex="true"
                :scroll-y="true"
                scroll-with-animation
              >
                <view
                  class="grid"
                  style="grid-template-columns: repeat(auto-fill, minmax(30%, 1fr)); gap: 0"
                >
                  <text
                    class="inline-block w-full h-30 mb-20 text-24 font-normal text-[#562516] text-left"
                    v-for="(lItem, lIndex) in item.list"
                    :key="index + 'lIndex' + lIndex"
                    >{{ lItem.title }}:{{ lItem.num }}/{{ lItem.total }}</text
                  >
                </view>
              </scroll-view>
            </view>
            <view
              class="absolute bottom-4 right-4 w-54 h-24 bg-[#562516] text-18 font-normal text-white text-center"
              v-if="item.isCurrent"
              >当前</view
            >
          </view>
        </scroll-view>
      </view>

      <image
        class="absolute top-0 right-0 w-74 h-74"
        src="/static/kahe-202510/ka-he/product/close.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import { type PropType, ref, watch } from "vue";
import { useProductDetail } from "@/composables/product/detail";
import { useEnum } from "@/composables/enum";

const { getNormalLevelNameByLevel } = useEnum();
import type {
  UIProductBoxRangeType,
  UIProductSwapItemModel,
  UIProductDetailLevelList,
} from "@/model";

const { boxParams } = useProductDetail();
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  boxList: {
    type: Array as PropType<UIProductSwapItemModel[]>,
    default: [] as UIProductSwapItemModel[],
  },
  levelList: {
    default: [] as UIProductDetailLevelList[],
    type: Array as PropType<UIProductDetailLevelList[]>,
  },
  boxRangeList: {
    default: [] as UIProductBoxRangeType[],
    type: Array as PropType<UIProductBoxRangeType[]>,
  },
});
const vShow = ref(false);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

/// 换箱操作
const sortList = ref([
  {
    title: "箱号",
    value: 2,
  },
  {
    title: "余量",
    value: 1,
  },
]);
const sortIndex = ref(0);

const tabIndex = ref(0);
const levelIndex = ref(0);

const emits = defineEmits([
  "update:show",
  "didSelectBox",
  "didTabChangeBoxRange",
]);
const tabTapAction = async (index: number) => {
  tabIndex.value = index;

  emits("didTabChangeBoxRange", {
    max: (index + 1) * 50,
    min: index * 50 + 1,
  });
};
const didTapSort = async (index: number) => {
  sortIndex.value = index;
  boxParams.value.sflag = sortList.value[sortIndex.value].value;
};
const tabLevelOption = async (index: number) => {
  levelIndex.value = index;
  boxParams.value.level = props.levelList[levelIndex.value].level;
};

const didSelectBox = (index: number) => {
  emits("update:show", false);
  emits("didSelectBox", props.boxList[index].id);
};
</script>

<style lang="scss" scoped></style>
