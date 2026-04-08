<template>
    <view class="product-card" @click="handleClick" hover-class="product-card--hover" :hover-stay-time="100">
        <block v-if="isEmpty">
            <view class="skeleton-cover skeleton-anim"></view>
            <view class="card-info">
                <view class="skeleton-title skeleton-anim"></view>
                <view class="skeleton-title skeleton-anim short"></view>
                <view class="skeleton-sales skeleton-anim"></view>
                <view class="skeleton-price skeleton-anim"></view>
            </view>
        </block>
        <block v-else>
            <view class="card-cover">
                <image class="cover-image" :src="item.image" mode="aspectFill" lazy-load />
                <view class="stock-badge" v-if="item.stock">
                    <image class="badge-icon" src="/static/icons/cube-yellow.png" mode="aspectFit" />
                    <text class="badge-text">{{ item.stock }}</text>
                </view>
            </view>
            <view class="card-info">
                <view class="title">{{ item.title }}</view>

                <view class="sales-row" v-if="item.salesNum">
                    <text class="sales-num">{{ item.salesNum }}</text>
                    <text class="sales-text">{{ item.salesText || 'đã bán trong 3 giờ gần đây' }}</text>
                </view>

                <view class="price-row">
                    <text class="currency">{{ item.currency || 'RM' }}</text>
                    <text class="price-val">{{ item.price }}</text>
                </view>
            </view>
        </block>
    </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['click'])

const isEmpty = computed(() => {
    return !props.item || Object.keys(props.item).length === 0
})

const handleClick = () => {
    if (isEmpty.value) return
    emit('click', props.item)
}
</script>

<style lang="scss" scoped>
/* 所有的 CSS 保持你上一版本的代码完全不变，这里省略展示 */
.product-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 12rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03);
    transition: transform 0.15s ease-out;

    &--hover {
        transform: scale(0.96);
    }
}

.card-cover {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    background-color: #f5f5f5;
    flex-shrink: 0;
}

.cover-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
}

.stock-badge {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 6rpx 12rpx 6rpx 8rpx;
    border-radius: 0 0 0 12rpx;
    z-index: 2;
}

.badge-icon {
    width: 24rpx;
    height: 24rpx;
    margin-right: 6rpx;
}

.badge-text {
    font-size: 22rpx;
    font-weight: bold;
    color: #ffc107;
}

.card-info {
    padding: 16rpx 16rpx 20rpx;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.title {
    font-size: 24rpx;
    color: #111111;
    font-weight: 500;
    line-height: 32rpx;
    height: 64rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

.sales-row {
    margin-top: 12rpx;
    display: flex;
    align-items: baseline;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-height: 28rpx;
}

.sales-num {
    font-size: 24rpx;
    font-weight: bold;
    color: #F9691C;
    margin-right: 6rpx;
}

.sales-text {
    font-size: 18rpx;
    letter-spacing: -1rpx;
    color: #787777;
}

.price-row {
    margin-top: 14rpx;
    display: flex;
    align-items: baseline;
    color: #FF1512;
}

.currency {
    font-size: 22rpx;
    font-weight: bold;
    margin-right: 2rpx;
}

.price-val {
    font-size: 32rpx;
    font-weight: bold;
}

.skeleton-anim {
    background-color: #f0f2f5;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.skeleton-cover {
    width: 100%;
    padding-bottom: 100%;
    flex-shrink: 0;
}

.skeleton-title {
    height: 26rpx;
    margin-bottom: 12rpx;
    border-radius: 4rpx;
    width: 100%;
}

.skeleton-title.short {
    width: 70%;
    margin-bottom: 0;
}

.skeleton-sales {
    height: 20rpx;
    width: 60%;
    margin-top: 24rpx;
    border-radius: 4rpx;
}

.skeleton-price {
    height: 32rpx;
    width: 40%;
    border-radius: 4rpx;
    margin-top: 14rpx;
}
</style>