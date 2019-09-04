import Vue from "vue";
import Router from "vue-router";
import Search from "./components/Search.vue";
import MatchHistory from "./components/History.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "search",
      component: Search
    },
    {
      path: "/summoner/:username",
      name: "mastery",
      component: MatchHistory
    }
  ]
});
