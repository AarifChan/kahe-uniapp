<template>
    <view class="product-record">
        <view
            class="product-record-item"
            v-for="(item, index) in recordList"
            :key="'product-item' + index"
        >
            <!-- <image
                class="product-record-item-bg"
                :src="
                    item.isSpec
                        ? 'https://jms.85gui7.com/kahe/product/record-spec.png'
                        : 'https://jms.85gui7.com/kahe/product/record-normal.png'
                "
            /> -->
            <view class="product-record-item-bg" />
            <view class="product-record-item-content">
                <view class="product-record-item-content-num">{{ item.sales }}</view>
                <view class="product-record-item-content-info">
                    <image
                        class="product-record-item-content-info-avatar"
                        :src="item.avatar"
                    />
                    <view class="product-record-item-content-info-center">
                        <text
                            class="product-record-item-content-info-center-title"
                        >{{ item.nickName }}在{{ item.time }}获得</text>
                        <text
                            class="product-record-item-content-info-center-subTitle"
                        >{{ item.title }}</text>
                    </view>
                </view>
                <image
                    v-if="item.isHide"
                    class="product-record-item-content-hide"
                    src="https://jms.85gui7.com/jos/common/hide-show.png"
                />
                <image
                    class="product-record-item-content-level"
                    mode="heightFix"
                    :src="item.levelImage"
                />
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { UIProductRecordModel } from '@/model'
defineProps({
    recordList: {
        type: Array as () => UIProductRecordModel[],
        default: [] as UIProductRecordModel[]
    }
})
</script>

<style lang="scss" scoped>
.product-record {
    position: relative;
    padding: 10rpx 24rpx 24rpx 24rpx;
    width: calc(100% - 48rpx);
    &-item {
        position: relative;
        margin-bottom: 16rpx;
        &-bg {
            width: 702rpx;
            height: 122rpx;
            background-color: #dfe5e8;
            border-radius: 10rpx;
            border: 4rpx solid #729ccb;
        }
        &-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            &-num {
                position: absolute;
                right: -6rpx;
                top: 0;
                background: #729CCB;
                border-radius: 0rpx 8rpx 0rpx 8rpx;
                color: #fff;
                font-size: 24rpx;
            }
            &-info {
                margin-left: 26rpx;
                display: flex;
                flex-direction: row;
                align-items: center;
                &-avatar {
                    width: 70rpx;
                    height: 70rpx;
                    border-radius: 35rpx;
                }
                &-center {
                    margin-left: 12rpx;
                    display: flex;
                    flex-direction: column;
                    &-title {
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #649bff;
                    }
                    &-subTitle {
                        font-size: 22rpx;
                        font-weight: 400;
                        color: #649bff;
                    }
                }
            }
            &-hide {
          position: absolute;
          right: 130rpx;
          top: 15px;
          width: 62rpx;
          height: 58rpx;
        }
            &-level {
                height: 60rpx;
                margin-right: 12rpx;
            }
        }
    }
}
.spec-Color {
    color: #649bff;
}
</style>
