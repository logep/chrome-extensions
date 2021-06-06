<template>
  <div>
    <block v-for="(item, index) in products" :key="index">
      <view class="products-item">
        <view class="title">
          <text>{{item.title}}</text>
          <image src="@/static/img/home/rectangle.png" />
        </view>
        <scroll-view scroll-x>
          <view class="product">
            <block v-for="(pro, indey) in item.products" :key="indey">
              <view  class="product-item">
                <image :src="pro.image[0]" mode="widthFix" />
                <view class="product-info">{{pro.title}}</view>
                <view class="product-price"> ¥ {{pro.price}}</view>
              </view>
            </block>
          </view>
        </scroll-view>
      </view>
    </block>
  </div>
</template>

<script>
export default {
  name: "HomeProducts",
  props: {
    products: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .products-item {
    border-bottom: 20upx solid #f5f5f5;
    overflow: hidden;
    .title {
      display: flex;
      align-items: center;
      margin: 30upx;
      font-size: 38upx;
      letter-spacing: 12upx;
      image {
        width: 8upx;
        height: 30upx;
        margin-left: 10upx;
      }
    }
    .product {
      display: flex;
      .product-item {
        width: 35%;
        margin-left: 30upx;
        padding-right: 30upx;
        image {
          width: 100%;
          height: 242upx!important;
          margin-bottom: 20upx;
        }
        .product-info {
          width: 204upx;
          text-overflow: ellipsis;
          white-space: pre;
          overflow: hidden;
          font-size: 20upx;
          color: #555555;
        }
        .product-price {
          margin-top: 12upx;
          margin-bottom: 30upx;
          color: #fa265f;
          font-size: 20upx;
        }
      }
    }
  }
</style>