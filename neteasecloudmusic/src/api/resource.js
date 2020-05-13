import axios from './api.js';

const apiMusic = {
    loginCellphone: '/api/login/cellphone', // 手机登陆
    Banner: '/banner', //轮播图
};

export const LoginCellphoneResource = API_ROOT.concat(apiMusic.loginCellphone);
export const BannerResource = API_ROOT.concat(apiMusic.Banner);