<template>
  <view
    v-if="show"
    class="fixed left-0 top-0 z-999 flex h-screen w-full flex-row items-center justify-center bg-[rgba(0,0,0,0.8)]"
  >
    <view class="relative flex flex-col items-center justify-start">
      <image
        class="h-1144 w-750"
        src="/static/kahe-202510/login/login-bg.png"
      />
      <view
        class="absolute left-0 top-260 flex w-full flex-col items-center justify-center"
      >
        <view class="mb-20 h-69 w-373" />
        <image
          class="mb-20 h-69 w-373"
          src="/static/kahe-202510/login/login-title1.png"
        />
        <login-item
          v-for="(item, index) in items"
          :key="index + 'item'"
          :item="item"
        />
        // #ifdef MP-WEIXIN
        <view
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          "
        >
          <custom-button
            style="margin-top: 20px"
            :buttonType="2"
            @tap.stop="emits('update:show', false)"
          >
          </custom-button>
          <custom-button
            style="margin-top: 20px"
            :buttonType="1"
            @did-get-phone-params="handleGetPhoneParams"
          >
          </custom-button>
        </view>

        // #endif // #ifdef H5 || APP-PLUS
        <custom-button
          style="margin-top: 20px"
          @tap.stop="handleLogin"
          :buttonType="0"
        >
          <image
            class="absolute h-34 w-137"
            src="/static/kahe-202510/login/login-btn-title.png"
          />
        </custom-button>
        // #endif
      </view>
      <image
        class="h-54 w-54"
        src="/static/kahe-202510/login/close.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import CustomButton from "./components/button.vue";
import LoginItem from "./components/items.vue";
import type { LoginParams } from "./types";
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
});

const vShow = ref(props.show);
// console.log('vvvvShow:', vShow.value)
// onMounted(() => {
//
// })
watch(
  () => props.show,
  (value) => {
    console.log("loginVShow:", value);
    vShow.value = value;
  }
);

const code = ref(undefined as string | undefined);

const emits = defineEmits(["update:show", "didTapLogin"]);

const handleGetPhoneParams = (params: {
  iv: string;
  encryptedData: string;
  code: string;
}) => {
  emits("didTapLogin", {
    ...params,
    code: code.value,
  } as LoginParams);
};
const handleLogin = async () => {
  emits("didTapLogin", {
    code: code.value,
  });
};
const items = ref([
  {
    title: "进群见面礼",
    subTitle: "¥20.00元优惠券",
    icon: "/static/kahe-202510/login/login-item1.png",
  },
  {
    title: "卡票免费领",
    subTitle: "可换心仪卡牌",
    icon: "/static/kahe-202510/login/login-item2.png",
  },
  {
    title: "各品类福袋",
    subTitle: "总有喜欢的",
    icon: "/static/kahe-202510/login/login-item3.png",
  },
  {
    title: "卡牌可集换",
    subTitle: "收藏党福音",
    icon: "/static/kahe-202510/login/login-item4.png",
  },
]);
</script>

<style lang="scss" scoped></style>
