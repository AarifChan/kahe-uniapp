<template>
  <view
    class="setting-cell relative w-full flex flex-row items-center px-30 py-32 min-h-90 box-border justify-between bg-white border-b border-[#f0f0f0]"
    :class="{
      'justify-center': center,
      'opacity-80': disabled,
    }"
    @click="handleClick"
  >
    <text
      class="setting-cell-title flex-shrink-0 text-30 text-[#333] leading-1.4"
      :class="{ 'text-center w-full': center }"
      >{{ title }}</text
    >
    <text
      v-if="desc"
      class="setting-cell-desc ml-auto mr-16 text-26 text-[#999] leading-1.4"
      :style="descStyle"
      >{{ desc }}</text
    >
    <image
      v-if="showArrow"
      class="setting-cell-arrow w-32 h-32 flex-shrink-0"
      style="transform: scaleX(-1); opacity: 0.5"
      mode="heightFix"
      src="/static/kahe-202510/ka-he/common/right-arrow.png"
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
  &:last-child {
    border-bottom: none;
  }

  &:active:not(.disabled) {
    opacity: 0.7;
  }
}
</style>
