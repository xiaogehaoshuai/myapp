import Vue from 'vue'
import App from './App.vue'
import './assets/icons'
import router from './router';
Vue.config.productionTip = false
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
    'inline':false,
    'button':true, //右上角按钮
    "navbar": false, //底部缩略图
    "title": false, //当前图片标题
    "toolbar": false, //底部工具栏
    "tooltip": true, //显示缩放百分比
    "movable": true, //是否可以移动
    "zoomable": true, //是否可以缩放
    "rotatable": true, //是否可旋转
    "scalable": true, //是否可翻转
    "transition": true, //使用 CSS3 过度
    "fullscreen": true, //播放时是否全屏
    "keyboard": true, //是否支持键盘
});
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(ElementUI);
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
    // 聚焦元素
        el.focus()
    }
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
