<script setup lang="ts">
import TnPopup from "@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue";
import HistoryItem from "../HistoryItem/index.vue";
import { PropType } from "vue";
import { ShingingInfo } from "../../api";
import Empty from "@/components/empty/index.vue";
const modelValue = defineModel<boolean>();
defineProps({
  list: {
    default: () => [],
    type: Array as PropType<Array<ShingingInfo>>,
  },
});
const emits = defineEmits(["scrolltolower"]);
</script>

<template>
  <TnPopup
    v-model="modelValue"
    width="100%"
    bg-color="transparent"
    :custom-style="{ overflow: 'visible' }"
  >
    <view class="pop">
      <view class="pop-topIcon">
        <image
          src="https://jms.85gui7.com/kahe-202510/shine/left-top.png"
          mode="scaleToFill"
          class="icon"
        />
        <text>{{ "往期欧皇" }}</text>
      </view>
      <image
        src="https://jms.85gui7.com/kahe-202510/shine/pop-bg.png"
        mode="scaleToFill"
        class="pop-bg"
      />
      <scroll-view
        :scroll-y="true"
        class="container"
        @scrolltolower="emits('scrolltolower')"
      >
        <view class="container-content">
          <div v-for="(item, index) in list" :id="item.id" :key="item.id">
            <div v-for="(zItem, zIndex) in item.prizePool">
              <HistoryItem
                v-for="(user, userIndex) in zItem.users"
                :key="index + `${item.id}` + zIndex + userIndex"
                :id="index + `${item.id}` + zIndex + userIndex"
                :a-id="item.id"
                :user="user"
                :item="zItem"
              />
            </div>
          </div>
        </view>
      </scroll-view>
    </view>
  </TnPopup>
</template>
<style lang="scss" scoped>
.pop {
  width: 100%;
  padding: 90rpx 30rpx;
  position: relative;
  height: 916rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

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
    left: 0;
    width: 397rpx;
    height: 125rpx;

    .icon {
      position: relative;
      width: 100%;
      height: 100%;
    }

    text {
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%, -50%);
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 36rpx;
      color: #000000;
      line-height: 22rpx;
    }
  }

  .container {
    flex: 1;
    min-height: 0;
    overflow: auto;

    &-content {
      padding: 0 30rpx;
      box-sizing: border-box;
    }
  }
}
</style>
