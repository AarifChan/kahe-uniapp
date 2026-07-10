<template>
  <view
    class="box-detail-handle left-0 fixed flex flex-row items-center justify-evenly"
    :style="{
      bottom: 'env(safe-area-inset-bottom)',
      width: 'calc(100% - 16rpx)',
      padding: '0 8rpx',
    }"
  >
    <custom-button
      v-for="(item, index) in handleList"
      size="small"
      :key="index"
      @tap.stop="emits('didClickItem', item.value)"
      :title="item.title"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { AppModule } from "@/store/modules/app";
import CustomButton from "@/subPackages/box/box/components/button/index.vue";

const featureSmashRefundEnabled = computed(() => {
  return AppModule.featureSmashRefundEnabled;
});
const handleList = ref(
  featureSmashRefundEnabled.value
    ? [
        {
          title: "全选",
          value: 0,
        },
        {
          title: "发货",
          value: 2,
        },
        {
          title: "上锁",
          value: 3,
        },
      ]
    : [
        {
          title: "全选",
          value: 0,
        },
        {
          title: "发货",
          value: 2,
        },
        {
          title: "上锁",
          value: 3,
        },
      ]
);

const emits = defineEmits(["didClickItem"]);
</script>

<style lang="scss" scoped>
</style>
