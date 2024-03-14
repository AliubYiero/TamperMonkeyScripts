/**
 * api.ts
 * created by 2023/7/14
 * @file
 * @tutorial https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/live/info.md
 * @author  Yiero
 * @version beta1.0.0
 * */

import axios from 'axios'
import { print } from './Info'


export {
	getLiveRoomId,
	api_getRoomStatus,
	api_getLivePlayUrl,
	api_requestLivePlayUrl
}


/**
 * 从URL中获取直播间Id
 * @return {Promise}
 * */
function getLiveRoomId(): Promise<unknown> {
	const urlPathList = location.pathname.split( '/' ) as string[];
	const roomId: string = urlPathList[ urlPathList.length - 1 ];
	return new Promise( ( resolve ) => {
		resolve( { data: { roomId } } )
	} );
}

/**
 * 获取直播间状态
 * @param {{roomId:string}} res
 * */
const api_getRoomStatus = ( res: { roomId: number } ) => {
	let { roomId } = res;
	print.info( `正在获取直播间 ${ roomId } 的房间页初始化信息` );
	
	return axios.get( `https://api.live.bilibili.com/room/v1/Room/room_init?id=${ roomId }` ).then( ( res ) => {
		print.log( res );
		
		let { code, data } = res.data;
		// 获取请求响应状态
		if ( <number> code === 60004 ) {
			print.error( '直播间不存在' );
			return;
		}
		
		// 获取请求响应信息
		const { live_status, is_hidden, is_locked, encrypted, room_id, live_time } = data;
		if ( live_status !== 1 ) {
			print.error( '当前直播间没有开播' );
			return;
		}
		else if ( is_hidden || is_locked || encrypted ) {
			print.error( '无法访问当前直播间(隐藏/上锁/加密)' );
			return;
		}
		
		/** @todo 转换live_time的时间，目前未知其转换规则 */
		print.info( `成功获取直播间 ${ room_id } 初始信息，当前直播间已直播的时间为 ${ live_time } ` );
		
		// 返回直播间真实Id
		return { roomTrueId: ( <number> room_id ) };
		
	} )
}

/**
 * 获取直播间
 * @param {{roomId:string, quality?: number}} res
 * */
// @ts-ignore
const api_getLivePlayUrl = ( res: { roomId: number, quality?: number } ) => {
	let { roomId, quality } = res;
	quality ||= 10000;  // 默认选择最高画质
	print.info( `正在获取直播间 ${ roomId } 的房间页初始化信息` );
	
	return axios.get( `https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo?room_id=${ roomId }&protocol=0,1&format=0,2&codec=0,1&qn=${ quality }&platform=web&ptype=16` ).then(
		( res ) => {
			print.log( '直播间初始化信息', res.data );
			
			let { code, data } = res.data;
			
			// 判断直播状态
			if ( <number> code === -400 ) {
				print.error( '参数错误' );
				return;
			}
			else if ( <number> code === 19002003 ) {
				print.error( '房间信息不存在' );
				return;
			}
			
			let { stream } = data.playurl_info.playurl;
			
			( stream )[ 0 ].format[ 0 ].codec[ 0 ]
			
			
			/**
			 * 判断画质是否为最高画质（默认选中最高画质）
			 * @todo 可以自己选择录制画质
			 * */
			// 获取当前选中画质中文描述
			// quality_description.forEach( ( quality_description: { qn: number, desc: string } ) => {
			// 	let { qn, desc } = quality_description;
			// 	if ( qn === current_quality ) {
			// 		print.info( `当前选中路线画质为 ${ desc } ` );
			// 	}
			// } )
			
			// 判断画质是否为最高画质
			// let highestQuality = parseInt( accept_quality[ 0 ] );
			// if ( current_quality !== highestQuality ) {
			// 	// 不是最高画质，重定向到最高画质路线
			// 	print.info( '当前选中路线不是最高画质，正在重新获取链接' );
			// 	return api_getLivePlayUrl( { roomId: roomId, quality: highestQuality } );
			// }
			
			
			// print.log( 'durl', durl )
			/**
			 * 获取直播流链接
			 * */
			// if ( durl.length === 0 ) {
			// 	print.warn( '没有可用直播流' );
			// 	return 'Error';
			// }
			//
			// let liveUrl = durl[ 0 ].url as string;
			// print.info( '已获取直播流', liveUrl );
			// return { liveUrl };
		}
	)
}

/**
 * 请求直播流
 * */
async function api_requestLivePlayUrl( res: { liveUrl: string } ) {
	let { liveUrl } = res;
	
	
	// return axios.get( liveUrl, { cancelToken: source.token } ).then(
	// 	( res ) => {
	// 		info.log( res.data )
	// 		return res;
	// 	}
	// )
	
	// return axios( {
	// 	method: 'get',
	// 	url: liveUrl,
	// 	responseType: 'stream'
	// } ).then( ( res ) => {
	// 	info.log( '获取直播流', res.data );
	// 	return res;
	// } )
	
	
	liveUrl = liveUrl.replace( 'mid=0', 'mid=12548410' );
	
	const controller = new AbortController();
	const id = setTimeout( () => controller.abort(), 1000 );
	const response = await fetch( liveUrl, { credentials: 'same-origin', signal: controller.signal } )
	clearTimeout( id );
	print.log( response )
	return response;
}
