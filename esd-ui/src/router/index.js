import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ListTrade from "../views/ListTrade.vue";
import Trade from "../views/Trade.vue";
import Redirect from "../views/Redirect.vue";
import Success from "../views/Success.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/list-trade",
    name: "List Trade",
    component: ListTrade,
  },
  {
    path: "/trade",
    name: "Search Trades",
    component: Trade,
  },
  {
    path: "/redirect",
    name: "Redirect",
    component: Redirect,
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
