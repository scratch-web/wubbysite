import Home from "@/views/Home.vue"
import Worlds from "@/views/Worlds.vue";
import NotFound from "@/views/NotFound.vue";
import { Component } from "vue";
import { SquareArrowOutUpRight } from "lucide-vue-next";

export const IMAGE_CAROUSEL = { // FOR FUTURE REFERENCE, ONLY USE 1015x636 FOR THE RATIO
    DELAY: 3500,
    IMAGES: [
        {
            id: 14159191425,
            url: "https://files.catbox.moe/nxswpr.png" 
        },
        {
            id: 13955723945,
            url: "https://files.catbox.moe/xq9ezo.png"
        },
        {
            id: 18667580548,
            url: "https://files.catbox.moe/uq1on5.png"
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
