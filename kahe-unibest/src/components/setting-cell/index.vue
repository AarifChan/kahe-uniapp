<template>
  <view class="setting-cell" :class="{ 'setting-cell-center': center }" @click="handleClick">
    <text class="setting-cell-title">{{ title }}</text>
    <text v-if="desc" class="setting-cell-desc" :style="descStyle">{{ desc }}</text>
    <image
      v-if="showArrow"
      class="setting-cell-arrow"
      mode="heightFix"
      src="https://jms.85gui7.com/kahe-202510/ka-he/common/right-arrow.png"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  /** 标题 */
  title: string;
  /** 描述文字 */
  desc?: string;
  /** 描述文字颜色 */
  descColor?: string;
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否居中 */
  center?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  desc: '',
  descColor: '#999',
  showArrow: true,
  disabled: false,
  center: false,
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const descStyle = computed(() => {
  return { color: props.descColor };
});

const handleClick = () => {
  if (props.disabled) return;
  emit('click');
};
</script>

<style lang="scss" scoped>
.setting-cell {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 32rpx 30rpx;
  min-height: 90rpx;
  box-sizing: border-box;
  justify-content: space-between;
  border-bottom: 1rpx solid #f0f0f0;
  width: 100%;
  position: relative;
  background: #fff;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    opacity: 0.7;
  }

  &-title {
    font-size: 30rpx;
    color: #333;
    line-height: 1.4;
    flex-shrink: 0;
  }

  &-desc {
    font-size: 26rpx;
    color: #999;
    line-height: 1.4;
    margin-left: auto;
    margin-right: 16rpx;
  }

  &-arrow {
    width: 32rpx;
    height: 32rpx;
    flex-shrink: 0;
    transform: scaleX(-1);
    opacity: 0.5;
  }

  &-disabled {
    opacity: 0.8;
    &:active {
      opacity: 0.8;
    }
  }

  &-center {
    justify-content: center;
    .setting-cell-title {
      text-align: center;
      width: 100%;
    }
  }
}
</style>
