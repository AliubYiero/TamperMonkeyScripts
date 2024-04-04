/**
 * 获取用户id
 * */
export const getUserId = (): number => {
	const userIdCookie = document.cookie
		.split( '; ' )
		.find( item => item.startsWith( 'DedeUserID' ) );
	
	if ( !userIdCookie ) {
		throw new Error( '未找到用户id' );
	}
	
	// 返回用户id
	return Number( userIdCookie.split( '=' )[ 1 ] );
};
