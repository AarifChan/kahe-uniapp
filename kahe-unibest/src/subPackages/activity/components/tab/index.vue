<template>
  <view class="activityTab">
    <view
      v-for="(item, index) in tabList"
      :id="`id${index}`"
      :key="`id${index}`"
      class="activityTab-item"
      @tap.stop="didClick(index)"
    >
      <image
        class="activityTab-item-img"
        :src="
          index === current
            ? 'https://jms.85gui7.com/kahe-202510/ka-he/welfare/btn-selected.png'
            : 'https://jms.85gui7.com/kahe-202510/ka-he/welfare/btn-normal.png'
        "
      />
      <text class="activityTab-item-title theme-font">{{ item.title }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref } from 'vue'

export interface TabItem {
  title: string
  value: number
}
const props = defineProps({
  current: {
    default: 0,
    type: Number,
  },
  tabList: {
    default: [],
    type: Array as PropType<TabItem[]>,
  },
})

const emits = defineEmits(['update:current', 'didClick'])
const current = ref(0)
function didClick(index: number) {
  current.value = index
  emits('update:current', index)
  emits('didClick', index)
}
</script>

<style lang="scss" scoped>
.activityTab {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  &-item {
    position: relative;
    width: 231rpx;
    height: 77rpx;
    &-img {
      width: 100%;
      height: 100%;
    }
    &-title {
      position: absolute;
      left: 0;
      bottom: 20rpx;
      width: 100%;
      text-align: center;
      font-weight: 400;
      font-size: 30rpx;
      color: #ffffff;
      @include text-stroke-color(#bc6953);
    }
  }
}
</style>
