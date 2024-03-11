/**
 * api_showFavoriteInfo.ts
 * created by 2024/3/11
 * @file 展示某个收藏夹的元数据
 * @author  Yiero
 * */
import { request } from '../request.ts';

/**
 * 根据提供的收藏夹ID生成检索收藏夹文件夹信息的请求。
 *
 * @param {string} favId - 要检索其信息的收藏夹文件夹的ID。
 * @return {Promise} 使用请求的收藏夹文件夹信息解析的Promise。
 */
export const api_showFavoriteInfo = ( favId: string ): Promise<any> => {
	return request( '/x/v3/fav/folder/info', 'GET', {
		media_id: favId,
	} );
};
