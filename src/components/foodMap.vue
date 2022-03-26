<template>
  <div class="map">
    <div class="word_area">
      <p>美食分布</p>
    </div>
    <div class="map_add"><img :src="mapAdd" alt="" /></div>
    <div class="map_box">
      <img :src="mainMap" alt="" usemap="#map" id="mainmap" />
      <map name="map" id="map">
        <area
          shape="poly"
          :coords="huanan1"
          class="huanan"
          @click.native="changeMap"
        />
        <area
          shape="poly"
          :coords="huanan2"
          class="huanan"
          @click.native="changeMap"
        />
        <area
          shape="poly"
          :coords="huanan3"
          class="huanan"
          @click.native="changeMap"
        />
        <area
          shape="poly"
          :coords="huabei"
          class="huabei"
          @click.native="changeMap"
        />
        <area
          shape="poly"
          :coords="huazhong"
          class="huazhong"
          @click.native="changeMap"
        />
        <area
          shape="poly"
          :coords="huadong"
          class="huadong"
          @click.native="changeMap"
        />
        <area shape="poly" :coords="xibu" id="xibu" @click.native="changeMap" />
      </map>
    </div>
    <div class="area">
      <div class="areaimg">
        <img :src="areaFrame" alt="" id="areaframe" />
      </div>
      <div class="count_box">
        <img :src="wordFrame" alt="" />
        <p id="food_count">{{ areacount }}</p>
      </div>
      <div class="example" v-for="item in areaArr" :key="item.areaid">
        <p @click="jumpDetail(item.areaid)">{{ item.areaname }}</p>
      </div>
      <div class="btn_watchall">
        <a href=""><img :src="watchAllBtn" alt="" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, nextTick, onMounted, toRaw } from "vue";
