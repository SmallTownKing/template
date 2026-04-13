<template>
	<view class="lottery-action-bar">
		<view class="action-btn" v-for="item in payList" :key="item.id" @click="handleDraw(item)">
			<image class="btn-bg" src="/static/background/paybg.png" mode="scaleToFill" />
			<view class="btn-text">{{ $t(item.title) }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['draw'])

const payList = ref([
	{ id: 1, type: 'pay', title: 'pay_001', price: 6 },
	{ id: 2, type: 'pay', title: 'pay_002', price: 50 },
	{ id: 3, type: 'pay', title: 'pay_003', price: 6 },
	{ id: 4, type: 'pay', title: 'pay_004', price: 50 },
])

const handleDraw = (item) => {
	emit('draw', item)
}
</script>

<style lang="scss" scoped>
.lottery-action-bar {
	width: 750rpx;
	height: 152rpx;
	background-color: #FFFFFF;
	border-radius: 16rpx 16rpx 0 0;
	padding: 0 24rpx;
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 22rpx;
	align-items: center;
}

.action-btn {
	height: 88rpx;
	border-radius: 8rpx;
	background-color: #ff1512;
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.1s;

	&:active {
		transform: scale(0.94);
	}
}

.btn-bg {
	width: 150rpx;
	height: 116rpx;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 0;
	pointer-events: none;
}

.btn-text {
	position: relative;
	z-index: 1;
	font-size: 30rpx;
	color: #FFFFFF;
	font-weight: 500;
}
</style>