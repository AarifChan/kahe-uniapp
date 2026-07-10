<template>
  <view class="fixed left-0 w-750 h-140 bottom-0 flex flex-col bg-white">
    <view
      class="absolute left-0 bottom-32 w-full px-32 box-border flex flex-row items-center justify-between"
    >
      <view
        class="flex flex-col items-center"
        @tap.stop="emits('didTapItem', 0)"
      >
        <view
          class="w-34 h-32 border-2 border-[#151714] rounded-full flex flex-row items-center justify-center"
        >
          <view
            v-if="isSelectAll"
            class="w-22 h-22 bg-[#151714] rounded-full"
          />
        </view>
        <view class="font-normal text-20 text-[#151714]">全选</view>
      </view>
      <view class="flex flex-row items-center gap-16">
        <!--        <custom-button title="退货" @tap.stop="emits('didTapItem', 1)" />-->
        <custom-button title="提货" @tap.stop="emits('didTapItem', 2)" />
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

<style lang="scss" scoped></style>
