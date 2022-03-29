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
          <div class="searchBox">
            <el-autocomplete
              class="search_text"
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="Please input"
              @select="handleSelect"
            >
              <template #suffix>
                <i class="iconfont icon-meishi"></i>
              </template>
            </el-autocomplete>
          </div>
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
import { onMounted, reactive, toRefs, ref } from "vue";
import indexAside from "../components/indexAside.vue";
import getAssetsImages from "../hook/getAssetsImages";
import axios from "axios";
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
      logo: getAssetsImages("index", "斜眼看.png"),
      indexBg: getAssetsImages("index", "indexBg.jpg"),
    });
    let state = ref("");
    let foodObj = reactive({
      foodItem: [],
    });
    const handleSelect = (val) => {
      console.log(val.id);
      axios
        .get("/api/search", {
          params: {
            id: val.id,
          },
        })
        .then((res) => {
          let result = res.data;
          if (result.code === 200) {
          }
        });
    };
    function querySearchAsync(queryString, cb) {
      console.log("svalue", state.value);
      console.log("qs", queryString);
      axios
        .get("/api/simplesearch", {
          params: {
            foodname: queryString,
          },
        })
        .then((res) => {
          let result = res.data;
          console.log(result);
          if (result.code === 200) {
            for (let i of result.data) {
              i.value = i.foodname;
            }
            console.log("result.data", result.data);
            cb(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
      state,
      handleSelect,
      querySearchAsync,
      ...toRefs(imgUrl),
      ...toRefs(calendarData),
      ...toRefs(foodObj),
    };
  },
};
</script>
<style lang="less" scoped>
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
          font-size: 1rem;
          white-space: nowrap;
          cursor: default;
        }
      }
      .searchBox {
        position: relative;
        width: 100%;
        height: 100%;
        .search_text {
          padding-left: 5%;
          padding-right: 5%;
          width: 100%;
          height: 100%;
          min-height: 40px;
          margin-right: 20px;
          background: var(--buttonBackground-color);
          border-radius: 40px;
          border: var(--buttonBorder-color) solid 1px;
          box-shadow: 1px 1px 1px var(--buttonBorder-color);
        }
        #searchbtn {
          position: absolute;
          right: 0;
          top: 0;
          transform: translate(-90%, 20%);
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
            font-size: 1rem;
            text-transform: uppercase;
          }
        }
      }
    }
    .el-container {
      position: relative;
      top: 12%;
      height: 90%;
      .el-main {
        padding-top: 0;
        padding-bottom: 0;
      }
      .el-main::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>