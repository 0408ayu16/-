import Vue from 'vue'
import App from './App.vue'
import router  from '@/router'
import TypeNav from '@/components/TypeNav';
import store from '@/store';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination'
import { reqCategoryList } from '@/api';
import VueLazyload from 'vue-lazyload'
import '@/plugins/validate' // 引入表单验证

//element-ui
import { Button,MessageBox } from 'element-ui';
reqCategoryList();

Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
//按需引入
Vue.component(Button.name,Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
import '@/mock/mockServe';
import 'swiper/css/swiper.css';
//统一接口请求参数
//统一引入
import * as API from '@/api';
import lazypicture from '@/assets/lazypicture.gif';

Vue.use(VueLazyload,{
  //懒加载图片
  loading:lazypicture
})
new Vue({
  
  render: h => h(App),
  beforeCreate(){
      Vue.prototype.$bus=this;
      Vue.prototype.$API=API;
  },
  router,
 store
}).$mount('#app')
