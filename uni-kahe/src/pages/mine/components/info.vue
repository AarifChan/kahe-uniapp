<template>
  <view class="relative w-full">
    <view class="flex flex-row justify-between items-center">
      <view class="flex flex-row">
        <view class="ml-32 mb-32">
          <decorate-avatar
            :avatar="userInfo.avatar"
            :level="userInfo.vip"
            @tap.stop="emits('didClickAvatar')"
          />
        </view>

        <view class="ml-16 flex flex-col justify-center">
          <view class="flex flex-row items-center" @tap.stop="handleLogin">
            <view class="text-30 text-black">{{
              UserModule.loginStatus
                ? (userInfo.nickname ?? "用户昵称")
                : "去登陆"
            }}</view>
            <image
              class="w-23 h-23 ml-12"
              src="/static/kaju/mine/edit.png"
              @tap.stop="emits('didClickEdit')"
            />
          </view>
          <view class="flex flex-row items-center">
            <view class="text-20 text-secondary"
              >UID：{{ userInfo.uid ?? "000000" }}</view
            >
            <image class="w-23 h-23 ml-12" src="/static/kaju/mine/copy.png" />
          </view>

          <view v-if="!isAuditVersion" class="flex flex-row items-center mt-12">
            <image
              v-if="userInfo.uid"
              class="w-50 h-50"
              :src="`/static/kaju/level/${userInfo.vip}.png`"
            />
            <view class="flex flex-col">
              <view class="text-20 text-secondary"
                >成长值:{{ userInfo.expDay }}</view
              >
              <view
                class="relative mt-10 w-260 h-12 rounded-6 bg-[#e6e6e6] overflow-hidden"
              >
                <view
                  class="absolute left-0 top-0 max-w-full h-full bg-[#ffa200]"
                  :style="progressStyle"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="flex flex-col">
        <view class="flex flex-col items-center">
          <image
            class="w-48 h-44"
            src="/static/kaju/mine/contact.png"
            mode="aspectFit"
          />
          <view class="text-20 text-[#000000]">联系客服</view>
        </view>
        <view
          v-if="!isAuditVersion"
          class="relative w-162 h-70 flex-center mt-20"
          @tap.stop="emits('didClickVip')"
        >
          <image
            class="w-full h-full"
            src="/static/kaju/mine/mine-vip-bg.png"
          />
          <view
            class="absolute right-24 top-0 text-center leading-70 text-18 text-black"
          >
            权益中心
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import DecorateAvatar from "@/components/custom/DecorateAvatar/index.vue";
import type { PropType } from "vue";
import { ref, computed } from "vue";
import { UserModule } from "@/store/modules/user";
import { isAuditVersion } from "@/config";

interface UserInfo {
  avatar: string;
  nickname: string;
  vip: number;
  uid: number;
  expDay: number;
  exp: number;
}
const props = defineProps({
  userInfo: {
    default: {} as UserInfo,
    type: Object as PropType<UserInfo>,
  },
  showVip: {
    default: true,
    type: Boolean,
  },
});
const currentLevelExp = ref(
  computed(() => {
    let levelExp = 0;
    for (const item of UserModule.vipLevelsModel) {
      if (item.id === props.userInfo.vip + 1) {
        levelExp = item.exp = item.exp ?? 0;
      }
    }
    return levelExp;
  })
);

const handleLogin = () => {
  if (UserModule.loginStatus) {
    return;
  }
  UserModule.logout();
};

const needExp = ref(
  computed(() => {
    const userExp = props.userInfo.exp;
    let levelExp = 0;
    for (const item of UserModule.vipLevelsModel) {
      if (item.id === props.userInfo.vip) {
        levelExp = item.exp = item.exp ?? 0;
      }
    }
    if (levelExp) {
      return userExp - levelExp > 0 ? userExp - levelExp : 0;
    } else {
      return 0;
    }
  })
);
const lastLevelExp = computed(() => {
  let levelExp = 0;
  for (const item of UserModule.vipLevelsModel) {
    if (item.id === props.userInfo.vip) {
      levelExp = item.exp = item.exp ?? 0;
    }
  }
  return levelExp;
});
const progress = ref(
  computed(() => {
    if (currentLevelExp.value > 0) {
      return Math.floor(
        (needExp.value / (currentLevelExp.value - lastLevelExp.value)) * 100
      );
    } else {
      return 100;
    }
  })
);
const progressStyle = ref(
  computed(
    () =>
      // `clip-path: polygon(0 0, ${progress.value}% 0, ${progress.value}% 100%, 0% 100%);`
      `width:${progress.value}%`
  )
);
const emits = defineEmits(["didClickEdit", "didClickAvatar", "didClickVip"]);
</script>

<style lang="scss" scoped></style>
