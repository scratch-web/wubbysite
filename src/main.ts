import { Component, createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import "./assets/index.css";

import { routeList } from "./config";

import App from "@/App.vue";

const routes: { path: string, component: Component }[] = [];

routeList.forEach(route => {
    if (!route.component) return; // external link
    routes.push({
        path: route.href,
        component: route.component,
    });
});

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

createApp(App)
    .use(router)
    .mount("#app");
