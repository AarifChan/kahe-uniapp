<template>
  <view class="groupBuyList relative w-full h-screen bg-[#000000]">
    <!--    <image class="groupBuyList-bg" src="/static/kahe-202510/groupBuy/groupBuyBg.png" />-->
    <view class="groupBuyList-content absolute left-0 top-0 w-full">
      <view
        class="groupBuyList-content-top relative pt-32 px-32 w-full box-border"
      >
        <search placeholder="" @did-tap-search="handleSearch" :black="true" />
      </view>
      <view class="groupBuyList-content-main p-32 box-border w-full">
        <scroll-view
          class="groupBuyList-content-main-table relative w-full bg-[#ffffff] border-2 border-[#e2c07e] whitespace-nowrap"
          :style="{ height: 'calc(100vh - 253rpx - env(safe-area-inset-bottom))' }"
          scroll-x
          scroll-y
        >
          <view class="groupBuyList-content-main-table-head">
            <view
              class="groupBuyList-content-main-table-head-item inline-block py-18 w-[calc(100%/3)] font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#e2c07e] border-b-2 border-b-[#e2c07e] first:w-120 last:border-r-0"
              >#序号</view
            >
            <view
              class="groupBuyList-content-main-table-head-item inline-block py-18 w-[calc(100%/3)] font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#e2c07e] border-b-2 border-b-[#e2c07e] first:w-120 last:border-r-0"
              >卡密名称</view
            >
            <!--                        <view class="groupBuyList-content-main-table-head-item">卡密等级</view>-->
            <view
              class="groupBuyList-content-main-table-head-item inline-block py-18 w-[calc(100%/3)] font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#e2c07e] border-b-2 border-b-[#e2c07e] first:w-120 last:border-r-0"
              >卡密编号</view
            >
            <!--                        <view class="groupBuyList-content-main-table-head-item">系列编号</view>-->
            <view
              class="groupBuyList-content-main-table-head-item inline-block py-18 w-[calc(100%/3)] font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#e2c07e] border-b-2 border-b-[#e2c07e] first:w-120 last:border-r-0"
              >系列名称</view
            >
          </view>
          <view
            class="groupBuyList-content-main-table-content flex flex-col whitespace-nowrap w-full"
          >
            <view
              v-for="(item, index) in cardList"
              :key="'k' + index"
              class="groupBuyList-content-main-table-content-row"
            >
              <view
                class="groupBuyList-content-main-table-content-row-item text-flow-ellipsis-single inline-block py-36 w-[calc(100%/3)] font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#e2c07e] border-b-2 border-b-[#e2c07e] first:w-120 last:border-r-0"
                >{{ item.id }}</view
              >
              <view
                class="groupBuyList-content-main-table-content-row-item text-flow-ellipsis-single inline-block py-36 w-[calc(100%/3)] font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#e2c07e] border-b-2 border-b-[#e2c07e] first:w-120 last:border-r-0"
                >{{ item.name }}</view
              >
              <!--                            <view class="groupBuyList-content-main-table-content-row-item">{{ getNormalLevelNameByLevel(item.level) }}</view>-->
              <view
                class="groupBuyList-content-main-table-content-row-item text-flow-ellipsis-single inline-block py-36 w-[calc(100%/3)] font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#e2c07e] border-b-2 border-b-[#e2c07e] first:w-120 last:border-r-0"
                >#{{ item.number }}</view
              >
              <!--                            <view class="groupBuyList-content-main-table-content-row-item">{{item.sid}}</view>-->
              <view
                class="groupBuyList-content-main-table-content-row-item text-flow-ellipsis-single inline-block py-36 w-[calc(100%/3)] font-normal text-20 text-[#000000] leading-36 text-center border-r-2 border-r-[#e2c07e] border-b-2 border-b-[#e2c07e] first:w-120 last:border-r-0"
                >{{ item.sname }}</view
              >
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view
      class="groupBuyList-bottom absolute left-0 bottom-0 w-full bg-[#000000] box-border flex flex-row items-center justify-center"
      :style="{ height: 'calc(131rpx + env(safe-area-inset-bottom))', paddingBottom: 'env(safe-area-inset-bottom)' }"
    >
      <view
        class="groupBuyList-bottom-side relative w-176 h-49 rounded-[16px] bg-gradient-[linear-gradient(90deg,#ffd3a2_0%,#fdf2d8_100%)]"
        @tap.stop="changePage(true)"
      >
        <!--        <image-->
        <!--          class="groupBuyList-bottom-side-bg"-->
        <!--          src="/static/kahe-202510/groupBuy/btn5.png"-->
        <!--        />-->
        <view
          class="groupBuyList-bottom-side-title theme-font absolute left-0 top-0 w-full leading-49 text-center font-normal text-30 text-[#794627]"
          >上一页</view
        >
      </view>
      <view
        class="groupBuyList-bottom-title theme-font font-normal text-30 text-[#ffffff] px-65"
        >{{ queryParams.page }}/{{ totalPage }}</view
      >
      <view
        class="groupBuyList-bottom-side relative w-176 h-49 rounded-[16px] bg-gradient-[linear-gradient(90deg,#ffd3a2_0%,#fdf2d8_100%)]"
        @tap.stop="changePage(false)"
      >
        <!--        <image-->
        <!--          class="groupBuyList-bottom-side-bg"-->
        <!--          src="/static/kahe-202510/groupBuy/btn5.png"-->
        <!--        />-->
        <view
          class="groupBuyList-bottom-side-title theme-font absolute left-0 top-0 w-full leading-49 text-center font-normal text-30 text-[#794627]"
          >下一页</view
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useGroupBuy } from "@/subPackages/groupBuy";
import { onMounted } from "vue";
import Search from "@/components/search/index.vue";
import { getPageOptions } from "@/utils/tools";
import { useEnum } from "@/composables/enum";

const {
  currentSid,
  getGroupBuyCardList,
  cardList,
  totalPage,
  changePage,
  queryParams,
} = useGroupBuy();
const { getNormalLevelNameByLevel } = useEnum();
onMounted(() => {
  const id = getPageOptions().id;
  console.log("groupBuyId:", id);
  if (id) {
    currentSid.value = id;
    getGroupBuyCardList();
  }
});
const handleSearch = (value: string) => {
  queryParams.value.keyword = value;
  queryParams.value.page = 1;
  getGroupBuyCardList();
};
</script>

<style lang="scss" scoped></style>
