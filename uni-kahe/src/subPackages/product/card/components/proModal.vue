<template>
  <view class="pro relative w-681 h-full pl-12">
    <view class="pro-level relative w-full flex overflow-x-auto">
      <view
        class="pro-level-item flex-shrink-0 mr-12 mt-20 px-24 h-75 bg-white rounded-18 flex flex-col items-center justify-center text-24 text-[#95c3fa] border-2 border-[#91bff8]"
        v-for="(item, index) in levelGroupList"
        :key="index"
        @tap.stop="sortTabAction(index)"
        :class="sortIndex === index ? 'bg-[#93c2fa] text-white' : ''"
      >
        <view class="pro-level-item-title">{{
          getNormalLevelNameByLevel(item.level)
        }}</view>
        <view class="pro-level-item-pros">{{ item.prob }}</view>
      </view>
    </view>
    <view class="pro-list relative mt-38 flex flex-col"
      style="width: calc(100% - 18rpx); display: grid; grid-template-columns: repeat(auto-fill, minmax(20%, 1fr)); gap: 18rpx;"
    >
      <view
        class="pro-list-goods relative w-146 h-198"
        v-for="(item, index) in levelGroupList[sortIndex].items"
        :key="index"
        @tap.stop="didClickItem(item)"
      >
        <image class="pro-list-goods-item absolute left-0 top-0 w-full h-full" :src="item.image" />
      </view>
    </view>
    <detail-modal v-model:show="infoShow" :item="currentBox" />
  </view>
</template>
<script setup lang="ts">
import type {
  UIProductBoxModel,
  UIProductDetailLevelGroup,
  UIProductDetailLevelGroupItem,
  UIProductDetailLevelList,
  UserGoodsModel,
} from "@/model";
import { ref } from "vue";
import DetailModal from "@/components/modal/detail/index.vue";
import { useEnum } from "@/composables/enum";

const { getNormalLevelNameByLevel } = useEnum();

defineEmits(["sortTabAction"]);

const currentBox = ref({} as UIProductDetailLevelGroupItem);

const infoShow = ref(false);

const didClickItem = (item: UIProductDetailLevelGroupItem) => {
  currentBox.value = item;
  infoShow.value = true;
};

defineProps({
  list: {
    type: Array as () => UIProductBoxModel[],
    default: [] as UIProductBoxModel[],
  },
  levelGroupList: {
    type: Array as () => UIProductDetailLevelGroup[],
    default: [] as UIProductDetailLevelGroup[],
  },
  levelList: {
    type: Array as () => UIProductDetailLevelList[],
    default: [] as UIProductDetailLevelList[],
  },
});

const sortIndex = ref(0);
const sortTabAction = (i: number) => {
  sortIndex.value = i;
};
</script>
<style lang="scss" scoped>
</style>
