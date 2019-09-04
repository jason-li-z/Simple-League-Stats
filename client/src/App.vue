<template>
  <div id="container">
    <Header />
    <router-view />
  </div>
</template>

<script>
// import hello from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style>
#container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #2d3142;
}
img {
  width: 250px;
}
@media (max-width: 700px) {
  img {
    display: block;
    margin: auto;
  }
}
</style>
