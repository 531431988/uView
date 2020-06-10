<template>
  <view class="wrap">
  <u-swiper :list="list" :title="true" :height="400" mode="none"></u-swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  onLoad() {
    this.$u.get('home/swiper').then(res => {
      this.list = res
    })
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>