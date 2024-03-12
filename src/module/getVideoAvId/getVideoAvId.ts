import { bvToAv } from '../../utils';

/**
 * 从URL路径检索视频ID，并在必要时进行转换。
 *
 * @return {string} 从URL路径中提取的视频ID。
 */
export const getVideoAvId = (): string => {
	const urlPathNameList = new URL( window.location.href ).pathname.split( '/' );
	let videoId = urlPathNameList.find( urlPathName => urlPathName.startsWith( 'BV1' ) || urlPathName.startsWith( 'av' ) );
	
	if ( !videoId ) {
		throw new Error( '没有获取到视频id' );
	}
	
	// 如果获取到的视频号是 BV 号, 则转换为 av 号
	if ( videoId.startsWith( 'BV1' ) ) {
		videoId = String( bvToAv( <`BV1${ string }`> videoId ) );
	}
	
	// 如果获取到的视频号是 av 号, 则去除av编号头
	if ( videoId.startsWith( 'av' ) ) {
		videoId = videoId.slice( 2 );
	}
	
	return videoId;
};
