import {
    createRouter,
    createWebHashHistory
} from "vue-router"
const swiper = () => import('../components/foodSwiper.vue')
const hotList = () => import('../components/foodMake.vue')
const category = () => import('../components/foodCategory.vue')
const map = () => import('../components/foodMap.vue')
const personality = () => import('../components/foodPerson.vue')
const login = () => import('../components/login.vue')
const mainFrame = () => import('../components/mainFrame.vue')

const routes = [{
        path: '/',
        redirect: '/home/swiper'
    },
    {
        path: '/home',
        component: mainFrame,
        meta: {
            requireAuth: true // 进入页面前判断是否需要登陆
        },
        children: [{
                path: '/home/swiper',
                name:'index',
                component: swiper,
            },
            {
                path: '/home/hotList',
                component: hotList,
            },
            {
                path: '/home/category',
                component: category,
            },
            {
                path: '/home/map',
                component: map,
            },
            {
                path: '/home/personality',
                component: personality,
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


// router.beforeEach((to, from, next) => {
//     if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
//         if (sessionStorage.getItem('sid')) { // 查询本地存储信息是否已经登陆
//             next();
//         } else {
//             next({
//                 path: '/login', // 未登录则跳转至login页面
//                 query: {
//                     redirect: to.fullPath
//                 } // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
//             });
//         }
//     } else {
//         next();
//     }
// });

export default router