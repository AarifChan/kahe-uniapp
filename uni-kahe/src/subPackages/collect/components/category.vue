<template>
  <view class="relative h-140 w-full flex items-center">
    <view class="w-full flex flex-row justify-between px-32">
      <view
        class="flex flex-col items-center w-100"
        v-for="(item, index) in categoryList"
        :key="'id' + index"
        @tap.stop="handleChange(index)"
      >
        <image
          class="w-118 h-118"
          :src="
            current === index
              ? `/static/kahe-202510/jikaquan/cate_${item.value}_selected.png`
              : `/static/kahe-202510/jikaquan/cate_${item.value}_normal.png`
          "
          mode="aspectFit"
        />
        <text
          class="text-22 font-normal text-#247fbc"
          style="margin-top: -8rpx"
          >{{ item.title }}</text
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const current = ref(0);
const categoryList = ref([
  {
    title: "评级卡",
    value: 1,
  },
  {
    title: "珍藏卡包",
    value: 2,
  },
  {
    title: "精美卡牌",
    value: 3,
  },
  {
    title: "卡牌周边",
    value: 4,
  },
  {
    title: "优惠券",
    value: 5,
  },
]);

const handleChange = (index: number) => {
  current.value = index;
  emits("didChange", categoryList.value[index]);
};

const emits = defineEmits(["didChange"]);
</script>
