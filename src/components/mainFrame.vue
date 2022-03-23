<template>
  <div class="frame">
    <el-container>
      <el-row justify="space-between" align="middle">
        <el-col :sm="5" :md="3">
          <el-image :src="logo" class="logo"></el-image>
        </el-col>
        <el-col :sm="6" :md="4">
          <div class="calendar grid-content">
            <p id="calendarname">农历</p>
            <p id="c1">{{ year }}</p>
            <p id="c2">{{ month }}</p>
            <p id="c3">{{ day }}</p>
          </div>
        </el-col>
        <el-col :sm="10" :md="7"></el-col>
        <el-col :sm="10" :md="7">
          <form class="search_box" method="GET" action="/searchResult">
            <input
              type="text"
              name="keyword"
              class="search_text"
              placeholder="Type to search"
            />
            <button id="searchbtn">
              <i class="iconfont icon-meishi"></i>
            </button>
          </form>
          <ul class="user_box">
            <li class="loginplace">
              <router-link to="/login">login</router-link>
            </li>
          </ul> 
        </el-col>
      </el-row>
      <el-container>
        <indexAside :isLeft="true"></indexAside>
        <el-main> 
          <router-view></router-view>
        </el-main>
        <indexAside></indexAside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { calendar } from "../plugins/calendar";
import { onMounted, reactive, toRefs } from "vue";
import indexAside from "../components/indexAside.vue";
import getAssetsImages from '../hook/getAssetsImages'
export default {
  name: "mainFrame",
  components: {
    indexAside,
  },
  setup() {
    const calendarData = reactive({
      year: "",
      month: "",
      day: "",
    });
    const imgUrl = reactive({
      logo: getAssetsImages("index","斜眼看.png"),
      indexBg: getAssetsImages("index","indexBg.jpg"),
    });
    onMounted(() => {
      //初始化农历
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var cal = calendar.solar2lunar(year, month, day);
      calendarData.year = cal.gzYear;
      calendarData.month = cal.IMonthCn;
      calendarData.day = cal.IDayCn;
    });
    return {
      ...toRefs(imgUrl),
      ...toRefs(calendarData),
    };
  },
};
</script>
<style lang="less">
:root {
  // 框架
  --frameBg-color: #bdc3c7;
  --header-color: #ecf0f1;
  --buttonBackground-color: #fff;
  --buttonBorder-color: rgba(246, 179, 127);
  // 侧栏
  --asideBg-color:#ecf0f1;
  // 登陆页面
  --loginBg-color:#e0e0e0;
  --interfaceBg-color:rgba(255, 255, 255, 0.9);
  --active-color:black;
  --tips-color:red;
  --icon-color:rgb(19, 190, 19);
  --input-color:white;
  --submit-border:rgba(69, 69, 69, 0.3);
  --submitBg-color:rgba(255, 255, 255, 0.7);
  // swiper
  --swiperBtnBg-color:#ecf0f1;
  --swiperText-color:#666;
}
.frame {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--frameBg-color);
  .el-container {
    height: 100%;
    .el-row {
      position: absolute;
      z-index: 99;
      width: 100%;
      height: 10%;
      background-color: var(--header-color);
      padding: 1% 0;
      box-sizing: border-box;
      .el-col {
        display: flex;
        justify-content: start;
        align-items: center;
      }
      .el-image {
        margin-left: 30px;
        width: 100%;
        height: 100%;
        min-height: 40px;
      }
      .calendar {
        margin-left: 5%;
        display: flex;
        p {
          margin: 0 5px;
          font-size: 1.2rem;
          white-space: nowrap;
          cursor: default;
        }
      }
      .search_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        min-height: 40px;
        margin-right: 20px;
        background: var(--buttonBackground-color);
        border-radius: 40px;
        border: var(--buttonBorder-color) solid 1px;
        box-shadow: 1px 1px 1px var(--buttonBorder-color);
        .search_text {
          padding-left: 10px;
          background: none;
          border: none;
        }
        #searchbtn {
          padding-right: 10px;
          background: none;
        }
      }
      .user_box {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .loginplace {
          display: flex;
          width: 120px;
          height: 100%;
          a {
            margin: 0 25px;
            font-size: 1.2rem;
            text-transform: uppercase;
          }
        }
      }
    }
    .el-container {
      position: relative;
      top: 12%;
      height: 90%;
      .el-main{
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
}
</style>