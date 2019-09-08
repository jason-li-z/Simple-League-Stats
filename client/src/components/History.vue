<template>
  <section>
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>

    <div v-if="error">
      <h1>{{error}}</h1>
      <router-link to="/">Go Back</router-link>
    </div>

    <div v-if="profileData" id="container">
      <h2>Masteries for {{username}}</h2>

      <div v-for="data in profileData">
        <div v-for="champ in championData.data" v-if="champ.key == data.championId">
          Mastery Level: {{data.championLevel}} - Champion: {{champ.name}}
          <img
            align="middle"
            id="avatars"
            v-bind:src="imgURLs + champ.image.full"
          />
          - Points: {{data.championPoints}}
        </div>
      </div>
      <router-link to="/">Go Back</router-link>
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
      championData: json,
      imgURLs: "http://ddragon.leagueoflegends.com/cdn/9.17.1/img/champion/",
      username: this.username
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
      this.username = this.$route.params.username;
    } catch (err) {
      this.loading = false;
      this.error = err.response.data.message;
    }
  }
};
</script>

<style scoped>
* {
  color: #ef8354;
}

#avatars {
  max-width: 75px;
  padding-bottom: 10px;
  padding-top: 5px;
}

#container {
  font: bolder;
  font-size: 25px;
}
</style>