<template>
  <view class="market-header">
    <text class="header-title">{{ $t('market_001') }}</text>

    <view class="header-actions">
      <view class="action-mine" @click="handleMineClick">
        <text class="mine-text">{{ $t('market_002') }}</text>
        <image class="mine-icon" src="/static/icons/market-tags.png" mode="aspectFit" />
      </view>

      <view class="action-help" @click="handleHelpClick">
        <image class="help-icon" src="/static/icons/help-circle.png" mode="aspectFit" />
      </view>
    </view>
  </view>
</template>

<script setup>
// 纯业务组件：不需要接收外部 props，只负责触发事件
const emit = defineEmits(['mineClick', 'helpClick'])

// 触发点击 "我的" 事件
const handleMineClick = () => {
  emit('mineClick')
}

// 触发点击 "规则/帮助" 事件
const handleHelpClick = () => {
  emit('helpClick')
}
</script>

<style lang="scss" scoped>
.market-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26rpx 32rpx; 
  background-color: transparent; 

  .header-title {
    font-size: 44rpx;
    font-weight: 800; 
    color: #111111;
    letter-spacing: 1rpx;
  }

  .header-actions {
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    padding: 8rpx 16rpx;
    border-radius: 8rpx;
  }

  .action-mine {
    display: flex;
    align-items: center;
    margin-right: 12rpx; 
  }

  .mine-text {
    font-size: 26rpx;
    font-weight: 500;
    color: #111111;
    margin-right: 8rpx;
  }

  .mine-icon {
    width: 32rpx;
    height: 32rpx;
    display: block;
  }

  /* 帮助问号区 */
  .action-help {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .help-icon {
    width: 34rpx;
    height: 34rpx;
    display: block;
  }
}
</style>