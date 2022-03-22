<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import mainFrame from "./components/mainFrame.vue";
export default {
  name: "App",
  components: {
    mainFrame,
  },
};
</script>

<style>
</style>
