import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import ui from "@nuxt/ui/vue-plugin";

import Index from "./pages/index.vue";

import App from "./App.vue";

const app = createApp(App);

const router = createRouter({
  routes: [
    { path: '/', component: Index },
  ],
  history: createWebHistory(),
});

app.use(createPinia());
app.use(router);
app.use(ui);

app.mount("#app");
