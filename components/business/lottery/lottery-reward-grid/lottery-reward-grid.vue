<template>
    <view class="lottery-reward-grid">
        <view 
            class="scroll-wrapper" 
            :class="[
                { 'is-entering': isEntering && list.length >= scrollThreshold }, 
                { 'is-scrolling': !isEntering && list.length >= scrollThreshold }
            ]"
        >
            <view class="scroll-list">
                <view class="scroll-item" v-for="(item, i) in list" :key="'real' + i">
                    <image class="item-avatar" src="/static/icons/gift.png" mode="scaleToFill" />
                    <text class="item-nickname">nickname</text>
                    <text class="item-time">2026-12-10 22:33:11</text>
                    <text class="item-prize">123</text>
                </view>
            </view>

            <view class="scroll-list" v-if="list.length >= scrollThreshold">
                <view class="scroll-item" v-for="(item, i) in list" :key="'copy' + i">
                    <image class="item-avatar" src="/static/icons/gift.png" mode="scaleToFill" />
                    <text class="item-nickname">nickname</text>
                    <text class="item-time">2026-12-10 22:33:11</text>
                    <text class="item-prize">123</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

// 接收父组件传入的数据
const props = defineProps({
    list: {
        type: Array,
        default: () => [] 
    }
})

// 触发滚动的最小数据量阈值
const scrollThreshold = 6

// 控制是否处于首次进场状态
const isEntering = ref(true)
let enterTimer = null

// 核心逻辑：监听 list 数据变化，完美兼容后端异步请求延时
watch(
    () => props.list, 
    (newList) => {
        // 当数据量达到滚动条件，且当前处于进场状态时，启动定时器
        if (newList.length >= scrollThreshold && isEntering.value) {
            // 注意：这里的 5000 毫秒必须和 CSS 里的 is-entering 动画时间 (5s) 保持完全一致！
            enterTimer = setTimeout(() => {
                isEntering.value = false // 5秒后，瞬间切换到普通的无限循环滚动状态
            }, 5000)
        }
    }, 
    { immediate: true, deep: true }
)

onUnmounted(() => {
    // 页面销毁或组件卸载时，必须清理定时器，防止 H5 和 App 端内存泄漏
    if (enterTimer) {
        clearTimeout(enterTimer)
        enterTimer = null
    }
})
</script>

<style lang="scss" scoped>
/* ================= 滚动窗口限制 ================= */
.lottery-reward-grid {
    width: 100%;
    /* 高度必须限死：展示 5 条数据的视窗。计算公式: 5 * (43+11) - 11 = 259rpx */
    height: 259rpx; 
    overflow: hidden; 
    position: relative;
    /* 解决部分低端机型上 overflow: hidden 和 border-radius 冲突导致圆角失效的问题 */
    transform: translateY(0); 
}

.scroll-wrapper {
    display: flex;
    flex-direction: column;
    position: relative; 
    width: 100%;
}

/* ================= 阶段一：进场动画 (从底部冒出) ================= */
.is-entering {
    /* 这里的 5s，对应 JS 里的 5000ms */
    animation: enterFromBottom 5s linear forwards;
}

@keyframes enterFromBottom {
    0% { transform: translateY(259rpx); }
    100% { transform: translateY(0); }
}

/* ================= 阶段二：无缝滚动 (无限循环) ================= */
.is-scrolling {
    animation: scrollUp 10s linear infinite;
}

@keyframes scrollUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); } /* 向上平移 50%，刚好用 copy 区替换 real 区 */
}

/* ================= 列表与单项的基础样式 ================= */
.scroll-list {
    display: flex;
    flex-direction: column;
    row-gap: 11rpx;
    padding-bottom: 11rpx;
}

.scroll-item {
    height: 43rpx;
    font-size: 16rpx;
    color: #333;
    background-color: #FFF;
    padding: 0 16rpx;
    box-sizing: border-box;
    flex-shrink: 0;
    
    /* 内部横向居中排列 */
    display: flex;
    align-items: center;
}

.item-avatar { 
    width: 28rpx; 
    height: 28rpx; 
    border-radius: 50%; 
}

.item-nickname { 
    margin: 0 12rpx 0 6rpx; 
    width: 64rpx; 
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis; 
}

.item-time { 
    margin-right: 10rpx; 
    flex-shrink: 0; 
}

.item-prize { 
    flex: 1; 
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis; 
}
</style>