<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="smash">
      <image class="smash-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/common/smash-bg.png" />
      <view class="smash-content">
        <view class="smash-content-top">
          <text class="smash-content-top-title">退货</text>
          <text class="smash-content-top-value">{{ total }}</text>
          <text class="smash-content-top-title">件商品，预计获得</text>
          <text class="smash-content-top-value">{{
            totalPrice.toFixed(2)
          }}</text>
          <text class="smash-content-top-title">点券</text>
        </view>
        <scroll-view
          class="smash-content-list"
          :enable-flex="true"
          :scroll-y="true"
          scroll-with-animation
        >
          <view class="smash-content-list-content">
            <view
              class="smash-content-list-content-item"
              v-for="(item, index) in recycleGoods"
              :key="'recycleGoods' + index"
            >
              <image
                class="smash-content-list-content-item-level"
                mode="heightFix"
                :src="getLevelImageByLevel(item.level)"
              />
              <text class="smash-content-list-content-item-num">
                X{{ item.num }}</text
              >
            </view>
          </view>
        </scroll-view>
        <view class="smash-content-forbidden">
          <view class="smash-content-forbidden-side">
            <text class="smash-content-forbidden-side-title">赏品退货声明</text>
            <text
              class="smash-content-forbidden-side-subTitle text-flow-ellipsis-multiple"
              >注：退货不可逆转。</text
            >
            <text class="smash-content-forbidden-side-danger"
              >未成年人请在监护人陪同下操作</text
            >
          </view>
          <image
            class="smash-content-forbidden-img"
            src="https://jms.85gui7.com/kahe/product/18age.png"
          />
        </view>
        <view
          style="
            margin-top: 8px;
            height: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          "
        >
          <agreement v-model:checked="agree" />
          <view class="confirm-btn theme-font" @tap.stop="didTapConfirm">
            确 定
          </view>
        </view>
      </view>

      <image
        class="smash-close"
        src="https://jms.85gui7.com/kahe-202510/ka-he/common/close.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import Agreement from "@/components/agreement/index.vue";
import CustomButton from "@/components/custom/button/index.vue";
import type { SubmitGoodsModel } from "@/model";
import { type PropType, computed, ref, watch } from "vue";
import { ShowToast } from "@/utils";
import { useEnum } from "@/composables/enum";
const { getLevelImageByLevel } = useEnum();
const props = defineProps({
  show: {
    default: true,
    type: Boolean,
  },
  recycleGoods: {
    default: [] as SubmitGoodsModel[],
    type: Array as PropType<SubmitGoodsModel[]>,
  },
});
const vShow = ref(false);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);
const didTapConfirm = () => {
  if (!agree.value) {
    ShowToast("请阅读并允许协议");
    return;
  }
  emits("didTapSmash");
};
const agree = ref(false);

const total = computed(() => {
  let total = 0;
  props.recycleGoods.forEach((item) => {
    total += item.num;
  });
  return total;
});
const totalPrice = computed(() => {
  let price = 0;
  props.recycleGoods.forEach((item) => {
    price += item.price * item.num;
  });
  return price;
});
const emits = defineEmits(["update:show", "didTapSmash"]);
</script>

<style lang="scss" scoped>
.smash {
  position: relative;

  width: 720rpx;
  height: 734rpx;
  box-sizing: border-box;
  &-bg {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 30rpx;
    top: 0;
    width: calc(100% - 60rpx);
    height: 100%;
    display: flex;
    flex-direction: column;
    &-top {
      margin-top: 98rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      &-title {
        font-size: 32rpx;
        font-weight: 400;
        color: #000000;
      }
      &-value {
        font-size: 32rpx;
        font-weight: 400;
        color: #4b71ff;
      }
    }
    &-list {
      margin-top: 18rpx;
      position: relative;
      width: 100%;
      height: 260rpx;
      &-content {
        display: grid;
        grid-template-columns: repeat(
          auto-fill,
          minmax(30%, 1fr)
        ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
        grid-gap: 24rpx; // 这是网格间的间隙，根据需要调整

        &-item {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          &-level {
            width: 80rpx;
            height: 80rpx;
          }
          &-num {
            font-size: 38rpx;
            font-weight: 400;
            color: #4b71ff;
          }
        }
      }
    }
    &-forbidden {
      box-sizing: border-box;
      width: 100%;
      height: calc(150rpx - 20rpx);
      background: #ffffff;
      box-shadow: 0rpx 0rpx 5rpx 0rpx #d4dee9;
      border-radius: 6rpx;
      padding: 24rpx 18rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &-side {
        display: flex;
        flex-direction: column;
        &-title {
          font-size: 26rpx;
          font-weight: 400;
          color: #000000;
        }
        &-subTitle {
          font-size: 18rpx;
          font-weight: 400;
          width: 360rpx;
          color: #000000;
        }
        &-danger {
          font-size: 22rpx;
          font-weight: 400;
          color: #ba0000;
        }
      }
      &-img {
        width: 120rpx;
        height: 130rpx;
      }
    }
  }

  &-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 74rpx;
    height: 74rpx;
  }
}
.confirm-btn {
  width: 146rpx;
  height: 56rpx;
  line-height: 56rpx;
  text-align: center;
  margin-top: 28rpx;
  background: #53d6ac;
  box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f;
  border-radius: 8rpx;
  margin-bottom: 64rpx;
  font-size: 36rpx;
  color: white;
}
</style>
