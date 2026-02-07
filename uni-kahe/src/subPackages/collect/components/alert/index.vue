<template>
    <tn-popup v-model="vShow" :overlay-opacity="0.88" open-direction="center" bg-color="transparent"
              :overlay-closeable="false"
    >
        <view class="collect-alert ">
            <image class="collect-alert-bg" src="https://jms.85gui7.com/kahe-202510/collect/modal-bg.png" />
            <view class="collect-alert-content">
                <view class="collect-alert-content-title">集赏行动</view>

                <view class="collect-alert-content-tips">点击确认后，将损耗所填入的材料并且无
                    法撤回，请谨慎操作！
                </view>
                <view class="collect-alert-content-bottom">
                    <view class="collect-alert-content-bottom-btn" @tap.stop="emits('confirm')">
                        <image class="collect-alert-content-bottom-btn-img" src="https://jms.85gui7.com/kahe-202510/collect/btn2.png" />
                        <view class="collect-alert-content-bottom-btn-title">确定</view>
                    </view>
                    <view class="collect-alert-content-bottom-btn" @tap.stop="emits('update:show', false)">
                        <image class="collect-alert-content-bottom-btn-img" src="https://jms.85gui7.com/kahe-202510/collect/btn1.png" />
                        <view class="collect-alert-content-bottom-btn-title">取消</view>
                    </view>
                </view>
            </view>
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
watch(() => props.show, value => {
    vShow.value = value
})

const emits = defineEmits(['update:show', 'confirm'])
</script>

<style lang="scss" scoped>
.collect-alert {
    position: relative;
    width:584rpx;
    height:308rpx;
    &-bg{
        width:100%;
        height:100%;
    }
    &-content{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-title{
            margin-top: 16rpx;
            font-weight: 400;
            font-size: 25rpx;
            color: #FFFFFF;
            text-shadow: -1px -1px 0 #361574, 1px -1px 0 #361574, -1px 1px 0 #361574, 1px 1px 0 #361574;
        }
        &-tips{
            margin-top: 80rpx;
            font-weight: 400;
            font-size: 25rpx;
            line-height: 30rpx;
            text-align: center;
            color: #000000;
            width: 448rpx;
        }
        &-bottom{
            margin-top: 48rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 400rpx;
            &-btn{
                position: relative;
                width: 138rpx;
                height: 46rpx;
                &-img{
                    width: 100%;
                    height: 100%;
                }
                &-title{
                    position: absolute;
                    left: 0;
                    top: 4rpx;
                    width: 100%;
                    text-align: center;
                    font-weight: 400;
                    font-size: 25rpx;
                    color: #FFFFFF;
                    text-shadow: 0rpx 3rpx 0rpx #744215;
                }
            }
        }
    }

}
</style>
