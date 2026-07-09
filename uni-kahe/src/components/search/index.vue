<template>
  <view class="relative w-full">
    <view
      class="relative w-full h-67 bg-white rounded-30 flex flex-row items-center justify-between box-border border-2px border-[#000000]"
    >
      <input
        v-model="search"
        :placeholder="placeholder"
        class="pl-16 text-28 text-black w-[calc(100%-100rpx)]"
        :trim="true"
        :clearable="true"
        :placeholderStyle="placeholderStyle"
      />
      <image
        v-if="black"
        @tap.stop="emits('didTapSearch', search)"
        class="w-107 h-59"
        src="/static/kahe-202510/ka-he/home/search-new.png"
      />
      <image
        v-else
        @tap.stop="emits('didTapSearch', search)"
        class="w-38 h-38 mr-16"
        src="/static/kahe-202510/ka-he/common/search.png"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineProps({
  placeholder: {
    default: "输入关键字",
    type: String,
  },
  black: {
    default: false,
    type: Boolean,
  },
});
const search = ref("");
const placeholderStyle = "color: #A7A7A7; font-size: 14px;height:16px;";
const emits = defineEmits(["didTapSearch"]);
</script>

<style lang="scss" scoped></style>
