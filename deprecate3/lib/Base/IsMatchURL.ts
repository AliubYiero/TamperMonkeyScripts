/**
 * MatchURL.ts
 * created by 2023/8/24
 * @file
 * @author  Yiero
 * */

export {
	isMatchURL
}

/**
 * 判断当前URL是否为指定匹配URL
 * @param { RegExp } regExpList
 * @return { boolean }
 * */
function isMatchURL( ...regExpList: ( RegExp | string )[] ) {
	const matchResultList: boolean[] = [];
	regExpList.forEach( ( regExp ) => {
		if ( typeof regExp === 'string' ) {
			regExp = new RegExp( regExp );
		}
		
		// 写入捕获结果
		matchResultList.push( !!document.URL.match( regExp ) );
	} )
	
	return matchResultList.includes( true );
}
