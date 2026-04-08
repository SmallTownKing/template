<template>
    <view class="congrats">
        <view class="congrats__bg-container">
            <image class="congrats__bg-img" src="/static/images/congrats-bg.png" mode="scaleToFill" />

            <view class="congrats__more" @click="handleMore">
                Thêm nhiều <text class="arrow">❯</text>
            </view>

            <view class="congrats__swiper-area">

                <block v-if="localList.length > 0">
                    <swiper class="congrats__swiper" autoplay circular :interval="300000" :duration="500"
                        next-margin="240rpx" @change="onSwiperChange">
                        <swiper-item v-for="(item, index) in localList" :key="index">
                            <view class="winner-card" :class="[
                                index % 2 === 0 ? 'winner-card--red' : 'winner-card--yellow',
                                { 'is-glaring': currentIndex === index } 
                            ]" @click="handleCard(item, index)">
                                
                                <view class="winner-card__glare"></view>
                                <view class="winner-card__watermark">SP SP SP<br>SP SP SP</view>

                                <view class="winner-card__main">
                                    <view class="user-info">
                                        <image class="user-info__avatar" :src="item.avatar" mode="aspectFill" />
                                        <view class="user-info__detail">
                                            <view class="user-info__name-row">
                                                <text class="user-info__nickname">{{ item.name }}</text>
                                                <image v-if="item.badge" class="user-info__badge" :src="item.badge" mode="aspectFit" />
                                            </view>
                                            
                                            <view class="price-tag">
                                                <view class="price-tag__skew">
                                                    <view class="price-tag__sp">
                                                        <text class="price-tag__sp-text">SP</text>
                                                    </view>
                                                    <text class="price-tag__amount">RM{{ item.displayPrice }}</text>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>

                                <view class="winner-card__aside">
                                    <image class="winner-card__prize" :src="item.prizeImg" mode="aspectFill" />
                                </view>
                            </view>
                        </swiper-item>
                    </swiper>
                </block>

                <view class="skeleton-area" v-else>
                    <view class="skeleton-card"></view>
                    <view class="skeleton-card"></view>
                </view>

            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
    list: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['more', 'click'])

const currentIndex = ref(0)
const localList = ref([])
const timers = {}

watch(() => props.list, (newList) => {
    if (newList && newList.length > 0) {
        localList.value = newList.map(item => ({
            ...item,
            displayPrice: '0.00' // 初始化为字符 0
        }))

        setTimeout(() => {
            animatePrice(currentIndex.value)
        }, 50)
    } else {
        localList.value = []
    }
}, { immediate: true, deep: true })

const onSwiperChange = (e) => {
    currentIndex.value = e.detail.current
    animatePrice(currentIndex.value)
}

const animatePrice = (index) => {
    if (!localList.value[index]) return

    const originalPriceStr = String(localList.value[index].price)
    const target = Number(originalPriceStr)
    
    // 判断是否有小数，例如 "100.50" 有 2 位小数
    const hasDecimal = originalPriceStr.includes('.')
    const decimalPlaces = hasDecimal ? originalPriceStr.split('.')[1].length : 0

    // 将非当前项立刻重置为 0 (保留同样的小数位数)
    localList.value.forEach((item, i) => {
        if (i !== index) {
            if (timers[i]) clearInterval(timers[i])
            item.displayPrice = (0).toFixed(decimalPlaces)
        }
    })

    if (isNaN(target)) {
        localList.value[index].displayPrice = originalPriceStr
        return
    }

    if (timers[index]) {
        clearInterval(timers[index])
    }

    localList.value[index].displayPrice = (0).toFixed(decimalPlaces)
    const duration = 600
    const frames = 30
    const stepTime = Math.floor(duration / frames)
    let currentFrame = 0

    timers[index] = setInterval(() => {
        currentFrame++
        const progress = currentFrame / frames
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        // 【核心修改】：不使用 floor，而是按比例相乘后，保留对应的小数位数
        const currentVal = easeProgress * target
        localList.value[index].displayPrice = currentVal.toFixed(decimalPlaces)

        if (currentFrame >= frames) {
            clearInterval(timers[index])
            // 保证最终数值精准，依然保留原定的小数位数
            localList.value[index].displayPrice = target.toFixed(decimalPlaces)
        }
    }, stepTime)
}

onUnmounted(() => {
    Object.values(timers).forEach(timer => clearInterval(timer))
})

const handleMore = () => emit('more')
const handleCard = (item, index) => emit('click', { item, index })
</script>

