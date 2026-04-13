<template>
    <view class="lottery-page">
        <base-navbar title="抽奖" background="#f5f4f9" />
        <view
            style="margin: 28rpx 32rpx 45rpx 32rpx; display: flex; align-items: center; justify-content: space-between;">
            <view>
                <view style="width: 360rpx; height: 260rpx; overflow: hidden;">
                    <lottery-reward-grid :list="[1, 2, 3, 4, 5, 6]" />
                </view>
                <view style="margin-top: 29rpx;">
                    <lottery-online-bar />
                </view>
            </view>
            <view>
                <lottery-live-board />
            </view>
        </view>
        <lottery-pool-panel :loading="loading" />
        <view style="position: fixed; bottom: 0; left: 0;">
            <lottery-action-bar />
        </view>
        <view
            style="display: grid; margin: 40rpx 18rpx 0 18rpx; row-gap: 24rpx; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 12rpx; ">
            <lottery-reward-card :dataInfo="itemData" />
            <lottery-reward-card :dataInfo="itemData" />
            <lottery-reward-card :dataInfo="itemData" />
            <lottery-reward-card :dataInfo="itemData" />
            <lottery-reward-card :dataInfo="itemData" />
            <lottery-reward-card :dataInfo="itemData" />
        </view>
    </view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getOneBoxDetail, getSaleBoxOpenLog } from '@/apis/bx.js'
import { onLoad } from '@dcloudio/uni-app'
const loading = ref(true)
const itemData = ref({})
const id = ref('')
onLoad((e) => {
    id.value = e.id
})
const initData = () => {

    Promise.all([getOneBoxDetail({ id: id.value }, getSaleBoxOpenLog({ id: id.value }))])
        .then(([detailRes, logRes]) => {
            console.log(detailRes, logRes)
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