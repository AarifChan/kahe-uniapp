<template>
  <view class="collectDetail">
    <image class="collectDetail-bg" src="https://jms.85gui7.com/kahe-202510/collect/detail-bg.png" />
    <scroll-view
      class="collectDetail-content"
      scroll-y
      @scrolltolower="handleScrollToLower"
    >
      <view class="collectDetail-content-top">
        <view class="collectDetail-content-top-item" @tap.stop="navToHome">
          <image
            class="collectDetail-content-top-item-icon"
            src="https://jms.85gui7.com/kahe-202510/collect/item1.png"
          />
          <view class="collectDetail-content-top-item-title text-stroke-main"
            >首页</view
          >
        </view>
        <view class="collectDetail-content-top-info">
          <image
            class="collectDetail-content-top-info-logo"
            mode="heightFix"
            :src="collectDetail?.product.logo"
          />
          <view class="collectDetail-content-top-info-title">{{
            collectDetail?.product.name
          }}</view>
          <view class="collectDetail-content-top-info-subTitle"
            >{{ collectDetail?.product.sales }}人集成，余{{
              collectDetail?.product.total ??
              0 - (collectDetail?.product.sales ?? 0)
            }}件｜参考价：{{ collectDetail?.product.price }}</view
          >
          <view class="collectDetail-content-top-info-progress">
            <image
              class="collectDetail-content-top-info-progress-title"
              src="https://jms.85gui7.com/kahe-202510/collect/title.png"
            />
            <view class="collectDetail-content-top-info-progress-bar">
              <view
                class="collectDetail-content-top-info-progress-bar-value"
                :style="progressStyle"
              />
            </view>
            <view class="collectDetail-content-top-info-progress-subTitle">{{
              progress
            }}</view>
          </view>
        </view>
      </view>
      <view class="collectDetail-content-bottom">
        <view class="collectDetail-content-bottom-top">
          <image
            class="collectDetail-content-bottom-top-bg"
            src="https://jms.85gui7.com/kahe-202510/collect/decorate.png"
          />
          <view class="collectDetail-content-bottom-top-info">
            <image
              class="collectDetail-content-bottom-top-info-label"
              src="https://jms.85gui7.com/kahe-202510/collect/label1.png"
            />
            <image
              class="collectDetail-content-bottom-top-info-avatar text-flow-ellipsis-single"
              :src="collectDetail?.user.avatar"
            />
            <view class="collectDetail-content-bottom-top-info-name">{{
              collectDetail?.user.nickname
            }}</view>
          </view>
        </view>
        <view class="collectDetail-content-bottom-tips"
          >一次性达100%进度才能完成集赏</view
        >
        <tab @did-change="handleTabChange" />
        <view class="collectDetail-content-bottom-list">
          <goods
            v-for="(item, index) in goodsList"
            :key="'goodsList' + index"
            :item="item"
            @did-select="goodsList[index].selected = !item.selected"
          />
        </view>
      </view>
    </scroll-view>
    <view class="collectDetail-bottom">
      <view class="collectDetail-bottom-item" @tap.stop="handleCollect">
        <image
          class="collectDetail-bottom-item-img"
          :src="`https://jms.85gui7.com/kahe-202510/collect/finish-${collectProgress === 1 ? 'enable' : 'disable'}.png`"
        />
      </view>
      <button openType="share" class="collectDetail-bottom-item">
        <image
          class="collectDetail-bottom-item-img"
          src="https://jms.85gui7.com/kahe-202510/collect/invite-btn.png"
        />
      </button>
    </view>
    <!--        <login v-model:show="loginShow" @did-tap-login="handleLogin" />-->
    <alert v-model:show="alertShow" @confirm="handlePayCollect" />
    <select-modal
      v-model:show="showSelectNum"
      v-model:num="selectNum"
      :max="maxNum"
      @did-tap-confirm="didTapConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import Tab from "../components/tab.vue";
import Goods from "../components/collectGoods.vue";

import { getPageOptions } from "@/utils/tools";
import { useCollectDetail } from "./index";
import { computed, onMounted } from "vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
// import Login from '@/components/login/index.vue'
import Alert from "../components/alert/index.vue";
import SelectModal from "../components/select/index.vue";
import { useLogin } from "@/composables/login";
import { eventBus } from "@/utils/event";
const {
  didTapConfirm,
  showSelectNum,
  selectNum,
  maxNum,
  alertShow,
  collectProgress,
  getCollectDetail,
  collectDetail,
  getGoodsList,
  goodsParams,
  goodsList,
  handleScrollToLower,
  handleCollect,
  handlePayCollect,
} = useCollectDetail();
const { loginShow, handleLogin } = useLogin();

eventBus.on("didLogin", (_) => {
  loadData();
});
onMounted(() => {
  loadData();
});

const loadData = () => {
  loadDetail();
  getGoodsList();
};

