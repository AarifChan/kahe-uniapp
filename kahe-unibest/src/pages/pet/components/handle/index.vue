<template>
    <view class="petHandle">
        <view class="petHandle-side">
            <custom-button  v-if="!isDetail" title="放 生" @tap.stop="emits('didClick',1)" />
            <custom-button  v-if="!isDetail" style="margin-left: 8px" title="上 阵" @tap.stop="emits('didClick',2)" />
        </view>
        <view class="petHandle-side">
            <custom-selector title="所 有" @did-change="handleLevelChange" />
        </view>
    </view>
</template>

<script lang="ts" setup>
import CustomButton from '../customButton/index.vue'
import CustomSelector from '../selector/index.vue'
defineProps({
    isDetail: {
        default: false,
        type: Boolean
    }
})
const emits = defineEmits(['didChangeFilter', 'didClick'])
const handleLevelChange = (params: any) => {
    emits('didChangeFilter', params)
}
</script>

<style lang="scss" scoped>
.petHandle{
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    &-side{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
}
</style>
