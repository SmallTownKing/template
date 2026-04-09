<template>
  <view class="custom-tabs">

    <block v-if="loading">
      <view class="tab-item skeleton-item" v-for="i in 2" :key="i">
        <view class="skeleton-icon"></view>
        <view class="skeleton-text"></view>
      </view>
    </block>
    <block v-else>
      <view class="tab-item" v-for="(item, index) in displayList" :key="index"
        :class="{ 'is-active': modelValue === index }" @click="handleTabClick(index, item)">
        <block v-if="item.icon || item.image">
          <image v-if="item.image" class="tab-icon-img"
            :src="modelValue === index ? (item.activeImage || item.image) : item.image" mode="aspectFit" />
          <text v-else class="tab-icon-text">{{ item.icon }}</text>
        </block>
        <text class="tab-text">{{ item.text }}</text>
      </view>
    </block>
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
  loading: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const displayList = computed(() => {
  if (props.list && props.list.length > 0) {
    return props.list
  }

  return [
    { text: t('card_001'), image: '/static/tabs/7.png', activeImage: '/static/tabs/7-red.png' },
    { text: t('card_002'), image: '/static/tabs/6.png', activeImage: '/static/tabs/6-red.png' }
  ]
})

const handleTabClick = (index, item) => {
  if (props.modelValue === index) return

  emit('update:modelValue', index)
  emit('change', { index, item })
}
</script>

<style lang="scss" scoped>
.custom-tabs {
  display: flex;
  align-items: center;
  margin: 32rpx 32rpx 0 32rpx;
  height: 88rpx;
  background-color: #e8e8ea;
  border-radius: 12rpx;
  padding: 8rpx;
  box-sizing: border-box;

  .tab-item {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8rpx;
    transition: all 0.25s ease;

    color: #888888;
    filter: grayscale(100%);

    .tab-icon-text {
      font-size: 28rpx;
      margin-right: 8rpx;
    }

    .tab-icon-img {
      width: 36rpx;
      height: 36rpx;
      margin-right: 8rpx;
      display: block;
    }

    .tab-text {
      font-size: 26rpx;
      font-weight: 500;
    }

    &.is-active {
      background-color: #FFFFFF;
      color: #111111;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
      filter: grayscale(0%);
      font-weight: bold;
    }
  }

  .skeleton-item {
    pointer-events: none;
    filter: none !important;
  }

  .skeleton-icon {
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    background-color: #d4d4d6;
    margin-right: 8rpx;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  .skeleton-text {
    width: 120rpx;
    height: 28rpx;
    border-radius: 6rpx;
    background-color: #d4d4d6;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }
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
</style>