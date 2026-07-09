<template>
  <view
    class="relative py-32 px-0 text-24 text-[#9a9a9a] min-h-240 text-center flex flex-col items-center justify-center"
    style="width: calc(750rpx - 64rpx)"
    v-if="show"
    >{{ tips }}</view
  >
</template>
<script setup lang="ts">
defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  tips: {
    default: "暂无更多数据",
    type: String,
  },
});
</script>

<style scoped lang="scss"></style>
