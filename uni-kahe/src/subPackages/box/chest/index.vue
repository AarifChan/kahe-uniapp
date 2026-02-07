<template>
    <view class="luckDraw">
        <image src="https://jms.85gui7.com/kahe-202510/images/treasure-chest-bg-small.png" class="luckDraw-bg" mode="widthFix" />
        <view class="luckDraw-TreasureChest">
            <view class="luckDraw-TreasureChest-title">
                <image
                    src="https://jms.85gui7.com/kahe-202510/images/box-chest-title.png"
                    class="luckDraw-TreasureChest-title-image"
                />
            </view>
            <view class="luckDraw-TreasureChest-box">
                <image
                    src="https://jms.85gui7.com/kahe-202510/images/treasure-chest-small.png"
                    class="luckDraw-TreasureChest-box-img"
                />
            </view>
            <view class="luckDraw-TreasureChest-context">
                <view class="luckDraw-TreasureChest-context-text theme-font">{{
                    chestlist.title
                }}</view>
                <view class="luckDraw-TreasureChest-context-num">剩余{{ chestlist.num }}个</view>
            </view>
            <view
                class="luckDraw-TreasureChest-TreasureChestBtn"
                @tap.stop="openChestAction(chestlist)"
            >
                <image
                    src="https://jms.85gui7.com/kahe-202510/images/box-btn.png"
                    class="luckDraw-TreasureChest-TreasureChestBtn-btnBg"
                />
                <view
                    class="luckDraw-TreasureChest-TreasureChestBtn-btn theme-font"
                >开 启
                </view>
            </view>
            <view class="luckDraw-TreasureChest-goods">
                <view class="luckDraw-TreasureChest-goods-text">开启宝箱有机会获得以下物品</view>
                <image
                    src="https://jms.85gui7.com/kahe-202510/images/luckDraw-bg.png"
                    class="luckDraw-TreasureChest-goods-bg"
                />
                <scroll-view
                    :scroll-x="true"
                    :enable-flex="true"
                    class="luckDraw-TreasureChest-goods-list"
                >
                    <view
                        v-for="(item, index) in chestlist.goods"
                        :key="index"
                        class="luckDraw-TreasureChest-goods-list-goods"
                    >
                        <view
                            class="luckDraw-TreasureChest-goods-list-goods-top"
                        >
                            <image
                                class="luckDraw-TreasureChest-goods-list-goods-top-img"
                                :src="item.image"
                                :lazy-load="true"
                            ></image>
                            <image
                                class="luckDraw-TreasureChest-goods-list-goods-top-bg"
                                :src="levelTypeBg(item.level)"
                            ></image>
                            <view
                                class="luckDraw-TreasureChest-goods-list-goods-top-level"
                            >
                                <image
                                    :src="getLevelFullImagePath(item.level)"
                                    class="luckDraw-TreasureChest-goods-list-goods-top-level-img"
                                    mode="heightFix"
                                />
                            </view>
                        </view>
                        <text
                            class="luckDraw-TreasureChest-goods-list-goods-text"
                        >{{ item.title }}</text>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
    <drawModel
        v-model:show="drawShow"
        :reward-list="openRewordList"
        :tip="tips"
        @did-click-smash="crushAction"
    />
    <SmashModel
        v-model:show="crushShow"
        :recycle-goods="reItemGoods"
        @did-tap-smash="crushDidTap"
    />
    <selectModel
        v-model:show="selectShow"
        v-model:item="chestsModel"
        title="请选择宝箱数量"
        @did-tap-confirm="didTapConfirm"
        :tips="tips"
    />
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { getLevelFullImagePath } from '@/utils/tools/image'
import { getPageOptions } from '@/utils/tools'
import type { UIMineChestModel } from '@/model'
import { useEnum } from '@/composables/enum'
import drawModel from '@/components/modal/reward/index.vue'
import selectModel from '@/components/select/index.vue'
import SmashModel from '@/components/modal/smash/index.vue'
import { useBox } from '@/composables/box'
const { levelTypeBg } = useEnum()
const {
    crushDidTap,
    reItemGoods,
    crushAction,
    crushShow,
    selectShow,
    chestsModel,
    didTapConfirm,
    openChestAction,
    drawShow,
    openRewordList
} = useBox()
const tips = ref('tip')
const chestlist = ref({
} as UIMineChestModel)
onMounted(() => {
    const op = getPageOptions()
    const chestsParams = JSON.parse(op.item)
    chestlist.value = chestsParams
})
</script>
<style lang="scss" scoped>
.luckDraw {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom));
    &-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    &-TreasureChest {
        width: calc(100% - 64rpx);
        padding: 0 32rpx;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-title {
            margin-top: 62rpx;
            position: relative;
            width: 390rpx;
            height: 176rpx;
            &-image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
        &-box {
            margin-top: 230rpx;
            width: 283rpx;
            height: 286rpx;
            position: relative;
            &-img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
        &-context {
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            &-text {
                width: 100%;
                text-align: center;
                font-size: 25px;
                font-family: YouSheBiaoTiHei;
                font-weight: 400;
                color: #ffffff;
                text-shadow: 1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
                    1px 1px 0 #000;
            }
            &-num {
                margin-top: 10rpx;
                width: 100%;
                text-align: center;
                height: 38rpx;
                line-height: 38rpx;
                font-size: 20px;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #ffffff;
                text-shadow: 1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
                    1px 1px 0 #000;
            }
        }

        &-TreasureChestBtn {
            margin-top: 40rpx;
            position: relative;
            width: 294rpx;
            height: 78rpx;
            @include flex-xy-center();
            &-btnBg {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            &-btn {
                position: relative;
                color: #000;
                font-size: 22px;
            }
        }
        &-goods {
            position: fixed;
            left: 0;
            bottom: calc(10rpx + env(safe-area-inset-bottom));
            margin-top: 80rpx;
            width: 100%;
            height: 307rpx;
            display: flex;
            justify-content: center;
            &-text {
                position: absolute;
                left: 50%;
                top: 15rpx;
                transform: translate(-50%, 0);
                z-index: 1;
                color: #ffffff;
                font-size: 13px;
                text-shadow: 1px 0px 0 #000, 1px -1px 0 #000, 0 1px 0 #000,
                    1px 1px 0 #000;
            }
            &-bg {
                width: calc(100%);
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
            &-list {
                padding: 0 32rpx;
                box-sizing: border-box;
                position: relative;
                display: flex;
                align-items: center;
                &-goods {
                    margin-top: 80rpx;
                    display: flex;
                    flex-direction: column;
                    margin-right: 15rpx;
                    align-items: center;
                    &-top {
                        position: relative;
                        width: 176rpx;
                        height: calc(176rpx / 320 * 400);
                        overflow: hidden;
                        margin-bottom: 10rpx;
                        &-img {
                            position: relative;
                            width: 100%;
                            height: 100%;
                            border-radius: 10rpx;
                            z-index: 0;
                        }

                        &-bg {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                        }

                        &-level {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 87.7rpx;
                            height: 45rpx;
                            background-color: #95c3f7;
                            z-index: 2;
                            border-bottom-left-radius: 10rpx;
                            border-top-right-radius: 10rpx;
                            &-img {
                                position: absolute;
                                height: 45rpx;
                                left: -8rpx;
                                z-index: 3;
                            }
                        }
                        &-title {
                            position: relative;
                            width: 176rpx;
                            text-align: center;
                            font-size: 12px;
                            line-height: 12px;
                            color: #000;
                        }
                    }
                    &-text {
                        position: relative;
                        font-size: 24rpx;
                        color: #000000;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>
