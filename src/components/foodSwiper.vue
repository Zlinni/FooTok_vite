<template>
  <el-carousel arrow="never" >
    <el-carousel-item v-for="item in imgUrl" :key="item">
      <img :src="item.slider" alt="" />
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
  }
  ul.el-carousel__indicators.el-carousel__indicators--horizontal {
    width: 30%;
    left: 90%;
    bottom: 20%;
  }
  li.el-carousel__indicator.el-carousel__indicator--horizontal {
    width:40px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--swiperBtnBg-color);
    .el-carousel__button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color:transparent;
        margin: 0;
        opacity: 1;
        font-size: 20px;
        font-weight: 700;
        color: var(--swiperText-color);
    }
  }
  .is-active{
      background-color: red !important;
  }
}
</style>