<template>
  <div id="recommend">
    <view class="image-icon">
      <image src="@/static/img/home/circle.png" class="circle"/>
      <image src="@/static/img/home/diamond.png" class="diamond"/>
    </view>
    <view class="content">
      <view class="content-top">分类精选</view>
      <view class="content-bottom">Competitive Products For You</view>
    </view>
    <image src="@/static/img/home/r_arrow.png" class="arrow"/>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommend'
  }
</script>

<style lang="scss" scoped>
  #recommend {
    display: flex;
    align-items: center;
    padding: 0 33upx 0  56upx;
    border-top: 20upx solid #f5f5f5;
    border-bottom: 20upx solid #f5f5f5;
    .image-icon {
      width: 15%;
      position: relative;
      top: 32upx;
      .circle {
        width: 72upx;
        height: 72upx;
      }
      .diamond {
        position: relative;
        top: -66upx;
        left: 12upx;
        width: 48upx;
        height: 40upx;
      }
    }
    .content {
      flex: 1;
      font-size: 26upx;
      font-weight: 700;
      .content-bottom {
        color: #999;
        font-size: 16upx;
      }
    }
    .arrow {
      width: 10%;
      width: 24upx;
      height: 40upx;
    }
  }
</style>