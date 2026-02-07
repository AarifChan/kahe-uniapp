<template>
    <view v-if="recordList.length > 0" class="record">
        <view class="record-level" v-if="!types">
            <view class="record-level-item" v-for="(item, index) in list" :key="index" @tap.stop="sortTabAction(item)"
                :class="sortIndex === item.value ? 'active' : ''">
                <view class="record-level-item-title" :class="sortIndex === item.value ? 'textColor' : ''">{{
                    getNormalLevelNameByLevel(item.value) }}</view>
            </view>
        </view>
        <view class="record-listItem" v-for="(item, index) in recordList" :key="index">
            <view class="record-listItem-num" v-if="types && !isOpen">#{{ item.sales }}</view>
            <view class="record-listItem-list">
                <view class="record-listItem-list-left">
                    <decorate-avatar :avatar="item.avatar" :level="item.vip" :scale="0.6" style="margin-left: -16px" />
                    <view class="record-listItem-list-left-name">{{
                        item.nickName
                    }}</view>
                </view>
                <view class="record-listItem-list-time">{{ item.time }}</view>
            </view>
            <view class="record-listItem-line" />
            <view class="record-listItem-bottom">
                <view class="record-listItem-bottom-left">
                    <image class="record-listItem-bottom-left-avatar" :src="item.goodsImage" mode="widthFix" />
                    <view class="record-listItem-bottom-left-name">{{ item.title }}{{ isOpen ? `x${item.num}` : "" }}
                    </view>
                </view>
                <!--                <view class="record-listItem-bottom-level1" v-if="!types" :style="levelColor(item.level)">{{getLevelImageNameByLevel(item.level)}}</view>-->
                <!--                <view v-else>-->
                <!--                    <image class="record-listItem-bottom-level2" :src="getLevelImageNameByLevel(item.level)" v-if="isInfinite" />-->
                <!--                   -->
                <!--                </view>-->

                <image v-if="!isOpen" class="record-listItem-bottom-level3" :src="getLevelImageByLevel(item.level)" />

                <!-- <image class="record-listItem-bottom-image" v-if="types" :src="item.levelImage" mode="heightFix" /> -->
                <!--                <view class="record-listItem-bottom-time">x1</view>-->
            </view>
        </view>
    </view>
    <empty :show="recordList.length === 0" />
</template>
<script setup lang="ts">
import type { UIProductRecordModel } from "@/model";
import DecorateAvatar from "@/components/custom/DecorateAvatar/index.vue";
import { ref, computed } from "vue";
import Empty from "@/components/empty/index.vue";
import { UserModule } from "@/store/modules/user";
import { useEnum } from "@/composables/enum";

const { getLevelImageByLevel, getNormalLevelNameByLevel } = useEnum();
interface LevelTapModel {
    value: number;
    title: string;
}

defineProps({
    list: {
        type: Array as () => LevelTapModel[],
        default: [] as LevelTapModel[],
    },
    recordList: {
        type: Array as () => UIProductRecordModel[],
        default: [] as UIProductRecordModel[],
    },
    types: {
        type: Boolean,
        default: false,
    },
    borderWidth: {
        type: Number,
        default: 0,
    },
    borderHeight: {
        type: Number,
        default: 0,
    },
    isSelect: {
        default: false,
        type: Boolean,
    },
    isInfinite: {
        default: false,
        type: Boolean,
    },
    isOpen: {
        default: false,
        type: Boolean,
    },
});
const sortIndex = ref(-1);
const emits = defineEmits(["sortTabAction", "update:Scurrent"]);
const sortTabAction = (i: any) => {
    sortIndex.value = i.value;
    emits("sortTabAction", i);
};
const userInfo = computed(() => UserModule.userInfo);
</script>
<style lang="scss" scoped>
.record {
    position: relative;
    height: 100%;
    padding: 16rpx 34rpx;
    box-sizing: border-box;

    &-level {
        width: 100%;
        position: relative;
        display: flex;
        padding-bottom: 20rpx;
        box-sizing: border-box;
        overflow-x: auto;
        margin-top: 20rpx;

        &-item {
            flex-shrink: 0;
            margin-right: 12rpx;
            padding: 0 36rpx;
            //width: 96rpx;
            height: 36rpx;
            background: #e8ad82;
            border-radius: 18rpx;
            text-align: center;
            line-height: 36rpx;

            &-title {
                font-size: 24rpx;
                color: #ffffff;

                &.textColor {
                    color: #ffffff;
                }
            }

            &.active {
                background: #ac5a3e;
            }
        }
    }

    &-listItem {
        position: relative;
        padding: 0 20rpx 28rpx 20rpx;
        box-sizing: border-box;
        width: 100%;
        background: #fffbef;
        box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(217, 190, 134, 0.5);
        border-radius: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 26rpx auto 0 auto;

        &-num {
            position: absolute;
            right: 8rpx;
            top: 4rpx;
            padding: 8rpx 32rpx;
            background: #f0ead8;
            border-radius: 10rpx;
            color: #000000;
            font-size: 24rpx;
        }

        &-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 16rpx;

            &-left {
                display: flex;
                align-items: center;

                &-name {
                    font-size: 28rpx;
                    color: #333333;
                }
            }

            &-time {
                font-size: 20rpx;
                color: #545454;
            }
        }

        &-line {
            position: absolute;
            left: 50%;
            top: 58%;
            transform: translate(-50%, -50%);
            width: calc(100% - 20rpx);
            height: 2rpx;
            background: #E2DBC5;
            z-index: 1;
        }

        &-bottom {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;

                &-avatar {
                    width: 42rpx;
                    height: calc(42rpx / 300 * 420);
                    margin-right: 22rpx;
                    border-radius: 4rpx;
                }

                &-name {
                    font-size: 28rpx;
                    color: #333333;
                }
            }

            &-time {
                font-size: 24rpx;
                color: #333333;
            }

            &-image {
                height: 60rpx;
            }

            &-level1 {
                position: absolute;
                right: 24rpx;
                bottom: 0;
                width: 100rpx;
                height: 80rpx;
                line-height: 80rpx;
                text-align: center;
                font-size: 36rpx;
                font-weight: 700;
            }

            &-level2 {
                position: absolute;
                right: 24rpx;
                bottom: 12rpx;
                width: 91rpx;
                height: 37rpx;
            }

            &-level3 {
                position: absolute;
                right: 24rpx;
                bottom: 12rpx;
                width: 100rpx;
                height: 80rpx;
            }
        }
    }

    &-listItem:first-child {
        margin-top: 0;
    }
}
</style>
