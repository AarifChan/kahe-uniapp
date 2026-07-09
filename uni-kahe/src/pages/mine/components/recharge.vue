<template>
    <tn-popup v-model="vShow" open-direction="bottom" @close="emits('update:show', false)" bg-color="#DFEFFF">
        <view class="recharge relative w-full box-border bg-[#DFEEFF] rounded-t-16 z-999">
            <view class="recharge-top relative w-750 h-75">
                <image class="recharge-top-bg absolute top-0 left-0 w-full h-full" src="/static/kahe-202510/images/recharge-title.png" />
                <view class="recharge-top-title absolute left-0 top-12 w-750 h-75 font-normal text-46 text-white text-center text-stroke-[#3861E5] theme-font">充值余额</view>
                <image class="recharge-top-close absolute right-20 top-20 w-60 h-32" src="/static/kahe-202510/images/recharge-close.png" @tap.stop="emits('update:show', false)"  />
            </view>
            <view class="recharge-content w-full h-530 flex flex-col items-center bg-[#DFEEFF]">
                <view class="recharge-content-option relative m-40 w-full box-border">
                    <view class="recharge-content-option-content absolute left-0 top-0 p-28 w-full box-border flex flex-col" style="height: calc(100% - 56rpx)">
                        <text class="recharge-content-option-content-title relative font-normal text-26 text-black">选择充值金额</text>
                        <scroll-view
                            class="recharge-content-option-content-list relative mt-8 w-full box-border h-200"
                            :enable-flex="true"
                            :scroll-y="true"
                            scroll-with-animation
                        >
                            <view class="recharge-content-option-content-list-content grid gap-12" style="grid-template-columns: repeat(auto-fill, minmax(calc((100% - 24px) / 3), 1fr))">
                                <view
                                    :class="index===current ? 'bg-[#76B3FF] text-black border-transparent' : 'bg-transparent text-[#3690FF] border-2 border-[#3690FF]'"
                                    class="relative w-[calc(100%-4rpx)] h-50 rounded-4 text-30 font-normal text-center leading-50"
                                    v-for="(item, index) in list"
                                    :key="index"
                                    @tap.stop="didClickItem(index)"
                                >
                                    ¥{{ item.price }}
                                </view>
                            </view>

                        </scroll-view>
                        <view class="recharge-content-option-content-bottom mt-12 relative w-full flex flex-row items-center justify-center">
                            <custom-button title="确定充值" @tap.stop="didClickRecharge" />
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import CustomButton from '@/components/custom/button/index.vue'
import { ref, watch } from 'vue'
import type { PropType } from 'vue'

import { UserModule } from '@/store/modules/user'
import { ShowToast, showLoading, hideLoading } from '@/utils'
import type { RechargeModel } from '@/model'

const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    list: {
        default: () => [],
        type: Array as PropType<RechargeModel[]>
    }
})

const vShow = ref(false)

watch(() => props.show, value => {
    vShow.value = value
})

const current = ref(0)

const emits = defineEmits(['update:show'])

const didClickItem = async (index: number) => {
    current.value = index
}
const didClickRecharge = async () => {
    if (props.list.length > 0 && current.value < props.list.length) {
        const item = props.list[current.value]
        showLoading('正在充值')
        const msg = await UserModule.rechargePlanAction(item.id)
        hideLoading()
        if (msg) {
            await ShowToast(msg, 1500)
        } else {
            await ShowToast('充值成功', 1500)
            emits('update:show', false)
        }
    }
}

</script>

<style lang="scss" scoped></style>
