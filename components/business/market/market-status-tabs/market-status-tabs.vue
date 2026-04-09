<template>
  <view class="custom-tabs">
    <view
      class="tab-item"
      v-for="(item, index) in list"
      :key="index"
      @click="handleTabClick(index, item)"
    >
      <image
        v-if="item.icon"
        class="tab-icon"
        :src="item.icon"
        mode="aspectFit"
      />

      <view class="tab-text-wrap">
        <text 
          class="tab-text" 
          :class="{ 'is-active': modelValue === index }"
        >
          {{ item.name }}
        </text>
        
        <view 
          class="tab-line" 
          :class="{ 'is-active': modelValue === index }"
        ></view>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  // 当前激活的 tab 索引
  modelValue: {
    type: Number,
    default: 0
  },
  // Tab 列表数据
  list: {
    type: Array,
    default: () => [
      { 
        name: 'Đang bán', 
        // 请替换为你实际的本地图片路径或网络链接
        icon: '/static/icons/flame.png' 
      },
      { 
        name: 'Giao dịch thành công', 
        icon: '/static/icons/gavel.png' 
      }
    ]
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleTabClick = (index, item) => {
  if (props.modelValue === index) return
  
  // 触发双向绑定更新
  emit('update:modelValue', index)
  // 触发 change 事件供父组件监听
  emit('change', { index, item })
}
</script>

<style lang="scss" scoped>
.custom-tabs {
  display: flex;
  align-items: center;
  /* 去除背景色，由父组件决定 */
  background-color: transparent; 
  padding: 20rpx 32rpx;
  /* 控制两个 Tab 之间的间距 */
  column-gap: 48rpx; 

  .tab-item {
    display: flex;
    align-items: center;
    /* 图标和文字的间距 */
    column-gap: 12rpx; 
    /* H5 端增加鼠标手势 */
    cursor: pointer; 
  }

  .tab-icon {
    width: 44rpx;
    height: 44rpx;
    border-radius: 8rpx;
    display: block;
    flex-shrink: 0;
  }

  .tab-text-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tab-text {
    font-size: 30rpx;
    color: #6b7280; /* 未激活时的灰黑色，参考图片右侧 */
    font-weight: 500;
    transition: color 0.3s ease;

    &.is-active {
      color: #111827; /* 激活时的纯黑色，参考图片左侧 */
      font-weight: 600;
    }
  }

  .tab-line {
    position: absolute;
    /* 调整线条距离文字底部的距离 */
    bottom: -14rpx; 
    left: 50%;
    /* 默认缩放为0 (隐藏) */
    transform: translateX(-50%) scaleX(0); 
    width: 40rpx; /* 红线的宽度 */
    height: 6rpx; /* 红线的粗细 */
    background-color: #ff2a2a; /* 红色 */
    border-radius: 6rpx;
    transition: transform 0.3s ease-out;

    &.is-active {
      /* 激活时缩放为1 (展示) */
      transform: translateX(-50%) scaleX(1); 
    }
  }
}
</style>