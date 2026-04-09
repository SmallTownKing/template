<template>
  <view class="record-card">

    <block v-if="loading || isEmpty">
      <view class="card-header">
        <view class="avatar-skeleton skeleton-anim"></view>
        <view class="user-info">
          <view class="name-skeleton skeleton-anim"></view>
          <view class="time-skeleton skeleton-anim"></view>
        </view>
      </view>

      <view class="goods-list">
        <view class="goods-item-skeleton skeleton-anim" v-for="i in 3" :key="i"></view>
      </view>

      <view class="card-footer">
        <view class="total-skeleton skeleton-anim"></view>
      </view>
    </block>

    <block v-else>
      <view class="card-header">
        <image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
        <view class="user-info">
          <view class="name-row">
            <text class="name">{{ userInfo.username }}</text>
            <view class="level-badge" v-if="userInfo.level">
              <text class="level-icon">V</text>
              <text class="level-num">{{ userInfo.level }}</text>
            </view>
          </view>
          <text class="time">发布时间: {{ userInfo.time }}</text>
        </view>
      </view>

      <view class="goods-list">
        <view class="goods-item" v-for="(item, index) in displayGoods" :key="index">
          <image class="goods-img" :src="item.image" mode="aspectFill" />

          <view class="badge-top-left" v-if="item.badgeType" :class="'badge-' + item.badgeType">
            <text class="badge-text">{{ item.badgeType === 'lightning' ? '⚡' : 'C' }}</text>
          </view>

          <view class="badge-bottom-right" v-if="item.quantity && !(index === 2 && hasMore)">
            <text class="qty-text">x{{ item.quantity }}</text>
          </view>

          <view class="more-mask" v-if="index === 2 && hasMore">
            <text class="more-text">+{{ goodsList.length - 3 }}</text>
            <text class="more-label">更多</text>
          </view>
        </view>
      </view>

      <view class="card-footer">
        <text class="total-text">共{{ totalCount }}件: </text>
        <text class="total-price">{{ currency }}{{ totalPrice }}</text>
      </view>
    </block>

  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  // 【修改1】：将所有数据属性聚合成一个对象
  dataInfo: {
    type: Object,
    default: () => ({})
  }
})

// 【修改2】：通过计算属性安全提取数据，防止空对象报错
const userInfo = computed(() => props.dataInfo?.userInfo || {})
const goodsList = computed(() => props.dataInfo?.goodsList || [])
const totalCount = computed(() => props.dataInfo?.totalCount || 0)
const totalPrice = computed(() => props.dataInfo?.totalPrice || '0.00')
const currency = computed(() => props.dataInfo?.currency || 'RM')

// 基于提取后的数据进行逻辑判断
const isEmpty = computed(() => !goodsList.value || goodsList.value.length === 0)
const hasMore = computed(() => goodsList.value && goodsList.value.length > 3)
const displayGoods = computed(() => goodsList.value ? goodsList.value.slice(0, 3) : [])
</script>

<style lang="scss" scoped>
/* =========== CSS 样式保持完全一致，没有任何改动 =========== */
.record-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;

  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 20rpx;
    flex-shrink: 0;
    background-color: #f5f5f5;
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .name-row {
    display: flex;
    align-items: center;
    margin-bottom: 6rpx;
  }

  .name {
    font-size: 28rpx;
    font-weight: 500;
    color: #111111;
    margin-right: 12rpx;
  }

  .level-badge {
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #e0e8ff, #c2d6ff);
    padding: 2rpx 10rpx;
    border-radius: 6rpx;

    .level-icon {
      font-size: 20rpx;
      color: #7b94d4;
      font-weight: bold;
      margin-right: 4rpx;
      font-style: italic;
    }

    .level-num {
      font-size: 22rpx;
      color: #3b5998;
      font-weight: bold;
    }
  }

  .time {
    font-size: 24rpx;
    color: #888888;
  }
}

.goods-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
  width: 100%;
  margin-bottom: 24rpx;

  .goods-item {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12rpx;
    overflow: hidden;
    background-color: #f9f9f9;
  }

  .goods-img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .badge-top-left {
    position: absolute;
    top: 0;
    left: 0;
    padding: 4rpx 10rpx;
    border-radius: 12rpx 0 12rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &.badge-lightning {
      background: linear-gradient(135deg, #4da6ff, #0066ff);
    }

    &.badge-c {
      background: linear-gradient(135deg, #4dd2ff, #00aaff);
    }

    .badge-text {
      font-size: 20rpx;
      color: #fff;
    }
  }

  .badge-bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 0 12rpx;
    border-radius: 8rpx 0 8rpx 0;
    height: 30rpx;
    font-size: 18rpx;
    line-height: 30rpx;
    color: #ffffff;
    font-weight: 500;

  }

  .more-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;

    .more-text {
      font-size: 36rpx;
      color: #ffffff;
      font-weight: bold;
    }

    .more-label {
      font-size: 22rpx;
      color: #ffffff;
      margin-top: 4rpx;
    }
  }
}

.card-footer {
  display: flex;
  align-items: baseline;

  .total-text {
    font-size: 26rpx;
    color: #666666;
    margin-right: 8rpx;
  }

  .total-price {
    font-size: 28rpx;
    font-weight: bold;
    color: #ff1512;
  }
}

.skeleton-anim {
  background-color: #f0f2f5;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
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

.avatar-skeleton {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.name-skeleton {
  width: 40%;
  height: 28rpx;
  border-radius: 6rpx;
  margin-bottom: 12rpx;
}

.time-skeleton {
  width: 60%;
  height: 24rpx;
  border-radius: 6rpx;
}

.goods-item-skeleton {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12rpx;
}

.total-skeleton {
  width: 40%;
  height: 28rpx;
  border-radius: 6rpx;
}
</style>