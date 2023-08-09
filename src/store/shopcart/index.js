import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api'
const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  }
};
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  async deleteCartListById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject();
    }
  },
  async updateCheckedByid({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if (result.code == 200) {
      return 'ok';
    }
    else {
      return Promise.reject(new Error('faile'));
    }
  },
  deletAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise=item.isChecked==1?dispatch('deleteCartListById', item.skuId) : '';
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
  updateAllCartIsChecked({dispatch,state},isChecked){
    let promiseALL=[];
     state.cartList[0].cartInfoList.forEach(item=>{
    let promise = dispatch('updateCheckedByid',{skuId:item.skuId,isChecked})
    promiseALL.push(promise)   
  })
  return Promise.all(promiseALL);
  },
   
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}