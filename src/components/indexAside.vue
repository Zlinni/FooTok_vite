<template>
  <el-aside class="pre_box">
    <template v-if="isLeft">
      <div v-for="(n, index) in nav" :key="index" class="nav">
        <div class="linkBox">
          <router-link :to="n.link">{{ n.text }}</router-link
          ><img :src="n.imgUrl" alt="" />
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(n, index) in nav" :key="index">
        <img :src="n.imgUrl" alt="" />
      </div>
    </template>
  </el-aside>
</template>

<script>
import getAssetsImages from "../hook/getAssetsImages";
export default {
  props: {
    isLeft: {
      type: Boolean,
    },
  },
  setup(props) {
    //导航栏
    const nav = [
      {
        text: "首页",
        link: "/home/swiper",
        imgUrl: getAssetsImages("decoration", "蒸糕.png"),
      },
      {
        text: "美食分享",
        link: "/home/hotList",
        imgUrl: getAssetsImages("decoration", "米饭.png"),
      },
      {
        text: "美食目录",
        link: "/home/category",
        imgUrl: getAssetsImages("decoration", "鱼.png"),
      },
      {
        text: "美食地图",
        link: "/home/map",
        imgUrl: getAssetsImages("decoration", "面条.png"),
      },
      {
        text: "个人中心",
        link: "/home/personality",
        imgUrl: getAssetsImages("decoration", "豆角.png"),
      },
    ];
    let isLeft = props.isLeft;
    return {
      nav,
      isLeft,
    };
  },
};
</script>

<style lang='less' scoped>
.pre_box {
  margin-left: 0;
  width: 9%;
  height: 100%;
  background: var(--asideBg-color);
  overflow: visible;
  .nav,
  div {
    position: relative;
    z-index: 999;
    display: flex;
    width: 100%;
    height: 9vw;
    border-radius: 70px;
    background-color: var(--asideBg-color);
    .linkBox {
      display: flex;
      align-items: center;
      a {
        width: 100%;
        text-align: center;
        line-height: 100%;
        overflow: hidden;
        font-size: 50px;
        white-space: nowrap;
      }
      img {
        width: 100%;
      }
    }
  }
  @keyframes widthMove {
    from {
      width: 100%;
    }
    to {
      width: 400%;
    }
  }
  .nav:hover {
    animation: widthMove 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    width: 400%;
  }
  @keyframes imgmov {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  .nav:hover .linkBox img {
    width: 25%;
    animation: imgmov 1s linear;
  }
  .nav:hover .linkBox a {
    display: block;
    transition: all 2s;
  }
}
</style>