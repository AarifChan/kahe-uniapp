<template>
  <view class="box-handle fixed bottom-0 left-0 w-750 flex flex-col"
    :style="{ bottom: 'env(safe-area-inset-bottom)' }"
  >
    <image
      class="box-handle-bg w-750 h-164"
      src="/static/kahe-202510/ka-he/common/box-bg.png"
    />
    <view class="box-handle-content absolute left-0 bottom-32 w-full px-32 box-border flex flex-row items-center justify-between"
    >
      <view class="box-handle-content-all flex flex-col items-center" @tap.stop="emits('didTapItem', 0)">
        <view class="box-handle-content-all-select w-34 h-32 border-2 border-[#511818] rounded-full flex flex-row items-center justify-center"
        >
          <view
            v-if="isSelectAll"
            class="box-handle-content-all-select-value w-22 h-22 bg-[#612821] rounded-full"
          />
        </view>
        <view class="box-handle-content-all-title font-normal text-20 text-[#54310f]">全选</view>
      </view>
      <view
        class="flex flex-row items-center gap-16"
      >
        <!--        <custom-button title="退货" @tap.stop="emits('didTapItem', 1)" />-->
        <custom-button title="发货" @tap.stop="emits('didTapItem', 2)" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import CustomButton from "../button/index.vue";
import SelectItem from "../select/index.vue";
// didTapItem 0: 全选，1：外仓发货 2：发货
defineProps({
  isSelectAll: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits(["didTapItem"]);
</script>

<style lang="scss" scoped>
</style>
