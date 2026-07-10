<template>
    <view class="activity w-full h-screen">
        <image class="activity-bg absolute left-0 top-0 w-full h-full" src="/static/kahe-202510/images/rank-bg.png" />
        <view class="activity-content relative w-full h-full flex flex-col">
            <image
                class="activity-content-rankbtn w-259 h-87 mt-10 mx-auto mb-0"
                src="/static/kahe-202510/images/rankbtn.png"
            />
            <view class="activity-content-time mx-auto text-20 text-[#595959]">活动结束时间{{ endTime }}</view>
            <view class="activity-content-rank relative w-full">
                <view class="activity-content-rank-list relative left-0 top-28 w-full flex flex-row items-center justify-evenly">
                    <avatar-info
                        v-for="(item, index) in rankList"
                        :key="'index' + index"
                        class="activity-content-rank-list-item"
                        :class="{ 'mb-60': index === 1 }"
                        :info="item"
                        @tap.stop="didClickFilterMonth(index)"
                    ></avatar-info>
                </view>
            </view>
            <view class="activity-content-leader relative w-636 h-102 mt-10 mx-auto">
                <image
                    class="activity-content-leader-bg absolute w-full h-full top-0 left-0 object-cover"
                    src="/static/kahe-202510/images/leader.png"
                />
                <view class="activity-content-leader-num theme-font absolute text-60 text-[#79451b] z-1"
                    :style="{ left: '68rpx', top: '29rpx' }"
                >{{
                    rankList[2].rank
                }}</view>
                <view class="activity-content-leader-num theme-font absolute text-60 text-[#79451b] z-1"
                    :style="{ left: '516rpx', top: '35rpx' }"
                >{{
                    rankList[1].rank
                }}</view>
                <view class="activity-content-leader-num theme-font absolute text-60 text-[#79451b] z-1"
                    :style="{ left: '304rpx', top: '15rpx' }"
                >{{
                    rankList[0].rank
                }}</view>
            </view>
            <view class="activity-content-center mx-auto relative w-694 h-860 flex flex-col items-center bg-white rounded-t-20 opacity-60">
                <scroll-view
                    class="activity-content-center-list absolute left-0 top-0 w-full h-full"
                    :scroll-y="true"
                    :scroll-x="false"
                    scroll-with-animation
                >
                    <view class="activity-content-center-list-content box-border w-full h-full p-30">
                        <rank-item
                            v-for="(item, index) in otherRankList"
                            :key="index"
                            :item="item"
                        ></rank-item>
                    </view>
                </scroll-view>
            </view>
        </view>
        <BottomRank :mine-ranks="mineRank" @did-click-reward="showReward" />
        <common-modal
            v-model:show="modalShow"
            :title="modalTitle"
            :content="modalContent"
        />
    </view>
</template>

<script setup lang="ts">
import { getRankIndexData, getRankUserListData } from '@/api/activity'
import { ref } from 'vue'
import AvatarInfo, { type RankInfo } from './components/avatarInfo.vue'
import RankItem from './components/item.vue'
import type { RankUser } from '@/model/activity'
import dayjs from 'dayjs'
import { useModal } from '@/composables/modal'
import BottomRank from './components/bottom.vue'
import CommonModal from '@/components/modal/index.vue'
const { modalTitle, modalContent } = useModal()
const modalShow = ref(false)
const showReward = () => {
    modalShow.value = true
}

const rankList = ref(
    [
        {
            avatar: '',
            decorate: '/static/kahe-202510/images/top2.png',
            nickName: '',
            score: '',
            rank: 2
        },
        {
            avatar: '',
            decorate: '/static/kahe-202510/images/top1.png',
            nickName: '',
            score: '',
            rank: 1
        },
        {
            avatar: '',
            decorate: '/static/kahe-202510/images/top3.png',
            nickName: '',
            score: '',
            rank: 3
        }
    ] as RankInfo[])

const moreStatus = ref('more')

const mineRank = ref({
} as RankUser)

const endTime = ref('')

const otherRankList = ref([] as RankInfo[])

const showFilter = ref(false)

const currentMonthIndex = ref(-1)

const monthList = ref([] as { value: number; title: string; content: string, showNums: number }[])

const didClickFilterMonth = (index: number) => {
    showFilter.value = !showFilter.value
    currentMonthIndex.value = index
    getRankList()
}
modalTitle.value = '本期规则'

const pageParams = ref({
    limit: 20,
    page: 1,
    max: 0
})
const getIndexData = async () => {
    const resp = await getRankIndexData()

    if (resp.code === 200) {
        monthList.value = resp.data.list.map((item) => {
            return {
                title: dayjs(item.createTime).format('M月'),
                value: item.id,
                content: JSON.parse(item.content).content,
                showNums: item.showNums
            }
        })
        if (monthList.value.length === 0) {
            return
        }
        currentMonthIndex.value = 0
        modalContent.value = monthList.value[currentMonthIndex.value].content
        pageParams.value.max = monthList.value[currentMonthIndex.value].showNums ?? 3
        endTime.value = resp.data.list[0].endTime
        await getRankList()
    } else {
        monthList.value = []
        currentMonthIndex.value = -1
    }
}

const getRankList = async () => {
    moreStatus.value = 'loading'
    const params = Object.assign(pageParams.value, {
        actid: monthList.value[currentMonthIndex.value].value
    })
    const rRes = await getRankUserListData(params)
    if (rRes.code === 200) {
        mineRank.value = rRes.data.user

        const other: RankInfo[] = []
        rRes.data.list.content.forEach((item, index) => {
            if (index < 3 && pageParams.value.page === 1) {
                rankList.value.forEach((rItem) => {
                    if (rItem.rank === index + 1) {
                        rItem.avatar = item.user.avatar
                        rItem.nickName = item.user.nickname
                        rItem.score = `${item.score}`
                    }
                })
            } else {
                other.push({
                    decorate: '',
                    nickName: item.user.nickname,
                    avatar: item.user.avatar,
                    score: `${item.score}`,
                    rank: item.rank
                })
            }
        })

        if (pageParams.value.page === 1) {
            otherRankList.value = other
        } else {
            otherRankList.value = [...otherRankList.value, ...other]
        }
        if (rRes.data.list.totalElements > otherRankList.value.length + 3) {
            moreStatus.value = 'more'
        } else {
            moreStatus.value = 'noMore'
        }
    }
}

getIndexData()
</script>

<style lang="scss" scoped>
</style>
