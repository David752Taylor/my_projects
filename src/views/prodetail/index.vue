<template>
  <div class="prodetail">

    <van-nav-bar title="商 品 详 情" left-text="返回" left-arrow @click-left="$router.go(-1)" fixed placeholder/>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="image in images" :key="image.file_id">
        <img v-lazy="image.external_url" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{images.length}}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{detail.goods_price_min}}</span>
          <span class="oldprice">￥{{detail.goods_price_max}}</span>
        </div>
        <div class="sellcount">已售{{detail.goods_sales}}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{detail.goods_name}}
      </div>
      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{total}}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /></div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url||defaultImg" alt="">
            <div class="name">{{item.user.nick_name}}</div>
            <van-rate :value="item.score/2" :size="16"/>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="time">{{item.create_time}}</div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="tips">商品描述</div>
    <div class="desc" v-html="detail.content"></div>

    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot to="/service"/>
      <van-goods-action-icon icon="cart-o" text="购物车"  :badge="cartTotal?cartTotal:''" to="/cart"/>
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" to="/shop"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addFn"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buyNow"/>
    </van-goods-action>

    <!-- 动作面板 -->
    <van-action-sheet v-model="showPanel" :title="mode==='cart'?'加入购物车':'立刻购买'">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>￥</span>
              <span class="nowprice">{{ detail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存：</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <CountBox v-model="addCount"></CountBox>
          <!-- <van-stepper v-model="addCount" /> -->
        </div>
        <div class="showbtn" v-if="detail.stock_total">
          <div class="btn" v-if="mode==='cart'" @click="addCart">加入购物车</div>
          <div class="btn now" v-else @click="goPay">立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { getProdetail, getProComments, getProCartTotal } from '@/api/product'
import { addCart } from '@/api/cart'
import defaultImg from '@/assets/default-avatar.png'
import loginConfirm from '@/mixins/loginConfirm'

export default {
  name: 'ProDetailIndex',
  components: {
    CountBox
  },
  mixins: [loginConfirm],
  data () {
    return {
      images: [], // 轮播图图片
      current: 0, // 轮播图当前页
      detail: {}, // 商品详情
      total: 0, // 评价总数
      commentList: [], // 评论详情
      defaultImg, // 默认用户头像
      showPanel: false, // 弹层显示隐藏
      mode: 'cart', // 弹层类型
      addCount: 1, // 添加数量
      cartTotal: 0 // 购物车角标
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    addFn () {
      this.mode = 'cart'
      this.showPanel = true
    },
    buyNow () {
      this.mode = 'buyNow'
      this.showPanel = true
    },
    goPay () {
      if (this.loginConfirm()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsSkuId: this.detail.skuList[0].goods_sku_id,
          goodsNum: this.addCount
        }
      })
    },
    async addCart () {
      if (this.loginConfirm()) {
        return
      }
      const res = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      console.log(res)
      const { data } = res
      this.cartTotal = data.cartTotal
      this.showPanel = false
      this.$toast('加入购物车成功')
    },
    async getDetail () {
      const res = await getProdetail(this.goodsId)
      console.log(3)
      console.log(res)
      const { data: { detail } } = res
      this.detail = detail
      this.images = detail.goods_images
    },
    async getComments () {
      const res = await getProComments(this.goodsId, 3)
      console.log(6)
      console.log(res)
      const { data: { list, total } } = res
      this.commentList = list
      this.total = total
    },
    async getCartTotal () {
      const res = await getProCartTotal()
      console.log(4)
      console.log(res)
      const { data: { cartTotal } } = res
      this.cartTotal = cartTotal
    }
  },
  created () {
    this.getDetail()
    this.getComments()
    this.getCartTotal()
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  position: relative;
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 15px;
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }

  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    padding: 0 10px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .content{
      font-size: 15px;
      color:#333;
      padding: 0 15px 0 5px;
      display: -webkit-box;          /* 必需：旧版 WebKit 内核支持 */
      -webkit-line-clamp: 2;         /* 限制显示行数 */
      -webkit-box-orient: vertical;  /* 指定垂直方向排列 */
      overflow: hidden;              /* 隐藏超出部分 */
      text-overflow: ellipsis;       /* 超出时显示省略号 */
      word-break: break-all;         /* 强制长单词换行（可选） */
    }
    .time {
      color: #999;
    }
  }
  .tips {
  padding: 10px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
}

.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}

</style>
