/**
 * api_collectVideoToFavorite.ts
 * created by 2024/3/11
 * @file 收藏视频到指定收藏夹中
 * @author  Yiero
 * */

import { xhrRequest } from '../xhr_request.ts';
import { requestConfig } from '../config/requestConfig.ts';

/**
 * 使用提供的视频ID和收藏夹ID将视频收集到收藏夹。
 *
 * @param {string} videoId - 要收集的视频的ID。
 * @param {string} favoriteId - 将要添加视频的收藏夹的ID。
 * @return {Promise<any>} 收集视频后返回到收藏夹的数据。
 */
export const api_collectVideoToFavorite = ( videoId: string, favoriteId: string ): Promise<any> => {
	const formData = {
		rid: videoId,
		type: '2',
		add_media_ids: favoriteId,
		csrf: requestConfig.csrf,
	};
	
	return xhrRequest(
		'/x/v3/fav/resource/deal',
		'POST',
		formData,
	);
	
	
	/**
	 * 不能使用 GM_xmlhttpRequest 会csrf校验失败, 不知道原因, 下列代码不能使用
	 * @deprecated
	 * */
	// return request(
	// 	`/x/v3/fav/resource/deal`,
	// 	'POST',
	// 	{
	// 		...formData,
	// 	},
	// 	{
	// 		headers: {
	// 			referer: document.URL,
	// 		},
	// 	},
	// ).then( res => {
	// 	console.log( csrf );
	// 	if ( res.code !== 0 ) {
	// 		throw new Error( res.message );
	// 	}
	// 	return res.data;
	// } );
};
