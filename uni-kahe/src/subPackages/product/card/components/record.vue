<template>
    <view v-if="recordList.length > 0" class="record relative h-full" style="padding: 16rpx 34rpx;">
        <view class="record-level relative w-full flex mt-20 pb-20 overflow-x-auto" v-if="!types">
            <view class="record-level-item flex-shrink-0 mr-12 px-36 h-36 bg-[#e8ad82] rounded-18 text-center"
                v-for="(item, index) in list" :key="index"
                @tap.stop="sortTabAction(item)"
                :class="sortIndex === item.value ? 'bg-[#ac5a3e]' : ''"
                style="line-height: 36rpx;"
            >
                <view class="record-level-item-title text-24 text-white"
                >{{
                    getNormalLevelNameByLevel(item.value) }}</view>
            </view>
        </view>
        <view class="record-listItem relative w-full flex flex-col justify-center bg-[#fffbef] rounded-10 mx-auto"
            v-for="(item, index) in recordList" :key="index"
            :class="index === 0 ? '' : 'mt-26'"
            style="padding: 0 20rpx 28rpx 20rpx; box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(217, 190, 134, 0.5);"
        >
            <view class="record-listItem-num absolute right-8 top-4 text-24 text-black bg-[#f0ead8] rounded-10"
                v-if="types && !isOpen"
                style="padding: 8rpx 32rpx;"
            >#{{ item.sales }}</view>
            <view class="record-listItem-list flex justify-between items-center pb-16">
                <view class="record-listItem-list-left flex items-center">
                    <decorate-avatar :avatar="item.avatar" :level="item.vip" :scale="0.6" style="margin-left: -16px" />
                    <view class="record-listItem-list-left-name text-28 text-[#333333]">{{
                        item.nickName
                    }}</view>
                </view>
                <view class="record-listItem-list-time text-20 text-[#545454]">{{ item.time }}</view>
            </view>
            <view class="record-listItem-line absolute h-2 bg-[#E2DBC5] z-1"
                style="left: 50%; top: 58%; transform: translate(-50%, -50%); width: calc(100% - 20rpx);"
            />
            <view class="record-listItem-bottom relative flex justify-between items-center">
                <view class="record-listItem-bottom-left flex flex-row items-center">
                    <image class="record-listItem-bottom-left-avatar w-42 mr-22 rounded-4" :src="item.goodsImage" mode="widthFix" style="height: calc(42rpx / 300 * 420);" />
                    <view class="record-listItem-bottom-left-name text-28 text-[#333333]">{{ item.title }}{{ isOpen ? `x${item.num}` : "" }}
                    </view>
                </view>

                <image v-if="!isOpen" class="record-listItem-bottom-level3 absolute w-100 h-80" :src="getLevelImageByLevel(item.level)" style="right: 24rpx; bottom: 12rpx;" />
            </view>
        </view>
    </view>
    <empty :show="recordList.length === 0" />
</template>
<script setup lang="ts">
import type { UIProductRecordModel } from "@/model";
import DecorateAvatar from "@/components/custom/DecorateAvatar/index.vue";
import { ref, computed } from "vue";
import Empty from "@/components/empty/index.vue";
import { UserModule } from "@/store/modules/user";
import { useEnum } from "@/composables/enum";

const { getLevelImageByLevel, getNormalLevelNameByLevel } = useEnum();
interface LevelTapModel {
    value: number;
    title: string;
}

defineProps({
    list: {
        type: Array as () => LevelTapModel[],
        default: [] as LevelTapModel[],
    },
    recordList: {
        type: Array as () => UIProductRecordModel[],
        default: [] as UIProductRecordModel[],
    },
    types: {
        type: Boolean,
        default: false,
    },
    borderWidth: {
        type: Number,
        default: 0,
    },
    borderHeight: {
        type: Number,
        default: 0,
    },
    isSelect: {
        default: false,
        type: Boolean,
    },
    isInfinite: {
        default: false,
        type: Boolean,
    },
    isOpen: {
        default: false,
        type: Boolean,
    },
});
const sortIndex = ref(-1);
const emits = defineEmits(["sortTabAction", "update:Scurrent"]);
const sortTabAction = (i: any) => {
    sortIndex.value = i.value;
    emits("sortTabAction", i);
};
const userInfo = computed(() => UserModule.userInfo);
</script>
<style lang="scss" scoped>
</style>
