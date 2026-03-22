<template>
    <view class="activity">
        <image class="activity-bg" src="https://jms.85gui7.com/kahe-202510/images/rank-bg.png" />
        <view class="activity-content">
            <image
                class="activity-content-rankbtn"
                src="https://jms.85gui7.com/kahe-202510/images/rankbtn.png"
            />
            <view class="activity-content-time">活动结束时间{{ endTime }}</view>
            <view class="activity-content-rank">
                <view class="activity-content-rank-list">
                    <avatar-info
                        v-for="(item, index) in rankList"
                        :key="'index' + index"
                        class="activity-content-rank-list-item"
                        :info="item"
                        @tap.stop="didClickFilterMonth(index)"
                    ></avatar-info>
                </view>
            </view>
            <view class="activity-content-leader">
                <image
                    class="activity-content-leader-bg"
                    src="https://jms.85gui7.com/kahe-202510/images/leader.png"
                />
                <view class="activity-content-leader-num theme-font">{{
                    rankList[2].rank
                }}</view>
                <view class="activity-content-leader-num theme-font">{{
                    rankList[1].rank
                }}</view>
                <view class="activity-content-leader-num theme-font">{{
                    rankList[0].rank
                }}</view>
            </view>
            <view class="activity-content-center">
                <scroll-view
                    class="activity-content-center-list"
                    :scroll-y="true"
                    :scroll-x="false"
                    scroll-with-animation
                >
                    <view class="activity-content-center-list-content">
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
            decorate: 'https://jms.85gui7.com/kahe-202510/images/top2.png',
            nickName: '',
            score: '',
            rank: 2
        },
        {
            avatar: '',
            decorate: 'https://jms.85gui7.com/kahe-202510/images/top1.png',
            nickName: '',
            score: '',
            rank: 1
        },
        {
            avatar: '',
            decorate: 'https://jms.85gui7.com/kahe-202510/images/top3.png',
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
.activity {
    width: 100%;
    height: 100vh;
    &-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    &-content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        &-rankbtn {
            width: 259rpx;
            height: 87rpx;
            margin: 10rpx auto 0;
        }
        &-time {
            margin: 0 auto;
            font-size: 20rpx;
            color: #595959;
        }
        &-leader {
            position: relative;
            width: 636rpx;
            height: 102rpx;
            margin: 10rpx auto 0;
            &-bg {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                object-fit: cover;
            }
            &-num {
                position: absolute;
                left: 68rpx;
                top: 29rpx;
                font-size: 60rpx;
                color: #79451b;
                z-index: 1;
            }
            &-num:nth-child(2) {
                left: 516rpx;
                top: 35rpx;
            }
            &-num:nth-child(3) {
                left: 304rpx;
                top: 15rpx;
            }
        }
        &-top {
            position: relative;
            padding: 0 32rpx;
            width: calc(100% - 64rpx);
            height: 50rpx;
            background: rgba(63, 62, 53, 0.4);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-title {
                    font-size: 32rpx;
                    font-weight: 400;
                    color: #000000;
                }
                &-time {
                    position: relative;
                    margin-left: 56rpx;
                    &-show {
                        display: flex;
                        flex-direction: row;
                        align-items: center;

                        &-title {
                            font-size: 32rpx;
                            font-weight: 400;
                            color: #000000;
                        }
                    }

                    &-list {
                        position: absolute;
                        left: -20rpx;
                        top: 40rpx;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        background: #2d3e7c;
                        border: 2rpx solid #6564cb;
                        border-radius: 4rpx;

                        &-item {
                            padding: 8rpx 16rpx;
                            border-bottom: 1rpx solid #6564cb;
                            display: inline-block;
                            font-size: 24rpx;
                            text-align: center;
                            font-weight: 400;
                            color: #dbdbff;
                        }
                        &-item:last-child {
                            border-bottom: none;
                        }
                    }
                }
            }
            &-right {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-img {
                    width: 24rpx;
                    height: 24rpx;
                    margin-right: 6rpx;
                }
                &-title {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #383737;
                }
            }
        }

        &-rank {
            position: relative;
            width: 100%;
            &-list {
                position: relative;
                left: 0;
                top: 28rpx;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-evenly;

                &-item:nth-child(2) {
                    margin-bottom: 60rpx;
                }
            }
        }

        &-center {
            margin: 0 auto;
            position: relative;
            width: 694rpx;
            height: 860rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #ffffff;
            border-radius: 20rpx 20rpx 0rpx 0rpx;
            opacity: 0.6;
            &-bg {
                position: relative;
                width: calc(100% - 24rpx);
                padding: 0 12rpx;
                width: 100%;
                height: 100%;
            }
            &-list {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: calc(100%);
                &-content {
                    padding: 30rpx;
                    width: calc(100% - 60rpx);
                    height: calc(100% - 60rpx);
                }
            }
        }
    }
}
</style>
