<template>
	<view class="user-feature-grid">
		<view style="height: 48rpx; display: flex; align-items: center;">
			<view>123</view>
			<view>234</view>
		</view>
		<view style="margin-top: 46rpx;">
			<view class="menu-grid">
				<view class="menu-item">
					<view style="width: 56rpx; height: 56rpx; background: #eee; border-radius: 8rpx;"></view>
					<view style="margin-top: 22rpx;">xxx</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped>
.user-feature-grid {
	margin-top: 40rpx;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 核心：分为4个等宽的列 */
  row-gap: 30px; /* 行间距 */
  /* column-gap: 10px; 如果列之间需要特定间距也可以加 */
}

.menu-item {
  display: flex;
  flex-direction: column; /* 让图标和文字垂直排列 */
  align-items: center;    /* 居中对齐 */
  justify-content: center;
}
</style>