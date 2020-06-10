<template>
  <view class="u-p-24">
    <view style="min-height: 50vh;">
      <view class="u-flex">
        <image :src="data.src"></image>
        <view class="price u-m-l-24">￥ {{ data.price }}</view>
      </view>
      <view>
        <view class="u-m-b-24 u-m-t-24">颜色</view>
        <view>
          <u-tag
            v-for="(item, index) in data.color"
            :key="index"
            :text="item.text"
            :type="item.checked ? 'warning' : 'info'"
            :mode="item.checked ? 'dark' : 'light'"
            shape="circle"
            class="u-m-r-16"
            :closeable="false"
          />
        </view>
        <view class="u-m-b-24  u-m-t-24">尺寸</view>
        <view>
          <u-tag
            v-for="(item, index) in data.size"
            :key="index"
            :text="item.text"
            :type="item.checked ? 'warning' : 'info'"
            :mode="item.checked ? 'dark' : 'light'"
            shape="circle"
            class="u-m-r-16"
            :closeable="false"
          />
        </view>
        <view class="u-m-b-24  u-m-t-24">服务</view>
        <view>
          <u-tag
            v-for="(item, index) in data.server"
            :key="index"
            :text="item.text"
            :type="item.checked ? 'warning' : 'info'"
            :mode="item.checked ? 'dark' : 'light'"
            shape="circle"
            class="u-m-r-16"
            :closeable="false"
          />
        </view>
      </view>
    </view>
    <u-button type="warning">确定</u-button>
  </view>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {};
  }
};
</script>

<style>
image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 10rpx;
}
</style>
