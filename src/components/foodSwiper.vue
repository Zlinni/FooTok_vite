<template>
  <el-carousel arrow="never">
    <div class="pagin">
      <span><a id="change">换一些</a></span>
    </div>
    <el-carousel-item v-for="item in imgUrl" :key="item">
      <img :src="item.slider" alt="" />
      <div class="cover">
        <span id="food_name" class="food_name">黄焖鸡</span>
        <span id="introbox">
          <p id="food_intro" class="food_intro"></p>
        </span>
      </div>
      <div class="thumb_box">
        <div class="thumb">
          <div class="demo"></div>
          <img src="./img/index/点赞.png" alt="" id="zan" class="zan" />
        </div>
        <span class="word_countthumb">
          <p id="countthumb" class="countthumb"></p>
        </span>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { nextTick, reactive, toRefs } from "vue";
import getAssetsImages from "../hook/getAssetsImages";

export default {
  setup() {
    let imgUrl = [
      { slider: getAssetsImages("slide", "1.jpg") },
      { slider: getAssetsImages("slide", "2.png") },
      { slider: getAssetsImages("slide", "3.jpg") },
      { slider: getAssetsImages("slide", "4.jpg") },
      { slider: getAssetsImages("slide", "5.jpg") },
    ];
    nextTick(() => {
      function btnText() {
        let wordObj = {
          0: "壹",
          1: "贰",
          2: "叁",
          3: "肆",
          4: "伍",
        };
        let btn = document.getElementsByClassName("el-carousel__button");
        for (let i = 0; i < btn.length; i++) {
          btn[i].innerText = wordObj[i];
        }
      }
      btnText();
    });
    return {
      imgUrl,
    };
  },
};
</script>

<style lang='less'>
.el-carousel {
  width: 100%;
  height: 100%;
  .el-carousel__container {
    height: 100% !important;
    img {
      width: 100%;
      height: 100%;
    }
    .cover {
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translate(20%, -60%);
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      width: 36%;
      height: 22%;
      .heart {
        position: relative;
        top: 24%;
        float: left;
        width: 9%;
      }
      #collectionimg {
        width: 100%;
      }
      #food_name {
        padding: 9px;
        margin: 9px;
        font-size: 75px;
        letter-spacing: 10px;
        line-height: 72px;
        color: #fff;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 10px;
        cursor: default;
      }
      #introbox {
        width: 100%;
        height: 125px;
        padding: 5px;
        margin: 9px;
        color: #f1f2f6;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 10px;
        text-decoration: underline;
        cursor: default;
        overflow: hidden;
        #food_intro {
          font-size: 23px;
        }
      }
    }
    .pagin {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(-38%, -105%);
      display: flex;
      justify-content: center;
      z-index: 10;
      width: 250px;
      height: 90px;
      background: url(../assets/img/index/换一些框.png) no-repeat;
      background-size: cover;
      span a {
        font-size: 48px;
        line-height: 90px;
        color: #f1f2f6;
        cursor: pointer;
      }
    }
  }
  .el-carousel__indicators--horizontal {
    left: unset !important;
    bottom: 0 !important;
    right: 0 !important;
    transform: translate(-63%,-495%);
  }
  li.el-carousel__indicator.el-carousel__indicator--horizontal {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--swiperBtnBg-color);
    .el-carousel__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: transparent;
      margin: 0;
      opacity: 1;
      font-size: 20px;
      font-weight: 700;
      color: var(--swiperText-color);
    }
  }
  .is-active {
    background-color: red !important;
  }
}
</style>