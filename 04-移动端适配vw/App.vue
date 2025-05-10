<template>
  <div id="app">
    <router-view/>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-switch v-model="checked" />
    <van-rate v-model="value" />
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 3,
      checked: true
    }
  }
}
</script>

<style lang="less">
.box{
  width: 300px;
  height: 300px;
  background-color: pink;
}
</style>
