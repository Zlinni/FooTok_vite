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
</style>
