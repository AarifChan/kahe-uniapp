<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    @close="emits('update:show', false)"
    bg-color="transparent"
  >
    <view class="swap">
      <image class="swap-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/product/swap-bg.png" />
      <view class="swap-content">
        <view class="swap-sort">
          <view
            class="swap-sort-item"
            v-for="(item, index) in sortList"
            :key="'sorted-item' + index"
            @tap.stop="didTapSort(index)"
          >
            <text
              class="swap-sort-item-title"
              :class="sortIndex === index ? 's_active' : ''"
              >#{{ item.title }}</text
            >
            <image
              class="swap-sort-item-img"
              :src="
                index === sortIndex
                  ? 'https://jms.85gui7.com/kahe-202510/ka-he/product/sort.png'
                  : 'https://jms.85gui7.com/kahe-202510/ka-he/product/un-sort.png'
              "
            />
          </view>
        </view>

        <scroll-view class="swap-option" :enable-flex="true" :scroll-x="true">
          <view
            class="swap-option-item"
            v-for="(item, index) in boxRangeList"
            :key="index"
            :class="tabIndex === index ? 't_active' : ''"
            @tap.stop="tabTapAction(index)"
            >{{ item.title }}</view
          >
        </scroll-view>

        <scroll-view class="swap-level" :enable-flex="true" :scroll-x="true">
          <view
            class="swap-level-item"
            v-for="(item, index) in levelList"
            :key="'swap-enum-item' + index"
            :class="levelIndex === index ? 's_active' : ''"
            @tap.stop="tabLevelOption(index)"
            >{{ getNormalLevelNameByLevel(item.level) }}</view
          >
        </scroll-view>

        <scroll-view
          :enable-flex="true"
          :scroll-y="true"
          scroll-with-animation
          class="swap-box"
        >
          <view
            class="swap-box-item"
            v-for="(item, index) in boxList"
            :key="'boxList-item' + index"
            @tap.stop="didSelectBox(index)"
          >
            <image
              class="swap-box-item-bg"
              src="https://jms.85gui7.com/kahe-202510/ka-he/product/swap-item.png"
            />
            <view class="swap-box-item-content">
              <view class="swap-box-item-content-top">
                <view class="swap-box-item-content-top-left"
                  >#{{ item.boxSeqNo }}</view
                >
                <view class="swap-box-item-content-top-right"
                  >余{{ item.num }}抽</view
                >
              </view>
              <scroll-view
                class="swap-box-item-content-right"
                :enable-flex="true"
                :scroll-y="true"
                scroll-with-animation
              >
                <view class="swap-box-item-content-right-content">
                  <text
                    class="swap-box-item-content-right-content-item"
                    v-for="(lItem, lIndex) in item.list"
                    :key="index + 'lIndex' + lIndex"
                    >{{ lItem.title }}:{{ lItem.num }}/{{ lItem.total }}</text
                  >
                </view>
              </scroll-view>
            </view>
            <view class="swap-box-item-current" v-if="item.isCurrent"
              >当前</view
            >
          </view>
        </scroll-view>
      </view>

      <image
        class="swap-close"
        src="https://jms.85gui7.com/kahe-202510/ka-he/product/close.png"
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

<style lang="scss" scoped>
.swap {
  position: relative;
  width: 680rpx;
  height: 914rpx;
  &-bg {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &-option {
    flex-wrap: nowrap;
    margin-top: 24rpx;
    margin-left: 54rpx;
    width: calc(100% - 90rpx);
    height: 64rpx;
    white-space: nowrap;
    &-item {
      margin-right: 24rpx;
      display: inline-block;
      text-align: center;
      width: 195rpx;
      height: 60rpx;
      color: #3c3c3c;
      line-height: 60rpx;
      border-radius: 2rpx;
      border: 2rpx solid #ba936c;
      background: rgba(0, 0, 0, 0);
    }
  }
  &-level {
    margin-left: 68rpx;
    position: relative;
    flex-wrap: nowrap;
    margin-top: 24rpx;
    width: calc(100% - 68rpx - 16rpx);
    height: 50rpx;
    white-space: nowrap;
    &-item {
      display: inline-block;
      margin-right: 27rpx;
      line-height: 50rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: rgba($color: #7c3f2c, $alpha: 0.55);
    }
  }
  &-sort {
    margin-top: 67rpx;
    margin-left: 67rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    &-item {
      margin-right: 36rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      &-title {
        font-size: 32rpx;
        font-weight: 400;
        color: #ba936c;
      }
      &-img {
        width: 24rpx;
        height: 27rpx;
      }
    }
  }
  &-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 74rpx;
    height: 74rpx;
  }

  &-box {
    padding: 24rpx 48rpx;
    position: relative;
    width: 100%;
    height: 628rpx;
    &-item {
      position: relative;
      display: inline-block;
      width: 100%;
      aspect-ratio: 618 / 199;
      margin-bottom: 24rpx;
      &-bg {
        width: 100%;
        height: 100%;
      }
      &-current {
        position: absolute;
        bottom: 4rpx;
        right: 4rpx;
        width: 54rpx;
        height: 24rpx;
        background: #562516;
        //clip-path: polygon(0 0, 100% 0, 100% 100%, 8px 100%);
        font-size: 18rpx;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
      }
      &-content {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        &-top {
          padding: 18rpx 30rpx;
          box-sizing: border-box;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          &-left {
            font-weight: 400;
            font-size: 25rpx;
            color: #562516;
          }

          &-right {
            font-weight: 400;
            font-size: 22rpx;
            color: #ff6600;
          }
        }
        &-right {
          position: relative;
          width: 100%;
          padding: 8rpx 40rpx;
          box-sizing: border-box;
          height: calc(100% - 100rpx);
          &-content {
            display: grid;
            grid-template-columns: repeat(
              auto-fill,
              minmax(30%, 1fr)
            ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
            grid-gap: 0; // 这是网格间的间隙，根据需要调整
            &-item {
              display: inline-block;
              width: 100%;
              height: 30rpx;
              margin-bottom: 20rpx;
              font-size: 24rpx;
              font-weight: 400;
              color: #562516;
              text-align: left;
            }
          }
        }
      }
    }
  }
}

.t_active {
  color: #562516;
  font-weight: bold;
}
.s_active {
  color: #562516;
}
</style>
