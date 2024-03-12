/**
 * setFavouriteTitle.ts
 * created by 2024/3/11
 * @file 设置收藏夹检索标题
 * @author  Yiero
 * */

import { favouriteTitleConfig } from './config/favouriteTitleConfig.ts';

/**
 * 在本地存储中设置收藏夹标题。
 *
 * @param {string} title - 要设置为收藏夹的标题。
 */
export const setFavouriteTitle = ( title: string ) => {
	localStorage.setItem( favouriteTitleConfig.key, title );
};
