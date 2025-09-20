import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'uniapp-template',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    // 下拉窗口背景色
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    "autoscan": true,
    "custom": {
      "^u-(.*)": "@/uni_modules/uview-pro/components/u-$1/u-$1.vue"
    }
  }
})