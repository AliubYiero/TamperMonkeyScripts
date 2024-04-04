import { getUserId } from '../getUserId/getUserId.ts';
import { api_GetFavoriteIds, api_ListAllFavorites } from '../../api';
import { VideoIdMap } from '../interfaces/VideoIdMap.ts';

/**
 * 获取所有已经收藏过的视频BVID
 * */
export const getAllFavoriteVideoIdList = async (): Promise<VideoIdMap> => {
	// 获取用户id
	const userId = getUserId();
	
	// 获取当前用户所有的收藏夹的mlid
	const favoriteMlidList = await api_ListAllFavorites( String( userId ) ).then( res => {
		return res.map( item => item.id );
	} );
	
	const videoIdMap: Map<string, Set<string>> = new Map();
	// 依次遍历用户的收藏夹, 获取其中的视频bvid
	for ( let favoriteId of favoriteMlidList ) {
		await api_GetFavoriteIds( favoriteId ).then( favoriteIdInfoList => {
			// 遍历获取到的 favoriteIdInfo ,
			favoriteIdInfoList.forEach( item => {
				// 去除 BV1 前缀
				const videoId = item.bvid.slice( 3 );
				// 获取当前视频id前缀
				const videoIdPrefix = videoId.slice( 0, 1 );
				
				// 如果当前视频id的前缀不存在, 则创建
				if ( !videoIdMap.has( videoIdPrefix ) ) {
					videoIdMap.set( videoIdPrefix, new Set() );
				}
				
				// 如果存在, 则直接添加到对应的set中
				( <Set<string>> videoIdMap.get( videoIdPrefix ) ).add( videoId );
			} );
		} );
	}
	
	return videoIdMap;
};
