import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import ui from "@nuxt/ui/vue-plugin";

import IndexPage from "./pages/index.vue";
import UploadPage from "./pages/upload.vue";

import App from "./App.vue";

const app = createApp(App);

const router = createRouter({
  routes: [
    { path: '/', component: IndexPage },
    { path: '/upload', component: UploadPage },
  ],
  history: createWebHistory(),
});

app.use(createPinia());
app.use(router);
app.use(ui);

app.mount("#app");
