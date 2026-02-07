<template>
    <tn-popup
        v-model="vShow"
        :overlay-opacity="0.88"
        open-direction="bottom"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="cardShow">
            <image
                class="cardShow-close"
                src="https://jms.85gui7.com/kahe-202510/images/close.png"
                @tap.stop="emits('update:show', false)"
            />
            <view class="cardShow-title theme-font">{{ title }}</view>
            <scroll-view
                class="cardShow-center"
                :scroll-y="true"
                @scrolltolower="scrollToLower"
            >
                <!-- 规则 -->
                <view class="cardShow-center-context" v-if="current === 1">
                    <rich-text :nodes="modalContent(2)" />
                </view>
                <!--  概率-->
                <ProModal
                    v-if="current === 2"
                    :level-group-list="levelGroupList"
                    :level-list="levelList"
                    @sort-tab-action="sortTabAction"
                />
                <!--  记录-->
                <ProRecord
                    v-if="current === 3"
                    :list="sortList"
                    @sort-tab-action="sortTabAction"
                    :recordList="recordList"
                    :border-width="635"
                    :border-heigth="201"
                />
            </scroll-view>
        </view>
    </tn-popup>
</template>
<script setup lang="ts">
import type { UIProductBoxModel,
    UIProductDetailLevelGroup,
    UIProductDetailLevelList,
    UIProductRecordModel } from '@/model'
import ProModal from '@/subPackages/product/card/components/proModal.vue'
import ProRecord from '@/subPackages/product/card/components/record.vue'
import { modalContent } from '@/utils/tools/content'
import { ref, watch } from 'vue'

const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    title: {
        default: '',
        type: String
    },
    current: {
        type: Number,
        default: 1
    },
    sortList: {
        type: Array,
        default: () => []
    },
    recordList: {
        type: Array as () => UIProductRecordModel[],
        default: [] as UIProductRecordModel[]
    },
    goodsList: {
        type: Array as () => UIProductBoxModel[],
        default: [] as UIProductBoxModel[]
    },
    levelGroupList: {
        type: Array as () => UIProductDetailLevelGroup[],
        default: [] as UIProductDetailLevelGroup[]
    },
    levelList: {
        type: Array as () => UIProductDetailLevelList[],
        default: [] as UIProductDetailLevelList[]
    }
})
const vShow = ref(false)
watch(() => props.show, value => {
    vShow.value = value
})

const emits = defineEmits(['update:show', 'sortTabAction', 'scrollToLower'])
const sortTabAction = (item:any) => {
    emits('sortTabAction', item)
}
const scrollToLower = () => {
    emits('scrollToLower')
}
</script>
<style lang="scss" scoped>
.cardShow {
    position: relative;
    width: 749rpx;
    height: 1157rpx;
    background: linear-gradient(180deg, #90c0fa, #d8e9fd);
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &-close {
        position: absolute;
        right: 25rpx;
        top: 0;
        width: 110rpx;
        height: 50rpx;
    }
    &-title {
        margin-top: 32rpx;
        font-size: 40rpx;
        color: #000000;
    }
    &-center {
        margin-top: 32rpx;
        width: 681rpx;
        height: calc(100% - 120rpx);
        box-sizing: border-box;
        background: #ffffff;
        border-radius: 20rpx 20rpx 0rpx 0rpx;
        padding-bottom: 20rpx;
        &-context {
            font-size: 28rpx;
            color: #000000;
        }
    }
}
</style>
