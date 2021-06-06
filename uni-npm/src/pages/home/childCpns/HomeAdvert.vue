<template>
    <div class="advert">
      <block v-for="(item, index) in advert" :key="index">
        <image :src="item.image" mode="widthFix"/>
      </block>
    </div>
</template>

<script>
  export default {
    name: 'HomeAdvert',
    props: {
      advert: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .advert {
    width: 646upx;
    margin: 46upx auto;
    image {
      width: 100%;
    }
  }
</style>