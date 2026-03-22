<template>
  <view class="all">
    <view
      v-for="(item, index) in sortList"
      :key="index"
      class="all-tabItem"
      :class="sortIndex === item.value ? 'active' : ''"
      @tap.stop="sortTabAction(item)"
    >
      <text
        class="all-tabItem-text"
        :class="sortIndex === item.value ? 'textColor' : ''"
        :style="{ opacity: sortIndex === item.value ? 1 : 0.45 }"
      >
        {{ getNormalLevelNameByLevel(item.value) }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEnum } from '@/composables/enum'

defineProps({
  sortList: {
    type: Array as any,
    default: [],
  },
})
const emits = defineEmits(['sortTabAction'])
const { getNormalLevelNameByLevel } = useEnum()
const sortIndex = ref(-1)
function sortTabAction(i: any) {
  sortIndex.value = i.value
  emits('sortTabAction', i)
}
</script>

<style lang="scss" scoped>
.all {
  width: calc(100% - 50rpx);
  display: flex;
  margin-top: 20rpx;
  padding: 0 25rpx 8rpx 25rpx;
  position: relative;
  overflow-x: scroll;
  box-sizing: border-box;
  &-tabItem {
    width: 110rpx;
    height: 56rpx;
    margin-right: 8rpx;
    text-align: center;
    line-height: 56rpx;
    background: #e8ad82;
    border-radius: 18rpx;
    flex-shrink: 0;
    &-text {
      font-size: 13px;
      font-weight: 400;
      color: #ffffff;
      &.textColor {
        color: #ffffff;
      }
    }
    &.active {
      background: #ac5a3e;
    }
  }
}
</style>
