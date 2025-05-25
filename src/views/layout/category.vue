<template>
  <div class="category">
    <!-- 分类 -->
    <van-nav-bar title="商 品 分 类" fixed/>
    <!-- 搜索 -->
    <van-search placeholder="请输入搜索关键词" shape="round" readonly @click="$router.push('/search')" background="#f1f1f2"/>

    <div class="list-box">
      <div class="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item :title="item.name" v-for="(item, index) in list" :key="item.    category_id" @click="activeKey=index"/>
        </van-sidebar>
      </div>
      <div class="right">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="item in list[activeKey]?.children" :key="item.category_id" :text="item.name" :to="`/searchlist?categoryId=${item.category_id}`" >
            <template #icon>
              <van-image :src="item.image?.external_url" width="75" height="75">
                <template v-slot:loading>
                  <van-loading type="spinner" size="40" />
                </template>
              </van-image>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

  </div>
</template>

<script>
import { getCategoryData } from '@/api/category'

export default {
  name: 'CategoryPage',
  data () {
    return {
      list: [],
      activeKey: 0
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      const res = await getCategoryData()
      console.log(res)
      const { data: { list } } = res
      this.list = list
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.category {
  // 导航条样式定制
  padding-top: 100px;
  padding-bottom: 50px;
  height: 100vh;
  overflow: hidden; /* 禁止全局滚动 */
  position: fixed;  /* 防止软键盘弹出带动整个页面 */
  // touch-action: none; /* 禁止手势回弹 */
  // overscroll-behavior: none; /* 禁止滚动穿透和回弹 */
  .list-box {
    height: 100%;
    display: flex;
    .left {
      background-color: #f3f3f3;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      ::-webkit-scrollbar {
      display: none;
      }
      scrollbar-width: none;
      -ms-overflow-style: none;
      .van-sidebar-item--select::before {
          display: none;
      }
      .van-sidebar-item {
        color: #444444;
        background-color: #f3f3f3;
      }
      .van-sidebar-item--select {
        color: #fb442f;
        background-color: #fff;
      }
    }
    .right {
      flex: 1;
      height: 100%;
      padding: 10px 0;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      scrollbar-width: none;
      -ms-overflow-style: none;
      .van-grid-item{
        margin-bottom: 10px;
        ::v-deep .van-image__img {
          display: block;
          margin: 5px auto;
          border-radius: 8px;
        }
      }
    }
  }
}

// 导航条样式定制
.van-nav-bar {
  z-index: 2;
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 2;
}
</style>
