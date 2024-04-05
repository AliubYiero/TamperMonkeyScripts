/**
 * api_GetFavoriteIds.ts
 * created by 2024/4/5
 * @file 获取当前收藏夹中所有的视频BVID
 * @author  Yiero
 * */

import { xhrRequest } from '../xhrRequest.ts';
import { FavoriteIdInfo } from '../interfaces/FavoriteIdInfo.ts';

/**
 * 获取当前收藏夹中的所有视频BVID
 *
 * @param media_id 收藏夹的id
 * */
export const api_GetFavoriteIds = ( media_id: number ): Promise<FavoriteIdInfo[]> => {
	return xhrRequest( '/x/v3/fav/resource/ids', 'GET', {
		parma: {
			media_id,
			platform: 'web',
		},
	} );
};
