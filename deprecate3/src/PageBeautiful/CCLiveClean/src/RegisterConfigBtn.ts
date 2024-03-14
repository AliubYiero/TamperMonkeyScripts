import { GMConfigMenu } from '../../../../lib/GM_Lib'
import { whiteList } from './implements/WhiteList'

export {
	registerConfigBtn
}

function registerConfigBtn( liveId: number ) {
	/* 添加新增按钮 */
	new GMConfigMenu( () => {
		const result = prompt( `输入需要添加白名单的直播间的数字Id (网页地址中的数字Id):
当前白名单:
[${ whiteList.whiteList.join( ', ' ) }]` );
		if ( result ) {
			whiteList.add( Number( result ) );
		}
	} ).open( '添加直播间白名单' );
	
	/* 添加删除白名单按钮 */
	new GMConfigMenu( () => {
		const result = prompt( `输入需要删除白名单的直播间数字Id(网页地址中的数字Id):
当前白名单:
[${ whiteList.whiteList.join( ', ' ) }]`, String( liveId || whiteList.whiteList[ 0 ] || '' ) )
		if ( result ) {
			whiteList.delete( Number( result ) );
		}
	} ).open( '删除直播间白名单' );
}
