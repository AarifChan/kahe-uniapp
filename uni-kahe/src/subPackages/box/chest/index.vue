<template>
    <view class="luckDraw overflow-hidden fixed top-0 left-0 w-full"
        :style="{ height: 'calc(100vh - env(safe-area-inset-bottom))' }"
    >
        <image src="/static/kahe-202510/images/treasure-chest-bg-small.png" class="luckDraw-bg absolute left-0 top-0 w-full h-full" mode="widthFix" />
        <view class="luckDraw-TreasureChest w-[calc(100%-64rpx)] px-32 relative flex flex-col items-center"
        >
            <view class="luckDraw-TreasureChest-title mt-62 relative w-390 h-176"
            >
                <image
                    src="/static/kahe-202510/images/box-chest-title.png"
                    class="luckDraw-TreasureChest-title-image absolute left-0 top-0 w-full h-full"
                />
            </view>
            <view class="luckDraw-TreasureChest-box mt-230 w-283 h-286 relative"
            >
                <image
                    src="/static/kahe-202510/images/treasure-chest-small.png"
                    class="luckDraw-TreasureChest-box-img absolute left-0 top-0 w-full h-full"
                />
            </view>
            <view class="luckDraw-TreasureChest-context w-full relative flex flex-col justify-center items-center"
            >
                <view class="luckDraw-TreasureChest-context-text w-full text-center text-25 theme-font font-normal text-white"
                    :style="{ textShadow: '1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }"
                >{{
                    chestlist.title
                }}</view>
                <view class="luckDraw-TreasureChest-context-num mt-10 w-full text-center h-38 leading-38 text-20 font-normal text-white"
                    :style="{ textShadow: '1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }"
                >剩余{{ chestlist.num }}个</view>
            </view>
            <view
                class="luckDraw-TreasureChest-TreasureChestBtn mt-40 relative w-294 h-78 flex items-center justify-center"
                @tap.stop="openChestAction(chestlist)"
            >
                <image
                    src="/static/kahe-202510/images/box-btn.png"
                    class="luckDraw-TreasureChest-TreasureChestBtn-btnBg absolute left-0 top-0 w-full h-full"
                />
                <view
                    class="luckDraw-TreasureChest-TreasureChestBtn-btn relative text-black text-22 theme-font"
                >开 启
                </view>
            </view>
            <view class="luckDraw-TreasureChest-goods fixed left-0 bottom-[calc(10rpx+env(safe-area-inset-bottom))] mt-80 w-full h-307 flex justify-center"
            >
                <view class="luckDraw-TreasureChest-goods-text absolute left-1/2 top-15 -translate-x-1/2 z-1 text-white text-13"
                    :style="{ textShadow: '1px 0px 0 #000, 1px -1px 0 #000, 0 1px 0 #000, 1px 1px 0 #000' }"
                >开启宝箱有机会获得以下物品</view>
                <image
                    src="/static/kahe-202510/images/luckDraw-bg.png"
                    class="luckDraw-TreasureChest-goods-bg w-full h-full absolute left-0 top-0"
                />
                <scroll-view
                    :scroll-x="true"
                    :enable-flex="true"
                    class="luckDraw-TreasureChest-goods-list px-32 box-border relative flex items-center"
                >
                    <view
                        v-for="(item, index) in chestlist.goods"
                        :key="index"
                        class="luckDraw-TreasureChest-goods-list-goods mt-80 flex flex-col mr-15 items-center"
                    >
                        <view
                            class="luckDraw-TreasureChest-goods-list-goods-top relative w-176 overflow-hidden mb-10"
                            :style="{ height: 'calc(176rpx / 320 * 400)' }"
                        >
                            <image
                                class="luckDraw-TreasureChest-goods-list-goods-top-img relative w-full h-full rounded-10 z-0"
                                :src="item.image"
                                :lazy-load="true"
                            ></image>
                            <image
                                class="luckDraw-TreasureChest-goods-list-goods-top-bg absolute left-0 top-0 w-full h-full"
                                :src="levelTypeBg(item.level)"
                            ></image>

                            <view
                                class="luckDraw-TreasureChest-goods-list-goods-top-level absolute bottom-0 left-0 w-87.7 h-45 bg-[#95c3f7] z-2 rounded-bl-10 rounded-tr-10"
                            >
                                <image
                                    :src="getLevelFullImagePath(item.level)"
                                    class="luckDraw-TreasureChest-goods-list-goods-top-level-img absolute h-45 -left-8 z-3"
                                    mode="heightFix"
                                />
                            </view>
                        </view>
                        <text
                            class="luckDraw-TreasureChest-goods-list-goods-text relative text-24 text-black text-center"
                        >{{ item.title }}</text>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
    <drawModel
        v-model:show="drawShow"
        :reward-list="openRewordList"
        :tip="tips"
        @did-click-smash="crushAction"
    />
    <SmashModel
        v-model:show="crushShow"
        :recycle-goods="reItemGoods"
        @did-tap-smash="crushDidTap"
    />
    <selectModel
        v-model:show="selectShow"
        v-model:item="chestsModel"
        title="请选择宝箱数量"
        @did-tap-confirm="didTapConfirm"
        :tips="tips"
    />
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { getLevelFullImagePath } from '@/utils/tools/image'
import { getPageOptions } from '@/utils/tools'
import type { UIMineChestModel } from '@/model'
import { useEnum } from '@/composables/enum'
import drawModel from '@/components/modal/reward/index.vue'
import selectModel from '@/components/select/index.vue'
import SmashModel from '@/components/modal/smash/index.vue'
import { useBox } from '@/composables/box'
const { levelTypeBg } = useEnum()
const {
    crushDidTap,
    reItemGoods,
    crushAction,
    crushShow,
    selectShow,
    chestsModel,
    didTapConfirm,
    openChestAction,
    drawShow,
    openRewordList
} = useBox()
const tips = ref('tip')
const chestlist = ref({
} as UIMineChestModel)
onMounted(() => {
    const op = getPageOptions()
    const chestsParams = JSON.parse(op.item)
    chestlist.value = chestsParams
})
</script>

<style lang="scss" scoped>
</style>
