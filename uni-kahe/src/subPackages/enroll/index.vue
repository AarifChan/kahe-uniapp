<script setup lang="ts">
import { ref } from "vue";
import { showInGroupImage } from "@/utils/tools";

const steps = ref([
  {
    num: "01",
    title: "提交资料",
    desc: "填写信息申请入驻",
    icon: "/static/kahe-202510/jikaquan/enroll-top-item1.png",
  },
  {
    num: "02",
    title: "等待审核",
    desc: "平台审核入驻资料",
    icon: "/static/kahe-202510/jikaquan/enroll-top-item2.png",
  },
  {
    num: "03",
    title: "设置账户",
    desc: "登录后台完成设置",
    icon: "/static/kahe-202510/jikaquan/enroll-top-item3.png",
  },
  {
    num: "04",
    title: "入驻成功",
    desc: "店铺开通发布商品",
    icon: "/static/kahe-202510/jikaquan/enroll-top-item4.png",
  },
]);

const materials = ref([
  {
    name: "法人身份证",
    icon: "/static/kahe-202510/jikaquan/enroll-bottom-item1.png",
  },
  {
    name: "营业执照",
    icon: "/static/kahe-202510/jikaquan/enroll-bottom-item2.png",
  },
  {
    name: "社群截图",
    icon: "/static/kahe-202510/jikaquan/enroll-bottom-item3.png",
  },
  {
    name: "签署合同",
    icon: "/static/kahe-202510/jikaquan/enroll-bottom-item4.png",
  },
]);

const handleEnroll = () => {
  showInGroupImage();
};
</script>

<template>
  <view
    class="h-screen w-screen relative bg-no-repeat"
    style="
      background-image: url(&quot;/static/kahe-202510/jikaquan/invite-bg.png&quot;);
      background-size: 100% auto;
    "
  >
    <view class="w-full relative">
      <view class="absolute left-40 top-40">
        <text class="text-54 text-[#3D8CE8] block font-theme">加入卡聚</text>
        <text class="text-54 text-black block mt-10 font-theme"
          >成为核心商家</text
        >
        <text class="text-30 text-[#242528] mt-16 block font-theme"
          >招商政策全面升级，诚邀优质商家</text
        >
      </view>
    </view>

    <view class="px-30 relative z-1" style="padding-top: 274rpx">
      <view
        class="bg-white rounded-24 px-30 py-40 mb-30"
        style="box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06)"
      >
        <view class="flex items-center justify-center mb-40 gap-16">
          <text class="text-36 font-bold text-[#1a1a1a] italic">仅需4步</text>
          <text class="text-36 font-bold text-[#2b7efb] italic relative">
            轻松入驻
            <view
              class="absolute left-0 right-0 bottom--4 h-8 rounded-4"
              style="
                background: linear-gradient(90deg, #2b7efb 0%, #00d4aa 100%);
                opacity: 0.3;
              "
            ></view>
          </text>
        </view>

        <view class="flex flex-wrap justify-between relative">
          <view
            v-for="(step, index) in steps"
            :key="index"
            class="w-45% flex flex-col items-center mb-30 relative"
          >
            <image class="w-80 h-80 mb-16" :src="step.icon" mode="aspectFit" />
            <view class="flex items-center gap-8 mb-8">
              <text class="text-28 text-[#2b7efb] font-bold">{{
                step.num
              }}</text>
              <text class="text-28 text-[#333] font-500">{{ step.title }}</text>
            </view>
            <text class="text-24 text-[#999">{{ step.desc }}</text>
            <view
              v-if="index < steps.length - 1 && index % 2 === 0"
              class="absolute"
              style="right: -20%; top: 50%; transform: translateY(-50%)"
            >
              <image
                class="w-72 h-51"
                src="/static/kahe-202510/jikaquan/top-arrow.png"
                mode="aspectFit"
              />
            </view>
            <view
              v-if="index === 1"
              class="absolute"
              style="right: 20%; bottom: -10rpx; transform: rotate(90deg)"
            >
              <text class="text-36 text-[#00d4aa] font-bold">→</text>
            </view>
          </view>
        </view>
      </view>

      <view
        class="bg-white rounded-24 px-30 py-40 mb-30"
        style="box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06)"
      >
        <view class="flex items-center justify-center mb-40">
          <text class="text-36 font-bold text-[#1a1a1a] italic">需备材料</text>
        </view>

        <view class="flex justify-between px-10">
          <view
            v-for="(item, index) in materials"
            :key="index"
            class="flex flex-col items-center gap-16"
          >
            <view
              class="w-90 h-90 rounded-full flex items-center justify-center"
              style="background: #f0f7ff"
            >
              <image
                class="w-43 h-36 rounded-0"
                :src="item.icon"
                mode="aspectFit"
              />
            </view>
            <text class="text-24 text-[#666">{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <view
      class="fixed bottom-0 left-0 right-0 px-20 pt-20 pb-20"
      style="
        background: linear-gradient(
          180deg,
          rgba(245, 249, 255, 0) 0%,
          #f5f9ff 30%
        );
      "
    >
      <button
        class="w-full h-90 leading-90 bg-[#1a1a1a] text-white text-32 font-500 rounded-45 border-none"
        @click="handleEnroll"
      >
        我要入驻
      </button>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
