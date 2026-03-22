<template>
  <view class="box-detail-handle">
    <custom-button
      v-for="(item, index) in handleList"
      :key="index"
      size="small"
      :title="item.title"
      @tap.stop="emits('didClickItem', item.value)"
    />
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/store/app'

import CustomButton from '@/subPackages/box/box/components/button/index.vue'

const emits = defineEmits(['didClickItem'])
const appStore = useAppStore()
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
  return appStore.featureSmashRefundEnabled
})
const handleList = ref(
  featureSmashRefundEnabled.value
    ? [
        {
          title: '全选',
          value: 0,
        },
        {
          title: '协商退货',
          value: 1,
        },
        {
          title: '发货',
          value: 2,
        },
        {
          title: '上锁',
          value: 3,
        },
      ]
    : [
        {
          title: '全选',
          value: 0,
        },
        {
          title: '发货',
          value: 2,
        },
        {
          title: '上锁',
          value: 3,
        },
      ],
)
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
