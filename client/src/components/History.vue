<template>
  <section>
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>

    <div v-if="error">
      <h1>{{error}}...</h1>
      <router-link to="/">Go Back</router-link>
    </div>

    <div v-if="profileData" id="container">
      <div v-for="data in profileData">
        <div
          v-for="champ in championData.data"
          v-if="champ.key == data.championId"
        >{{data.championLevel}} - {{champ.name}}</div>
      </div>
    </div>
  </section>
</template>


<script>
import axios from "axios";
import json from "./data.json";

export default {
  name: "Mastery",
  data() {
    return {
      loading: false,
      error: null,
      profileData: null,
      championData: json
    };
  },
  async created() {
    try {
      this.loading = true;
      const res = await axios.get(
        `/api/v1/summoner/${this.$route.params.username}`
      );
      this.profileData = res.data;
      console.log(this.profileData);
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = err.res.data.message;
    }
  }
};
</script>

<style scoped>
* {
  color: #ef8354;
}
</style>