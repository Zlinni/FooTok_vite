<template>
  <div class="catalog_box">
    <el-header>
      <span class="word_shuxian"></span>
      <div class="areaname_box">
        <p id="leftareaname">{{ title }}</p>
        <p id="rightareaname" v-if="false">·查询结果</p>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <div class="selection">
          <div class="word_select">
            <span>
              <p>筛选</p>
            </span>
          </div>
          <div class="method">
            <span v-for="(item, index) in methodShow" :key="index">
              <p class="method_food" @click="changefood(item.tag, item.method)">
                {{ item.method }}
              </p>
            </span>
          </div>
        </div>
      </el-aside>
      <el-main>
        <!-- 食物展示区域 -->
        <el-skeleton :loading="loading" animated :throttle="500">
          <!-- 骨架显示 -->
          <template #template>
            <el-skeleton-item
              variant="image"
              style="
                width: 24%;
                height: 32%;
                margin-bottom: 5px;
                margin-right: 5px;
              "
              v-for="item in foodData"
              :key="item"
            />
          </template>
          <!-- 实际图片显示 -->
          <template #default>
            <div class="foodBox">
              <el-card
                :body-style="{ padding: '0px' }"
                v-for="item in foodData"
                :key="item.id"
                ><el-image :src="item.foodbigimg" />
                <span>
                  <p>{{ item.foodname }}</p>
                </span>
              </el-card>
            </div>
          </template>
        </el-skeleton>
        <el-pagination
          background
          class="pagin"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :currentPage="currentPage"
          :total="pageSize"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watch, onMounted } from "vue";
import axios from "axios";
export default {
  setup(props) {
    let methodShow = reactive([
      { method: "所有菜品", tag: "所有" },
      { method: "做法：炒", tag: "炒" },
      { method: "做法：煎", tag: "煎" },
      { method: "做法：炸", tag: "炸" },
      { method: "做法：焖", tag: "焖" },
      { method: "做法：蒸", tag: "蒸" },
      { method: "做法：煮", tag: "煮" },
    ]);
    let foodObj = reactive({
      foodData: [],
    });
    let currentPage = ref(1);
    let pageSize = ref(100);
    let foodTag = ref("所有");
    let title = ref("美食目录");
    let loading = ref(true);

    const axiosCatalog = (tag, page) => {
      loading.value = true;
      axios
        .get("/api/catalog", {
          params: {
            tag: tag,
            page: page,
          },
        })
        .then((res) => {
          let result = res.data;
          if (result.code === 200) {
            foodObj.foodData = result.data.records;
            pageSize.value = result.data.pages * 10;
          }
        })
        .then(() => {
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    function isLoad() {
      loading.value = false;
    }
    //进入页面请求
    axiosCatalog("所有", 1);
    //点击请求并改变做法食物
    const changefood = (tag, method) => {
      currentPage.value = 1;
      foodObj.foodData = [];
      axiosCatalog(tag, 1);
      foodTag.value = tag;
      if (method === "所有菜品") {
        title.value = "美食目录";
      } else {
        title.value = method;
      }
    };
    //改变页数发送请求
    const handleCurrentChange = (val) => {
      currentPage.value = val;
      axiosCatalog(foodTag.value, val);
    };
    return {
      methodShow,
      changefood,
      handleCurrentChange,
      currentPage,
      pageSize,
      foodTag,
      title,
      loading,
      isLoad,
      ...toRefs(foodObj),
    };
  },
};
</script>

<style lang='less' scoped>
.catalog_box {
  position: relative;
  height: 100%;
  min-height: 865px;
  .el-header {
    position: absolute;
    padding: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 15%;
    background: #ffa502;
    box-shadow: 1px 1px 7px grey;
    overflow: hidden;
    .word_shuxian {
      margin-left: 20%;
      width: 8px;
      height: 90%;
      background: rgb(253, 131, 1);
    }
    .areaname_box {
      margin-left: 9%;
      display: flex;
      width: 30%;
      height: 50%;
      cursor: default;
      #leftareaname {
        font-size: 90px;
        font-weight: 700;
        line-height: 100%;
        color: white;
        white-space: nowrap;
      }
      #rightareaname {
        margin-top: 11%;
        color: white;
        font-size: 38px;
        white-space: nowrap;
      }
    }
  }
  .el-container {
    position: absolute;
    top: 16%;
    left: 0;
    display: flex;
    width: 100%;
    height: 84%;
    .el-aside {
      position: absolute;
      z-index: 99;
      left: 0;
      width: 20%;
      height: 100%;
      background: rgba(254, 222, 173);
      box-shadow: 1px 1px 7px grey;
      .selection {
        position: relative;
        top: 7%;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 93%;
        .word_select {
          width: 100%;
          height: 9%;
          color: white;
          border-bottom: 5px solid white;
          cursor: default;
          span {
            position: absolute;
            left: 10px;
            font-size: 50px;
            font-weight: 700;
          }
        }
        .method {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 91%;
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 11%;
            border-bottom: 5px solid white;
            .method_food {
              margin: auto;
              font-size: 34px;
              font-weight: 700;
              line-height: 100%;
              color: white;
              cursor: pointer;
            }
            .method_food:hover {
              font-size: 36px;
            }
          }
          span:hover {
            background: #ffa502;
          }
          .active {
            background: #ffa502;
          }
        }
      }
    }
    .el-main {
      position: absolute;
      z-index: 99;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 79%;
      height: 100%;
      background: white;
      overflow: auto;
      box-shadow: 1px 1px 7px grey;
      .el-skeleton {
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        width: 81%;
        height: 80%;
      }
      .foodBox {
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        width: 81%;
        height: 80%;
        .el-card {
          padding: 0;
          width: 24%;
          height: 32%;
          margin-bottom: 5px;
          margin-right: 5px;
          background: white;
          box-shadow: 1px 4px 8px grey;
          .el-image {
            position: relative;
            width: 100%;
          }
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 26%;
            margin-top: 10px;
          }
          p:nth-child(odd) {
            font-size: 1rem;
          }
        }
        .el-card:hover {
          position: relative;
          left: -2px;
        }
      }
      .pagin {
        margin-top: 20px;
      }
    }
    .el-main::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>