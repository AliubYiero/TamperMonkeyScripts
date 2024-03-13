/**
 * hasFavouriteTitle.ts
 *
 * created by 2024/3/12
 *
 * @file 查询是否存在收藏夹检索标题
 * @author  Yiero
 * */

import {
	favouriteTitleConfig,
} from './config/favouriteTitleConfig.ts';
import {
	GMStorageExtra,
} from '../../../lib/Storage/GMStorageExtra.ts';

/**
 * 查询是否存在收藏夹检索标题。
 *
 * @return {boolean} 如果找到收藏夹标题，则返回 true，否则返回 false。
 */
export const hasFavouriteTitle = (): boolean => {
	return GMStorageExtra.hasItem( favouriteTitleConfig.key );
};
