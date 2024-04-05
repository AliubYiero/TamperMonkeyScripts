/**
 * api_listAllFavorites.ts
 * created by 2024/3/11
 * @file 展示所有的收藏夹(列表) api
 * @author  Yiero
 * */
import { xhrRequest } from '../xhrRequest.ts';
import { FavoriteInfo } from '../interfaces/FavoriteInfo.ts';

/**
 * 发送一个请求，列出在特定文件夹中创建的所有收藏夹。
 *
 * @param {string} upUid - 用户ID。
 * @return {Promise} 请求的响应。
 */
export const api_ListAllFavorites = async ( upUid: number ): Promise<FavoriteInfo[]> => {
	const res = await xhrRequest( '/x/v3/fav/folder/created/list-all', 'GET', {
		parma: {
			up_mid: upUid,
		},
	} );
	return res.list;
};