import getAssetsImages from "../hook/getAssetsImages";
import {
  coordsObj,
  setCoords,
  initCoords,
} from "../hook/getMapCoords";
import axios from "axios";
export default {
  setup() {
    //初始化图片数据
    let imgUrl = reactive({
      mapAdd: getAssetsImages("map", "南海诸岛.png"),
      mainMap: getAssetsImages("map", "华南图.webp"),
      areaFrame: getAssetsImages("map", "华南框.png"),
      wordFrame: getAssetsImages("map", "文字模版.png"),
      watchAllBtn: getAssetsImages("map", "查看所有.png"),
    });
    let mycoordsObj = reactive(coordsObj);
    //地图图片数据
    let mapUrl = {
      huanan: getAssetsImages("map", "华南图.webp"),
      huabei: getAssetsImages("map", "华北图.webp"),
      huazhong: getAssetsImages("map", "华中图.webp"),
      huadong: getAssetsImages("map", "华东图.webp"),
      xibu: getAssetsImages("map", "西部图.webp"),
    };
    //区域图片
    let areaFrameUrl = {
      huanan: getAssetsImages("map", "华南框.png"),
      huabei: getAssetsImages("map", "华北框.png"),
      huazhong: getAssetsImages("map", "华中框.png"),
      huadong: getAssetsImages("map", "华东框.png"),
      xibu: getAssetsImages("map", "西部框.png"),
    };
    let areacount = ref(0);
    let areaArr = ref([]);
    let axiosMapmsgData = {};

    //请求全部地图的数据
    const axiosMapmsg = (mapName) => {
      axios
        .get("/api/map", {
          area: mapName,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("area成功");
            let food = res.data.data;
            let resObj = {
              HNObj: {
                areacount: food.HNcount,
                areaArr: [
                  {
                    areaid: food.HNid[0],
                    areaname: food.HNdata[0],
                  },
                  {
                    areaid: food.HNid[1],
                    areaname: food.HNdata[1],
                  },
                ],
              },

              HBObj: {
                areacount: food.HBcount,
                areaArr: [
                  {
                    areaid: food.HBid[0],
                    areaname: food.HBdata[0],
                  },
                  {
                    areaid: food.HBid[1],
                    areaname: food.HBdata[1],
                  },
                ],
              },
              HDObj: {
                areacount: food.HDcount,
                areaArr: [
                  {
                    areaid: food.HDid[0],
                    areaname: food.HDdata[0],
                  },
                  {
                    areaid: food.HDid[1],
                    areaname: food.HDdata[1],
                  },
                ],
              },
              HZObj: {
                areacount: food.HZcount,
                areaArr: [
                  {
                    areaid: food.HZid[0],
                    areaname: food.HZdata[0],
                  },
                  {
                    areaid: food.HZid[1],
                    areaname: food.HZdata[1],
                  },
                ],
              },
              XBObj: {
                areacount: food.XBcount,
                areaArr: [
                  {
                    areaid: food.XBid[0],
                    areaname: food.XBdata[0],
                  },
                  {
                    areaid: food.XBid[1],
                    areaname: food.XBdata[1],
                  },
                ],
              },
            };
            axiosMapmsgData = resObj;
          }
        })
        .then(() => {
          //初始化
          areacount.value = axiosMapmsgData.HNObj.areacount;
          areaArr.value = axiosMapmsgData.HNObj.areaArr;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    axiosMapmsg();
    //改变渲染的数据
    var changeMap = (e) => {
      let mapName = e.target.className;
      if (mapName === "huanan") {
        imgUrl.mainMap = mapUrl.huanan;
        imgUrl.areaFrame = areaFrameUrl.huanan;
        // areacount.value = axiosMapmsgData.HNObj.areacount;
        // areaArr.value = axiosMapmsgData.HNObj.areaArr;
      } else if (mapName === "huabei") {
        imgUrl.mainMap = mapUrl.huabei;
        imgUrl.areaFrame = areaFrameUrl.huabei;
        // areacount.value = axiosMapmsgData.HBObj.areacount;
        // areaArr.value = axiosMapmsgData.HBObj.areaArr;
      } else if (mapName === "huazhong") {
        imgUrl.mainMap = mapUrl.huazhong;
        imgUrl.areaFrame = areaFrameUrl.huazhong;
        // areacount.value = axiosMapmsgData.HDObj.areacount;
        // areaArr.value = axiosMapmsgData.HDObj.areaArr;
      } else if (mapName === "huadong") {
        imgUrl.mainMap = mapUrl.huadong;
        imgUrl.areaFrame = areaFrameUrl.huadong;
        // areacount.value = axiosMapmsgData.HZObj.areacount;
        // areaArr.value = axiosMapmsgData.HZObj.areaArr;
      } else {
        imgUrl.mainMap = mapUrl.xibu;
        imgUrl.areaFrame = areaFrameUrl.xibu;
        // areacount.value = axiosMapmsgData.XBObj.areacount;
        // areaArr.value = axiosMapmsgData.XBObj.areaArr;
      }
    };
    var jumpDetail = (id) => {
      console.log(id);
    };
    //热点区域自适应
    //初始化热点
    let time = null;
    function initCoord(delay) {
      clearTimeout(time);
      time = setTimeout(() => {
        mycoordsObj.huanan1 = setCoords(initCoords.huanan1, 767, 586);
        mycoordsObj.huanan2 = setCoords(initCoords.huanan2, 767, 586);
        mycoordsObj.huanan3 = setCoords(initCoords.huanan3, 767, 586);
        mycoordsObj.huabei = setCoords(initCoords.huabei, 767, 586);
        mycoordsObj.huazhong = setCoords(initCoords.huazhong, 767, 586);
        mycoordsObj.huadong = setCoords(initCoords.huadong, 767, 586);
        mycoordsObj.xibu = setCoords(initCoords.xibu, 767, 586);
      }, delay);
    }
    initCoord(200);
    //当缩放的时候 自适应 且设置定时器避免多次计算
    window.onresize = function () {
      initCoord(1500);
    };
    return {
      ...toRefs(imgUrl),
      ...toRefs(mycoordsObj),
      changeMap,
      jumpDetail,
      areacount,
      areaArr,
    };
  },
};
</script>

<style lang="less" scoped>
.map {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/img/map/宫墙.png) no-repeat;
  background-size: cover;
  .word_area {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
    height: 15%;
    border-radius: 0 0 30px 30px;
    transform: translate(101%, 0%);
    p {
      font-size: 73px;
      font-weight: 700;
      color: black;
      text-shadow: 4px 1px 7px grey;
      cursor: default;
    }
  }
  .map_add {
    position: absolute;
    bottom: 5%;
    left: 10%;
    width: 8%;
    z-index: 10;
    img {
      width: 100%;
    }
  }
  .map_box {
    position: relative;
    top: 25%;
    left: 10%;
    width: 50%;
    height: 50%;
    img {
      width: 100%;
    }
    map area {
      outline: none;
    }
  }
  .area {
    position: absolute;
    top: 33%;
    left: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    margin: 0 auto;
    .areaimg {
      position: relative;
      margin: auto auto;
      img {
        width: 100%;
      }
    }
    .count_box {
      position: relative;
      width: 94%;
      margin-top: 10%;
      img {
        width: 100%;
      }
      #food_count {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -115%);
        font-size: 37px;
        text-decoration: underline;
        color: white;
      }
    }
    .example {
      display: flex;
      flex-direction: column;
      margin-left: 40%;
      p {
        font-size: 39px;
        text-decoration: underline;
        color: white;
        white-space: nowrap;
        cursor: pointer;
      }
    }
    .btn_watchall {
      width: 70%;
      margin: auto;
      margin-top: 10%;
      img {
        width: 100%;
      }
    }
  }
}
</style>