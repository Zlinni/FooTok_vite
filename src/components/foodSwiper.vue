<template>
  <el-carousel arrow="never" :pause-on-hover="true" v-if="foodMsg.length">
    <div class="pagin">
      <span><a id="change" @click="getfood">换一些</a></span>
    </div>
    <el-carousel-item v-for="item in foodMsg" :key="item.id">
      <img v-lazy="item.foodbigimg" alt="" />
      <div class="cover">
        <div class="foodbox">
          <span id="food_name" class="food_name">{{ item.foodname }}</span>
          <div class="thumb">
            <div class="zanbox" @click.stop="zan(item.id)">
              <img
                src="../assets/img/index/点赞带框.png"
                alt=""
                id="zan"
                class="zan"
              />
              <p class="countthumb">
                {{ item.likenum }}
              </p>
            </div>
            <div class="heartbox" @click.stop="collect(item.id)">
              <img :src="item.iscollect?iscollect:nocollect" alt="" id="heart" />
            </div>
          </div>
        </div>
        <span id="introbox">
          <p id="food_intro" class="food_intro">{{ item.introduce }}</p>
        </span>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { nextTick, onMounted, reactive, toRefs, ref } from "vue";
import axiosFoodMsg from "../hook/axiosFoodMsg";
import getAssetsImages from "../hook/getAssetsImages";
import axios from "axios";
export default {
  setup() {
    let foodMsgObj = reactive({
      foodMsg: [],
    });
    let wordObj = {
      0: "壹",
      1: "贰",
      2: "叁",
      3: "肆",
      4: "伍",
    };
    //初始化并请求图片
    var getfood = () => {
      foodMsgObj.foodMsg = [];
      axiosFoodMsg()
        .then((res) => {
          foodMsgObj.foodMsg = res;
        }) //初始化走马灯文字
        .then(() => {
          let btn = document.getElementsByClassName("el-carousel__button");
          for (let i = 0; i < btn.length; i++) {
            btn[i].innerText = wordObj[i];
          }
        });
    };
    getfood();
    var updateLikeTime = null;
    var likeInit;
    var zan = (id) => {
      let arr = foodMsgObj.foodMsg.filter((item) => {
        return item.id === id;
      })[0];
      //如果是第一次 那么记录初始点赞状态
      if (!arr.zanfirstClick) {
        likeInit = arr.islike;
        arr.zanfirstClick = true;
      }
      //点赞和取消点赞
      if (!arr.islike) {
        arr.likenum++;
        arr.islike = 1;
        clearTimeout(updateLikeTime);
      } else {
        arr.likenum--;
        arr.islike = 0;
        clearTimeout(updateLikeTime);
      }
      //如果最后一次操作和初始状态不一样 才设置定时器发送请求
      if (likeInit !== arr.islike) {
        updateLikeTime = setTimeout(() => {
          let updateData = {
            userid: sessionStorage.getItem("sid"),
            id: id,
            islike: arr.islike,
          };
          axios.post("/api/updatelike", updateData).then((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log("点赞转换成功");
            }
          });
        }, 3000);
      }
    };

    let collectImg = reactive({
      iscollect:getAssetsImages("index", "喜欢-点击.png"),
      nocollect:getAssetsImages("index", "喜欢-空白.png"),
    })
    var updateCollectTime = null;
    var collectInit;
    var collect = (id) => {
      let arr = foodMsgObj.foodMsg.filter((item) => {
        return item.id === id;
      })[0];
      //如果是第一次 那么记录初始收藏状态
      if (!arr.collectfirstClick) {
        collectInit = arr.iscollect;
        arr.collectfirstClick = true;
      }
      //点赞和取消点赞
      if (!arr.iscollect) {
        arr.iscollect = 1;
        clearTimeout(updateCollectTime);
      } else {
        arr.iscollect = 0;
        clearTimeout(updateCollectTime);
      }
      //如果最后一次操作和初始状态不一样 才设置定时器发送请求
      if (collectInit !== arr.iscollect) {
        updateCollectTime = setTimeout(() => {
          let updateData = {
            userid: sessionStorage.getItem("sid"),
            id: id,
            iscollect: arr.iscollect,
          };
          axios.post("/api/updatecollect", updateData).then((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log(id+"收藏转换成功");
            }
          });
        }, 3000);
      }
    };
    return {
      ...toRefs(foodMsgObj),
      ...toRefs(collectImg),
      getfood,
      zan,
      collect,
    };
  },
};
</script>

<style lang='less'>
.el-carousel {
  width: 100%;
  height: 100%;
  .is-active {
    background-color: transparent;
  }
  .el-carousel__container {
    height: 100% !important;
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
    img {
      width: 100%;
      height: 100%;
    }
    .cover {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(-153%, -45%);
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      width: 36%;
      .foodbox {
        display: flex;
        width: 100%;
        #food_name {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 380px;
          padding: 9px;
          font-size: 75px;
          letter-spacing: 10px;
          line-height: 72px;
          color: #fff;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 10px;
          cursor: default;
          white-space: nowrap;
        }
        .thumb {
          position: absolute;
          width: 45%;
          left: 68%;
          display: flex;
          align-self: end;
          margin-left: 2%;
          .zanbox {
            position: relative;
            width: 45%;
            #zan {
              width: 100%;
            }
            .countthumb {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-15%, -50%);
              font-size: 20px;
            }
          }
          .heartbox {
            width: 20%;
            margin-left: 2%;
            #heart {
              width: 100%;
            }
          }
        }
      }

      #introbox {
        width: 100%;
        height: 125px;
        padding: 5px;
        margin-top: 9px;
        color: #f1f2f6;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 10px;
        text-decoration: underline;
        cursor: default;
        overflow: hidden;
        #food_intro {
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4; /* 限制在一个块元素显示的文本的行数 */
          -webkit-box-orient: vertical; /* 垂直排列 */
          word-break: break-all; /* 内容自动换行 */
          font-size: 23px;
        }
      }
    }
  }

  .el-carousel__indicators--horizontal {
    left: unset !important;
    bottom: 0 !important;
    right: 0 !important;
    transform: translate(-63%, -495%);
    .is-active {
      background-color: red !important;
    }
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
}
</style>