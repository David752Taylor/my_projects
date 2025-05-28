<template>
  <div class="address-all">
    <van-nav-bar title="收 货 地 址" left-text="返回" left-arrow @click-left="$router.go(-1)" fixed placeholder/>

    <div class="address-list">
      <van-radio-group v-model="adrId">
        <div class="address-item" v-for="(address,index) in AddressList"  :key="address.address_id">
        <div class="top">
          <div class="info">
            <span class="name">{{address.name}}</span>
            <span class="phone">{{ address.phone }}</span>
          </div>
          <div class="address">
            {{ address.region.province+' '+address.region.city+' '+address.region.region }}
          </div>
          <div class="detail">
            {{ address.detail }}
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <van-radio :name="index" checked-color="#ee0a24" icon-size="16px">
              <span v-show="index === adrId" style="color: red;">默认</span>
            </van-radio>
          </div>
          <div class="right">
            <span class="edit" @click="editAdr(address.address_id)">
              <van-icon name="edit"/>
              编辑
            </span>
            <span class="delete" @click="delAdr(address.address_id)">
              <van-icon name="delete-o"/>
              删除
            </span>
          </div>
        </div>
        </div>
      </van-radio-group>
    </div>

    <div class="add-address">
      <van-cell is-link @click="showPopup">
        <button class="add-btn"> <!--addAddress-->>
          <van-icon name="plus" />
          新增地址
        </button>
      </van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <!-- 输入任意文本 -->
        <van-field v-model="form.name" label="收货人" />
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field v-model="form.phone" type="tel" label="手机号" />
        <!-- 输入任意文本 -->
        <van-field v-model="form.value" label="省份" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddressIndex',
  data () {
    return {
      adrId: 0,
      show: false,
      form: {
        name: '',
        phone: '',
        region: {
          value: null,
          lable: ''
        }
      }
    }
  },
  computed: {
    ...mapState('address', ['AddressList'])
  },
  methods: {
    showPopup () {
      this.show = true
    },
    editAdr () {
      //
    },
    delAdr (id) {
      this.$dialog.confirm({
        title: '注意',
        message: '您确认要删除该地址吗？'
      }).then(() => {
        this.$store.dispatch('address/delAddressAction', { id })
        setTimeout(() => {
          this.$toast.success('删除成功')
        }, 2000)
      }).catch(() => {
        // on cancel
      })
    },
    addAddress () {

    }
  },
  created () {
    this.$store.dispatch('address/getAddressAction')
  }
}
</script>

<style lang="less" scoped>
.address-all{
  margin: 0 0 30px 0;
  .address-list{
    .address-item{
      height: 140px;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      flex-direction:column;
      justify-content:space-between;
      .top{
        font-size: 15px;
        color: #333;
        width: 100%; // 确保父容器有宽度
        overflow: hidden; // 防止内容撑开
        div{
          padding: 4px ;
          .phone{
            padding: 5px;
          }
          .name{
            display: inline-block;      // 必须设置为块级元素
            max-width: 200px;           // 限制最大宽度
            white-space: nowrap;        // 禁止换行
            overflow: hidden;           // 隐藏溢出部分
            text-overflow: ellipsis;    // 显示省略号
          }
        }
      }
      .bottom{
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        padding: 5px;
        .right {
          .edit{
            color: blue;
          }
          .delete{
            color: red;
          }
          span{
            padding: 0 5px;
          }
        }
      }
    }
  }
}
.info{
  display: flex;          // 启用 Flex 布局
  align-items: center;    // 垂直居中对齐
  gap: 8px;               // 可选：设置间距
}
.detail{
  max-width: 100%;           // 限制最大宽度
  white-space: nowrap;        // 禁止换行
  overflow: hidden;           // 隐藏溢出部分
  text-overflow: ellipsis;    // 显示省略号
}
.add-btn {
  width: 90%;
  margin: 10px auto;
  display: block;
  line-height: 25px;
  font-size: 16px;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  padding: 7px 0;
  text-align: center;
  background-color: #1989fa;
}
</style>
