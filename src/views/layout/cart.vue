<template>
  <div class="cart">
    <van-nav-bar title="购 物 车" left-text="返回" left-arrow @click-left="$router.go(-1)" fixed placeholder/>

    <div v-if="this.isLogin && cartList.length > 0">
      <!-- 购物车顶部 -->
      <div class="cart-title">
        <div class="all">共<i>{{ cartTotal }}</i>件商品</div>
        <div class="edit" @click="isEdit = !isEdit">
          <div class="change" v-if="isEdit">
            完成
          </div>
          <div class="buy" v-else>
            <van-icon name="edit" /> 编辑
          </div>
        </div>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list" v-for="cart in cartList" :key="cart.goods_id">
        <div class="cart-item">
          <van-checkbox :value="cart.isChecked" @click="toggleCheck(cart.goods_id)"></van-checkbox>
          <div class="show">
            <img :src="cart.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{cart.goods.goods_name}}</span>
            <span class="bottom">
              <div class="price">￥<span>{{cart.goods.goods_price_min*cart.goods_num}}</span></div>
              <CountBox :value="cart.goods_num" @input="(value)=>changeCount(value, cart.goods_id,cart.goods_sku_id)"></CountBox>
            </span>
          </div>
        </div>
      </div>

      <!-- 购物车底部 -->
      <div class="footer-fixed">
        <div class="all-check">
          <van-checkbox :value="isAllChecked" @click="toggleAllCheck">全选</van-checkbox>
        </div>
        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span>￥<i class="totalPrice">{{ selectPrice }}</i></span>
          </div>
          <div v-if="!isEdit" class="goPay" :class="{disabled: !selectCount}" @click="$router.push('/pay')">结算({{ selectCount }})</div>
          <div v-else class="delete" :class="{disabled: !selectCount}" @click="handleDel">删除</div>
        </div>
      </div>
    </div>

    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">您的购物车是空的, 快去逛逛吧</div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'cartIndex',
  components: {
    CountBox
  },
  data () {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selectCartList', 'selectCount', 'selectPrice', 'isAllChecked']),
    isLogin () {
      return this.$store.getters.token
    }
  },
  methods: {
    toggleCheck (goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    toggleAllCheck () {
      this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
    },
    changeCount (goodsNum, goodsId, goodsSkuId) {
      this.$store.dispatch('cart/changeCountAction', {
        goodsNum,
        goodsId,
        goodsSkuId
      })
    },
    async handleDel () {
      if (!this.selectCount) return
      await this.$store.dispatch('cart/delSelect')
      this.isEdit = false
    }
  },
  watch: {
    isEdit (value) {
      if (value) {
        this.$store.commit('cart/toggleAllCheck', false)
      } else {
        this.$store.commit('cart/toggleAllCheck', true)
      }
    }
  },
  created () {
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .change{
        color: #959595;
      }
      .buy{
        color: blue;
        .van-icon {
          font-size: 18px;
          vertical-align:bottom;
        }
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
      }
    }
  }

  .empty-cart {
    padding: 80px 30px;
    img {
      width: 140px;
      height: 92px;
      display: block;
      margin: 0 auto;
    }
    .tips {
      text-align: center;
      color: #666;
      margin: 30px;
    }
    .btn {
      width: 110px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background-color: #fa2c20;
      border-radius: 16px;
      color: #fff;
      display: block;
      margin: 0 auto;
    }
  }

  .footer-fixed {
    position: fixed;
    left: 0;
    bottom: 50px;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .all-check {
      display: flex;
      align-items: center;
      .van-checkbox {
        margin-right: 5px;
      }
    }

    .all-total {
      display: flex;
      line-height: 36px;
      .price {
        font-size: 14px;
        margin-right: 10px;
        .totalPrice {
          color: #fa2209;
          font-size: 18px;
          font-style: normal;
        }
      }

      .goPay, .delete {
        min-width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: #fa2f21;
        color: #fff;
        border-radius: 18px;
        &.disabled {
          background-color: #ff9779;
        }
      }
    }
  }
}
</style>
