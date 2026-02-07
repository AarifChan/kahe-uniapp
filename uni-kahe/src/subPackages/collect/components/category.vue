<template>
  <view class="collect">
    <scroll-view
      class="collect-category"
      :enable-flex="true"
      :scroll-x="true"
      scroll-with-animation
    >
      <view
        style="display: inline-block"
        v-for="(item, index) in categoryList"
        :key="'id' + index"
        @tap.stop="handleChange(index)"
      >
        <view class="collect-category-item">
          <image
            class="collect-category-item-icon"
            :src="
              current === index
                ? `https://jms.85gui7.com/kahe-202510/collect/cate${index}_selected.png`
                : `https://jms.85gui7.com/kahe-202510/collect/cate${index}_normal.png`
            "
          />
          <text class="collect-category-item-title">{{ item.title }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const current = ref(0);
const categoryList = ref([
  {
    title: "全部",
    value: null,
  },
  {
    title: "卡牌藏品",
    value: 1,
  },
  {
    title: "手办潮玩",
    value: 2,
  },
  {
    title: "谷子周边",
    value: 3,
  },
  {
    title: "家电生活",
    value: 4,
  },
  {
    title: "羊毛专区",
    value: 5,
  },
]);

const handleChange = (index: number) => {
  current.value = index;
  emits("didChange", categoryList.value[index]);
};

const emits = defineEmits(["didChange"]);
</script>

<style lang="scss" scoped>
.collect {
  position: relative;
  height: 140rpx;
  width: 100%;
  &-category {
    //display: flex;
    //flex-direction: row;
    white-space: nowrap;
    position: relative;
    height: 100%;
    &-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 32rpx;
      width: 100rpx;
      &-icon {
        width: 118rpx;
        height: 118rpx;
      }
      &-title {
        margin-top: -8rpx;
        font-size: 22rpx;
        font-weight: 400;
        color: #247fbc;
      }
    }
    &-item:first-child {
      margin-left: 32rpx;
    }
  }
}
</style>