<style lang="scss" scoped>
/* ================= 1. 外部容器与布局 ================= */
.congrats {
    width: 100%;
    padding: 0 32rpx;
    box-sizing: border-box;

    &__bg-container {
        position: relative;
        width: 100%;
        height: 168rpx;
    }

    &__bg-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    &__more {
        position: absolute;
        right: 24rpx;
        top: 12rpx;
        font-size: 20rpx;
        color: #333;
        z-index: 10;
        display: flex;
        align-items: center;

        .arrow {
            color: #999;
            font-size: 18rpx;
            margin-left: 4rpx;
            font-weight: bold;
        }
    }

    &__swiper-area {
        position: absolute;
        top: 52rpx;
        left: 0;
        width: 100%;
        height: 104rpx;
        z-index: 5;
        overflow: hidden;
    }

    &__swiper {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
}

/* ================= 2. 中奖卡片组件 ================= */
.winner-card {
    display: flex;
    width: calc(100% - 18rpx);
    margin-left: 18rpx;
    height: 100%;
    border-radius: 8rpx;
    padding: 10rpx 14rpx;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;

    /* 主题修饰符 */
    &--red { background: linear-gradient(135deg, #d32f2f, #e53935); }
    &--yellow { background: linear-gradient(135deg, #fbc02d, #ffca28); }

    /* 卡片暗纹 */
    &__watermark {
        position: absolute;
        top: -10rpx;
        left: -10rpx;
        font-size: 36rpx;
        font-weight: 900;
        line-height: 1.1;
        color: rgba(255, 255, 255, 0.08);
        transform: rotate(-15deg);
        pointer-events: none;
        white-space: pre;
    }

    /* 炫光特效 */
    &__glare {
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
        transform: skewX(-25deg);
        z-index: 10;
        pointer-events: none;
    }

    /* 左侧主体与右侧图片 */
    &__main {
        flex: 1;
        position: relative;
        z-index: 2;
        min-width: 0;
    }

    &__aside {
        width: 72rpx;
        height: 72rpx;
        border-radius: 6rpx;
        border: 3rpx solid #ffffff;
        background-color: #f5f5f5;
        flex-shrink: 0;
        margin-left: 10rpx;
        overflow: hidden;
        position: relative;
        z-index: 2;
    }

    &__prize {
        width: 100%;
        height: 100%;
        display: block;
    }
}

/* 激活时触发炫光动画 */
.is-glaring .winner-card__glare {
    animation: sweep-glare 0.8s ease-in-out forwards;
}

@keyframes sweep-glare {
    0% { left: -100%; }
    100% { left: 200%; }
}

/* ================= 3. 用户信息模块 ================= */
.user-info {
    display: flex;
    align-items: center;

    &__avatar {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        margin-right: 10rpx;
        flex-shrink: 0;
        background-color: #f5f5f5;
    }

    &__detail {
        display: flex;
        flex-direction: column;
    }

    &__name-row {
        display: flex;
        align-items: center;
        margin-bottom: 6rpx;
    }

    &__nickname {
        font-size: 20rpx;
        color: #ffffff;
        font-weight: bold;
        max-width: 100rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__badge {
        width: 26rpx;
        height: 26rpx;
        margin-left: 4rpx;
        flex-shrink: 0;
    }
}

/* ================= 4. 价格标签模块 ================= */
.price-tag {
    display: flex;

    &__skew {
        background-color: #ffffff;
        border-radius: 4rpx;
        display: flex;
        align-items: center;
        padding-right: 8rpx;
        transform: skewX(-15deg);
    }

    &__sp {
        background-color: #e53935;
        border-radius: 4rpx;
        padding: 0 6rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__sp-text {
        transform: skewX(15deg);
        color: #ffffff;
        font-size: 16rpx;
        font-weight: 900;
        font-style: italic;
    }

    &__amount {
        transform: skewX(15deg);
        color: #000000;
        font-size: 18rpx;
        font-weight: 900;
        margin-left: 6rpx;
    }
}

/* ================= 5. 骨架屏 ================= */
.skeleton-area {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0 16rpx;
    box-sizing: border-box;
}

.skeleton-card {
    flex-shrink: 0;
    width: 440rpx;
    height: 100%;
    border-radius: 8rpx;
    background-color: #e0e0e0;
    margin-right: 16rpx;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
    0% { opacity: 0.8; }
    50% { opacity: 0.4; }
    100% { opacity: 0.8; }
}
</style>