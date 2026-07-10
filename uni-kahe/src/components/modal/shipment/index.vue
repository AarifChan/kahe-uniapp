<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent" @close="emits('update:show', false)">
        <view class="relative bg-transparent w-626 h-761">
            <view class="absolute left-0 top-0 w-full h-full bg-[#F3F6FE] rounded-10 overflow-hidden">
                <view class="relative w-full h-73 bg-gradient-[linear-gradient(-90deg,_#C8E0FC,_#88BDFF)]">
                    <view class="text-40 leading-73 font-normal text-white ml-34 theme-font text-stroke-main">发货确认</view>
                    <view class="absolute right-35 -top-8 w-108 h-56 bg-[#FF7878] rounded-10 flex-center border-1px border-[#BC4646]">
                        <image class="w-38 h-39" @tap.stop="emits('update:show', false)" src="/static/kahe/common/close-white.png" />
                    </view>
                </view>
                <view class="flex flex-row mt-16 ml-38" v-if="address?.price ?? false">
                    <text class="text-26 font-normal text-black">需支付</text>
                    <text class="text-26 font-normal text-[#4B71FF]">¥{{address.price}}</text>
                    <text class="text-26 font-normal text-black">邮费</text>
                </view>
                <view class="mt-12 px-28 box-border w-full h-239">
                    <scroll-view class="relative w-full h-full bg-white shadow-[0_0_6rpx_0_#D4DEE9] rounded-4 flex flex-row" :scroll-x="true" :enable-flex="true" scroll-with-animation>
                        <view class="py-40 px-20 whitespace-nowrap flex flex-row">
                            <view class="relative inline-block flex flex-col mr-24 w-152 overflow-hidden" v-for="(item, index) in list" :key="index">
                                <view class="relative w-152 h-152">

                                    <image :src="item.image" class="rounded-2 w-[calc(100%-4rpx)] h-[calc(100%-4rpx)] border-2 border-[#3B7CFF] absolute left-0 top-0" />
                                    <view class="absolute -left-15 -bottom-2 w-70 h-35 bg-[#95C3F7] flex items-center justify-center" style="border-radius: 0rpx 8rpx 0rpx 8rpx;">
                                        <image
                                            mode="heightFix"
                                            class="h-full"
                                            style="transform: translateX(20rpx);"
                                            :src="item.levelImage"
                                        />
                                    </view>
                                    <text class="absolute right-15 bottom-5 z-2 text-24 font-normal text-black">x{{ item.num }}</text>
                                </view>
                                <text class="relative w-80 h-21 text-left text-20 font-normal text-[#1a385b] text-ellipsis">{{ item.name??'' }}</text>
                            </view>
                        </view>

                        <view class="absolute right-0 top-0 w-141 h-40">
                            <image class="absolute right-0 top-0 w-full h-full" src="/static/kahe-202510/images/num-bg.png" />
                            <text class="absolute right-20 top-0 leading-40 text-24 font-normal text-black text-right theme-font">共{{ total }}件</text>
                        </view>
                    </scroll-view>
                </view>

                <view class="py-20 px-32 box-border w-full" @tap.stop="emits('didTapAddress')">
                    <pay-option title="收货信息" color="black" />
                </view>

                <view class="px-40 box-border w-full flex flex-col">
                    <text class="mb-24 w-620 h-26 text-24 font-normal text-black">收货人：{{address?.realName ?? ""}}</text>
                    <text class="mb-24 w-620 h-26 text-24 font-normal text-black">联系电话：{{address?.phone ?? ""}}</text>
                    <text class="mb-24 w-620 h-26 text-24 font-normal text-black">收货地址：{{address?.detail ?? ""}}</text>
                </view>

                <agreement v-model:checked="agree" @did-tap-protocol="emits('didTapProtocol')" />

                <view class="absolute bottom-22 left-0 w-full flex flex-row items-center justify-center" @tap.stop="didTapConfirm">
                    <custom-button title="确定" />
                </view>
            </view>
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import CustomButton from '@/components/custom/button/index.vue'
import Agreement from '@/components/agreement/index.vue'
import PayOption from '@/components/modal/pay/components/option.vue'
import type { SubmitGoodsModel, AddressModel } from '@/model'
import { type PropType, computed, ref, watch } from 'vue'
import { ShowToast } from '@/utils'
const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    list: {
        default: [] as SubmitGoodsModel[],
        type: Array as PropType<SubmitGoodsModel[]>
    },
    address: Object as PropType<AddressModel>
})
const vShow = ref(false)
watch(() => props.show, value => {
    vShow.value = value
})
const total = computed(() => {
    let total = 0
    props.list.forEach((item) => {
        total += item.num
    })
    return total
})

const didTapConfirm = () => {
    if (!agree.value) {
        ShowToast('请阅读并允许协议')
        return
    }
    emits('didClickConfirm')
}

const agree = ref(false)
const totalPrice = computed(() => {
    let price = 0
    props.list.forEach((item) => {
        price += item.price * item.num
    })
    return price
})
const emits = defineEmits(['update:show', 'didTapProtocol', 'didTapAddress', 'didClickConfirm'])
</script>

<style lang="scss" scoped></style>
