/**
 * api_addFavorites.ts
 * created by 2024/3/11
 * @file 新增收藏夹api
 * @author  Yiero
 * */
import { request } from '../request.ts';

/**
 * 新建具有给定标题的收藏夹文件夹。
 *
 * @param {string} favTitle - 收藏夹文件夹的标题。
 * @return {Promise<any>} 请求添加收藏文件夹的结果。
 */
export const api_addFavorites = ( favTitle: string ): Promise<any> => {
	return request( '/x/v3/fav/folder/add', 'POST', {
		// 视频标题
		title: favTitle,
		// 默认私密收藏夹
		privacy: 1,
	} );
};
