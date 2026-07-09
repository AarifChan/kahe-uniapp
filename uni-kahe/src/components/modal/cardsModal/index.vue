<template>
    <tn-popup
        v-model="vShow"
        :overlay-opacity="0.88"
        open-direction="bottom"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="relative w-749 h-1157 bg-gradient-[linear-gradient(180deg,_#90c0fa,_#d8e9fd)] rounded-t-20 flex items-center justify-center flex-col">
            <image
                class="absolute right-25 top-0 w-110 h-50"
                src="/static/kahe-202510/images/close.png"
                @tap.stop="emits('update:show', false)"
            />
            <view class="mt-32 text-40 text-black theme-font">{{ title }}</view>
            <scroll-view
                class="mt-32 w-681 box-border bg-white rounded-t-20 pb-20"
                :scroll-y="true"
                style="height: calc(100% - 120rpx)"
                @scrolltolower="scrollToLower"
            >
                <!-- 规则 -->
                <view class="text-28 text-black" v-if="current === 1">
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
<style lang="scss" scoped></style>
