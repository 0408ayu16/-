import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import home from './home';
import search from './search';
import detail from './detail/detail';
import shopcart from './shopcart';
import user from './user/user';
import trade from './trade'
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});