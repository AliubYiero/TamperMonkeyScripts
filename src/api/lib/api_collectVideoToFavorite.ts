/**
 * api_collectVideoToFavorite.ts
 * created by 2024/3/11
 * @file 收藏视频到指定收藏夹中
 * @author  Yiero
 * */

import { request } from '../request.ts';

/**
 * 使用提供的视频ID和收藏夹ID将视频收集到收藏夹。
 *
 * @param {string} videoId - 要收集的视频的ID。
 * @param {string} favoriteId - 将要添加视频的收藏夹的ID。
 * @return {Promise<any>} 收集视频后返回到收藏夹的数据。
 *
 * @fixme 接口请求, csrf校验失败. 无法解决
 */
export const api_collectVideoToFavorite = ( videoId: string, favoriteId: string ): Promise<any> => {
	// 从 document.cookie 中获取 bili_jct
	const csrf = new URLSearchParams( document.cookie.split( '; ' ).join( '&' ) ).get( 'bili_jct' ) || '';
	
	const data = {
		rid: videoId,
		type: '2',
		add_media_ids: favoriteId,
		csrf: csrf,
	};
	
	return request(
		`/x/v3/fav/resource/deal`,
		'POST',
		{
			...data,
		},
		{
			headers: {
				referer: document.URL,
			},
		},
	).then( res => {
		console.log( csrf );
		if ( res.code !== 0 ) {
			throw new Error( res.message );
		}
		return res.data;
	} );
};
