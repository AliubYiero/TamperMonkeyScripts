/**
 * api_listAllFavorites.ts
 * created by 2024/3/11
 * @file 展示所有的收藏夹(列表) api
 * @author  Yiero
 * */
import { request } from '../request.ts';

/**
 * 发送一个请求，列出在特定文件夹中创建的所有收藏夹。
 *
 * @param {string} upUid - 用户ID。
 * @return {Promise} 请求的响应。
 */
export const api_listAllFavorites = ( upUid: string ): Promise<any> => {
	return request( '/x/v3/fav/folder/created/list-all', 'GET', {
		up_mid: upUid,
	} ).then( res => {
		if ( res.code !== 0 ) {
			throw new Error( res.message );
		}
		
		return res.data.list;
	} );
};
