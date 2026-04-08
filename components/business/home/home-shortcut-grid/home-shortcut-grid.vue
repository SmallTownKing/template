<template>
  <view class="custom-nav" v-if="list.length > 0">
    <view
      class="nav-item"
      v-for="(item, index) in list"
      :key="index"
      hover-class="nav-item--hover"
      :hover-stay-time="100"
      @click="handleTap(item, index)"
    >
      <view class="icon-wrap">
        <image
          class="icon-image"
          :src="item.icon || item.image"
          mode="aspectFit"
          :style="{
            width: item.imgWidth || '72rpx',
            height: item.imgHeight || '72rpx'
          }"
        />
      </view>
      <text class="nav-text">{{ item.title || item.name }}</text>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { useAppI18n } from '@/i18n'
const { t } = useAppI18n()
const list = ref([
  {
    id: 1,
    title: t('home_001'),
    icon: '/static/images/icons/chest.png',
    imgWidth: '74rpx',
    imgHeight: '64.28rpx'
  },
  {
    id: 2,
    title: t('home_002'),
    icon: '/static/images/icons/trophy.png',
    imgWidth: '90rpx',
    imgHeight: '90rpx'
  },
  {
    id: 3,
    title: t('home_003'),
    icon: '/static/images/icons/gift.png',
    imgWidth: '80rpx',
    imgHeight: '80rpx'
  },
  {
    id: 4,
    title: t('home_004'),
    icon: '/static/images/icons/share.png',
    imgWidth: '92rpx',
    imgHeight: '90rpx'
  }
])

const emit = defineEmits(['click'])
const handleTap = (item, index) => {
  emit('click', { item, index })
}
</script>

<style lang="scss" scoped>
.custom-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 38rpx 32rpx 44rpx 32rpx;
  background-color: transparent;

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 0 6rpx;
    box-sizing: border-box;
    transition: transform 0.15s ease-in-out, opacity 0.15s ease;
  }

  .nav-item--hover {
    transform: scale(0.9);
  }

  .icon-wrap {
    width: 100rpx;
    height: 100rpx;
    background-color: #ffffff;
    border-radius: 12rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);
    margin-bottom: 16rpx;
  }

  .icon-image {
    display: block;
  }

  .nav-text {
    font-size: 24rpx;
    color: #111111;
    text-align: center;
    line-height: 1.1;
    word-break: break-word;
    white-space: pre-wrap;
    letter-spacing: -1rpx;
  }
}
</style>