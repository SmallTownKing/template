<template>
    <view class="lottery-page">
        <base-navbar title="抽奖" background="#f5f4f9" />
        <view
            style="margin: 28rpx 32rpx 45rpx 32rpx; display: flex; align-items: center; justify-content: space-between;">
            <view>
                <view style="width: 360rpx; height: 260rpx; overflow: hidden;">
                    <lottery-reward-grid :list="logList" />
                </view>
                <view style="margin-top: 29rpx;">
                    <lottery-online-bar />
                </view>
            </view>
            <view>
                <lottery-live-board />
            </view>
        </view>
        <lottery-pool-panel :dataInfo="versionInfo"/>
        <view style="position: fixed; bottom: 0; left: 0; z-index: 99;">
            <lottery-action-bar />
        </view>
        <view
            style="display: grid; margin: 40rpx 18rpx 0 18rpx; padding-bottom: 176rpx; row-gap: 24rpx; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 12rpx; ">
            <lottery-reward-card v-for="item, i in goodsList" :key="i" :dataInfo="item" />
        </view>
    </view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getOneBoxDetail, getSaleBoxOpenLog } from '@/apis/bx.js'
import { onLoad } from '@dcloudio/uni-app'
import { adaptScheduleLogInfo, adaptScheduleDetailInfo } from './adapter'
const loading = ref(true)
const goodsList = ref([{}, {}, {}, {}, {}, {}])
const logList = ref([])
const versionInfo = ref({})
const id = ref('')
onLoad((e) => {
    id.value = e.id
})
const initData = () => {

    Promise.all([getOneBoxDetail({ id: id.value }), getSaleBoxOpenLog({ id: id.value })])
        .then(([detailRes, logRes]) => {
            logList.value = adaptScheduleLogInfo(logRes)
            const detailInfo = adaptScheduleDetailInfo(detailRes)
            goodsList.value = detailInfo.goodsList
			versionInfo.value = detailInfo.versionInfo
            loading.value = false
        })
        .catch((error) => {
            loading.value = false
            console.error('Error fetching home data:', error)
        })

}
onMounted((e) => {
    initData()
    // setTimeout(() => {
    //     itemData.value = { name: 'TON’S 混合坚果', price: '80.00', image: 'https://img.showgo.gg/goodsCate/images/20260104/f436244fc21021bc600e72021c7fac5e.webp?v=2026-03-17 17:57:51' }
    //     loading.value = false
    // }, 2000);
})
</script>

<style scoped>
.lottery-page {
    min-height: calc(100vh - var(--status-bar-height));
    background-color: #f5f4f9;
}
</style>