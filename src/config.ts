import Home from "@/views/Home.vue"
import Worlds from "@/views/Worlds.vue";
import NotFound from "@/views/NotFound.vue";
import { Component } from "vue";
import { SquareArrowOutUpRight } from "lucide-vue-next";

export const IMAGE_CAROUSEL = {
    DELAY: 3500,
    IMAGES: [
        {
            id: 17081773426,
            url: "https://media.choke.dev/ShareX/2024/08/Image1.jpg"
        },
        {
            id: 14541883804,
            url: "https://media.choke.dev/ShareX/2024/08/Image2.png"
        },
        {
            id: 13955046829,
            url: "https://media.choke.dev/ShareX/2024/08/13955046829.png"
        },
        {
            id: 17233302180,
            url: "https://media.choke.dev/ShareX/2024/08/17233302180.png"
        },
        {
            id: 18232317690,
            url: "https://media.choke.dev/ShareX/2024/08/RobloxPlayerBeta_nkOAGVEY6w.png"
        },
        {
            id: 17360907224,
            url: "https://media.choke.dev/ShareX/2024/12/RobloxPlayerBeta_D6LRkzuXkn.png"
        },
        {
            id: 112829823959648,
            url: "https://media.choke.dev/ShareX/2024/12/RobloxPlayerBeta_biKktgHC5w.png"
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