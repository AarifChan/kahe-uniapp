<template>
  <view class="pro">
    <view class="pro-level">
      <view
        class="pro-level-item"
        v-for="(item, index) in levelGroupList"
        :key="index"
        @tap.stop="sortTabAction(index)"
        :class="sortIndex === index ? 'active' : ''"
      >
        <view class="pro-level-item-title">{{
          getNormalLevelNameByLevel(item.level)
        }}</view>
        <view class="pro-level-item-pros">{{ item.prob }}</view>
      </view>
    </view>
    <view class="pro-list">
      <view
        class="pro-list-goods"
        v-for="(item, index) in levelGroupList[sortIndex].items"
        :key="index"
        @tap.stop="didClickItem(item)"
      >
        <image class="pro-list-goods-item" :src="item.image" />
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
.pro {
  position: relative;
  width: 681rpx;
  height: 100%;
  padding-left: 12rpx;
  box-sizing: border-box;
  &-level {
    width: 100%;
    position: relative;
    display: flex;
    overflow-x: auto;
    &-item {
      flex-shrink: 0;
      margin-right: 12rpx;
      margin-top: 20rpx;
      padding: 0 24rpx;
      //width: 96rpx;
      height: 75rpx;
      background: #fff;
      border-radius: 18rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      font-size: 24rpx;
      color: #95c3fa;
      border: 2rpx solid #91bff8;
      &.active {
        background: #93c2fa;
        color: #fff;
      }
    }
  }
  &-list {
    width: calc(100% - 18rpx);
    position: relative;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(20%, 1fr)
    ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
    grid-gap: 18rpx; // 这是网格间的间隙，根据需要调整
    margin-top: 38rpx;
    box-sizing: border-box;
    &-goods {
      position: relative;
      width: 146rpx;
      height: 198rpx;
      &-item {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
