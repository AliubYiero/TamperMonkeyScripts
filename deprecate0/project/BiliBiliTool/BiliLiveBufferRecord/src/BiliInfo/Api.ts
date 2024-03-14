/**
 * Api.ts
 * created by 2023/6/9
 * @file B站Api相关接口调用
 * @author  Yiero
 * @version beta1.0.0
 * */

import { Info } from '../ProjectInfo/Info'

export {
	getRoomStatus,
	getLivePlayUrl,
	requestLivePlayUrl,
}

/**
 * 获取直播间状态
 * @param {{roomId:string}} res
 * */
function getRoomStatus( res: { roomId: string } ) {
	let { roomId } = res;
	Info.info( `正在获取直播间 ${ roomId } 的房间页初始化信息` )
	// @ts-ignore
	GM_xmlhttpRequest( {
		method: "GET",
		/** @tutorial https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/live/info.md#%E8%8E%B7%E5%8F%96%E6%88%BF%E9%97%B4%E9%A1%B5%E5%88%9D%E5%A7%8B%E5%8C%96%E4%BF%A1%E6%81%AF */
		url: `https://api.live.bilibili.com/room/v1/Room/room_init?id=${ roomId }`,
		headers: {
			"Content-Type": "application/json"
		},
		onload: function ( response: XMLHttpRequest ) {
			// 获取请求响应状态
			let { code, data } = JSON.parse( response.responseText );
			if ( <number> code === 60004 ) {
				Info.error( '直播间不存在' );
				return;
			}
			
			// 获取请求响应信息
			const { live_status, is_hidden, is_locked, encrypted, room_id, live_time } = data;
			if ( live_status !== 1 ) {
				Info.error( '当前直播间没有开播' );
				return;
			} else if ( is_hidden || is_locked || encrypted ) {
				Info.error( '无法访问当前直播间(隐藏/上锁/加密)' );
				return;
			}
			
			/** @todo 转换live_time的时间，目前未知其转换规则 */
			Info.info( `成功获取直播间 ${ room_id } 初始信息，当前直播间已直播的时间为 ${ live_time } ` );
			// 返回直播间真实Id
			return { roomId: room_id };
		}
	} )
}


/**
 * 获取直播间
 * @param {{roomId:string, quality?: number}} res
 * */
function getLivePlayUrl( res: { roomId: string, quality?: number } ) {
	let { roomId, quality } = res;
	quality ||= 4;  // 当画质代码错误时，自动选择最低画质
	Info.info( `正在获取直播间 ${ roomId } 的房间页初始化信息` );
	
	// @ts-ignore
	GM_xmlhttpRequest( {
		method: "GET",
		/** @tutorial https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/live/live_stream.md#%E6%A0%B9%E6%8D%AE%E7%9C%9F%E5%AE%9E%E7%9B%B4%E6%92%AD%E9%97%B4%E5%8F%B7%E8%8E%B7%E5%8F%96%E7%9B%B4%E6%92%AD%E8%A7%86%E9%A2%91%E6%B5%81 */
		url: `https://api.live.bilibili.com/room/v1/Room/playUrl?cid=${ roomId }&quality=${ quality }`,
		headers: {
			"Content-Type": "application/json"
		},
		onload: function ( response: XMLHttpRequest ) {
			/**
			 * 判断相应状态
			 * */
			let { code, data } = JSON.parse( response.responseText );
			if ( <number> code === -400 ) {
				Info.error( '参数错误' );
				return;
			} else if ( <number> code === 19002003 ) {
				Info.error( '房间信息不存在' );
				return;
			}
			
			
			console.log( data );
			let { accept_quality, quality_description, current_quality, durl } = data;
			
			/**
			 * 判断画质是否为最高画质（默认选中最高画质）
			 * @todo 可以自己选择录制画质
			 * */
			// 获取当前选中画质中文描述
			quality_description.forEach( ( quality_description: { qn: number, desc: string } ) => {
				let { qn, desc } = quality_description;
				if ( qn === current_quality ) {
					Info.info( `当前选中路线画质为 ${ desc } ` );
				}
			} )
			// 判断画质是否为最高画质
			let highestQuality = parseInt( accept_quality[ 0 ] );
			if ( current_quality !== highestQuality ) {
				// 不是最高画质，重定向到最高画质路线
				Info.info( '当前选中路线不是最高画质，正在重新获取链接' );
				return getLivePlayUrl( { roomId: roomId, quality: highestQuality } );
			}
			
			/**
			 * 获取直播流链接
			 * */
			durl.forEach( ( url: { url: string, [ propName: string ]: any } ) => {
				let liveUrl = url.url;
				Info.info( '已获取直播流' );
				console.log( liveUrl );
				return { liveUrl }
			} )
			
			if ( durl.length === 0 ) {
				Info.warn( '没有可用直播流' );
			}
		}
	} )
}

/**
 * 请求直播流
 * */
function requestLivePlayUrl( res: { liveUrl: string } ) {
	let { liveUrl } = res;
	// @ts-ignore
	GM_xmlhttpRequest( {
		url: liveUrl,
		method: 'GET',
		onload: function ( response: XMLHttpRequest ) {
			console.log( response );
		}
	} )
}
