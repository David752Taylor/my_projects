<template>
  <div class="address">
    <van-nav-bar title="收 货 地 址" left-text="返回" left-arrow @click-left="$router.go(-1)" fixed placeholder/>

    <div class="address-list">
      <div class="address-item">
        <div class="top">
          <div class="info">
            <span class="name">测试1号</span>
            <span class="phone">15712083776</span>
          </div>
          <div class="address">
            河南省 洛阳市 洛龙区 龙门
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <van-checkbox checked-color="#ee0a24" v-model="isChecked" icon-size="16px">默认</van-checkbox>
          </div>
          <div class="right">
            <span class="edit">
              <van-icon name="edit"/>
              编辑
            </span>
            <span class="delete">
              <van-icon name="delete-o"/>
              删除
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressIndex',
  data () {
    return {
      isChecked: true
    }
  }
}
</script>

<style lang="less" scoped>
.address-list{
  .address-item{
    height: 110px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction:column;
    justify-content:space-between;
    .top{
      // margin: 10px;
      font-size: 15px;
      color: #333;
      div{
        padding: 5px ;
        .phone{
          padding: 5px;
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
</style>
