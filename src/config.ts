import Home from "@/views/Home.vue"
import Worlds from "@/views/Worlds.vue";
import NotFound from "@/views/NotFound.vue";
import { Component } from "vue";
import { SquareArrowOutUpRight } from "lucide-vue-next";

export const IMAGE_CAROUSEL = {
    DELAY: 5000,
    IMAGES: [
        "https://media.choke.dev/ShareX/2024/08/Image1.jpg",
        "https://media.choke.dev/ShareX/2024/08/Image2.png",
        "https://media.choke.dev/ShareX/2024/08/13955046829.png"
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