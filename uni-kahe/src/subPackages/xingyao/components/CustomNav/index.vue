<template>
  <view class="relative mt-60 w-full h-475 flex justify-center">
    <view class="relative w-468 h-full flex flex-col items-center">
      <image
        src="/static/kahe-202510/shine/nav.png"
        mode="scaleToFill"
        class="absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <image
        mode="aspectFit"
        class="goods mt-46 mb-34 w-282 h-282"
        :src="info?.prizePool[0].goodsDto.image"
      />
      <view
        class="relative w-313 h-46 bg-[#62e2fc] flex justify-center items-center"
      >
        <view
          class="absolute bottom-0 right-0 w-0 h-0"
          :style="{
            borderTop: '20rpx solid transparent',
            borderRight: '20rpx solid #fff',
            borderBottom: '0',
            borderLeft: '0',
          }"
        ></view>
        <view
          class="absolute left-0 top-0 w-0 h-0"
          :style="{
            borderBottom: '20rpx solid transparent',
            borderLeft: '20rpx solid #fff',
            borderTop: '0',
            borderRight: '0',
          }"
        ></view>
        <text class="theme-font font-normal text-30 text-white leading-48">{{
          info?.prizePool[0].goodsDto.name
        }}</text>
      </view>
      <view
        class="absolute bottom-4 left-1/2 -translate-x-1/2 theme-font font-normal text-26 text-white"
        :style="{
          textShadow:
            '-1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000',
        }"
      >
        本期赠品
      </view>
      <view class="top absolute -top-66 -left-92 w-201 h-80">
        <image
          src="/static/kahe-202510/shine/top.png"
          mode="scaleToFill"
          class="top-bg relative w-full h-full"
        />
        <text
          class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 theme-font font-normal text-22 text-white"
          :style="{ top: '40%' }"
          >第{{ info?.id ?? 0 }}期</text
        >
      </view>
    </view>
    <view class="absolute right-18 top-100 z-3">
      <view
        class="relative w-82 h-94 bg-[url(/static/kahe-202510/shine/btn.png)] bg-no-repeat flex items-center justify-center mb-25"
        :style="{ backgroundSize: '100%' }"
        v-for="item in itemList"
        :key="item.key"
        :id="item.key"
        @tap.stop="tapNav(item)"
      >
        <image
          :src="item.icon"
          mode="scaleToFill"
          class="item-icon w-41 h-46"
        />
        <view
          class="text w-full flex justify-center absolute -bottom-12 left-1/2 -translate-x-1/2 theme-font font-normal text-26 text-white"
          :style="{
            textShadow:
              '-1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000',
          }"
          >{{ item.text }}</view
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ShingingInfo } from "../../api/index";
import { PropType } from "vue";

const emit = defineEmits<{
  (e: "tapNav", item: any): void;
}>();
const props = defineProps({
  info: {
    default: {},
    type: Object as PropType<ShingingInfo>,
  },
  backGround: {
    type: String,
    default: "",
  },
  border: {
    type: Number,
    default: 4,
  },
  list: {
    type: Array,
    default: () => [],
  },
});
import { onMounted, Prop, ref, watch } from "vue";

const itemList = ref([
  { icon: "/static/kahe-202510/shine/icon1.png", text: "规则", key: 1 },
  { icon: "/static/kahe-202510/shine/icon2.png", text: "往期", key: 2 },
]);

const tapNav = (item: any) => {
  emit("tapNav", item);
};

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
