<template>
  <view class="box-detail-handle">
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
// const handleList = ref(["全选", "协商退货", "发货", "上锁"]);
// const handleList = ref([
//   {
//     title: "全选",
//     value: 0,
//   },
//   {
//     title: "发货",
//     value: 2,
//   },
//   {
//     title: '"上锁"',
//     value: 3,
//   },
// ]);

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
          title: "协商退货",
          value: 1,
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
.box-detail-handle {
  bottom: env(safe-area-inset-bottom);
  left: 0;
  position: fixed;
  width: calc(100% - 16rpx);
  padding: 0 8rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
</style>
