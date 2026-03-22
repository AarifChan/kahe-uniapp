<script setup lang="ts">
import TnPopup from "@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue";
import TnForm from "@tuniao/tnui-vue3-uniapp/components/form/src/form.vue";
import TnFormItem from "@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue";
import TnInput from "@tuniao/tnui-vue3-uniapp/components/input/src/input.vue";
import type { TnFormInstance } from "@tuniao/tnui-vue3-uniapp";
import { onMounted, onUnmounted, PropType, reactive, ref } from "vue";
import { ShingingInfo } from "@/subPackages/xingyao/api";
import { eventBus } from "@/utils/event";
import { AddressModel } from "@/model";
import { ShowToast } from "@/utils";
const modelValue = defineModel<boolean>();
const choose = ref(false);
const tapChoose = () => {
  choose.value = !choose.value;
};
defineProps({
  info: {
    default: {},
    type: Object as PropType<ShingingInfo>,
  },
});
const selectAddress = ref<AddressModel>({
  phone: "",
  address: "",
  name: "",
});

const formRef = ref<TnFormInstance>();

const navToSelectAddress = () => {
  uni.navigateTo({
    url: `/subPackages/mine/address/index?needSelect=${true}`,
  });
};
const emits = defineEmits(["protocol", "confirm"]);
onMounted(() => {
  eventBus.on("didSelectAddress", (addressItem: AddressModel) => {
    console.log("didSelectAddress:", addressItem);
    selectAddress.value = addressItem;
    selectAddress.value.name = addressItem.realName;
    selectAddress.value.address =
      addressItem.province +
      addressItem.city +
      addressItem.district +
      addressItem.detail;
  });
});
const handleRecieve = () => {
  if (!choose.value) {
    ShowToast("阅读并同意《用户使用协议》");
    return;
  }
  if (
    selectAddress.value.name?.length === 0 ||
    selectAddress.value.phone.length === 0 ||
    selectAddress.value.address?.length === 0
  ) {
    ShowToast("请填写完整的收货地址");
    return;
  }
  emits("confirm", selectAddress.value);
};
onUnmounted(() => {
  eventBus.off("didSelectAddress");
});
// 表单数据
const formData = reactive({
  recipient: "",
  contact: "",
  address: "",
});
</script>

<template>
  <TnPopup
    v-model="modelValue"
    width="100%"
    bg-color="transparent"
    :custom-style="{ overflow: 'visible' }"
  >
    <view class="content">
      <view class="pop">
        <view class="pop-topIcon">
          <image
            src="https://jms.85gui7.com/kahe-202510/shine/top-icon.png"
            class="icon_bg"
          />
          <text class="icon_title theme-font">恭喜获得</text>
        </view>
        <image
          src="https://jms.85gui7.com/kahe-202510/shine/pop-bg.png"
          mode="scaleToFill"
          class="pop-bg"
        />
        <view class="pop-title"
          >今日消费满{{ info?.minScore }}元，即可领取参与码!</view
        >
        <view class="pop-content">
          <view class="top">
            <text>选择收货信息</text>
            <image
              src="https://jms.85gui7.com/kahe-202510/shine/right-icon.png"
              mode="scaleToFill"
              class="top-img"
              @tap.stop="navToSelectAddress"
            />
          </view>
          <TnForm ref="formRef" :model="formData" style="margin: 58rpx 0">
            <TnFormItem label="收件人:">
              <TnInput v-model="selectAddress.name" />
            </TnFormItem>
            <TnFormItem label="联系方式:">
              <TnInput v-model="selectAddress.phone" />
            </TnFormItem>
            <TnFormItem label="收货地址:">
              <TnInput v-model="selectAddress.address" textarea />
            </TnFormItem>
          </TnForm>
          <view class="card">参与码为实体卡片，需填写收货信息。</view>
        </view>
        <view class="pop-button" @click="handleRecieve">
          <view class="btn"> 确定领取 </view>
        </view>
        <view class="pop-bottom">
          <view class="rectangle" @tap.stop="tapChoose">
            <image
              src="https://jms.85gui7.com/kahe-202510/shine/normal.png"
              mode="scaleToFill"
              class="select-icon"
            />
            <image
              src="https://jms.85gui7.com/kahe-202510/shine/selected.png"
              mode="scaleToFill"
              class="icon"
              v-if="choose"
            />
          </view>
          <text @click="emits('protocol')">已阅读并同意《用户使用协议》</text>
        </view>
      </view>
    </view>
  </TnPopup>
</template>
<style lang="scss" scoped>
.content {
  padding: 64rpx 0;
  width: 100vw;
}
.pop {
  width: 100%;
  padding: 85rpx 75rpx;
  position: relative;
  height: 916rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: visible;

  &-bg {
    position: absolute;
    width: calc(100% - 50rpx);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    z-index: -1;
  }

  &-topIcon {
    position: absolute;
    top: -45rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 605rpx;
    height: 100rpx;

    .icon_bg {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .icon_title {
      position: absolute;
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%);
      font-weight: 400;
      font-size: 45rpx;
      color: #ffffff;
      @include text-stroke(3rpx, #ff3333);
    }
  }

  &-title {
    text-align: center;
    font-weight: normal;
    font-size: 26rpx;
    color: #000000;
    line-height: 22rpx;
    margin-bottom: 33rpx;
  }

  &-content {
    padding: 25rpx 17rpx 17rpx 32rpx;
    box-sizing: border-box;
    height: 503rpx;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10rpx;
    border: 2px solid #972424;

    .top {
      display: flex;
      justify-content: space-between;

      text {
        font-weight: normal;
        font-size: 26rpx;
        color: #000000;
        line-height: 30rpx;
      }

      &-img {
        width: 17rpx;
        height: 30rpx;
      }
    }

    .card {
      font-family: Adobe Heiti Std;
      font-weight: normal;
      font-size: 26rpx;
      color: #000000;
      line-height: 72rpx;
      text-align: center;
    }
  }

  &-button {
    margin: 35rpx auto 0 auto;

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 187rpx;
      height: 63rpx;
      background-image: url("https://jms.85gui7.com/kahe-202510/shine/yellow.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }

  &-bottom {
    margin-top: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .rectangle {
      position: relative;
      width: 36rpx;
      height: 36rpx;

      .select-icon {
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
      }

      .icon {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    text {
      font-family: Adobe Heiti Std;
      font-weight: normal;
      font-size: 26rpx;
      color: #000000;
      line-height: 72rpx;
    }
  }
}
</style>
