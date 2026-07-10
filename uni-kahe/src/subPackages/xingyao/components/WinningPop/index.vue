<script setup lang="ts">
import TnPopup from "@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue";
import CustomGoods from "../CustomGoods/index.vue";
import { PropType } from "vue";
import { ShingingLog } from "../../api";
import Empty from "@/components/empty/index.vue";
const modelValue = defineModel<boolean>();
defineProps({
  list: {
    default: () => [],
    type: Array as PropType<Array<ShingingLog>>,
  },
  type: {
    default: 2,
    type: Number,
  },
});
const emits = defineEmits(["scrolltolower"]);
</script>

<template>
  <TnPopup
    v-model="modelValue"
    width="100%"
    bg-color="transparent"
    :custom-style="{ overflow: 'visible' }"
  >
    <view class="pop w-full py-90 px-30 relative h-916 box-border flex flex-col">
      <view class="pop-topIcon absolute -top-45 left-0 w-397 h-125">
        <image
          src="/static/kahe-202510/shine/left-top.png"
          mode="scaleToFill"
          class="icon relative w-full h-full"
        />
        <text class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 theme-font text-36 text-black leading-22" :style="{ top: '55%' }">{{ type === 2 ? "本期记录" : "往期欧皇" }}</text>
      </view>
      <image src="/static/kahe-202510/shine/pop-bg.png" mode="scaleToFill" class="pop-bg absolute h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :style="{ width: 'calc(100% - 50rpx)', zIndex: -1 }" />
      <scroll-view
        :scroll-y="true"
        class="container flex-1 min-h-0 overflow-auto"
        @scrolltolower="emits('scrolltolower')"
      >
        <view class="container-content px-30 box-border">
          <CustomGoods
            v-for="(item, index) in list"
            :key="item.id"
            :id="item.id"
            :item="item"
            :type="type"
          />
          <empty :show="list.length === 0" />
        </view>
      </scroll-view>
    </view>
  </TnPopup>
</template>

<style lang="scss" scoped>
</style>
