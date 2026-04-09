<template>
  <view class="custom-tabs">
    <view
      class="tab-item"
      v-for="(item, index) in displayList"
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
import { computed } from 'vue'
import { useAppI18n } from '@/i18n' 

const { t } = useAppI18n()

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  list: {
    type: Array,
    default: () => [] 
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// 【修改点 4】：用 computed 包装一下，这样就能安全地使用 t 函数了
const displayList = computed(() => {
  // 如果父组件传了数据，就用父组件的
  if (props.list && props.list.length > 0) {
    return props.list
  }
  // 如果父组件没传，使用这里的默认多语言配置
  return [
    { 
      name: t('market_003'), 
      icon: '/static/tabs/8.png' 
    },
    { 
      name: t('market_004'), 
      icon: '/static/tabs/9.png' 
    }
  ]
})

const handleTabClick = (index, item) => {
  if (props.modelValue === index) return
  
  emit('update:modelValue', index)
  emit('change', { index, item })
}
</script>

<style lang="scss" scoped>
/* =========== CSS 部分完全不需要改动 =========== */
.custom-tabs {
  display: flex;
  align-items: center;
  background-color: transparent; 
  padding: 26rpx 32rpx;
  column-gap: 48rpx; 

  .tab-item {
    display: flex;
    align-items: center;
    column-gap: 12rpx; 
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
    color: #6b7280; 
    font-weight: 500; 
    transition: color 0.3s ease;

    &.is-active {
      color: #111827;
    }
  }

  .tab-line {
    position: absolute;
    bottom: -14rpx; 
    left: 50%;
    transform: translateX(-50%) scaleX(0); 
    width: 40rpx;
    height: 5rpx;
    background-color: #ff2a2a; 
    border-radius: 5rpx;
    transition: transform 0.3s ease-out;

    &.is-active {
      transform: translateX(-50%) scaleX(1); 
    }
  }
}
</style>