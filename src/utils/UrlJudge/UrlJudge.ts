/** 判断Url前缀是否为输入前缀 */
export function urlJudge( urlHeader: string | RegExp ): Boolean {
	if ( typeof urlHeader === 'string' ) {
		urlHeader = new RegExp( urlHeader );
	}
	
	return !!document.URL.match( urlHeader );
	
}
