import { reqAddressInfo, reqShopInfo } from '@/api'
const state = {
    address: [],
    orderInfo: {}
};
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }

    },
    //获取商品的清单数据
    async getOrderInfo({ commit }) {
        let result = await reqShopInfo()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    }
};
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}