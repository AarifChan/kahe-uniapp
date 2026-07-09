<template>
    <view class="relative w-full h-800">
        <Lamp
            ref="lampRef"
            backGround="rgba(128, 128, 128, 0.6)"
            :border="0"
            :list="lampList"
            @tapLampAction="tapLampAction"
        />
        <swiper
            class="relative w-full h-full"
            circular
            :indicator-dots="true"
            :autoplay="true"
            indicator-active-color="#FF593D"
        >
            <swiper-item
                v-for="(item, index) in list"
                :key="index"
                class="w-full h-full"
                @tap.stop="emits('tapBannerAction', item)"
            >
                <image class="w-full h-full" :src="item.image" />
            </swiper-item>
        </swiper>
    </view>
</template>

<script lang="ts" setup>
import Lamp from '@/components/lamp/index.vue'
import type { UIBannerModel, UIBarrageModel } from '@/model'
import { ref, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
const emits = defineEmits(['tapLampAction', 'tapBannerAction'])
const tapLampAction = (item: any) => {
    emits('tapLampAction', item)
}
const props = defineProps({
    list: {
        type: Array as PropType<UIBannerModel[]>,
        default: () => []
    },
    lampList: {
        type: Array as PropType<UIBarrageModel[]>,
        default: () => []
    }
})
const lampRef = ref()
watch(
    () => props.lampList,
    () => {
        lampRef.value?.play(props.lampList, 3)
    }
)
</script>

<style lang="scss" scoped></style>
