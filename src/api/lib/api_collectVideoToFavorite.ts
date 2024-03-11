/**
 * api_collectVideoToFavorite.ts
 * created by 2024/3/11
 * @file 收藏视频到指定收藏夹中
 * @author  Yiero
 * */

/**
 * 使用提供的视频ID和收藏夹ID将视频收集到收藏夹。
 *
 * @param {string} videoId - 要收集的视频的ID。
 * @param {string} favoriteId - 将要添加视频的收藏夹的ID。
 * @return {Promise<any>} 收集视频后返回到收藏夹的数据。
 */
export const api_collectVideoToFavorite = ( videoId: string, favoriteId: string ): Promise<any> => {
	// 从 document.cookie 中获取 bili_jct
	const csrf = new URLSearchParams( document.cookie.split( '; ' ).join( '&' ) ).get( 'bili_jct' ) || '';
	
	const formData = {
		rid: videoId,
		type: '2',
		add_media_ids: favoriteId,
		csrf: csrf,
	};
	
	/**
	 * 通过原生 xhr 请求添加视频到收藏夹中
	 *
	 * @tutorial https://github.com/the1812/Bilibili-Evolved/blob/8a4e422612a7bd0b42da9aa50c21c7bf3ea401b8/src/core/ajax.ts#L5
	 * @tutorial https://github.com/the1812/Bilibili-Evolved/blob/master/registry/lib/components/video/quick-favorite/QuickFavorite.vue#L146
	 * */
	const url = `https://api.bilibili.com/x/v3/fav/resource/deal`;
	const xhr = new XMLHttpRequest();
	xhr.open( 'POST', url );
	xhr.withCredentials = true;
	xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
	// @ts-ignore
	let { promise, resolve, reject } = Promise.withResolvers();
	xhr.addEventListener( 'load', () => {
		const response = JSON.parse( xhr.response );
		if ( response.code !== 0 ) {
			return reject( response.message );
		}
		return resolve( response.data );
	} );
	xhr.addEventListener( 'error', () => reject( xhr.status ) );
	xhr.send( new URLSearchParams( formData ) );
	return promise;
	
	
	/**
	 * 不能使用 GM_xmlhttpRequest 会csrf校验失败, 不知道原因, 下列代码不能使用
	 * @deprecated
	 * */
	// return request(
	// 	`/x/v3/fav/resource/deal`,
	// 	'POST',
	// 	{
	// 		...formData,
	// 	},
	// 	{
	// 		headers: {
	// 			referer: document.URL,
	// 		},
	// 	},
	// ).then( res => {
	// 	console.log( csrf );
	// 	if ( res.code !== 0 ) {
	// 		throw new Error( res.message );
	// 	}
	// 	return res.data;
	// } );
};
