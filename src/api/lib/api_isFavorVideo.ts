import { request } from '../request.ts';
import { getVideoAvId } from '../../module';

/**
 * api_isFavorVideo.ts
 * created by 2024/3/12
 * @file 判断当前视频是否已经被收藏过了 api
 * @author  Yiero
 * */
export const api_isFavorVideo = (): Promise<boolean> => {
	return request( '/x/v2/fav/video/favoured', 'GET', {
		aid: getVideoAvId(),
	} );
};
