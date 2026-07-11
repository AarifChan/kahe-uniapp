<template>
  <view
    class="recommend flex flex-row items-center justify-center box-border w-full h-280 py-16 px-16 pt-16 pb-0 gap-12"
  >
    <view class="recommend-left relative w-300 h-280">
      <image
        class="recommend-left-top absolute left-0 top-0 w-158 h-280"
        src="/static/kaju/home/left.png"
        mode="aspectFit"
        @tap.stop="handleChallengePage"
      />
      <image
        class="recommend-left-bottom absolute left-128 top-0 w-158 h-280"
        src="/static/kaju/home/right.png"
        mode="aspectFit"
        @tap.stop="handleMatchPage"
      />
    </view>
    <view class="recommend-right relative h-280 w-400" :style="rightBgStyle">
      <image
        class="recommend-right-more absolute -top-8 right-0 w-110 h-50 z-10"
        src="/static/kaju/home/more.png"
        mode="aspectFit"
        @tap.stop="handleGroupBuyPage"
      />
      <view
        class="absolute top-68 left-16 right-16 bottom-12 flex flex-col gap-8 overflow-hidden"
      >
        <item
          v-for="(item, index) in displayList"
          :key="index"
          :item="item"
          @tap.stop="handleClickItem(item)"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { GroupBuyItem } from "@/model";
import { PropType, computed } from "vue";
import Item from "./components/item.vue";
import { ShowToast, currentEnv } from "@/utils";

const props = defineProps({
  groupList: {
    type: Array as PropType<GroupBuyItem[]>,
    default: () => [],
  },
});

const displayList = computed(() => props.groupList.slice(0, 2));

/** 避免模板内 url(&quot;https://...) 编译到 WXML 时引号/斜杠导致 miniprogram-ci 报 unexpected `/` */
const rightBgStyle = {
  backgroundImage: "url(/static/kaju/home/base.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const handleGroupBuyPage = () => {
  uni.navigateTo({
    url: "/subPackages/groupBuy/index/index",
  });
};

const handleChallengePage = () => {
  if (currentEnv() === "mp-weixin") {
    ShowToast("请下载卡牌核心app体验新功能");
    return;
  }
  uni.navigateTo({
    url: "/subPackages/challenge/list/index",
  });
};

const handleMatchPage = () => {
  ShowToast("敬请期待");
};

const handleClickItem = (item: GroupBuyItem) => {
  uni.navigateTo({
    url: `/subPackages/groupBuy/detail/index?id=${item.id}`,
  });
};
</script>

<style lang="scss" scoped></style>
