<template>
    <view class="groupBuyIndex">
        <!--    <image class="groupBuyIndex-bg" src="https://jms.85gui7.com/kahe-202510/groupBuy/groupBuyBg.png" />-->
        <view class="groupBuyIndex-content">
            <view class="groupBuyIndex-content-top">
                <search placeholder="请输入你想要搜索的内容" @did-tap-search="handleSearch" style="flex: 1;" />
                <view class="rule theme-font" @tap.stop="showModalType(ModalType.GroupBuyRule)">规 则</view>
            </view>
            <Handle @did-change="handleSortItem" />
            <scroll-view class="groupBuyIndex-content-scroll" @scrolltolower="scrollToLower" scroll-y>
                <view class="groupBuyIndex-content-list">
                    <Item v-for="(item, index) in groupBuyList" :item="item" :key="'item' + index"
                        @tap.stop="handleClickItem(item)" />
                </view>
                <Empty v-if="groupBuyList.length === 0" />
            </scroll-view>
        </view>
        <common-modal v-model:show="modalShow" :title="modalTitle" :content="modalContent" />
    </view>
</template>

<script lang="ts" setup>
import Search from "@/components/search/index.vue";
import { useGroupBuy } from "@/composables/groupBuy";
import Empty from "@/components/empty/index.vue";
import Item from "../components/item/index.vue";
import { GroupBuyItem } from "@/model";
import Handle from "../components/handle/index.vue";
import CommonModal from "@/components/modal/index.vue";
import { useModal, ModalType } from "@/composables/modal";

import { onMounted } from "vue";

const { modalShow, modalTitle, modalContent, showModalType } = useModal();

const { groupBuyList, getGroupBuyList, queryParams, scrollToLower } =
    useGroupBuy();

onMounted(() => {
    getGroupBuyList();
});

const handleSortItem = (params: { sort: string; sflag: number }) => {
    queryParams.value.sort = params.sort;
    queryParams.value.sflag = params.sflag;
    queryParams.value.page = 1;
    getGroupBuyList();
};

const handleSearch = (val: string) => {
    console.log("didTapSearch", val);
    queryParams.value.key = val;
    queryParams.value.page = 1;
    getGroupBuyList();
};

const handleClickItem = (item: GroupBuyItem) => {
    uni.navigateTo({
        url: `/subPackages/groupBuy/detail/index?id=${item.id}`,
    });
};
</script>

<style lang="scss" scoped>
.groupBuyIndex {
    position: relative;
    background-color: #fdefcc;
    width: 100%;
    height: 100vh;

    &-bg {
        width: 100%;
        height: 100%;
    }

    &-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: calc(100% - env(safe-area-inset-bottom));

        &-top {
            display: flex;
            position: relative;
            padding: 27rpx 13rpx 8rpx 33rpx;
            width: 100%;
            box-sizing: border-box;
            justify-content: space-between;
            align-items: center;

            .rule {
                font-family: YouSheBiaoTiHei;
                font-weight: 400;
                font-size: 30rpx;
                color: #FFFFFF;
                line-height: 29rpx;
                width: 146rpx;
                height: 56rpx;
                text-align: center;
                line-height: 56rpx;
                background: #53D6AC;
                border-radius: 8rpx;
                box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.25);
                margin-left: 18rpx;
            }
        }

        &-handle {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            padding-bottom: 32rpx;

            &-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-weight: 400;
                font-size: 28rpx;
                color: #ffffff;
            }
        }

        &-scroll {
            position: relative;
            width: 100%;
            box-sizing: border-box;
            height: calc(100% - 180rpx);
        }

        &-list {
            position: relative;
            padding: 0 30rpx;
            display: grid;
            grid-template-columns: repeat(auto-fill,
                    minmax(calc((100% - 16px) / 2), 1fr)); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
            grid-gap: 16px; // 这是网格间的间隙，根据需要调整
        }
    }
}
</style>
