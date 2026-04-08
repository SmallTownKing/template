<template>
  <view class="custom-tabs">
    
    <block v-if="loading">
      <view class="tab-item skeleton-item" v-for="i in 2" :key="i">
        <view class="skeleton-icon"></view>
        <view class="skeleton-text"></view>
      </view>
    </block>

    <block v-else>
      <view
        class="tab-item"
        v-for="(item, index) in list"
        :key="index"
        :class="{ 'is-active': modelValue === index }"
        @click="handleTabClick(index, item)"
      >
        <block v-if="item.icon || item.image">
          <image
            v-if="item.image"
            class="tab-icon-img"
            :src="modelValue === index ? (item.activeImage || item.image) : item.image"
            mode="aspectFit"
          />
          <text v-else class="tab-icon-text">{{ item.icon }}</text>
        </block>
        
        <text class="tab-text">{{ item.text }}</text>
      </view>
    </block>

  </view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  },
  // 传入的 Tab 列表数据
  list: {
    type: Array,
    default: () => [
      { text: 'Mẫu kinh điển', icon: '🍎' }, 
      { text: 'Sưu tập', icon: '🃏' }
    ]
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleTabClick = (index, item) => {
  if (props.modelValue === index) return
  
  // 触发双向绑定更新
  emit('update:modelValue', index)
  // 触发额外的 change 事件供父组件监听
  emit('change', { index, item })
}
</script>

<style lang="scss" scoped>
.custom-tabs {
  display: flex;
  align-items: center;
  margin: 32rpx 32rpx 0  32rpx;
  height: 88rpx; // 整体高度
  background-color: #e8e8ea; // 外层灰色背景
  border-radius: 12rpx;
  padding: 8rpx; // 留出内边距，让里面的白色滑块有“包裹感”
  box-sizing: border-box;

  .tab-item {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8rpx;
    transition: all 0.25s ease; // 切换时的平滑过渡动画
    
    // 未选中状态（置灰）
    color: #888888;
    filter: grayscale(100%); // 将未选中的 emoji 或图片自动置灰

    .tab-icon-text {
      font-size: 28rpx;
      margin-right: 8rpx;
    }

    .tab-icon-img {
      width: 32rpx;
      height: 32rpx;
      margin-right: 8rpx;
      display: block;
    }

    .tab-text {
      font-size: 26rpx;
      font-weight: 500;
    }

    // 选中状态（高亮白底）
    &.is-active {
      background-color: #FFFFFF;
      color: #111111; // 字体变深色
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04); // 微微的投影提升立体感
      filter: grayscale(0%); // 取消置灰，恢复彩色
      font-weight: bold;
    }
  }

  /* ================= 骨架屏专属样式 ================= */
  .skeleton-item {
    pointer-events: none; /* 防止被点击 */
    filter: none !important; /* 去除全局 filter，防止骨架屏颜色太淡 */
  }

  .skeleton-icon {
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%; /* 圆形图片占位 */
    background-color: #d4d4d6; /* 比外层灰色略深一点点 */
    margin-right: 8rpx;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  .skeleton-text {
    width: 120rpx; /* 模拟文字宽度 */
    height: 28rpx;
    border-radius: 6rpx;
    background-color: #d4d4d6;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }
}

@keyframes skeleton-pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>