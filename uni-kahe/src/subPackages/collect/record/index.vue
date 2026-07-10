<template>
  <view class="collectRecord relative w-full h-screen">
    <image
      class="collectRecord-bg w-full h-full"
      src="/static/kahe-202510/collect/c-bg.png"
    />
    <view
      class="collectRecord-content absolute left-0 top-0 w-full p-32 box-border h-[calc(100%-64rpx-env(safe-area-inset-bottom))]"
    >
      <view class="collectRecord-content-tab w-full h-60 bg-[#3274a4] rounded-10 flex flex-row justify-evenly">
        <view
          class="collectRecord-content-tab-item relative w-full h-full"
          @tap.stop="didClickTab(0)"
        >
          <image
            v-if="current === 0"
            class="collectRecord-content-tab-item-bg w-full h-full"
            src="/static/kahe-202510/collect/btn3.png"
          />
          <view
            class="collectRecord-content-tab-item-title absolute left-0 top-0 leading-60 w-full text-center font-normal text-30 theme-font"
            :style="{ color: current === 0 ? '#693301' : '#60B1EC' }"
            >我参与的</view
          >
        </view>
        <!--        <view class="collectRecord-content-tab-item relative w-full h-full" @tap.stop="didClickTab(1)">-->
        <!--          <image-->
        <!--            v-if="current === 1"-->
        <!--            class="collectRecord-content-tab-item-bg w-full h-full"-->
        <!--            src="/static/kahe-202510/collect/btn3.png"-->
        <!--          />-->
        <!--          <view-->
        <!--            class="collectRecord-content-tab-item-title absolute left-0 top-0 leading-60 w-full text-center font-normal text-30 theme-font"-->
        <!--            :style="{ color: current === 1 ? '#693301' : '#60B1EC' }"-->
        <!--            >好友帮我</view-->
        <!--          >-->
        <!--        </view>-->
      </view>
      <scroll-view
        class="collectRecord-content-list mt-32 relative w-full h-[calc(100%-124rpx)] flex flex-col"
        scroll-y
        @scrolltolower="handleScrollToLower"
      >
        <view
          v-for="(item, index) in dataList"
          :key="'collectRecord' + index"
          class="collectRecord-content-list-item relative w-full aspect-ratio-[698/242] rounded-10 mb-24"
        >
          <image
            class="collectRecord-content-list-item-bg w-full h-full"
            src="/static/kahe-202510/collect/item-bg.png"
          />
          <view
            class="collectRecord-content-list-item-content absolute left-0 top-0 w-full h-full flex flex-col p-9 box-border"
          >
            <view
              class="collectRecord-content-list-item-content-top px-24 w-full box-border flex flex-row items-center h-124 justify-between"
            >
              <view
                class="collectRecord-content-list-item-content-top-left flex flex-row items-center"
              >
                <image
                  class="collectRecord-content-list-item-content-top-left-avatar w-84 h-84 rounded-42"
                  :src="current === 0 ? item.user?.avatar : item.helper?.avatar"
                />
                <view
                  class="collectRecord-content-list-item-content-top-left-info ml-12 flex flex-col"
                >
                  <view
                    class="collectRecord-content-list-item-content-top-left-info-title my-5 font-normal text-24 text-[#000000]"
                    >{{
                      current === 0
                        ? item.user?.nickname
                        : item.helper?.nickname
                    }}</view
                  >
                  <view
                    class="collectRecord-content-list-item-content-top-left-info-title my-5 font-normal text-24 text-[#000000]"
                    >ID:{{
                      current === 0 ? item.user?.uid : item.helper?.uid
                    }}</view
                  >
                </view>
              </view>
              <view
                class="collectRecord-content-list-item-content-top-right font-normal text-24 text-[#616161]"
                >{{ item.createTime }}</view
              >
            </view>
            <view
              class="collectRecord-content-list-item-content-line w-674 h-2 bg-gradient-[linear-gradient(-90deg,#86b8ef,#abd3ff)]"
            />
            <view
              class="collectRecord-content-list-item-content-bottom px-24 w-full box-border flex flex-row items-center h-124 justify-between"
            >
              <view
                class="collectRecord-content-list-item-content-bottom-left flex flex-row items-center"
              >
                <image
                  class="collectRecord-content-list-item-content-bottom-left-logo w-80 h-80"
                  :src="item.logo"
                  mode="heightFix"
                />
                <view
                  class="collectRecord-content-list-item-content-bottom-left-title ml-16 font-normal text-24 text-[#000000] w-200 text-ellipsis"
                  >{{ item.name }}</view
                >
              </view>
              <view
                style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  gap: 24rpx;
                "
              >
                <view
                  class="collectRecord-content-list-item-content-bottom-right font-normal text-24 text-[#000000]"
                  >+{{ item.amount }}助力值</view
                >
                <view
                  class="collectRecord-content-list-item-content-bottom-thank relative w-111 h-41"
                  v-if="current === 1"
                  @tap.stop="handleThank(item)"
                >
                  <image
                    class="collectRecord-content-list-item-content-bottom-thank-bg w-full h-full"
                    :src="
                      item.isThanked
                        ? '/static/kahe-202510/collect/btn5.png'
                        : '/static/kahe-202510/collect/btn4.png'
                    "
                  />
                  <view
                    class="collectRecord-content-list-item-content-bottom-thank-title absolute left-0 top-0 w-full z-2 text-center leading-41 font-normal text-24 text-white theme-font"
                    >感谢</view
                  >
                </view>
              </view>
            </view>
          </view>
          <image
            class="collectRecord-content-list-item-decorate absolute right-0 top-0 w-85 h-52"
            :src="
              current === 0
                ? '/static/kahe-202510/collect/label1.png'
                : '/static/kahe-202510/collect/label2.png'
            "
          />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  CollectOrderItem,
  getCollectOrderRequest,
  handleCollectThankRequest,
} from "@/api/collect";
import { ShowToast } from "@/utils";

const params = ref({
  page: 1,
  limit: 10,
  type: 0,
});
const current = ref(0);

const total = ref(0);
const dataList = ref<CollectOrderItem[]>([]);
const didClickTab = (index: number) => {
  current.value = index;
  params.value.page = 1;
  dataList.value = [];
  params.value.type = index;
  getCollectOrderList();
};

onMounted(() => {
  getCollectOrderList();
});

const handleThank = async (item: CollectOrderItem) => {
  if (item.isThanked) {
    return;
  }
  const resp = await handleCollectThankRequest(item.id);
  if (resp.code === 200) {
    item.isThanked = true;
  }
};
const getCollectOrderList = async () => {
  const resp = await getCollectOrderRequest(params.value);
  if (resp.code === 200) {
    const list =
      params.value.page === 1 ? new Array<CollectOrderItem>() : dataList.value;
    resp.data.content.forEach((item) => {
      list.push(item);
    });
    dataList.value = list;
    total.value = resp.data.totalElements;
  } else {
    ShowToast(resp.msg);
  }
};
const handleScrollToLower = () => {
  if (total.value > params.value.page * params.value.limit) {
    params.value.page++;
    getCollectOrderList();
  }
};
</script>

<style lang="scss" scoped>
</style>
