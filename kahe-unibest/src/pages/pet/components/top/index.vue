<template>
  <view class="petTop">
    <image class="petTop-bg" src="https://jms.85gui7.com/kahe-202510/pet/pet-top.png" />
    <view v-if="handle" class="petTop-right">
      <icon-button
        v-for="(item, index) in itemList" :key="`iconBtn${index}`" :icon="`https://jms.85gui7.com/kahe-202510/pet/item${index + 1}.png`" :title="item.title"
        @tap.stop="emits('didClickItem', index)"
      />
    </view>
    <view v-if="eggs" class="petTop-eggs" @tap.stop="emits('didClickEgg')">
      <text class="petTop-eggs-title theme-font text-stroke">点击敲碎蛋壳，孵化宠物</text>
      <image class="petTop-eggs-target" src="https://jms.85gui7.com/kahe-202510/pet/eggs.png" />
      <image class="petTop-eggs-shadow" src="https://jms.85gui7.com/kahe-202510/pet/shadow.png" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IconButton from '../iconButton/index.vue'

defineProps({
  handle: {
    default: true,
    type: Boolean,
  },
  eggs: {
    default: false,
    type: Boolean,
  },
})
const emits = defineEmits(['didClickItem', 'didClickEgg'])
const itemList = ref([
  {
    title: '图鉴',
  },
  {
    title: '探险',
  },
  {
    title: '孵化',
  },
  // {
  //     title: '喂养'
  // },
  {
    title: '融合',
  },
])
</script>

<style lang="scss" scoped>
.petTop {
  position: relative;
  width: 100%;
  height: 600rpx;
  margin-bottom: 16rpx;
  &-bg {
    width: 100%;
    height: 600rpx;
  }
  &-right {
    position: absolute;
    right: 16rpx;
    top: 16rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-eggs {
    position: absolute;
    top: 112rpx;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-title {
      font-weight: 400;
      font-size: 32rpx;
      color: #f9fcff;
      text-align: center;
    }
    &-target {
      margin-top: 16px;
      width: 216rpx;
      height: 347rpx;
      z-index: 1;
    }
    &-shadow {
      margin-left: 7rpx;
      position: relative;
      margin-top: -52rpx;
      width: 230rpx;
      height: 54rpx;
    }
  }
}
</style>
