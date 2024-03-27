import { EventListener } from '../../utils';
import { getVideoBvId } from './utils';
import { api_GetVideoInfo } from '../../api';

export const listenVideoCardLoad = () => {
	EventListener.listen( async ( element ) => {
		/*
		* 获取视频BV号
		* */
		const videoId = getVideoBvId( element );
		if ( !videoId ) {
			return;
		}
		
		/*
		* 发送网络请求, 获取视频信息
		* */
		const videoInfo = await api_GetVideoInfo( videoId );
		
		console.log(
			videoId, '\n',
			element, '\n',
			videoInfo.title, '\n',
			videoInfo, '\n',
		);
	} );
};
