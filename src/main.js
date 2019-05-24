import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/common/css/index.scss';
import '@/common/icons';
import '@/common/icons/fonts/iconfont.js';
import '@/common/icons/fonts/iconfont.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
