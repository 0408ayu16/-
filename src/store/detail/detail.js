import { reqGoodsInfo,reqAddOrUpdateCart } from "@/api";
//生成一个随机的客户id
import {getUUID} from '@/utils/uuid_token';
const state = {
    goodInfo: {},
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    async addOrUpdateCart({ commit }, { skuId, skuNum }) {
        //底下即为：加入购物车(修改商品个数)的请求,参数顺序不能瞎写
        let result = await reqAddOrUpdateCart(skuId, skuNum);

        if (result.code == 200) {
            //如果加入购物车成功,返回promise即为成功
            return "ok";
        } else {
            //如果加入购物车失败，返回失败的Promise
            return Promise.reject();
        }
    },
}
    const getters = {
        categoryView(state) {
            return state.goodInfo.categoryView || {};
        },
        skuInfo(state) {
            return state.goodInfo.skuInfo || {};
        },
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || [];
        }
    };

export default {
    state,
    mutations,
    actions,
    getters
}