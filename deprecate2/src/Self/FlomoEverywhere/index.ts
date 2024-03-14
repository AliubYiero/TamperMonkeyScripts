/* entry */

import request from 'umi-request'
import { config } from './config/global.config'

function sendFlomo( content: string ) {
	request.post( config.api, {
			data: {
				content: content
			}
		} )
		.then( ( res ) => {
			console.log( res );
		} )
		.catch( ( err ) => {
			console.error( err );
		} )
}
;( () => {
	
	window.addEventListener( 'storage', ( e ) => {
		if ( e.key !== 'flomo-content' || !e.newValue ) {
			return;
		}
		
		sendFlomo( e.newValue );
	} )
} )();
