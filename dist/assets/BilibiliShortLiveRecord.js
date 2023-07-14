// ==UserScript==
// @name		BilibiliShortLiveRecord
// @description		B站直播自动录制短视频
// @author		Yiero
// @version		1.0.0
// @match		https://live.bilibili.com/*
// @grant		GM_addStyle
// @require		https://cdn.bootcdn.net/ajax/libs/axios/1.3.6/axios.min.js
// @icon		https://live.bilibili.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts
// @license		GPL
// @updateURL		https://github.com/AliubYiero/TamperMonkeyScripts/blob/master/dist/assets/undefined.js
// @downloadUrl		https://github.com/AliubYiero/TamperMonkeyScripts/blob/master/dist/assets/undefined.js
// ==/UserScript==

var __defProp = Object.defineProperty;
var __defNormalProp = ( obj, key, value ) => key in obj ? __defProp( obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
} ) : obj[key] = value;
var __publicField = ( obj, key, value ) => {
	__defNormalProp( obj, typeof key !== "symbol" ? key + "" : key, value );
	return value;
};

class Info {
	constructor( projectName ) {
		// @ts-ignore
		__publicField( this, "projectName" );
		__publicField( this, "header" );
		this.projectName = projectName;
		this.header = `[${ projectName }]`;
	}
	
	log( ...msg ) {
		/* @__PURE__ */
		( () => {
		} )( ...this.contentInfo( ...msg ) );
	}
	
	info( ...msg ) {
		console.info( ...this.contentInfo( ...msg ) );
	}
	
	warn( ...msg ) {
		console.warn( ...this.contentInfo( ...msg ) );
	}
	
	error( ...msg ) {
		console.error( ...this.contentInfo( ...msg ) );
	}
	
	contentInfo( ...msg ) {
		return [ this.header, ...msg ];
	}
}

const config = {
	projectName: "BilibiliShortLiveRecord"
};
const info = new Info( config.projectName );

function getLiveRoomId() {
	const urlPathList = location.pathname.split( "/" );
	const roomId = urlPathList[urlPathList.length - 1];
	return new Promise( ( resolve ) => {
		resolve( { data: { roomId } } );
	} );
}

const api_getRoomStatus = ( res ) => {
	let { roomId } = res;
	info.info( `正在获取直播间 ${ roomId } 的房间页初始化信息` );
	return axios.get( `https://api.live.bilibili.com/room/v1/Room/room_init?id=${ roomId }` ).then( ( res2 ) => {
		info.log( res2 );
		let { code, data } = res2.data;
		if ( code === 60004 ) {
			info.error( "直播间不存在" );
			return;
		}
		const { live_status, is_hidden, is_locked, encrypted, room_id, live_time } = data;
		if ( live_status !== 1 ) {
			info.error( "当前直播间没有开播" );
			return;
		} else if ( is_hidden || is_locked || encrypted ) {
			info.error( "无法访问当前直播间(隐藏/上锁/加密)" );
			return;
		}
		info.info( `成功获取直播间 ${ room_id } 初始信息，当前直播间已直播的时间为 ${ live_time } ` );
		return { roomTrueId: room_id };
	} );
};
const api_getLivePlayUrl = ( res ) => {
	let { roomId, quality } = res;
	quality || ( quality = 1e4 );
	info.info( `正在获取直播间 ${ roomId } 的房间页初始化信息` );
	return axios.get( `https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo?room_id=${ roomId }&protocol=0,1&format=0,2&codec=0,1&qn=${ quality }&platform=web&ptype=16` ).then(
		( res2 ) => {
			info.log( "直播间初始化信息", res2.data );
			let { code, data } = res2.data;
			if ( code === -400 ) {
				info.error( "参数错误" );
				return;
			} else if ( code === 19002003 ) {
				info.error( "房间信息不存在" );
				return;
			}
			let { accept_quality, quality_description, current_quality, durl } = data;
			quality_description.forEach( ( quality_description2 ) => {
				let { qn, desc } = quality_description2;
				if ( qn === current_quality ) {
					info.info( `当前选中路线画质为 ${ desc } ` );
				}
			} );
			let highestQuality = parseInt( accept_quality[0] );
			if ( current_quality !== highestQuality ) {
				info.info( "当前选中路线不是最高画质，正在重新获取链接" );
				return api_getLivePlayUrl( { roomId, quality: highestQuality } );
			}
			info.log( "durl", durl );
			if ( durl.length === 0 ) {
				info.warn( "没有可用直播流" );
				return "Error";
			}
			let liveUrl = durl[0].url;
			info.info( "已获取直播流", liveUrl );
			return { liveUrl };
		}
	);
};

async function api_requestLivePlayUrl( res ) {
	let { liveUrl } = res;
	liveUrl = liveUrl.replace( "mid=0", "mid=12548410" );
	const controller = new AbortController();
	const id = setTimeout( () => controller.abort(), 1e3 );
	const response = await fetch( liveUrl, { credentials: "same-origin", signal: controller.signal } );
	clearTimeout( id );
	info.log( response );
	return response;
}

( async () => {
	let RoomId = 0;
	let LiveUrl = "";
	await getLiveRoomId().then(
		( resolve ) => {
			const res = resolve;
			RoomId = parseInt( res.data.roomId );
			info.log( RoomId );
		}
	);
	await api_getRoomStatus( { roomId: RoomId } ).then(
		( res ) => {
			info.log( "直播间状态", res );
			RoomId = res.roomTrueId;
		}
	);
	await api_getLivePlayUrl( { roomId: RoomId } ).then(
		( res ) => {
			info.log( res );
			if ( res ) {
				LiveUrl = res.liveUrl;
			}
		}
	);
	await api_requestLivePlayUrl( { liveUrl: LiveUrl } ).then(
		( res ) => {
			info.log( res );
		}
	);
} )();
