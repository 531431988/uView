<template>
  <view class="u-flex u-row-between navigation u-p-l-24 u-p-r-24 u-p-t-16 u-p-b-16">
    <view class=" u-flex-1">
      <view class="u-flex u-col-center u-row-between">
        <view class="u-flex u-col-center" @click="$emit('click')">
          <u-icon :name="value ? 'checkbox-fill' : 'checkbox'" custom-prefix="icon" size="48" :color="value ? '#fa3534' : '#909399'"></u-icon>
          <view class="u-m-l-8">全选</view>
        </view>
        <view class="u-m-r-24" v-if="!edit">
          合计：
          <text class="price u-m-r-5">{{ total }}</text>
          元
        </view>
      </view>
    </view>
    <u-button type="error" size="medium" v-if="edit" :disabled="!number" @click="show = true">删除 ({{ number }})</u-button>
    <u-button type="error" size="medium" v-else>去结算 ({{ number }})</u-button>
    
    <u-modal v-model="show" @confirm="$emit('on-del')" show-cancel-button content="你确定要删除？"></u-modal>
  </view>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      number: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      },
      edit: {
          type: Boolean,
          default: false
      }
    },
    data () {
      return {
        show: false
      }
    },
    methods:{
    }
  }
</script>

<style lang="scss">
  .navigation {
    background-color: #ffffff;
    .u-btn {
      padding: 0 18px;
    }
  }
</style>
