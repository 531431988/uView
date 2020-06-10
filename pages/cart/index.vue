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
        <view class="u-m-r-24" style="color: #fff" @click="onEdit">{{ isEdit ? '完成' : '编辑' }}</view>
        <!-- <u-icon name="more-dot-fill" color="#ffffff" size="38"></u-icon> -->
      </view>
    </u-navbar>
    <view class="cart">
      <scroll-view
        scroll-y
        style="height: 100%;width: 100%;"
        :refresher-threshold="80"
        :refresher-enabled="enabled"
        :refresher-triggered="triggered"
        @refresherrefresh="onRefresh"
        v-if="cartList.length"
      >
        <u-swipe-action
          bg-color="transparent"
          :show="item.show"
          @click="onDel"
          @open="onSwipeOpen"
          :options="options"
          :index="index"
          v-for="(item, index) in cartList"
          :key="item.id"
        >
          <view class="card u-flex u-m-b-24">
            <u-icon
              :name="item.checked ? 'checkbox-fill' : 'checkbox'"
              custom-prefix="icon"
              size="48"
              :color="item.checked ? '#fa3534' : '#909399'"
              @click="onCheck(index)"
            ></u-icon>
            <view class="u-m-l-24 u-m-r-24" @click="onOpenPage(item.id)"><image :src="item.url" mode="aspectFill"></image></view>
            <view>
              <view class="title u-line-2" @click="onOpenPage(item.id)">{{ item.title }}</view>
              <view class="type">
                <u-tag
                  @click="onChangeType(item.id)"
                  :text="item.type"
                  mode="plain"
                  type="info"
                  shape="circle"
                  size="mini"
                  bg-color="#f3f4f6"
                  border-color="#f2f6fc"
                  color="#606266"
                  :closeable="false"
                />
              </view>
              <view class="u-flex u-row-between">
                <view class="price">￥ {{ item.price }}</view>
                <view class="number"><u-number-box :value="item.number" @change="onNumChange($event, index)"></u-number-box></view>
              </view>
            </view>
          </view>
        </u-swipe-action>
      </scroll-view>
      <u-empty v-else text="购物车为空" mode="car"></u-empty>
    </view>

    <u-popup v-model="show" mode="bottom"><ParamsPopup :data="goodsParams" /></u-popup>
    <SubmitBar v-if="cartList.length" v-model="checkAll" :edit="isEdit" :total="total" :number="goodsNumber" @click="onCheckAll" @on-del="onDelMultiple" />
  </view>
</template>

<script>
import { numAdd } from '@/common/libs.js';
import ParamsPopup from './components/ParamsPopup';
import SubmitBar from './components/SubmitBar';
export default {
  components: {
    ParamsPopup,
    SubmitBar
  },
  data() {
    return {
      enabled: true,
      triggered: false,
      cartList: [],
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ],
      isEdit: false,
      show: false,
      checkAll: false,
      goodsParams: {},
      goodsNumber: 0,
      total: 0
    };
  },
  onShow() {
    this.onLoadData();
    this.isEdit = false;
  },
  methods: {
    // 加载数据
    onLoadData() {
      if (!this.enabled) return;
      this.triggered = true;
      this.$u.post('cart/list').then(res => {
        this.cartList = res.map(item => ({
          ...item,
          show: false,
          checked: false
        }));
        this.triggered = false;
      });
    },
    // 编辑
    onEdit() {
      this.cartList = this.cartList.map(item => ({
        ...item,
        checked: false
      }));
      this.checkAll = false;
      this.total = 0;
      this.goodsNumber = 0;
      this.isEdit = !this.isEdit;
      this.enabled = !this.isEdit;
    },
    // 删除多条商品
    onDelMultiple() {
      this.cartList = this.cartList.filter(item => !item.checked);
      this.checkAll = false;
      this.updateNumberMoney();
    },
    // 滑动删除商品
    onDel(index) {
      this.cartList.splice(index, 1);
      this.$u.toast('删除成功');
    },
    // 数量改变
    onNumChange(e, i) {
      this.cartList[i].number = e.value;
      this.updateNumberMoney();
    },
    // 单选
    onCheck(index) {
      this.cartList[index].checked = !this.cartList[index].checked;
      let checklist = this.cartList.filter(item => item.checked);
      this.checkAll = checklist.length === this.cartList.length;
      this.updateNumberMoney();
    },
    // 全选
    onCheckAll() {
      this.checkAll = !this.checkAll;
      this.cartList = this.cartList.map(item => ({
        ...item,
        checked: this.checkAll
      }));
      let checklist = this.cartList.filter(item => item.checked);
      this.updateNumberMoney();
    },
    // 更新数量与金额
    updateNumberMoney() {
      let checklist = this.cartList.filter(item => item.checked);
      this.total = 0;
      this.goodsNumber = checklist.length;
      checklist.forEach(item => {
        this.total = numAdd(this.total, item.price * item.number);
      });
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
    onChangeType(id) {
      this.show = true;
      this.$u.post('goods/params').then(res => {
        this.goodsParams = res;
      });
    },
    // 跳转详情
    onOpenPage(id) {
      this.$u.route({
        url: '/pages/cart/detail'
      });
    },
    onRefresh() {
      this.onLoadData();
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
  image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
  }
}
.price {
  color: $u-type-warning;
}
</style>
