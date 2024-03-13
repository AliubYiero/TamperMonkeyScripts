/**
 * getFavouriteTitle.ts
 * created by 2024/3/11
 * @file 获取收藏夹检索标题
 * @author  Yiero
 * */

import {
	favouriteTitleConfig,
} from './config/favouriteTitleConfig.ts';
import {
	GMStorageExtra,
} from '../../../lib/Storage/GMStorageExtra.ts';

/**
 * 从本地存储检索收藏夹标题，如果找不到，则检索空字符串。
 *
 * @return {string} 本地存储中的收藏夹标题或空字符串。
 */
export const getFavouriteTitle = (): string => {
	return GMStorageExtra.getItem( favouriteTitleConfig.key, favouriteTitleConfig.title );
};
