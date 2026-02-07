<template>
  <view class="groupBuyList">
    <!--    <image class="groupBuyList-bg" src="https://jms.85gui7.com/kahe-202510/groupBuy/groupBuyBg.png" />-->
    <view class="groupBuyList-content">
      <view class="groupBuyList-content-top">
        <search placeholder="" @did-tap-search="handleSearch" :black="true" />
      </view>
      <view class="groupBuyList-content-main">
        <scroll-view class="groupBuyList-content-main-table" scroll-x scroll-y>
          <view class="groupBuyList-content-main-table-head">
            <view class="groupBuyList-content-main-table-head-item">#序号</view>
            <view class="groupBuyList-content-main-table-head-item"
              >卡密名称</view
            >
            <!--                        <view class="groupBuyList-content-main-table-head-item">卡密等级</view>-->
            <view class="groupBuyList-content-main-table-head-item"
              >卡密编号</view
            >
            <!--                        <view class="groupBuyList-content-main-table-head-item">系列编号</view>-->
            <view class="groupBuyList-content-main-table-head-item"
              >系列名称</view
            >
          </view>
          <view class="groupBuyList-content-main-table-content">
            <view
              v-for="(item, index) in cardList"
              :key="'k' + index"
              class="groupBuyList-content-main-table-content-row"
            >
              <view
                class="groupBuyList-content-main-table-content-row-item text-flow-ellipsis-single"
                >{{ item.id }}</view
              >
              <view
                class="groupBuyList-content-main-table-content-row-item text-flow-ellipsis-single"
                >{{ item.name }}</view
              >
              <!--                            <view class="groupBuyList-content-main-table-content-row-item">{{ getNormalLevelNameByLevel(item.level) }}</view>-->
              <view
                class="groupBuyList-content-main-table-content-row-item text-flow-ellipsis-single"
                >#{{ item.number }}</view
              >
              <!--                            <view class="groupBuyList-content-main-table-content-row-item">{{item.sid}}</view>-->
              <view
                class="groupBuyList-content-main-table-content-row-item text-flow-ellipsis-single"
                >{{ item.sname }}</view
              >
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="groupBuyList-bottom">
      <view class="groupBuyList-bottom-side" @tap.stop="changePage(true)">
        <!--        <image-->
        <!--          class="groupBuyList-bottom-side-bg"-->
        <!--          src="https://jms.85gui7.com/kahe-202510/groupBuy/btn5.png"-->
        <!--        />-->
        <view class="groupBuyList-bottom-side-title theme-font">上一页</view>
      </view>
      <view class="groupBuyList-bottom-title theme-font"
        >{{ queryParams.page }}/{{ totalPage }}</view
      >
      <view class="groupBuyList-bottom-side" @tap.stop="changePage(false)">
        <!--        <image-->
        <!--          class="groupBuyList-bottom-side-bg"-->
        <!--          src="https://jms.85gui7.com/kahe-202510/groupBuy/btn5.png"-->
        <!--        />-->
        <view class="groupBuyList-bottom-side-title theme-font">下一页</view>
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

<style lang="scss" scoped>
.groupBuyList {
  position: relative;
  background-color: #000000;
  width: 100%;
  height: 100vh;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    &-top {
      position: relative;
      padding: 32rpx 32rpx 0;
      width: 100%;
      box-sizing: border-box;
    }
    &-main {
      padding: 32rpx;
      box-sizing: border-box;
      width: 100%;
      &-table {
        position: relative;
        width: 100%;
        height: calc(100vh - 253rpx - env(safe-area-inset-bottom));
        background: #ffffff;
        border: 2rpx solid #e2c07e;
        white-space: nowrap;
        &-head {
          &-item {
            display: inline-block;
            padding: 18rpx 0;
            width: calc(100% / 3);
            font-weight: 400;
            font-size: 20rpx;
            color: #000000;
            line-height: 36rpx;
            text-align: center;
            border-right: 2rpx solid #e2c07e;
            border-bottom: 2rpx solid #e2c07e;
          }
          &-item:first-child {
            width: 120rpx;
          }
          &-item:last-child {
            border-right: none;
          }
        }
        &-content {
          display: flex;
          flex-direction: column;
          white-space: nowrap;
          width: 100%;
          &-row {
            &-item {
              display: inline-block;
              padding: 36rpx 0;
              width: calc(100% / 3);
              font-weight: 400;
              font-size: 20rpx;
              color: #000000;
              line-height: 36rpx;
              text-align: center;
              border-right: 2rpx solid #e2c07e;
              border-bottom: 2rpx solid #e2c07e;
            }
            &-item:first-child {
              width: 120rpx;
            }
            &-item:last-child {
              border-right: none;
            }
          }
        }
      }
    }
  }

  &-bottom {
    position: absolute;
    left: 0;
    background: #000000;
    bottom: 0;
    width: 100%;
    height: calc(131rpx + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-side {
      position: relative;
      width: 176rpx;
      height: 49rpx;

      border-radius: 16px;
      background: linear-gradient(90deg, #ffd3a2 0%, #fdf2d8 100%);
      &-bg {
        width: 100%;
        height: 100%;
      }
      &-title {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        line-height: 49rpx;
        text-align: center;
        font-weight: 400;
        font-size: 30rpx;
        color: #794627;
      }
    }
    &-title {
      font-weight: 400;
      font-size: 30rpx;
      color: #ffffff;
      padding: 0 65rpx;
    }
  }
}
</style>
