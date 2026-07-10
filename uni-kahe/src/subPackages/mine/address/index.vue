<template>
  <view class="address w-full h-screen bg-main-bg">
    <scroll-view class="address-content absolute left-0 top-0 p-32 box-border w-full flex flex-col"
      :scroll-y="true"
      :style="{ height: 'calc(100vh - env(safe-area-inset-bottom) - 100rpx)' }"
    >
      <view
        class="address-content-item relative bg-[rgba(20,20,20,0)] rounded-4 h-122 mb-32 border-2 border-[#000000]"
        v-for="(item, index) in addressList"
        :key="index"
        @tap.stop="selectItem(item)"
      >
        <view class="address-content-item-content absolute left-0 top-0 px-50 w-full h-full flex flex-row items-center justify-between"
        >
          <view class="address-content-item-content-side flex flex-col">
            <text class="address-content-item-content-side-title text-28 font-normal text-black">{{
              item.detail
            }}</text>
            <text class="address-content-item-content-side-subTitle mt-24 text-24 font-normal text-[#515151]"
              >{{ item.realName }} {{ handleMobile(item.phone) }}</text
            >
          </view>
          <view
            class="address-content-item-content-right flex flex-row items-center"
            @tap.stop="handleEdit(item)"
            v-if="!needSelect"
          >
            <view class="address-content-item-content-right-border mr-40 w-1 h-87 bg-[#000000]" />
            <image
              style="width: 17px; height: 24px"
              src="/static/kahe/mine/address-edit.png"
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
</style>
