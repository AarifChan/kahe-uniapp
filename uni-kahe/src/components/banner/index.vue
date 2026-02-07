<template>
    <view class="banner">
        <Lamp
            ref="lampRef"
            backGround="rgba(128, 128, 128, 0.6)"
            :border="0"
            :list="lampList"
            @tapLampAction="tapLampAction"
        />
        <swiper
            class="banner-swiper"
            circular
            :indicator-dots="true"
            :autoplay="true"
            indicator-active-color="#FF593D"
        >
            <swiper-item
                v-for="(item, index) in list"
                :key="index"
                class="banner-swiper-item"
                @tap.stop="emits('tapBannerAction', item)"
            >
                <image class="banner-swiper-item-img" :src="item.image" />
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

<style lang="scss" scoped>
.banner {
    position: relative;
    width: 100%;
    height: 800rpx;
    &-swiper {
        position: relative;
        width: 100%;
        height: 100%;
        &-item {
            width: 100%;
            height: 100%;
            &-img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
