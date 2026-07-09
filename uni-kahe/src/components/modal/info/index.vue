<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="modal-edit relative bg-transparent w-750 h-772">
      <image class="modal-edit-bg w-full h-full" src="/static/kahe-202510/ka-he/mine/info-bg.png" />
      <view class="modal-edit-content absolute left-0 top-0 w-full h-full">
        <view class="modal-edit-content-info pt-104 box-border w-full flex flex-col items-center justify-center">
          <form @submit="formSubmit">
            <!-- #ifdef MP-WEIXIN -->
            <button
              class="modal-edit-content-info-head mt-80 relative flex w-full flex-row items-center justify-center bg-transparent"
              open-type="chooseAvatar"
              @chooseavatar="onChooseAvatar"
            >
              <image
                class="modal-edit-content-info-head-img w-280 h-280 rounded-full"
                :src="avatarUrl"
              ></image>
            </button>
            <!-- #endif -->
            <!-- #ifndef MP-WEIXIN -->
            <button class="modal-edit-content-info-head mt-80 relative flex w-full flex-row items-center justify-center bg-transparent" @click="chooseImage">
              <image
                class="modal-edit-content-info-head-img w-280 h-280 rounded-full"
                :src="avatarUrl"
              ></image>
            </button>
            <!-- #endif -->

            <!-- #ifdef MP-WEIXIN -->
            <button
              class="modal-edit-content-info-btn mt-20 mb-16 relative text-black font-normal text-[18px] leading-[18px] text-center bg-transparent theme-font"
              open-type="chooseAvatar"
              @chooseavatar="onChooseAvatar"
            >
              点击上传
            </button>
            <!-- #endif -->
            <!-- #ifndef MP-WEIXIN -->
            <button
              class="modal-edit-content-info-btn mt-20 mb-16 relative text-black font-normal text-[18px] leading-[18px] text-center bg-transparent theme-font"
              @click="chooseImage"
            >
              点击上传
            </button>
            <!-- #endif -->
            <view class="modal-edit-content-info-name mt-24 relative flex flex-row items-center justify-center w-580 h-86 rounded-10 bg-[rgba(255,255,255,0.72)]">
              <view class="modal-edit-content-info-name-title theme-font text-black w-200 text-[17px] px-8 text-right"
                >用户昵称：</view
              >
              <!-- #ifdef MP-WEIXIN -->
              <input
                type="nickname"
                name="nickname"
                class="modal-edit-content-info-name-input text-black text-28"
                style="width: calc(100% - 300rpx)"
                placeholder="请输入用户昵称"
                :placeholderStyle="placeholderStyle"
                :value="nickName"
                @input="onNicknameInput"
              />
              <!-- #endif -->
              <!-- #ifndef MP-WEIXIN -->
              <input
                type="text"
                name="nickname"
                class="modal-edit-content-info-name-input text-black text-28"
                style="width: calc(100% - 300rpx)"
                placeholder="请输入用户昵称"
                :placeholderStyle="placeholderStyle"
                :value="nickName"
                @input="onNicknameInput"
              />
              <!-- #endif -->
            </view>
            <view class="modal-edit-content-bottom mt-40 w-580 flex flex-row items-center gap-13 justify-around">
              <button formType="submit" class="modal-edit-content-bottom-item w-full h-67 p-0 m-0 rounded-0">
                <!--                <custom-button type="red" form-type="submit" title="" />-->
                <view class="modal-edit-content-bottom-item-confirm theme-font bg-[#ff7276] shadow-[0_4rpx_0_0_#ff7276] rounded-8 text-white"
                  >确认上传</view
                >
              </button>
              <button
                class="modal-edit-content-bottom-item w-full h-67 p-0 m-0 rounded-0"
                @tap.stop="closeAction"
              >
                <view class="modal-edit-content-bottom-item-cancel theme-font bg-[#53d6ac] shadow-[0_4rpx_0_0_#43a17f] rounded-8 text-white"
                  >暂不更新</view
                >
                <!--                <custom-button title="暂不更新" />-->
              </button>
            </view>
          </form>
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, watch, ref } from "vue";
import { RequestConfig } from "@/config";
import { updateUserInfoRequest } from "@/api/";
import { UserModule } from "@/store/modules/user";
import { ShowToast } from "@/utils";
import CustomButton from "@/components/custom/button/index.vue";
const props = defineProps({
  show: Boolean,
});

const vShow = ref(props.show);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);
const emits = defineEmits(["update:show"]);
const dataMap = reactive({
  avatarUrl: "",
  nickName: "",
  placeholderStyle:
    'color: #C6C6C6; font-size: 15px;height:16px;font-family: "YouSheBiaoTiHei";',
});
const { avatarUrl, nickName, placeholderStyle } = toRefs(dataMap);
const chooseImage = () => {
  uni.chooseImage({
    success: async function (res) {
      const tempFilePaths = res.tempFilePaths;
      uni.uploadFile({
        url: RequestConfig.baseUrl + "/tools/upload",
        filePath: tempFilePaths[0],
        name: "file",
        header: {
          Authorization: " Bearer " + UserModule.token,
        },
        success: async (resp: any) => {
          const data = JSON.parse(resp.data);
          if (data.status === 200) {
            const fileUrl = data.data;
            dataMap.avatarUrl = fileUrl;
          } else {
            ShowToast(data.msg);
          }
        },
      });
    },
  });
};
const onChooseAvatar = (e: any) => {
  const { avatarUrl } = e.detail;
  uni.uploadFile({
    url: RequestConfig.baseUrl + "/tools/upload",
    filePath: avatarUrl,
    name: "file",
    header: {
      Authorization: " Bearer " + UserModule.token,
    },
    success: async (resp: any) => {
      const data = JSON.parse(resp.data);
      if (data.status === 200) {
        const fileUrl = data.data;
        dataMap.avatarUrl = fileUrl;
      } else {
        ShowToast(data.msg);
      }
    },
  });
};
// 实时同步昵称输入，避免依赖 form submit 事件取值
// Why: APP 环境下 form submit 事件的 e.detail.value 可能为 null，
//      导致解构报错 "Cannot destructure property 'nickname' from null"
const onNicknameInput = (e: any) => {
  dataMap.nickName = e.detail?.value ?? "";
};
const formSubmit = () => {
  const { nickName, avatarUrl } = dataMap;
  if (!nickName || nickName.trim() === "") {
    ShowToast("请输入用户昵称");
    return;
  }
  if (!avatarUrl || avatarUrl === "") {
    ShowToast("请上传头像");
    return;
  }
  updateInfoAction();
};
const updateInfoAction = () => {
  uploadInfo(dataMap.nickName, dataMap.avatarUrl);
};
const uploadInfo = async (nickName: string, avatarUrl: string) => {
  if (nickName === "微信用户") {
    ShowToast("不能使用默认昵称，请注册个昵称！");
    return;
  }
  const { code, msg } = await updateUserInfoRequest({
    nickname: nickName,
    avatar: avatarUrl,
  });
  if (code === 200) {
    await ShowToast("修改成功");
    await UserModule.getUserInfo();
    emits("update:show", false);
  } else {
    await ShowToast(msg);
  }
};
const closeAction = () => {
  emits("update:show", false);
};
watch(
  () => UserModule.userInfo,
  (val) => {
    dataMap.avatarUrl = val.avatar;
    dataMap.nickName = val.nickname;
  }
);
onMounted(() => {
  UserModule.getCode();
});
</script>

<style lang="scss" scoped></style>
