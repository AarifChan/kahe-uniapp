<template>
  <view class="address w-full box-border h-screen bg-main-bg p-32">
    <view class="address-form w-full px-32 box-border rounded-30 border-2 border-white"
      style="height: 60%"
      :style="{ background: 'rgba(255, 255, 255, 0.41)', boxShadow: '0 0 11rpx 3rpx #ffffff' }"
    >
      <TnForm>
        <item
          title="收件人"
          placeholder="请输入收件人信息"
          v-model:value="address.realName"
        />
        <item
          title="联系电话"
          placeholder="请输入收件人电话"
          v-model:value="address.phone"
        />
        <item
          title="所在地区"
          placeholder="点击选择地址"
          type="select"
          :value="areaAddress"
        >
          <template #default>
            <view class="address-selected" style="margin-left: 9px" @tap.stop="openRegionPicker = true">
              <view
                class="address-selected-active text-ellipsis text-black"
                v-if="areaAddress"
                >{{ areaAddress }}</view
              >
              <view class="address-selected-normal text-[#888888]" v-else>点击选择地址</view>
            </view>
          </template>
        </item>

        <item
          title="详细地址"
          placeholder="请输入收件人信息"
          v-model:value="address.detail"
        />
        <item
          title="设置默认"
          type="switch"
          v-model:value="address.isDefault"
        />
        // #ifdef MP-WEIXIN
        <view class="address-addressInput relative w-full h-92 bg-white rounded-4 mb-18"
          :style="{ boxShadow: '0rpx 0rpx 6rpx 0rpx #d4dee9' }"
          @tap.stop="handleWxAddress"
        >
          <view class="address-addressInput-wechat absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center">
            <image
              class="address-addressInput-wechat-img w-50 h-50"
              src="/static/kahe-202510/images/weixin.png"
            />
            <text
              class="address-addressInput-content-item-title"
              style="margin-left: 8px"
              >一键获取微信收货地址</text
            >
          </view>
        </view>
        // #endif
      </TnForm>
    </view>

    <view style="margin-top: 200rpx">
      <custom-button title="确 定" size="big" @tap.stop="handleCreate" />
    </view>
    <TnRegionPicker
      v-model="regionValue"
      v-model:open="openRegionPicker"
      @confirm="onRegionChange"
    />
  </view>
</template>

<script lang="ts" setup>
import Item from "./components/item.vue";
import TnRegionPicker from "@tuniao/tnui-vue3-uniapp/components/region-picker/src/region-picker.vue";

import TnForm from "@tuniao/tnui-vue3-uniapp/components/form/src/form.vue";
import CustomButton from "@/components/custom/button/index.vue";
import type { AddressModel } from "@/model/address";
import { ref, onMounted, computed } from "vue";
import { getPageOptions } from "@/utils/tools";
import { AddressModule } from "@/store/modules/address";
import { ShowToast } from "@/utils";

const openRegionPicker = ref(false);

const address = ref({
  city: "",
  cityId: 0,
  detail: "",
  district: "",
  isDefault: 0,
  phone: "",
  postCode: 0,
  province: "",
  realName: "",
} as AddressModel);

const regionValue = ref<string[]>(["广东省", "广州市", "番禺区"]);

const areaAddress = ref(
  computed(() => {
    return address.value.province + address.value.city + address.value.district;
  })
);

const onRegionChange = (sel: any) => {
  console.log("onRegionChange:", sel, regionValue.value);
  address.value.province = regionValue.value[0];
  address.value.city = regionValue.value[1];
  address.value.district = regionValue.value[2];
};
const handleCreate = async () => {
  if (
    address.value.realName !== "" &&
    address.value.detail !== "" &&
    address.value.phone !== ""
  ) {
    address.value.isDefault = address.value.isDefault ? 1 : 0;
    if (await AddressModule.addAddress(address.value)) {
      await ShowToast("添加成功");
      setTimeout(() => {
        uni.navigateBack();
      }, 500);
      return;
    }
    return;
  }
  await ShowToast("请填写完整信息");
};
const handleWxAddress = () => {
  uni.chooseAddress({
    success: (res) => {
      console.log("handleWxAddress", res);
      address.value.province = res.provinceName;
      address.value.city = res.cityName;
      address.value.district = res.countyName;
      address.value.detail = res.detailInfo;
      address.value.phone = res.telNumber;
      address.value.realName = res.userName;
    },
    fail: () => {
      console.log("showWechatAddress fail");
    },
  });
};

onMounted(async () => {
  const op = getPageOptions();
  const addressId = op.id;

  if (addressId) {
    const resp = await AddressModule.getAddressDetail(addressId);

    address.value.city = resp.city;
    address.value.province = resp.province;
    address.value.district = resp.district;
    address.value.detail = resp.detail;
    address.value.id = resp.id;
    address.value.isDefault = resp.isDefault;
    address.value.realName = resp.realName;
    address.value.phone = resp.phone;

    console.log("address:", resp, address.value);
  }
});
</script>

<style lang="scss" scoped>
</style>
