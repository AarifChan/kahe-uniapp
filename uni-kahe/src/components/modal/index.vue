<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    @close="emits('update:show', false)"
  >
    <view class="relative bg-transparent w-[626rpx] h-[756rpx] z-9999">
      <image
        src="/static/kahe-202510/ka-he/common/common-title.png"
        class="absolute inset-0 w-full h-full"
      />
      <view class="absolute left-0 top-0 w-full h-full rounded-10 overflow-hidden">
        <view class="w-full h-73">
          <view class="text-40 leading-73 font-normal text-white text-center theme-font text-stroke-main">{{
            title}}</view>
        </view>
        <scroll-view
          class="relative box-border w-full text-black text-[13px] leading-[25px]"
          :style="{ height: 'calc(100% - 200rpx)', padding: '8px 50rpx' }"
          :scroll-y="true"
          :enable-flex="true"
          scroll-with-animation
        >
          <rich-text :nodes="content"></rich-text>
        </scroll-view>
        <view
          class="absolute bottom-48 left-0 w-full flex flex-row items-center justify-center"
          @tap.stop="emits('update:show', false)"
        >
          <custom-button title="确定" />
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import CustomButton from "@/components/custom/button/index.vue";
import { ref, watch } from "vue";

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  title: {
    default: "",
    type: String,
  },
  content: {
    default: "",
    type: String,
  },
});

const vShow = ref(props.show);

watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const emits = defineEmits(["update:show"]);
</script>

<style lang="scss" scoped>
</style>
