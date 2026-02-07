<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="modal-edit">
      <image class="modal-edit-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/mine/info-bg.png" />
      <view class="modal-edit-content">
        <view class="modal-edit-content-info">
          <form @submit="formSubmit">
            //#ifdef MP-WEIXIN
            <button
              class="modal-edit-content-info-head"
              open-type="chooseAvatar"
              @chooseavatar="onChooseAvatar"
            >
              <image
                class="modal-edit-content-info-head-img"
                :src="avatarUrl"
              ></image>
            </button>
            // #endif //#ifndef MP-WEIXIN
            <button class="modal-edit-content-info-head" @click="chooseImage">
              <image
                class="modal-edit-content-info-head-img"
                :src="avatarUrl"
              ></image>
            </button>
            // #endif

            <button
              class="modal-edit-content-info-btn theme-font"
              open-type="chooseAvatar"
              @chooseavatar="onChooseAvatar"
            >
              点击上传
            </button>
            <view class="modal-edit-content-info-name">
              <view class="modal-edit-content-info-name-title theme-font"
                >用户昵称：</view
              >
              <input
                type="nickname"
                name="nickname"
                style="'color: #C6C6C6; font-size: 15px;height:16px;'"
                class="modal-edit-content-info-name-input theme-font"
                placeholder="请输入用户昵称"
                :placeholderStyle="placeholderStyle"
                :value="nickName"
              />
            </view>
            <view class="modal-edit-content-bottom">
              <button formType="submit" class="modal-edit-content-bottom-item">
                <!--                <custom-button type="red" form-type="submit" title="" />-->
                <view class="modal-edit-content-bottom-item-confirm theme-font"
                  >确认上传</view
                >
              </button>
              <button
                class="modal-edit-content-bottom-item"
                @tap.stop="closeAction"
              >
                <view class="modal-edit-content-bottom-item-cancel theme-font"
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
const formSubmit = (e: any) => {
  const {
    target: {
      value: { nickname },
    },
  } = e;
  const { avatarUrl } = dataMap;
  if (!nickname || nickname === "" || !avatarUrl || avatarUrl === "") {
    ShowToast("请输入完整用户信息");
    return;
  }
  dataMap.nickName = nickname;
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

<style lang="scss" scoped>
.modal-edit {
  position: relative;
  background-color: transparent;
  width: 750rpx;
  height: 772rpx;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &-info {
      padding-top: 104rpx;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-head {
        margin-top: 80rpx;
        position: relative;
        display: flex;
        width: 100%;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        background-color: transparent;
        &-img {
          width: 280rpx;
          height: 280rpx;
          border-radius: 140rpx;
        }
      }
      &-head:after {
        border: none;
      }
      &-btn {
        margin-top: 25rpx;
        position: relative;
        color: #000000;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        background-color: transparent;
      }
      &-btn:after {
        border: none;
      }

      &-name {
        margin-top: 40rpx;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 580rpx;
        height: 86rpx;
        border-radius: 10rpx;
        background-color: rgba($color: #ffffff, $alpha: 0.72);

        &-title {
          color: #000000;
          width: 200rpx;
          font-size: 17px;
          padding: 0 8rpx;
          text-align: right;
        }
        &-input {
          width: calc(100% - 300rpx);
          font-size: 28rpx;
          color: #000000;
        }
      }
    }

    &-bottom {
      margin-top: 40rpx;
      width: 580rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 13rpx;
      justify-content: space-around;

      &-item {
        width: 100%;
        height: 67rpx;
        padding: 0;
        margin: 0;
        border-radius: 0;
        &-confirm {
          background: #ff7276;
          box-shadow: 0rpx 4rpx 0rpx 0rpx #ff7276;
          border-radius: 8rpx;
          color: white;
        }

        &-cancel {
          background: #53d6ac;
          box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f;
          border-radius: 8rpx;
          color: white;
        }
      }
      &-item:after {
        padding: 0;
        margin: 0;
        border: none;
      }
    }
  }
}
</style>
