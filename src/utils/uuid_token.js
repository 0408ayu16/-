//利用uuid生成未登录用户临时标识符
import { v4 as uuidv4 } from 'uuid';
//封装函数:只能生成一次用户临时身份
let uuid_token;
export const getUUID = () => {
    //先从本地存储获取uuid（看一下本地存储是否有）
    uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有
    if (!uuid_token) {
        //我生成游客临=临时身份
        uuid_token = uuidv4();
        //本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token;
}
