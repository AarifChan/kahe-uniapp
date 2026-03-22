<template>
    <view class="limitless">
        <view class="limitless-top">
            <image
                class="limitless-top-bg"
                src="https://jms.85gui7.com/kahe/product/limitless-top.png"
            />
            <view class="limitless-top-content">
                <view class="limitless-top-content-info">
                    <image
                        class="limitless-top-content-info-avatar"
                        :src="product?.demonKing?.avatar ?? ''"
                    />
                    <view class="limitless-top-content-info-text">
                        <text
                            class="limitless-top-content-info-text-title text-flow-ellipsis-multiple theme-font"
                        >领主
                            {{
                                product?.demonKing?.nickname ?? "未有新领主"
                            }}</text>
                        <text
                            class="limitless-top-content-info-text-title theme-font"
                            v-if="product?.demonKing?.exist"
                        >[{{ product?.demonKing?.time }}
                            {{
                                product?.demonKing?.nickname ?? "前发奖"
                            }}]</text>
                    </view>
                </view>
                <item :item="kingItem" />
            </view>
        </view>
        <view class="limitless-center">
            <image
                class="limitless-center-bg"
                src="https://jms.85gui7.com/kahe/product/limitless-center.png"
            />
            <swiper
                class="limitless-center-main"
                :current="currentIndex"
                :circular="true"
            >
                <swiper-item
                    class="limitless-center-content-item"
                    v-for="(item, index) in itemsList"
                    :key="'limitless' + index"
                >
                    <view class="limitless-center-content-item-content">
                        <image
                            class="limitless-center-content-item-content-image"
                            :src="item.image"
                        />
                        <view
                            class="limitless-center-content-item-content-label1"
                        >
                            <image
                                class="limitless-center-content-item-content-label1-bg"
                                src="https://jms.85gui7.com/kahe/product/title-bg1.png"
                            />
                            <text
                                class="limitless-center-content-item-content-label1-title theme-font"
                            >{{ index + 1 }}/{{ goodsList.length }}</text>
                        </view>
                        <view
                            class="limitless-center-content-item-content-label2"
                        >
                            <image
                                class="limitless-center-content-item-content-label2-bg"
                                src="https://jms.85gui7.com/kahe/product/title-bg2.png"
                            />
                            <text
                                class="limitless-center-content-item-content-label2-title theme-font"
                            >{{ item.levelName }}￥{{ product.price }}</text>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
            <image
                class="limitless-center-left"
                src="https://jms.85gui7.com/kahe/common/left-arrow.png"
                @tap.stop="changeIndex(true)"
            />
            <image
                class="limitless-center-right"
                src="https://jms.85gui7.com/kahe/common/right-arrow.png"
                @tap.stop="changeIndex(false)"
            />
        </view>
        <view class="limitless-bottom">
            <image
                class="limitless-bottom-bg"
                src="https://jms.85gui7.com/kahe/product/limitless-bottom.png"
            />
            <view class="limitless-bottom-tab">
                <view
                    class="limitless-bottom-tab-item"
                    v-for="(item, index) in tabList"
                    :key="'tab-item' + index"
                    @tap.stop="handleTapTab(index)"
                >
                    <image
                        class="limitless-bottom-tab-item-img"
                        :src="
                            currentTab == index
                                ? 'https://jms.85gui7.com/kahe/product/tab-active.png'
                                : 'https://jms.85gui7.com/kahe/product/tab-normal.png'
                        "
                    />
                    <text class="limitless-bottom-tab-item-title theme-font">{{
                        item
                    }}</text>
                </view>
            </view>
            <scroll-view
                class="limitless-bottom-content"
                :scroll-y="true"
                scroll-with-animation
                v-if="currentTab === 0"
            >
                <view
                    class="limitless-bottom-content-item"
                    v-for="(group, index) in levelGroupList"
                    :key="'levelGroupList' + index"
                >
                    <text
                        class="limitless-bottom-content-item-title theme-font"
                    >{{ group.levelName }}</text>
                    <scroll-view
                        class="limitless-bottom-content-item-content"
                        :enable-flex="true"
                        :scroll-x="true"
                        scroll-with-animation
                    >
                        <item
                            style="margin-right: 28px"
                            v-for="(item, index) in group.items"
                            :item="item"
                            :key="'cardItem' + index"
                        />
                    </scroll-view>
                </view>
            </scroll-view>
            <scroll-view
                class="limitless-bottom-content"
                :scroll-y="true"
                scroll-with-animation
                @scrolltolower="scrollToLower"
                v-else
            >
                <view class="limitless-bottom-content-record">
                    <view
                        class="limitless-bottom-content-record-item"
                        v-for="(item, index) in recordList"
                        :key="'record' + index"
                    >
                        <view class="limitless-bottom-content-record-item-left">
                            <image
                                class="limitless-bottom-content-record-item-left-avatar"
                                :src="item.avatar"
                            />
                            <view
                                class="limitless-bottom-content-record-item-left-info"
                            >
                                <text
                                    class="limitless-bottom-content-record-item-left-info-title"
                                >{{ item.nickName }}</text>
                                <text
                                    class="limitless-bottom-content-record-item-left-info-subTitle"
                                >{{ item.time }}</text>
                            </view>
                        </view>
                        <image
                            class="limitless-bottom-content-record-item-right"
                            mode="heightFix"
                            :src="item.levelImage"
                        />
                    </view>
                </view>
            </scroll-view>
        </view>

        <view class="limitless-card">
            <view
                class="limitless-card-item"
                v-for="(item, index) in cardsArray"
                :key="index + 'cardArray'"
                @tap.stop="emits('didClickPayCardItem', item)"
            >
                <image
                    class="limitless-card-item-bg"
                    src="https://jms.85gui7.com/kahe/product/card-style1.png"
                />
                <view class="limitless-card-item-content">
                    <text class="limitless-card-item-content-value theme-font">来{{ item.formatNum }}发</text>
                    <text class="limitless-card-item-content-price theme-font">¥{{ item.price }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import Item, { type LimitLessModel } from './limitlessItem.vue'
import { type PropType, computed, ref } from 'vue'
import type { UIProductBoxModel,
    UIProductDetailLevelList,
    UIProductDetailModel,
    UIProductPriceCard,
    UIProductRecordModel } from '@/model'
import { limitLevelName } from '@/utils/tools/image'

const props = defineProps({
    goodsList: {
        default: () => [],
        type: Array as PropType<UIProductBoxModel[]>
    },
    product: {
        default: {
        } as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>
    },
    recordList: {
        type: Array as () => UIProductRecordModel[],
        default: [] as UIProductRecordModel[]
    },
    cardsArray: {
        default: () => [],
        type: Array as PropType<UIProductPriceCard[]>
    },
    levelList: {
        default: [] as UIProductDetailLevelList[],
        type: Array as PropType<UIProductDetailLevelList[]>
    }
})
const tabList = ref(['赏品一览', '抽赏记录'])
const currentTab = ref(0)
const currentIndex = ref(0)

const scrollToLower = () => {
    emits('scrollToLower')
}
const handleTapTab = (index: number) => {
    currentTab.value = index
    emits('tabDidChange', index)
}
const changeIndex = (isLeft: boolean) => {
    if (isLeft && currentIndex.value === itemsList.value.length - 1) {
        currentIndex.value = 0
        return
    }
    if (!isLeft && currentIndex.value === 0) {
        currentIndex.value = itemsList.value.length - 1
        return
    }
    if (isLeft && currentIndex.value !== itemsList.value.length) {
        currentIndex.value += 1
        return
    }
    if (!isLeft && currentIndex.value !== 0) {
        currentIndex.value -= 1
    }
}

const itemsList = computed((): LimitLessModel[] =>
    props.goodsList.map((val) => {
        return {
            title: '',
            image: val.image,
            name: val.title,
            prob: val.prob,
            levelName: limitLevelName(val.level)
        } as LimitLessModel
    })
)

const levelGroupList = computed(() => {
    const groupList: any[] = []
    props.levelList.forEach((item) => {
        const tempGroup =
            props.goodsList.filter((n) => item.level === n.level) ?? []
        groupList.push({
            levelName: item.levelName,
            items: tempGroup.map((val) => {
                return {
                    title: '',
                    image: val.image,
                    name: val.title,
                    prob: val.prob,
                    levelName: limitLevelName(val.level)
                } as LimitLessModel
            })
        })
    })
    return groupList
})

const emits = defineEmits([
    'didClickPayCardItem',
    'tabDidChange',
    'scrollToLower'
])
const kingItem = computed(() => {
    if (props.product?.demonKing) {
        const val = props.product.demonKing.goods
        return {
            title: '领主奖励',
            image: val?.image ?? '',
            name: val?.title ?? ''
        } as LimitLessModel
    } else {
        return {
            title: '领主奖励',
            image: '',
            name: ''
        } as LimitLessModel
    }
})
</script>

<style lang="scss" scoped>
page {
    background-color: #232635;
}
.limitless {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #232635;
    padding: 36rpx 0;
    &-top {
        position: relative;
        width: 100%;
        &-bg {
            margin-top: 24rpx;
            margin-left: 8rpx;
            width: 711rpx;
            height: 231rpx;
        }
        &-content {
            position: absolute;
            left: 60rpx;
            top: 0;
            width: calc(100% - 100rpx);
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            z-index: 3;
            &-info {
                display: flex;
                flex-direction: row;
                align-items: center;

                &-avatar {
                    width: 122rpx;
                    height: 122rpx;
                    border-radius: 61rpx;
                    background-color: white;
                }
                &-text {
                    margin-left: 26rpx;
                    display: flex;
                    flex-direction: column;
                    &-title {
                        padding: 4rpx 0;
                        width: 300rpx;
                        color: #649bff;
                        font-size: 30rpx;
                        font-weight: 400;
                    }
                }
            }
        }
    }
    &-center {
        position: relative;
        margin-top: -130rpx;
        width: 750rpx;
        height: 698rpx;

        &-bg {
            width: 100%;
            height: 100%;
        }
        &-main {
            position: absolute;
            left: 10rpx;
            top: 10rpx;
            width: calc(100% - 20rpx);
            height: 750rpx;
        }
        &-left {
            position: absolute;
            top: 350rpx;
            left: 20rpx;
            width: 32rpx;
            height: 49rpx;
        }
        &-right {
            position: absolute;
            right: 20rpx;
            top: 350rpx;
            width: 32rpx;
            height: 49rpx;
        }
        &-content {
            width: 100%;
            white-space: nowrap;
            scroll-snap-type: x mandatory;
            &-item {
                display: inline-block;

                width: 100%; /* 设置每个页面的宽度为视口宽度 */
                scroll-snap-align: start;
                &-content {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    &-image {
                        z-index: 3;
                        margin-top: 200rpx;
                        width: 300rpx;
                        height: 300rpx;
                    }
                    &-label1 {
                        margin-top: 36rpx;
                        position: relative;
                        width: 110rpx;
                        height: 37rpx;

                        &-bg {
                            width: 100%;
                            height: 100%;
                            transform: scale(1.4);
                        }
                        &-title {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            text-align: center;
                            line-height: 37rpx;
                            font-size: 28rpx;
                            font-weight: 400;
                            color: #f0f5ff;
                        }
                    }
                    &-label2 {
                        margin-top: 16rpx;
                        position: relative;
                        width: 326rpx;
                        height: 47rpx;
                        &-bg {
                            width: 100%;
                            height: 100%;
                        }
                        &-title {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            line-height: 47rpx;
                            font-size: 28rpx;
                            font-weight: 400;
                            color: #f0f5ff;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    &-bottom {
        position: relative;
        background-color: #232635;
        width: 100%;
        height: 391rpx;
        &-tab {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            &-item {
                position: relative;
                &-img {
                    width: 175rpx;
                    height: 72rpx;
                }
                &-title {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    text-align: center;
                    line-height: 72rpx;
                    font-size: 28rpx;
                    font-weight: 400;
                    color: #ffffff;
                    text-shadow: 0rpx 0rpx 7rpx #4974ff;
                }
            }
        }

        &-bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 750rpx;
            height: 391rpx;
        }
        &-content {
            position: absolute;
            left: 0;
            top: 74rpx;
            width: 100%;
            height: calc(100% - 130rpx);
            display: flex;
            flex-direction: column;
            &-item {
                display: inline-block;
                //width: 100%;
                position: relative;
                width: 750rpx;
                height: 258rpx;

                &-title {
                    position: absolute;
                    left: 20rpx;
                    top: 0;
                    width: calc(100% - 40rpx);
                    text-align: center;
                    font-size: 40rpx;
                    font-weight: 400;
                    color: #ffffff;
                    text-shadow: 0rpx 0rpx 7rpx #2e20e6;
                }
                &-content {
                    position: absolute;
                    left: 40rpx;
                    top: 58rpx;
                    width: calc(100% - 100rpx);
                    height: 204rpx;
                    display: flex;
                    flex-direction: row;
                    white-space: nowrap;
                }
            }

            &-record {
                padding: 0 40rpx 20rpx 40rpx;
                width: calc(100% - 100rpx);
                display: grid;
                grid-template-columns: repeat(
                    auto-fill,
                    minmax(48%, 1fr)
                ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
                grid-gap: 18rpx; // 这是网格间的间隙，根据需要调整
                &-item {
                    //display: inline-block;
                    width: 100%;
                    height: 65rpx;
                    border: 2rpx solid #6facff;
                    border-radius: 4rpx;
                    background: linear-gradient(
                        0deg,
                        rgba(85, 99, 169, 0.99),
                        rgba(85, 99, 169, 0.01)
                    );
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    &-left {
                        margin-left: 14rpx;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        &-avatar {
                            width: 49rpx;
                            height: 49rpx;
                            border-radius: 24.5rpx;
                        }
                        &-info {
                            margin-left: 8rpx;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            &-title {
                                width: 100rpx;
                                font-size: 18rpx;
                                font-weight: 400;
                                color: #ffffff;
                            }
                            &-subTitle {
                                font-size: 15rpx;
                                font-weight: 400;
                                color: #feffff;
                            }
                        }
                    }
                    &-right {
                        width: 49rpx;
                        height: 49rpx;
                    }
                }
            }
        }
    }

    &-card {
        position: fixed;
        padding: 22rpx 16rpx env(safe-area-inset-bottom) 16rpx;
        left: 0;
        bottom: 0;
        width: calc(100% - 32rpx);
        display: flex;
        flex-direction: row;
        background-color: #232635;
        justify-content: space-between;
        &-item {
            position: relative;
            width: 227rpx;
            height: 95rpx;
            &-bg {
                position: relative;
                width: 100%;
                height: 100%;
            }
            &-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                &-value {
                    margin-top: 8rpx;
                    font-size: 32rpx;
                    font-weight: 400;
                    color: #ffffff;
                    text-shadow: 0rpx 0rpx 7rpx #2e20e6;
                }
                &-price {
                    margin-top: -8rpx;
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #ffffff;
                    text-shadow: 0rpx 0rpx 7rpx #2e20e6;
                }
            }
        }
    }
}
</style>
