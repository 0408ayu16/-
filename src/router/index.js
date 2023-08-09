import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter);



let router = new VueRouter({
  routes,
  //滚动条在最顶部
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
});
//全局守卫，前置守卫
router.beforeEach(async (to, from, next) => {
  next();
  //用户登录了才会有token，未登录一定不会有token
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    //用户已经登录了还想去login,限制于home
    if (to.path == '/login' || to.path == './register') {
      next('./home')
    }
    else {
      //登录，去的不是login
      //如果用户名拥有
      if (name) {
        next();
      } else {
        //没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          //获取用户信息成功
          await store.dispatch('getUseInfo');
          next();
        } catch (error) {
          await store.dispatch('userLogout')
          next('/login');

        }

      }
    }
  } else {
    //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
    //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
    let toPath = to.path;
    if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
      next('/login?redirect=' + toPath);
    } else {
      next();
    }
  }
  console.log(store)
});
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router;