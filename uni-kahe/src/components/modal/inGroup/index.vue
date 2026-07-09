<template>
    <tn-popup
        v-model="vShow"
        open-direction="center"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="relative bg-transparent w-717 h-1035">
            <image
                class="w-full h-full"
                src="/static/kahe-202510/home-upgrade/inGroup-bg.png"
            />
            <image
                class="absolute top-260 left-180 w-314 h-314"
                src="/static/kahe-202510/home-upgrade/inGroup.png"
                @longpress="emits('showImage')"
            />
            <image
                class="absolute bottom-30 left-315 w-63 h-63"
                src="/static/kahe-202510/home-upgrade/inGroup-close.png"
                @click="emits('update:show', false)"
            />
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const props = defineProps({
    show: {
        default: false,
        type: Boolean
    }
})
const vShow = ref(props.show)
watch(
    () => props.show,
    value => {
        vShow.value = value
    }
)
const emits = defineEmits(['update:show', 'showImage'])
</script>

<style lang="scss" scoped></style>
