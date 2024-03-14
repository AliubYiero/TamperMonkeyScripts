/**
 * bin.ts
 * created by 2023/7/14
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { api_getLivePlayUrl, api_getRoomStatus, api_requestLivePlayUrl, getLiveRoomId } from './src/api'
import { print } from './src/Info';


( async () => {
	let RoomId: number = 0;
	let LiveUrl: string = '';
	await getLiveRoomId().then(
		( resolve: unknown ) => {
			const res = resolve as { data: { roomId: string } };
			RoomId = parseInt( res.data.roomId );
			
			print.log( RoomId );
		}
	);
	
	
	await api_getRoomStatus( { roomId: RoomId } ).then(
		( res ) => {
			print.log( '直播间状态', res );
			
			RoomId = ( <{ roomTrueId: number }> res ).roomTrueId;
			
		}
	)
	
	await api_getLivePlayUrl( { roomId: RoomId } ).then(
		( res: unknown ) => {
			if ( res ) {
				LiveUrl = ( <{ liveUrl: string }> res ).liveUrl
				print.log( '直播间链接', LiveUrl );
			}
		}
	)
	
	await api_requestLivePlayUrl( { liveUrl: LiveUrl } ).then(
		( res ) => {
			print.log( res );
		}
	)
	
} )();
