import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)
const router=new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect:{name:'login'},
            component: ()=> import('./components/HelloWorld'),
            children:[
                {
                    path: '/login',
                    name:'login',
                    component: ()=> import('./components/Login'),
                },
                {
                    path: '/edit',
                    name:'edit',
                    component: ()=> import('./components/edit'),
                },
                {
                    path: '/EventDelegation',
                    name: 'EventDelegation',
                    component:()=>import('./components/EventDelegation')
                },
                {
                    path: '/QrCode',
                    name: 'QrCode',
                    component:()=>import('./components/QrCode')
                },
                {
                    path: '/parabola',
                    name: 'parabola',
                    component:()=>import('./components/parabola')
                },
                {
                    path: '/htmlCanvas',
                    name: 'htmlCanvas',
                    component:()=>import('./components/htmlCanvas')
                },
                {
                    path: '/Cropper',
                    name: 'Cropper',
                    component:()=>import('./components/Cropper')
                },
                {
                    path: '/elementCase',
                    name: 'elementCase',
                    component:()=>import('./components/elementCase')
                },
                {
                    path: '/checkbox',
                    name: 'checkbox',
                    component:()=>import('./components/checkbox')
                },
            ],
            meta: { isBack: true }
        },
        {
            // 会匹配所有路径
            path: '*',
            component: ()=> import('./components/err'),
            meta: { isBack: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log(to,from)
    if (to.matched.length === 0) {
        from.name ? next({
            name: from.name
        }) : next('/err');
    } else {
        next(); //如果匹配到正确跳转
    }
});
export default router
