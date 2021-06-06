<template>
  <div id="home">
    <!-- 轮播图 -->
    <Swiper :banners="navData[0]"/>

    <!-- 分类 -->
    <home-category :cate-info="navData[1]"/>

    <!-- 广告 -->
    <home-advert :advert="navData[2]"/>

    <!-- 分类精选 -->
    <home-recommend/>

    <!-- 产品 -->
    <home-products :products="products"/>
  </div>
</template>

<script>
  import Swiper from '@/components/customCpns/swiper/Swiper'

  import HomeCategory from './childCpns/HomeCategory'
  import HomeAdvert from './childCpns/HomeAdvert'
  import HomeRecommend from './childCpns/HomeRecommend'
  import HomeProducts from './childCpns/HomeProducts'

  import { getNavData, getProducts } from "@/service/home";


  export default {
    name: "Home",
    components: {
      Swiper,
      HomeCategory,
      HomeAdvert,
      HomeRecommend,
      HomeProducts
    },
    data() {
      return {
        navData: [],
        products: []
      }
    },
    onLoad() {
      // 获取轮播图、广告相关数据
      this._getNavData()

      // 获取产品数据
      this._getProducts()
    },
    methods: {
      _getNavData() {
        getNavData({
            nav_type: [0, 1, 2]
          }, "post")
          .then(res => {
            this.navData = res.data.data
        });
      },
      _getProducts() {
        getProducts().then(res => {
          this.products = res.data.data.home_recommend_products
          console.log(this.products);
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>