<template>
  <view class="groupBuyMine relative bg-[#000000] w-full h-screen">
    <!--    <image class="groupBuyMine-bg w-full h-full" src="/static/kahe-202510/groupBuy/groupBuyBg.png" />-->
    <view
      class="groupBuyMine-content absolute left-0 top-0 w-full"
      :style="{ height: 'calc(100vh - 205rpx - env(safe-area-inset-bottom))' }"
    >
      <view
        class="groupBuyMine-content-top relative pt-32 px-32 w-full box-border"
      >
        <search placeholder="" @did-tap-search="handleSearch" :black="true" />
      </view>
      <view class="groupBuyMine-content-main p-32 box-border w-full">
        <scroll-view
          class="groupBuyMine-content-main-table relative w-full bg-[#FFFFFF] border-2 border-[#E2C07E] whitespace-nowrap"
          :style="{
            height: 'calc(100vh - 253rpx - env(safe-area-inset-bottom))',
          }"
          scroll-x
          scroll-y
        >
          <view
            class="groupBuyMine-content-main-table-head flex flex-row justify-evenly"
          >
            <view
              class="groupBuyMine-content-main-table-head-item inline-block py-18 w-full box-border font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#E2C07E] border-b-2 border-b-[#E2C07E] w-200"
              >#序号</view
            >
            <view
              class="groupBuyMine-content-main-table-head-item inline-block py-18 w-full box-border font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#E2C07E] border-b-2 border-b-[#E2C07E]"
              >卡密名称</view
            >
            <!--                        <view class="groupBuyMine-content-main-table-head-item">卡密等级</view>-->
            <view
              class="groupBuyMine-content-main-table-head-item inline-block py-18 w-full box-border font-normal text-20 text-[#000000] leading-36 text-center border-b-2 border-b-[#E2C07E]"
              >卡密编号</view
            >
            <!--                        <view class="groupBuyMine-content-main-table-head-item">系列编号</view>-->
            <!--                        <view class="groupBuyMine-content-main-table-head-item">系列名称</view>-->
          </view>
          <view
            class="groupBuyMine-content-main-table-content flex flex-col whitespace-nowrap w-full"
          >
            <view
              v-for="(item, index) in mindCardList"
              :key="'k' + index"
              class="groupBuyMine-content-main-table-content-row flex flex-row justify-evenly"
            >
              <view
                class="groupBuyMine-content-main-table-content-row-item inline-block py-36 box-border w-full font-normal text-20 text-[#081D62] leading-36 text-center border-r-2 border-r-[#E2C07E] border-b-2 border-b-[#E2C07E] w-200"
                >{{ item.id }}</view
              >
              <view
                class="groupBuyMine-content-main-table-content-row-item inline-block py-36 box-border w-full font-normal text-20 text-[#081D62] leading-36 text-center border-r-2 border-r-[#E2C07E] border-b-2 border-b-[#E2C07E]"
                >{{ item.name }}</view
              >
              <!--                            <view class="groupBuyMine-content-main-table-content-row-item">{{ getNormalLevelNameByLevel(item.level) }}</view>-->
              <view
                class="groupBuyMine-content-main-table-content-row-item inline-block py-36 box-border w-full font-normal text-20 text-[#081D62] leading-36 text-center border-b-2 border-b-[#E2C07E]"
                >#{{ item.number }}</view
              >
              <!--                            <view class="groupBuyMine-content-main-table-content-row-item">{{item.sid}}</view>-->
              <!--                            <view class="groupBuyMine-content-main-table-content-row-item">{{item.sname}}</view>-->
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view
      class="groupBuyMine-bottom absolute left-0 bottom-0 w-full bg-[#000000] box-border flex flex-row items-center justify-center"
      :style="{
        height: 'calc(131rpx + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }"
    >
      <view
        class="groupBuyMine-bottom-side relative w-176 h-49 rounded-[16px] bg-gradient-[linear-gradient(90deg,#ffd3a2_0%,#fdf2d8_100%)]"
        @tap.stop="changePage(true)"
      >
        <!--        <image-->
        <!--          class="groupBuyMine-bottom-side-bg"-->
        <!--          src="/static/kahe-202510/groupBuy/btn5.png"-->
        <!--        />-->
        <view
          class="groupBuyMine-bottom-side-title absolute left-0 top-0 w-full leading-49 text-center font-normal text-30 text-[#794627] theme-font"
          >上一页</view
        >
      </view>
      <view
        class="groupBuyMine-bottom-title font-normal text-30 text-[#FFFFFF] px-65 theme-font"
        >{{ queryParams.page }}/{{ totalPage }}</view
      >
      <view
        class="groupBuyMine-bottom-side relative w-176 h-49 rounded-[16px] bg-gradient-[linear-gradient(90deg,#ffd3a2_0%,#fdf2d8_100%)]"
        @tap.stop="changePage(false)"
      >
        <!--        <image-->
        <!--          class="groupBuyMine-bottom-side-bg"-->
        <!--          src="/static/kahe-202510/groupBuy/btn5.png"-->
        <!--        />-->
        <view
          class="groupBuyMine-bottom-side-title absolute left-0 top-0 w-full leading-49 text-center font-normal text-30 text-[#794627] theme-font"
          >下一页</view
        >
      </view>
    </view>
    <!--        <view class="groupBuyMine-bottom">-->
    <!--            <view class="groupBuyMine-bottom-line">-->
    <!--                <view class="groupBuyMine-bottom-line-left">-->
    <!--                </view>-->
    <!--                <view class="groupBuyMine-bottom-line-right">-->
    <!--                    <image class="groupBuyMine-bottom-line-right-img" src="/static/kahe-202510/groupBuy/btn.png" />-->
    <!--                    <view class="groupBuyMine-bottom-line-right-title text-stroke-main STHupo-font">去转赠</view>-->
    <!--                </view>-->
    <!--            </view>-->
    <!--        </view>-->
  </view>
</template>

<script lang="ts" setup>
import Search from "@/components/search/index.vue";
import { useGroupBuy } from "@/subPackages/groupBuy";
import { onMounted } from "vue";
import { useEnum } from "@/composables/enum";
import { getPageOptions } from "@/utils/tools";
import { UserModule } from "@/store/modules/user";

const {
  isMine,
  currentSid,
  mindCardList,
  getGroupBuyMineLog,
  uid,
  totalPage,
  changePage,
  queryParams,
} = useGroupBuy();
const { getNormalLevelNameByLevel } = useEnum();
onMounted(() => {
  const id = getPageOptions().id;
  isMine.value = true;
  console.log("groupBuyId:", id);
  if (id) {
    uid.value = UserModule.userInfo.uid;

    currentSid.value = id;
    getGroupBuyMineLog();
  }
});
const handleSearch = (value: string) => {
  queryParams.value.keyword = value;
  queryParams.value.page = 1;
  getGroupBuyMineLog();
};
</script>

<style lang="scss" scoped></style>
