/**
 * api_sortFavorites.ts
 * created by 2024/3/24
 * @file 给所有收藏夹重新排序
 * @author  Yiero
 * */
import { xhrRequest } from '../xhr_request.ts';
import { requestConfig } from '../config/requestConfig.ts';

export const api_sortFavorites = async ( favoriteIdList: number[] ) => {
	return xhrRequest( '/x/v3/fav/folder/sort', 'POST', {
		sort: favoriteIdList.toString(),
		csrf: requestConfig.csrf,
	} );
};
