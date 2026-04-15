<template>
    <view class="lottery-reward-card">
        
        <block v-if="showSkeleton">
            <view class="img-skeleton skeleton-anim"></view>
            <view class="text-skeleton title-sk skeleton-anim"></view>
            <view class="text-skeleton sub-sk skeleton-anim"></view>
        </block>

        <block v-else>
            <view class="card-img-wrap">
                <image 
                    class="card-img"
                    :src="itemData.image" 
                    mode="scaleToFill" 
                />
                <view class="prob-badge" v-if="itemData.probability">
                    {{ itemData.probability }}
                </view>
            </view>
            
            <view class="goods-name">{{ itemData.name }}</view>
            
            <view class="goods-sub">vnd{{ itemData.price }}</view>
        </block>

    </view>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
    name: 'LotteryRewardCard'
})

const props = defineProps({
    // 控制是否显示骨架屏
    loading: {
        type: Boolean,
        default: false
    },
    // 将散落的数据聚合成一个对象
    dataInfo: {
        type: Object,
        default: () => ({})
    }
})

// 防错计算：如果没有传入有效数据，也自动展示骨架屏
const isEmpty = computed(() => !props.dataInfo || Object.keys(props.dataInfo).length === 0)
const showSkeleton = computed(() => props.loading || isEmpty.value)

// 安全提取数据，防止 undefined 报错
const itemData = computed(() => {
    return {
        image: props.dataInfo?.pictrue || '',
        probability: props.dataInfo?.probabilityText || '',
        name: props.dataInfo?.title || '',
        price: props.dataInfo?.price || ''
    }
})
</script>

<style lang="scss" scoped>
/* ================= 基础卡片样式 ================= */
.lottery-reward-card {
    width: 100%;
    /* 使用 border-box 让 100% 宽度包含 padding，防止子元素溢出 */
    box-sizing: border-box; 
    padding: 2rpx;
    border-radius: 8rpx;
    background-color: #FFFFFF;
    /* 防止内部图片由于圆角导致溢出直角 */
    overflow: hidden; 
}

/* 图片区域容器 */
.card-img-wrap {
    position: relative;
    width: 100%;
    height: 224rpx;
}

.card-img {
    width: 100%;
    height: 100%;
    display: block;
    /* 配合父级的 padding，只给上方的两个角设置圆角 */
    border-radius: 6rpx 6rpx 0 0; 
}

.prob-badge {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 20rpx;
    color: #FFFFFF;
    /* 优化点：增加了半透明渐变底色，防止在纯白图片上看不见白字 */
    background: rgba(0, 0, 0, 0.4);
    padding: 2rpx 8rpx;
    border-radius: 8rpx 0 0 0;
}

/* 第一行文字 */
.goods-name {
    height: 26rpx;
    margin: 16rpx 16rpx 6rpx 16rpx;
    text-align: center;
    font-size: 22rpx;
    line-height: 26rpx;
    color: #333333;
    /* 优化点：增加单行文本截断，防止由于名字过长撑破卡片 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 第二行文字 */
.goods-sub {
    height: 26rpx;
    margin: 0 16rpx 18rpx 16rpx;
    text-align: center;
    font-size: 22rpx;
    line-height: 26rpx;
    color: #F72F2B;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ================= 骨架屏动画与样式 ================= */
.skeleton-anim {
    background-color: #e0e0e0;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

/* 骨架屏占位块 */
.img-skeleton {
    width: 100%;
    height: 224rpx;
    border-radius: 6rpx 6rpx 0 0;
}

.text-skeleton {
    height: 26rpx;
    border-radius: 4rpx;
    margin: 0 auto; /* 保证骨架在中间 */
}

.title-sk {
    width: 70%;
    margin-top: 16rpx;
    margin-bottom: 6rpx;
}

.sub-sk {
    width: 50%;
    margin-bottom: 18rpx;
}
</style>