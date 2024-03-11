import { FavoriteInfo } from '../../interfaces';
import { api_collectVideoToFavorite } from '../../api';

/**
 * 将当前视频收藏到最新的收藏夹中
 * */
export const addNewFavorite = async ( videoId: string, latestFavorite: FavoriteInfo ) => {
	// 请求
	const latestFavoriteId = String( latestFavorite.id );
	const res = await api_collectVideoToFavorite( videoId, latestFavoriteId );
	const successfullyAdd = res?.success_num === 0;
	if ( !successfullyAdd ) {
		return;
	}
	console.log( `当前视频已添加至收藏夹 [${ latestFavorite.title }]` );
};
