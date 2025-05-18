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
              <van-image :src="item.image?.external_url" width="75" height="75"/>
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
  .van-nav-bar {
    z-index: 2;
    background-color: #4fc08d;
    ::v-deep .van-nav-bar__title {
      color: #fff;
    }
  }
  .list-box {
    height: 100%;
    display: flex;
    .left {
      background-color: #f3f3f3;
      overflow: auto;
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
      overflow-y: auto;
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
