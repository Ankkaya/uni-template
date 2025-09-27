<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title text-primary">{{ title }}</text>
      <u-button type="primary">按钮</u-button>
      <u-input />

    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
definePage({
  style: {
    navigationBarTitleText: 'Hello'
  }
})
const title = ref('Hello')
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: $uni-color-error;
}
</style>
