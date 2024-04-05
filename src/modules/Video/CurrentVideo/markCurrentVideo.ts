import { useWatchedVideoIdListStorage } from '../../../utils';

/**
 * 标记视频本身
 * */
export const markCurrentVideo = async ( videoTitleDom: HTMLElement ) => {
	// 获取视频BV号
	const metaLinkDom = document.querySelector( 'meta[itemprop="url"][content^="https://www.bilibili.com/video/BV1"]' ) as HTMLMetaElement | null;
	if ( !metaLinkDom ) {
		throw new Error( '当前页面不是视频页' );
	}
	const videoId = metaLinkDom.content.split( '/' ).find( item => item.startsWith( 'BV1' ) ) as `BV1${ string }`;
	
	// 比对视频是否已看过
	const isRead = useWatchedVideoIdListStorage.getInstance().existVideoId( videoId );
	console.log( isRead, videoTitleDom );
	// 如果已看, 则添加已看标记
	// 如果未看, 则添加观看中标记
	videoTitleDom.classList.add( 'watched-item' );
	videoTitleDom.classList.add( isRead ? 'is-watched' : 'is-watching' );
};
