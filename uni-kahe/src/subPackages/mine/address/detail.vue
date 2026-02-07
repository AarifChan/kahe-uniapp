<template>
  <view class="address">
    <view class="address-form">
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
            <view class="address-selected" @tap.stop="openRegionPicker = true">
              <view
                class="address-selected-active text-flow-ellipsis-single"
                v-if="areaAddress"
                >{{ areaAddress }}</view
              >
              <view class="address-selected-normal" v-else>点击选择地址</view>
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
        <view class="address-addressInput" @tap.stop="handleWxAddress">
          <view class="address-addressInput-wechat">
            <image
              class="address-addressInput-wechat-img"
              src="https://jms.85gui7.com/kahe-202510/images/weixin.png"
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
.address {
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  background-color: $main-bg;
  padding: 32rpx;
  &-form {
    width: 100%;
    background: rgba(255, 255, 255, 0.41);
    box-shadow: 0 0 11rpx 3rpx #ffffff;
    border: 2rpx solid white;
    border-radius: 30rpx;
    height: 60%;
    padding: 0 32rpx;
    box-sizing: border-box;
  }
  &-selected {
    margin-left: 9px;
    &-active {
      color: #000000;
    }
    &-normal {
      color: #888888;
    }
  }

  &-addressInput {
    position: relative;
    width: 100%;
    height: 92rpx;
    background: #ffffff;
    box-shadow: 0rpx 0rpx 6rpx 0rpx #d4dee9;
    border-radius: 4rpx;
    margin-bottom: 18rpx;
    &-wechat {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &-img {
        width: 50rpx;
        height: 50rpx;
      }
    }
  }
}
</style>
