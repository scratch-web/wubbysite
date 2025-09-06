import Down from "@/views/Down.vue"
import Worlds from "@/views/Worlds.vue";
import NotFound from "@/views/NotFound.vue";
import Recode from "@/views/Recode.vue";
import { Component } from "vue";
import { SquareArrowOutUpRight } from "lucide-vue-next";

export const IMAGE_CAROUSEL = { // FOR FUTURE REFERENCE, ONLY USE 1015x636 FOR THE RATIO
    DELAY: 2250,
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
        },
        {
            id: 81930608228732,
            url: "https://files.catbox.moe/69k5jx.png"
        },
        {
            id: 18170515127,
            url: "https://files.catbox.moe/tnz5kh.png"
        },
        {
            id: 137246781828463,
            url: "https://files.catbox.moe/3lx8sy.png"
        },
        {
            id: 114712168662071,
            url: "https://files.catbox.moe/sr2wny.png"
        },
        {
            id: 122628405932715,
            url: "https://files.catbox.moe/llrfg5.png"
        },
        {
            id: 14485630685,
            url: "https://files.catbox.moe/r9vbtq.png"
        },
        // https://files.catbox.moe/4rr706.png
    ]
}

export const routeList: { href: string, label: string, component?: Component, iconPrefix?: Component, iconSuffix?: Component, hidden?: boolean }[] = [
    {
        href: "/",
        label: "Down",
        component: Down,
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
        href: "/recode",
        label: "Recode",
        component: Recode,
        hidden: true
    },
    {
        href: "/:pathMatch(.*)*",
        label: "Not Found",
        component: NotFound,
        hidden: true
    }
]
