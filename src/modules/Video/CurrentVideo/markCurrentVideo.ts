import { handleParseWatchedVideoIdList } from '../../../utils';

import { getVideoId } from './getVideoId.ts';

/**
 * 标记视频本身
 * */
export const markCurrentVideo = async ( videoTitleDom: HTMLElement ) => {
	const videoId = getVideoId();
	// 比对视频是否已看过
	const isRead = handleParseWatchedVideoIdList.getInstance().existVideoId( videoId );
	console.log( isRead, videoTitleDom );
	// 如果已看, 则添加已看标记
	// 如果未看, 则添加观看中标记
	videoTitleDom.classList.add( 'watched-item' );
	videoTitleDom.classList.add( isRead ? 'is-watched' : 'is-watching' );
};
