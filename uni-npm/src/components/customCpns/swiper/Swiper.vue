<template>
  <swiper class="swiper"
      autoplay
      indicator-dots
      circular
      interval="3000">
  <swiper-item v-for="(item, index) in banners" 
                :key="index"
                class="swpier-item">
    <image :src="item.image" mode="widthFix"/>
  </swiper-item>
</swiper>
</template>

<script>
  export default {
    props: {
      banners: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .swiper {
    width: 690upx;
    margin: 30upx auto;
    .swpier-item {
      border-radius: 40upx;
      image {
        width: 100%;
      }
    }
  }
</style>