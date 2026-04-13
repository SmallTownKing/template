<template>
    <view class="lottery-pool-panel">
        
        <view class="panel-header">
            <view v-if="!loading" class="header-title">{{ title }}</view>
        </view>
        <view class="panel-content">
            <view class="scroll-container-wrap">
                <block v-if="loading || isEmpty">
                    <view class="scroll-skeleton">
                        <view class="rate-skeleton" v-for="i in 4" :key="i">
                            <view class="rate-info-sk">
                                <view class="level-sk skeleton-anim"></view>
                                <view class="percent-sk skeleton-anim"></view>
                            </view>
                            <view v-if="i !== 4" class="divider-sk"></view>
                        </view>
                    </view>
                </block>
                <scroll-view v-else class="scroll-container" scroll-x="true" :show-scrollbar="false">
                    <view class="scroll-content">
                        <view class="rate-item" v-for="(item, index) in rateList" :key="index">
                            <view class="rate-info">
                                <text class="level">{{ item.level }}</text>
                                <text class="percent">{{ item.percent }}</text>
                            </view>
                            
                            <image 
                                v-if="index !== rateList.length - 1" 
                                class="divider-img"
                                src="/static/background/line.png" 
                                mode="scaleToFill" 
                            />
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view v-if="loading || isEmpty" class="action-btn-skeleton skeleton-anim"></view>
            <view v-else class="action-btn" @click="handleActionClick">
                <image
				 class="btn-icon"
					src="/static/background/lotteryRecords.png"
					mode="scaleToFill"
				/>
                <view class="btn-text-box">
                    <text class="btn-text">LỊCH SỬ</text>
                    <text class="btn-text">RÚT THẺ</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    // 控制是否显示骨架屏
    loading: {
        type: Boolean,
        default: false
    },
    title: {
        type: [String, Number],
        default: '1231'
    },
    rateList: {
        type: Array,
        default: () => [
            { level: 'SP', percent: '6%' },
            { level: 'A', percent: '8%' },
            { level: 'B', percent: '8%' },
            { level: 'C', percent: '86%' }
        ]
    }
})

const emit = defineEmits(['action'])

const isEmpty = computed(() => !props.rateList || props.rateList.length === 0)

const handleActionClick = () => {
    emit('action')
}
</script>

<style lang="scss" scoped>
.lottery-pool-panel {
    margin: 10rpx 32rpx 0;
    width: 686rpx;
    min-height: 184rpx;
    background-color: #FFFFFF;
    border-radius: 16rpx;
    position: relative;
}

.panel-header {
    position: absolute;
    top: -10rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 456rpx;
    height: 74rpx;
    background-image: url('/static/background/panelBg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header-title {
    width: 306rpx;
    text-align: center;
    color: #FFFFFF;
    font-size: 32rpx;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.panel-content {
    padding-top: 92rpx;
    padding-bottom: 24rpx; 
    margin: 0 24rpx;
    display: flex;
    align-items: center;
}

.scroll-container-wrap {
    flex: 1;
    min-width: 0;
	height: 67rpx;
}

.scroll-container {
    width: 100%;
    white-space: nowrap;
    text-align: center; 
}

.scroll-container ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
}

.scroll-content {
    display: inline-block;
    min-width: 100%;
    vertical-align: middle;
}

.rate-item {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
}

.rate-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.divider-img {
    width: 2rpx;
    height: 28rpx;
    margin: 0 48rpx; 
}

.level {
    font-size: 28rpx;
    font-weight: 900;
    font-style: italic;
    color: #333333;
}

.percent {
    font-size: 21rpx;
    color: #666666;
    margin-top: 6rpx;
}

.action-btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    border-radius: 8rpx;
    margin-left: 20rpx;
	width: 116rpx;
	height: 52rpx;
	background-image: url('/static/background/lotteryRecordBg.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.btn-icon {
    margin-right: 8rpx;
    color: #ffffff;
	width: 29rpx;
	height: 28rpx;
	margin-left: 10rpx;
}

.btn-text-box {
    display: flex;
    flex-direction: column;
}

.btn-text {
    font-size: 14rpx;
    color: #ffffff;
    line-height: 1.2;
    font-weight: bold;
}

.skeleton-anim {
    background-color: #e0e0e0;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

.header-title-skeleton {
    width: 160rpx;
    height: 32rpx;
    border-radius: 6rpx;
    background-color: rgba(255, 255, 255, 0.4); 
    animation: skeleton-pulse-light 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse-light {
    0% { opacity: 0.8; }
    50% { opacity: 0.4; }
    100% { opacity: 0.8; }
}

.scroll-skeleton {
    display: flex;
    justify-content: center; 
    align-items: center;
    width: 100%;
}

.rate-skeleton {
    display: flex;
    align-items: center;
}

.rate-info-sk {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.level-sk {
    width: 44rpx;
    height: 34rpx;
    border-radius: 4rpx;
    margin-bottom: 6rpx;
}

.percent-sk {
    width: 50rpx;
    height: 26rpx;
    border-radius: 4rpx;
}

.divider-sk {
    width: 2rpx;
    height: 28rpx;
    background-color: #e0e0e0;
    margin: 0 36rpx;
}

.action-btn-skeleton {
   width: 116rpx;
	height: 52rpx;
    border-radius: 8rpx;
    margin-left: 20rpx;
    flex-shrink: 0;
}
</style>