const navToHome = () => {
  console.log("navToHome");
  uni.redirectTo({
    url: "/subPackages/collect/index",
  });
};

const handleTabChange = (item: { title: string; value: number }) => {
  goodsParams.value.level = item.value;
  goodsParams.value.page = 1;
  getGoodsList();
};

const loadDetail = async () => {
  const pid = getPageOptions().id;
  const uid = getPageOptions().uid;
  await UserModule.getUserInfo();
  if (Number(uid) !== Number(UserModule.userInfo.uid)) {
    getCollectDetail(pid, uid);
  } else {
    getCollectDetail(pid);
  }
};

const progress = computed(() => {
  return `${(collectProgress.value * 100).toFixed(2)}%`;
});

const progressStyle = computed(() => {
  return {
    width: `${collectProgress.value * 100}%`,
  };
});

onShareAppMessage(() => {
  const userId = UserModule.userInfo.uid;
  return {
    title: "朋友！助我一臂之力！",
    imageUrl: collectDetail.value?.product.logo,
    path: `/subPackages/collect/detail/index?id=${collectDetail.value?.product.id}&uid=${userId}`,
  };
});
onShareTimeline(() => {
  const userId = UserModule.userInfo.uid;
  return {
    title: "朋友！助我一臂之力！",
    imageUrl: collectDetail.value?.product.logo,
    path: `/subPackages/collect/detail/index?id=${collectDetail.value?.product.id}&uid=${userId}`,
  };
});
</script>

<style lang="scss" scoped>
.collectDetail {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #6ec0fb;
  &-bg {
    width: 100%;
    aspect-ratio: 750 / 1344;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom));
    &-top {
      display: flex;
      flex-direction: column;
      width: 100%;
      &-item {
        margin-top: 24rpx;
        margin-left: 24rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        &-icon {
          width: 32rpx;
          height: 30rpx;
        }
        &-title {
          margin-left: 4rpx;
          font-weight: 400;
          font-size: 20rpx;
          color: #ffffff;
          line-height: 16rpx;
        }
      }

      &-info {
        margin-top: 31rpx;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        &-logo {
          width: 408rpx;
          height: 408rpx;
          animation: floatAnimation 2s ease-in-out infinite;
        }
        &-title {
          margin-top: 46rpx;
          font-weight: normal;
          font-size: 30rpx;
          color: #ffffff;
        }
        &-subTitle {
          margin-top: 15rpx;
          font-weight: normal;
          font-size: 24rpx;
          color: #ffffff;
        }
        &-progress {
          margin-top: 31rpx;
          display: flex;
          flex-direction: row;
          align-items: center;
          &-title {
            width: 117rpx;
            height: 30rpx;
          }
          &-bar {
            margin: 0 10rpx;
            position: relative;
            width: 520rpx;
            height: 17rpx;
            background: rgba($color: #070707, $alpha: 0.19);
            border-radius: 9rpx;
            overflow: hidden;
            &-value {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, #ffd8a8, #fea34f);
            }
          }
          &-subTitle {
            font-weight: normal;
            font-size: 24rpx;
            color: #ffffff;
          }
        }
      }
    }

    &-bottom {
      margin-top: 20rpx;
      position: relative;
      width: 100%;
      &-top {
        position: relative;
        width: 100%;
        aspect-ratio: 687 / 100;
        &-bg {
          width: 100%;
          height: 100%;
        }
        &-info {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          &-label {
            position: absolute;
            left: 198rpx;
            top: 20rpx;
            width: 85rpx;
            height: 52rpx;
          }
          &-avatar {
            width: 44rpx;
            height: 44rpx;
            border-radius: 22rpx;
            margin-right: 8rpx;
          }
          &-name {
            font-weight: normal;
            font-size: 26rpx;
            width: 120rpx;
            color: #ffffff;
            text-align: center;
            margin-bottom: 4rpx;
          }
        }
      }
      &-tips {
        margin-top: -16rpx;
        width: 100%;
        font-weight: 400;
        font-size: 22rpx;
        color: #362e80;
        text-align: center;
      }
      &-list {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 0 30rpx 100rpx;
        display: grid;
        grid-template-columns: repeat(
          auto-fill,
          minmax(calc((100% - 32px) / 3), 1fr)
        ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
        grid-gap: 16px; // 这是网格间的间隙，根据需要调整
      }
    }
  }

  &-bottom {
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom) + 24rpx);
    left: 32rpx;
    width: calc(100% - 64rpx);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    &-item {
      background-color: transparent;
      width: 310rpx;
      height: 74rpx;
      padding: 0;
      margin: 0;
      border: none;
      &-img {
        width: 100%;
        height: 100%;
      }
    }
    &-item::after {
      background-color: transparent;
      padding: 0;
      margin: 0;
      border: none;
    }
  }
}
</style>
