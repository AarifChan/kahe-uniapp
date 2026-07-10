<template>
    <view class="groupBuyIndex relative bg-[#FDEFCC] w-full h-screen">
        <!--    <image class="groupBuyIndex-bg w-full h-full" src="/static/kahe-202510/groupBuy/groupBuyBg.png" />-->
        <view
            class="groupBuyIndex-content absolute left-0 top-0 w-full"
            :style="{ height: 'calc(100% - env(safe-area-inset-bottom))' }"
        >
            <view
                class="groupBuyIndex-content-top flex relative pt-27 pr-13 pb-8 pl-33 w-full box-border justify-between items-center"
            >
                <search placeholder="请输入你想要搜索的内容" @did-tap-search="handleSearch" style="flex: 1;" />
                <view
                    class="rule font-[YouSheBiaoTiHei] font-normal text-30 text-[#FFFFFF] leading-56 text-center w-146 h-56 bg-[#53D6AC] rounded-8 shadow-[0rpx_4rpx_8rpx_rgba(0,0,0,0.25)] ml-18 theme-font"
                    @tap.stop="showModalType(ModalType.GroupBuyRule)"
                >规 则</view>
            </view>
            <Handle @did-change="handleSortItem" />
            <scroll-view
                class="groupBuyIndex-content-scroll relative w-full box-border"
                :style="{ height: 'calc(100% - 180rpx)' }"
                @scrolltolower="scrollToLower"
                scroll-y
            >
                <view
                    class="groupBuyIndex-content-list relative px-30"
                    :style="{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 16px) / 2), 1fr))',
                        gridGap: '16px',
                    }"
                >
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

<style lang="scss" scoped></style>
