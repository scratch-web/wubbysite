import Home from "@/views/Home.vue"
import Worlds from "@/views/Worlds.vue";
import NotFound from "@/views/NotFound.vue";
import { Component } from "vue";
import { SquareArrowOutUpRight } from "lucide-vue-next";

export const IMAGE_CAROUSEL = {
    DELAY: 3500,
    IMAGES: [
        {
            id: 14159191425,
            url: "https://files.catbox.moe/oyvi9g.png"
        },
        {
            id: 13955723945,
            url: "https://files.catbox.moe/t17cd8.png"
        }
    ]
}

export const routeList: { href: string, label: string, component?: Component, iconPrefix?: Component, iconSuffix?: Component, hidden?: boolean }[] = [
    {
        href: "/",
        label: "Home",
        component: Home,
        hidden: true
    },
    {
        href: "/worlds",
        label: "Worlds",
        component: Worlds,
    },
    {
        href: "https://wiki.wubbygame.com",
        label: "Wiki",
        iconSuffix: SquareArrowOutUpRight
    },
    {
        href: "/:pathMatch(.*)*",
        label: "Not Found",
        component: NotFound,
        hidden: true
    }
]
