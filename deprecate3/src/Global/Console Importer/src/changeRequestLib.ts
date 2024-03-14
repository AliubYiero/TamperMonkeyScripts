import { currentCdnLibMap } from '../config/config.ts'
import { libStorage, print } from '../index.ts'

export {
	changeRequestLib
}

export type supportCdnLib =
	'bootcdn'
	| 'jsdilivr'

function changeRequestLib( libName: supportCdnLib ): void
function changeRequestLib( libIndex: number ): void
function changeRequestLib( libName: string | number ): void {
	if ( typeof libName === 'number' ) {
		libName = Object.keys( currentCdnLibMap )[ libName ];
	}
	
	if ( !libName ) {
		print.error( `不存在库 ${ libName }...` );
		return;
	}
	
	libStorage.set( libName );
	print.log( '成功切换到cdn库: ', libName );
}
