<template>
  <view class="shine">
    <image
      src="https://jms.85gui7.com/kahe-202510/shine/bg.png"
      mode="scaleToFill"
      class="bg"
    />
    <view class="shine-container">
      <image
        src="https://jms.85gui7.com/kahe-202510/shine/title.png"
        mode="scaleToFill"
        class="title"
      />
      <CustomNav @tap-nav="tapNav" :info="pageInfo" />
      <CustomItem :info="pageInfo" />
      <CustomSubmit @tap-submit="tapSubmit" :info="pageInfo" />
      <CustomBottom @tap-award="tapAward" :info="pageInfo" />
    </view>
    <WinningPop v-model="showWinningPop" :list="logList" :type="logType" />
    <HistoryPop
      v-model="showHistoryPop"
      :list="historyList"
      @scrolltolower="handleScrollToLower"
    />
    <CongratulPop
      v-model="showCongratulPop"
      :info="pageInfo"
      @confirm="onReceive"
      @protocol="showModalType(1)"
    />
    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
  </view>
</template>

<script setup lang="ts">
import CustomNav from "./components/CustomNav/index.vue";
import CustomItem from "./components/CustomItem/index.vue";
import CustomSubmit from "./components/CustomSubmit/index.vue";
import CustomBottom from "./components/CustomBottom/index.vue";
import WinningPop from "./components/WinningPop/index.vue";
import HistoryPop from "./components/HistoryPop/index.vue";
import CongratulPop from "./components/CongratulPop/index.vue";

import { onMounted, provide, ref } from "vue";
const showWinningPop = ref(false);
const showHistoryPop = ref(false);
const showCongratulPop = ref(false);
const awardType = ref("record");
import { useShinging } from "./index";
import CommonModal from "@/components/modal/index.vue";
import { useModal } from "@/composables/modal";
import { ShowToast } from "@/utils";
import { AddressModel } from "@/model";

const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const {
  getData,
  pageInfo,
  handleSignIn,
  handleReceive,
  queryLogList,
  queryHistory,
  historyList,
  logType,
  handleScrollToLower,
  logList,
} = useShinging();

onMounted(() => {
  getData();
});

provide("awardType", awardType);
// 点击领取&&本期记录
const tapAward = (item: string) => {
  if (item === "award") {
    showCongratulPop.value = true;
  } else {
    awardType.value = "record";
    logType.value = 2;
    queryLogList();
    showWinningPop.value = true;
  }
};
const onReceive = (address: AddressModel) => {
  handleReceive(address).then((res) => {
    if (res.code === 200) {
      showCongratulPop.value = false;
      ShowToast("实体参与券将3个工作日内寄出");
    } else {
      ShowToast(res.msg);
    }
  });
};
const tapSubmit = (value: string) => {
  if (value.length === 0) {
    ShowToast("请输入券码");
    return;
  }
  handleSignIn(value)
    .then((res) => {
      if (res.code === 200) {
        ShowToast("参与成功");
        getData();
      } else {
        ShowToast(res.msg);
      }
    })
    .catch((err) => {
      console.log("handleSignIn error", err);
    });
};
const tapNav = (value: any) => {
  if (value.key === 1) {
    showModalType(10);
  }
  if (value.key === 2) {
    logType.value = 3;
    queryHistory();
    showHistoryPop.value = true;
  }
};
</script>

<style lang="scss">
.shine {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .bg {
    width: 100%;
    height: 100%;
  }

  &-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 130rpx;
    flex: 1;

    .title {
      position: relative;
      width: 465rpx;
      height: 264rpx;
      margin: 0 auto;
    }
  }
}
</style>
