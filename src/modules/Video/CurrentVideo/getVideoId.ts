/**
 * 获取视频id
 * @returns 视频id
 * */
export const getVideoId = (): `BV1${ string }` => {
	// 获取视频BV号
	const metaLinkDom = document.querySelector( 'meta[itemprop="url"][content^="https://www.bilibili.com/video/BV1"]' ) as HTMLMetaElement | null;
	if ( !metaLinkDom ) {
		throw new Error( '当前页面不是视频页' );
	}
	return metaLinkDom.content.split( '/' ).find( item => item.startsWith( 'BV1' ) ) as `BV1${ string }`;
};
