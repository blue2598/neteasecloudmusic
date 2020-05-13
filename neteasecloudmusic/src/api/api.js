import axios from 'axios';
import {
    LoginCellphoneResource,
    BannerResource,

} from './resource';

export default {
    // 获取个人信息，注入cookies
    getLoginCellphoneResource(mobile, password) {
        return axios.get(LoginCellphoneResource, {
            params: {
                phone: mobile || '',
                password: password || ''
            }
        });
    },

    // 获取用户歌单, uid为用户id，登陆接口处获取
    getUserPlaylistResource(id) {
        return axios.get(UserPlaylistResource, {
            params: {
                uid: id
            }
        });
    },

    // 获取歌单详情, id 为歌单id
    getPlaylistDetailResource(id) {
        return axios.get(PlaylistDetailResource, {
            params: {
                id: id
            }
        });
    },

    // 获取音乐url， id为单曲id
    getMusicUrlResource(id) {
        return axios.get(MusicUrlResource, {
            params: {
                id: id
            }
        });
    },

    /**
     * @method 搜索音乐
     * @param keywords 关键词
     * @param type 1为单曲，10为专辑， 100为歌手， 1000为歌单， 1002为用户
     * @param limit 返回数据限制
     * @param offset 数据偏移量
     * @returns response  数据返回值
     */
    getSearchResource(keywords, type, limit, offset) {
        return axios.get(SearchResource, {
            params: {
                keywords: keywords,
                type: type,
                offset: offset || 0,
                limit: limit
            }
        });
    },
    getBannerResource(type) {
        return axios.get(BannerResource, {
            params: {
                type: type,
            }
        })
    }



};