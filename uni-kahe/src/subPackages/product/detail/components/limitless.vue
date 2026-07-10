<template>
    <view class="limitless relative w-full h-screen py-36 box-border bg-[#232635]">
        <view class="limitless-top relative w-full">
            <image
                class="limitless-top-bg mt-24 ml-8 w-711 h-231"
                src="/static/kahe/product/limitless-top.png"
            />
            <view class="limitless-top-content absolute left-60 top-0 h-full flex flex-row items-center justify-around z-3" :style="{ width: 'calc(100% - 100rpx)' }">
                <view class="limitless-top-content-info flex flex-row items-center">
                    <image
                        class="limitless-top-content-info-avatar w-122 h-122 rounded-full bg-white"
                        :src="product?.demonKing?.avatar ?? ''"
                    />
                    <view class="limitless-top-content-info-text ml-26 flex flex-col">
                        <text
                            class="limitless-top-content-info-text-title text-flow-ellipsis-multiple theme-font py-4 text-30 font-normal text-[#649bff]"
                            :style="{ width: '300rpx' }"
                        >领主
                            {{
                                product?.demonKing?.nickname ?? "未有新领主"
                            }}</text>
                        <text
                            class="limitless-top-content-info-text-title theme-font py-4 text-30 font-normal text-[#649bff]"
                            :style="{ width: '300rpx' }"
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
        <view class="limitless-center relative -mt-130 w-750 h-698">
            <image
                class="limitless-center-bg w-full h-full"
                src="/static/kahe/product/limitless-center.png"
            />
            <swiper
                class="limitless-center-main absolute left-10 top-10 h-750"
                :style="{ width: 'calc(100% - 20rpx)' }"
                :current="currentIndex"
                :circular="true"
            >
                <swiper-item
                    class="limitless-center-content-item inline-block w-full"
                    v-for="(item, index) in itemsList"
                    :key="'limitless' + index"
                >
                    <view class="limitless-center-content-item-content w-full flex flex-col items-center">
                        <image
                            class="limitless-center-content-item-content-image z-3 mt-200 w-300 h-300"
                            :src="item.image"
                        />
                        <view
                            class="limitless-center-content-item-content-label1 mt-36 relative w-110 h-37"
                        >
                            <image
                                class="limitless-center-content-item-content-label1-bg w-full h-full"
                                :style="{ transform: 'scale(1.4)' }"
                                src="/static/kahe/product/title-bg1.png"
                            />
                            <text
                                class="limitless-center-content-item-content-label1-title theme-font absolute left-0 top-0 w-full text-center leading-37 text-28 font-normal text-[#f0f5ff]"
                            >{{ index + 1 }}/{{ goodsList.length }}</text>
                        </view>
                        <view
                            class="limitless-center-content-item-content-label2 mt-16 relative w-326 h-47"
                        >
                            <image
                                class="limitless-center-content-item-content-label2-bg w-full h-full"
                                src="/static/kahe/product/title-bg2.png"
                            />
                            <text
                                class="limitless-center-content-item-content-label2-title theme-font absolute left-0 top-0 w-full leading-47 text-28 font-normal text-[#f0f5ff] text-center"
                            >{{ item.levelName }}￥{{ product.price }}</text>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
            <image
                class="limitless-center-left absolute top-350 left-20 w-32 h-49"
                src="/static/kahe/common/left-arrow.png"
                @tap.stop="changeIndex(true)"
            />
            <image
                class="limitless-center-right absolute right-20 top-350 w-32 h-49"
                src="/static/kahe/common/right-arrow.png"
                @tap.stop="changeIndex(false)"
            />
        </view>
        <view class="limitless-tips relative pl-45 pb-24 box-border flex flex-row items-center" v-if="product?.attachList?.length > 0" @tap.stop="openChestModal(0)">
            <image class="limitless-tips-bg w-698 h-45" src="/static/kahe/product/decorate.png" />
            <view class="limitless-tips-title theme-font absolute top-0 leading-45 left-92 text-24 font-normal text-white text-shadow-[-1px_-1px_0_#0c3887,1px_-1px_0_#0c3887,-1px_1px_0_#0c3887,1px_1px_0_#0c3887]">隐藏掉落</view>
            <view class="limitless-tips-tips absolute top-0 left-208 leading-45 font-normal text-18 text-[#87320c]">每次购买均有独立概率触发掉落，存在一次多得的情况</view>
        </view>
        <InGroup @tap.stop="emits('didClickRemark')" :content="product.remark" />
        <view class="limitless-bottom relative bg-[#232635] w-full h-391">
            <image
                class="limitless-bottom-bg absolute left-0 top-0 w-750 h-391"
                src="/static/kahe/product/limitless-bottom.png"
            />
            <view class="limitless-bottom-tab absolute left-0 top-0 w-full flex flex-row items-center justify-center">
                <view
                    class="limitless-bottom-tab-item relative"
                    v-for="(item, index) in tabList"
                    :key="'tab-item' + index"
                    @tap.stop="handleTapTab(index)"
                >
                    <image
                        class="limitless-bottom-tab-item-img w-175 h-72"
                        :src="
                            currentTab == index
                                ? '/static/kahe/product/tab-active.png'
                                : '/static/kahe/product/tab-normal.png'
                        "
                    />
                    <text class="limitless-bottom-tab-item-title theme-font absolute left-0 top-0 w-full text-center leading-72 text-28 font-normal text-white text-shadow-[0rpx_0rpx_7rpx_#4974ff]">{{
                        item
                    }}</text>
                </view>
            </view>
            <scroll-view
                class="limitless-bottom-content absolute left-0 top-74 w-full flex flex-col"
                :style="{ height: 'calc(100% - 130rpx)' }"
                :scroll-y="true"
                scroll-with-animation
                v-if="currentTab === 0"
            >
                <view
                    class="limitless-bottom-content-item inline-block relative w-750 h-258"
                    v-for="(group, index) in levelGroupList"
                    :key="'levelGroupList' + index"
                >
                    <text
                        class="limitless-bottom-content-item-title theme-font absolute left-20 top-0 w-full text-center text-40 font-normal text-white text-shadow-[0rpx_0rpx_7rpx_#2e20e6]"
                        :style="{ width: 'calc(100% - 40rpx)' }"
                    >{{ group.levelName }}</text>
                    <scroll-view
                        class="limitless-bottom-content-item-content absolute left-40 top-58 h-204 flex flex-row whitespace-nowrap"
                        :style="{ width: 'calc(100% - 100rpx)' }"
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
                class="limitless-bottom-content absolute left-0 top-74 w-full flex flex-col"
                :style="{ height: 'calc(100% - 130rpx)' }"
                :scroll-y="true"
                scroll-with-animation
                @scrolltolower="scrollToLower"
                v-else
            >
                <view class="limitless-bottom-content-record px-40 pb-20 grid gap-18" :style="{ width: 'calc(100% - 100rpx)', gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))' }">
                    <view
                        class="limitless-bottom-content-record-item w-full h-65 border-2 border-[#6facff] rounded-4 bg-gradient-[linear-gradient(0deg,rgba(85,99,169,0.99),rgba(85,99,169,0.01))] flex flex-row items-center justify-between"
                        v-for="(item, index) in recordList"
                        :key="'record' + index"
                    >
                        <view class="limitless-bottom-content-record-item-left ml-14 flex flex-row items-center">
                            <image
                                class="limitless-bottom-content-record-item-left-avatar w-49 h-49 rounded-full"
                                :src="item.avatar"
                            />
                            <view
                                class="limitless-bottom-content-record-item-left-info ml-8 flex flex-col justify-between"
                            >
                                <text
                                    class="limitless-bottom-content-record-item-left-info-title w-100 text-18 font-normal text-white"
                                >{{ item.nickName }}</text>
                                <text
                                    class="limitless-bottom-content-record-item-left-info-subTitle text-15 font-normal text-[#feffff]"
                                >{{ item.time }}</text>
                            </view>
                        </view>
                        <image
                            class="limitless-bottom-content-record-item-right w-49 h-49"
                            mode="heightFix"
                            :src="item.levelImage"
                        />
                    </view>
                </view>
            </scroll-view>
        </view>

        <view class="limitless-card fixed left-0 bottom-0 w-full flex flex-row bg-[#232635] justify-between" :style="{ padding: '22rpx 16rpx env(safe-area-inset-bottom) 16rpx', width: 'calc(100% - 32rpx)' }">
            <view
                class="limitless-card-item relative w-227 h-95"
                v-for="(item, index) in cardsArray"
                :key="index + 'cardArray'"
                @tap.stop="emits('didClickPayCardItem', item)"
            >
                <image
                    class="limitless-card-item-bg relative w-full h-full"
                    src="/static/kahe/product/card-style1.png"
                />
                <view class="limitless-card-item-content absolute left-0 top-0 w-full h-full flex flex-col items-center">
                    <text class="limitless-card-item-content-value theme-font mt-8 text-32 font-normal text-white text-shadow-[0rpx_0rpx_7rpx_#2e20e6]">来{{ item.formatNum }}发</text>
                    <text class="limitless-card-item-content-price theme-font -mt-8 text-24 font-normal text-white text-shadow-[0rpx_0rpx_7rpx_#2e20e6]">¥{{ item.price }}</text>
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
</style>
