<template>
    <view
        class="normalTab relative flex w-332 h-57 bg-[rgba(0,0,0,0.2)]"
        :style="{ borderRadius: '28.5rpx' }"
    >
        <view class="normalTab-content relative flex flex-row">
            <view
                class="normalTab-content-item relative w-166 h-57"
                @tap.stop="didClickTab(index)"
                v-for="(item, index) in tabList"
                :key="index"
            >
                <image
                    class="normalTab-content-item-bg w-full h-full"
                    :src="
                        currentTab === index ? '/static/kahe-202510/product/product-tab-item.png' : ''
                    "
                />
                <text
                    class="normalTab-content-item-title theme-font absolute left-1/2 top-1/2 text-28 font-normal leading-36 whitespace-nowrap -translate-x-[50%] -translate-y-[50%]"
                    :class="currentTab === index ? 'text-[#11FFEB]' : 'text-[#868686]'"
                >{{item}}</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { UIProductDetailModel } from '@/model'

const props = defineProps({
    current: {
        default: 0,
        type: Number
    },
    product: {
        default: {
        } as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>
    }
})

const tabList = ref(['赏池一览', '抽赏记录'])

const currentTab = ref(props.current)

const didClickTab = (index: number) => {
    if (currentTab.value === index) {
        return
    }
    currentTab.value = index
    emits('update:current', index)
    emits('tabDidChange', index)
}

const emits = defineEmits(['update:current', 'tabDidChange'])
</script>

<style lang="scss" scoped>
</style>
