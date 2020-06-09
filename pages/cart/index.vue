<template>
  <view>
    <u-navbar
      :is-back="false"
      title="购物车"
      title-color="#fff"
      :background="{
        'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), #efca02)'
      }"
    >
      <view class="u-flex u-padding-24" slot="right">
        <view class="u-margin-right-24" style="color: #fff">编辑</view>
        <u-icon name="more-dot-fill"  color="#ffffff" size="38"></u-icon>
      </view>
    </u-navbar>
    <view class="cart">
      <scroll-view scroll-y style="height: 100%;width: 100%;">
        <view class="card" v-for="(res, index) in cartList" :key="res.id">
          <u-card margin="30rpx 0">
            <view slot="head" class="u-flex u-row-between hd">
              <view class="u-flex u-col-center">
                <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                <view class="store">{{ res.store }}</view>
                <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
              </view>
            </view>
            <view slot="body" class="item" :class="index > 0 ? 'u-margin-top-30' : ''" v-for="(item, index) in res.goodsList" :key="index">
              <view class="u-margin-right-20"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
              <view>
                <view class="title u-line-2">{{ item.title }}</view>
                <view class="type">{{ item.type }}</view>
                <view class="u-flex u-row-between">
                  <view class="price">
                    ￥{{ priceInt(item.price) }}
                    <text>.{{ priceDecimal(item.price) }}</text>
                  </view>
                  <view class="number"><u-number-box :value="item.number"></u-number-box></view>
                </view>
              </view>
            </view>
            <view class="total">
              共{{ totalNum(res.goodsList) }}件商品 合计:
              <text class="total-price">
                ￥{{ priceInt(totalPrice(res.goodsList)) }}.
                <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
              </text>
            </view>
          </u-card>
        </view>
      </scroll-view>
    </view>
    <view class="u-flex u-row-between  navigation">
      <view class="u-flex left">
        <u-checkbox-group><u-checkbox v-model="checkAll" name="all">全选</u-checkbox></u-checkbox-group>
        合计：
      </view>
      <view class="right"><view class="buy btn u-line-1">去结算</view></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
      dataList: [],
      checkAll: false
    };
  },
  onLoad() {
    this.$u.post('cart/list').then(res => {
      this.cartList = res;
    });
  },
  computed: {
    // 价格小数
    priceDecimal() {
      return val => {
        if (val !== parseInt(val)) return val.slice(-2);
        else return '00';
      };
    },
    // 价格整数
    priceInt() {
      return val => {
        if (val !== parseInt(val)) return val.split('.')[0];
        else return val;
      };
    }
  },
  methods: {
    // 总价
    totalPrice(item) {
      let price = 0;
      item.map(val => {
        price += parseFloat(val.price);
      });
      return price.toFixed(2);
    },
    // 总件数
    totalNum(item) {
      let num = 0;
      item.map(val => {
        num += val.number;
      });
      return num;
    }
  }
};
</script>

<style>
/* #ifndef H5 */
page {
  height: 100%;
  background-color: #f2f2f2;
  overflow: hidden;
}
/* #endif */
</style>

<style lang="scss" scoped>
.cart {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top) - var(--window-bottom) - 40px);
  width: 100%;
  overflow: hidden;
  .card {
    box-sizing: border-box;
    .hd {
      .store {
        margin: 0 10rpx;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    .item {
      display: flex;
      margin: 20rpx 0 0;
      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 10rpx;
      }
      .title {
        font-size: 28rpx;
        line-height: 50rpx;
      }
      .type {
        margin: 10rpx 0;
        font-size: 24rpx;
        color: $u-tips-color;
      }
      .price {
        color: $u-type-primary;
      }
      .number {
        color: $u-tips-color;
        font-size: 24rpx;
      }
    }
  }
}
.navigation {
  background-color: #ffffff;
  padding: 16rpx;
  .left {
    font-size: 20rpx;
    .item {
      margin: 0 30rpx;
      &.car {
        text-align: center;
        position: relative;
        .car-num {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
        }
      }
    }
  }
  .right {
    display: flex;
    font-size: 28rpx;
    align-items: center;
    .btn {
      line-height: 66rpx;
      padding: 0 30rpx;
      border-radius: 36rpx;
      color: #ffffff;
    }
    .buy {
      background-color: #ff7900;
    }
  }
}
</style>
