<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import mainFrame from "./components/mainFrame.vue";
import axios from 'axios'
export default {
  name: "App",
  components: {
    mainFrame,
  },
  setup() {
    window.onunload = (e) => {
      
    };
  },
};
</script>

<style>
:root {
  /* // 框架 */
  --frameBg-color: #bdc3c7;
  --header-color: #ecf0f1;
  --buttonBackground-color: #fff;
  --buttonBorder-color: rgba(246, 179, 127);
  /* // 侧栏 */
  --asideBg-color: #ecf0f1;
  /* // 登陆页面 */
  --loginBg-color: #e0e0e0;
  --interfaceBg-color: rgba(255, 255, 255, 0.9);
  --active-color: black;
  --tips-color: red;
  --icon-color: rgb(19, 190, 19);
  --input-color: white;
  --submit-border: rgba(69, 69, 69, 0.3);
  --submitBg-color: rgba(255, 255, 255, 0.7);
  /* // swiper */
  --swiperBtnBg-color: #ecf0f1;
  --swiperText-color: #666;
}
</style>
