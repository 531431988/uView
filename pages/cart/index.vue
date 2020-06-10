<template>
  <view>
    <u-navbar
      :is-back="false"
      title="购物车"
      title-color="#fff"
      :background="{
        'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
      }"
    >
      <view class="u-flex u-padding-24" slot="right">
        <view class="u-m-r-24" style="color: #fff">编辑</view>
        <u-icon name="more-dot-fill" color="#ffffff" size="38"></u-icon>
      </view>
    </u-navbar>
    <view class="cart">
      <scroll-view scroll-y style="height: 100%;width: 100%;">
        <u-swipe-action bg-color="transparent" :show="item.show" @click="onDel" @open="onSwipeOpen" :options="options" :index="index" v-for="(item, index) in cartList" :key="item.id">
          <view class="card u-flex u-m-b-24">
            <view class="u-m-r-24" @click="onOpenPage(item.id)">
              <image :src="item.url" mode="aspectFill"></image>
            </view>
            <view>
              <view class="title u-line-2" @click="onOpenPage(item.id)">{{ item.title }}</view>
              <view class="type">
              <u-tag @click="onChangeType(item.id)" :text="item.type" mode="plain" type="info" shape="circle" size="mini" bg-color="#f3f4f6" border-color="#f2f6fc" color="#606266" :closeable="false" />
              </view>
              <view class="u-flex u-row-between">
                <view class="price">
                  ￥{{ priceInt(item.price) }}
                  <text>.{{ priceDecimal(item.price) }}</text>
                </view>
                <view class="number"><u-number-box :value="item.number"></u-number-box></view>
              </view>
            </view>
          </view>
        </u-swipe-action>
      </scroll-view>
      <u-popup v-model="show" mode="bottom">
        <view  class="u-p-24">
        <view style="min-height: 50vh;">
            <view class="u-flex">
              <image :src="goodsParams.src"></image>
             <view class="price u-m-l-24">
               ￥ {{goodsParams.price}}
              </view>
            </view>
            <view>
              <view class="u-m-b-24 u-m-t-24">颜色</view>
              <view>
                <u-tag v-for="(item, index) in goodsParams.color" :key="index" :text="item.text" :type="item.checked ? 'warning' : 'info'"  :mode="item.checked ? 'dark' : 'light'" shape="circle"  class="u-m-r-16" :closeable="false" />
              </view>
              <view class="u-m-b-24  u-m-t-24">尺寸</view>
              <view>
                <u-tag v-for="(item, index) in goodsParams.size" :key="index" :text="item.text" :type="item.checked ? 'warning' : 'info'" :mode="item.checked ? 'dark' : 'light'" shape="circle"  class="u-m-r-16" :closeable="false" />
              </view>
              <view class="u-m-b-24  u-m-t-24">服务</view>
              <view>
                <u-tag v-for="(item, index) in goodsParams.server" :key="index" :text="item.text" :type="item.checked ? 'warning' : 'info'" :mode="item.checked ? 'dark' : 'light'" shape="circle"  class="u-m-r-16" :closeable="false" />
              </view>
            </view>
        </view>
            <u-button type="warning">确定</u-button>
        </view>
      </u-popup>
    </view>

    <view class="u-flex u-row-between  navigation">
      <view class="u-flex-1">
        <u-checkbox-group><u-checkbox v-model="checkAll" name="all">全选</u-checkbox></u-checkbox-group>
        合计：
      </view>
      <u-button type="error" size="medium">去结算</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
      options: [{
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }],
      goodsParams: {},
      show: false,
      checkAll: false
    };
  },
  onLoad() {
    this.$u.post('cart/list').then(res => {
      this.cartList = res.map(item => ({
        ...item,
        show: false
      }));
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
    // 删除商品
    onDel(index, index1) {
      if (index1 == 1) {
        this.cartList.splice(index, 1);
        this.$u.toast(`删除了第${index}个cell`);
      } else {
        this.cartList[index].show = false;
        this.$u.toast(`收藏成功`);
      }
    },
    // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
    onSwipeOpen(index) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.cartList[index].show = true;
      this.cartList.map((val, idx) => {
        if (index != idx) this.cartList[idx].show = false;
      });
    },
    // 切换类型
    onChangeType (id) {
      this.show = true
      this.$u.post('goods/params').then(res => {
        this.goodsParams = res
      })
    },
    // 跳转详情
    onOpenPage(id){
      this.$u.route({
        url: '/pages/cart/detail'
      })
    },
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
  height: calc(100vh - var(--window-top) - var(--window-bottom) - 85px);
  width: 100%;
  overflow: hidden;
  .card {
    box-sizing: border-box;
    background: #fff;
    padding: 30rpx;
    .title {
      font-size: 28rpx;
      line-height: 50rpx;
    }
    .type {
      margin: 10rpx 0;
      font-size: 24rpx;
      color: $u-tips-color;
    }
    
    .number {
      color: $u-tips-color;
      font-size: 24rpx;
    }
  }
  .price {
    color: $u-type-warning;
  }
  image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
  }
}
.navigation {
  background-color: #ffffff;
  padding: 16rpx;
}
</style>
