<template>
  <view class="address">
    <scroll-view class="address-content" :scroll-y="true">
      <view
        class="address-content-item"
        v-for="(item, index) in addressList"
        :key="index"
        @tap.stop="selectItem(item)"
      >
        <view class="address-content-item-content">
          <view class="address-content-item-content-side">
            <text class="address-content-item-content-side-title">{{
              item.detail
            }}</text>
            <text class="address-content-item-content-side-subTitle"
              >{{ item.realName }} {{ handleMobile(item.phone) }}</text
            >
          </view>
          <view
            class="address-content-item-content-right"
            @tap.stop="handleEdit(item)"
            v-if="!needSelect"
          >
            <view class="address-content-item-content-right-border" />
            <image
              style="width: 17px; height: 24px"
              src="https://jms.85gui7.com/kahe/mine/address-edit.png"
            />
          </view>
        </view>
      </view>
      <empty :show="addressList.length === 0" />
      <custom-button
        title="新增收货地址"
        size="big"
        position="fixed"
        @tap.stop="handleEdit"
      />
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import CustomButton from "@/components/custom/button/index.vue";
import { computed, ref, onMounted } from "vue";
import { AddressModule } from "@/store/modules/address";
import type { AddressModel } from "@/model/address";
import { handleMobile, getPageOptions } from "@/utils/tools";
import { eventBus } from "@/utils/event";
import Empty from "@/components/empty/index.vue";

const addressList = ref(
  computed((): AddressModel[] => AddressModule.addressList)
);

const needSelect = ref(false);

const handleEdit = (item: AddressModel) => {
  if (item && item.id) {
    uni.navigateTo({
      url: `/subPackages/mine/address/detail?id=${item.id}`,
    });
  } else {
    uni.navigateTo({
      url: "/subPackages/mine/address/detail",
    });
  }
};

const selectItem = (item: AddressModel) => {
  console.log("selectItem===>", item);

  if (needSelect.value) {
    eventBus.emit("didSelectAddress", item);
    uni.navigateBack();
  }
};
onMounted(async () => {
  const op = getPageOptions();
  const needSelects = op.needSelect;
  if (needSelects) {
    needSelect.value = needSelects;
  }
  await AddressModule.getAddressList();
  await AddressModule.fetchCityList();
});
</script>

<style lang="scss" scoped>
.address {
  width: 100%;
  height: 100vh;
  background-color: $main-bg;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    padding: 32rpx;
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom) - 100rpx);
    display: flex;
    flex-direction: column;

    &-item {
      position: relative;

      background: rgba(20, 20, 20, 0);
      border: 2rpx solid #000000;
      border-radius: 4rpx;
      height: 122rpx;
      margin-bottom: 32rpx;
      &-content {
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 50rpx;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          &-border {
            margin-right: 40rpx;
            width: 1rpx;
            height: 87rpx;
            background: #000000;
          }
        }
        &-side {
          display: flex;
          flex-direction: column;
          &-title {
            font-size: 28rpx;
            font-weight: 400;
            color: #000000;
          }
          &-subTitle {
            margin-top: 24rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #515151;
          }
        }
      }
    }
  }
}
</style>
