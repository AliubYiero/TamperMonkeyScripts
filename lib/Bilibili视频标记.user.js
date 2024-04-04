// ==UserScript==
// @name	Bilibili视频标记
// @version	0.1.0-b
// @license	GPL-3
// @namespace	https://github.com/AliubYiero/TamperMonkeyScripts
// @run-at	document-idle
// @author	Yiero
// @homepage	https://github.com/AliubYiero/TamperMonkeyScripts
// @description	通过收藏夹中的视频判断视频是否已看
// @match	https://www.bilibili.com/*
// @grant	GM_addStyle
// @icon	https://www.bilibili.com/favicon.ico
// ==/UserScript==

var __defProp = Object.defineProperty,
	__publicField = ( obj, key, value ) => ( ( ( obj, key, value ) => {
		key in obj ? __defProp( obj, key, {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: value,
		} ) : obj[key] = value;
	} )( obj, 'symbol' != typeof key ? key + '' : key, value ), value );

const requestConfig_baseURL = 'https://api.bilibili.com',
	xhrRequest = ( new URLSearchParams( document.cookie.split( '; ' ).join( '&' ) ).get( 'bili_jct' ),
		( url, method, data ) => {
			url.startsWith( 'http' ) || ( url = requestConfig_baseURL + url );
			const xhr = new XMLHttpRequest;
			return xhr.open( method, url ), xhr.withCredentials = !0, xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' ),
				new Promise( ( ( resolve, reject ) => {
					xhr.addEventListener( 'load', ( () => {
						const response = JSON.parse( xhr.response );
						return 0 !== response.code ? reject( response.message ) : resolve( response.data );
					} ) ), xhr.addEventListener( 'error', ( () => reject( xhr.status ) ) ), xhr.send( new URLSearchParams( data ) );
				} ) );
		} ), getAllFavoriteVideoIdList = async () => {
		const userId = ( () => {
				const userIdCookie = document.cookie.split( '; ' ).find( ( item => item.startsWith( 'DedeUserID' ) ) );
				if ( !userIdCookie ) {
					throw new Error( '\u672a\u627e\u5230\u7528\u6237id' );
				}
				return Number( userIdCookie.split( '=' )[1] );
			} )(), favoriteMlidList = await ( async upUid => {
				const res = await xhrRequest( '/x/v3/fav/folder/created/list-all', 'GET', {
					up_mid: upUid,
				} );
				if ( 0 !== res.code ) {
					throw new Error( res.message );
				}
				return res.data.list;
			} )( String( userId ) ).then( ( res => res.map( ( item => item.id ) ) ) ),
			videoIdMap = new Map;
		for ( let favoriteId of
			favoriteMlidList ) await ( media_id = favoriteId, xhrRequest( '/x/v3/fav/resource/ids', 'GET', {
			media_id: media_id,
			platform: 'web',
		} ).then( ( res => {
			if ( 0 !== res.code ) {
				throw new Error( res.message );
			}
			return res.data;
		} ) ) ).then( ( favoriteIdInfoList => {
			favoriteIdInfoList.forEach( ( item => {
				const videoId = item.bvid.slice( 3 ),
					videoIdPrefix = videoId.slice( 0, 1 );
				videoIdMap.has( videoIdPrefix ) || videoIdMap.set( videoIdPrefix, new Set ), videoIdMap.get( videoIdPrefix ).add( videoId );
			} ) );
		} ) );
		var media_id;
		return videoIdMap;
	}, _useReadVideoIdListStorage = class _useReadVideoIdListStorage {
		constructor() {
			__publicField( this, 'videoIdMap', new Map ), this.init();
		}
		
		static getInstance() {
			return this.instance || ( this.instance = new _useReadVideoIdListStorage ), this.instance;
		}
		
		existVideoId( videoBvId ) {
			const {
				videoId: videoId,
				videoIdPrefix: videoIdPrefix,
			} = this.handleVideoIdPrefix( videoBvId );
			if ( !this.videoIdMap.has( videoIdPrefix ) ) {
				return !1;
			}
			return this.videoIdMap.get( videoIdPrefix ).has( videoId );
		}
		
		set( videoBvId ) {
			const {
				videoId: videoId,
				videoIdPrefix: videoIdPrefix,
			} = this.handleVideoIdPrefix( videoBvId );
			this.videoIdMap.has( videoIdPrefix ) || this.videoIdMap.set( videoIdPrefix, new Set );
			this.videoIdMap.get( videoIdPrefix ).add( videoId );
		}
		
		handleVideoIdPrefix( videoId ) {
			return {
				videoId: videoId.slice( 2 ),
				videoIdPrefix: videoId.slice( 2, 4 ),
			};
		}
		
		async init() {
			this.videoIdMap = await getAllFavoriteVideoIdList();
		}
	};

__publicField( _useReadVideoIdListStorage, 'instance' );

let useReadVideoIdListStorage = _useReadVideoIdListStorage;

const urlModuleMapper = {
	'https://www.bilibili.com/': 'index',
	'https://t.bilibili.com/': 'dynamic',
};

class EventListener {
	static push( value ) {
		window.dispatchEvent( new CustomEvent( this.EVENT_NAME, {
			detail: value,
		} ) );
	}
	
	static listen( callback ) {
		window.addEventListener( this.EVENT_NAME, ( e => {
			const element = e.detail;
			callback( element );
		} ) );
	}
}

__publicField( EventListener, 'EVENT_NAME', 'ElementUpdate' );

const observeContainerLoad = async () => await ( async ( selector, options = {} ) => {
		const {
			father: father = document,
			timeoutPerSecond: timeoutPerSecond = 20,
			delayPerSecond: delayPerSecond = .3,
		} = options;
		let resolve, reject;
		const promise = new Promise( ( ( res, rej ) => {
			resolve = res, reject = rej;
		} ) ), element = father.querySelector( selector );
		if ( element ) {
			return setTimeout( ( () => {
				resolve( element );
			} ), 1e3 * delayPerSecond ), promise;
		}
		let timer = window.setTimeout( ( () => {
			clearTimeout( timer ), reject( new Error( `\u7b49\u5f85\u5143\u7d20 ${ selector } \u8d85\u65f6` ) );
		} ), 1e3 * timeoutPerSecond );
		const observer = new MutationObserver( ( mutationsList => {
			var _a;
			for ( let mutation of mutationsList ) for ( let addedNode of
				mutation.addedNodes ) {
				if ( addedNode.nodeType !== Node.ELEMENT_NODE ) {
					return;
				}
				const element2 = null == ( _a = addedNode.parentNode ) ? void 0 : _a.querySelector( selector );
				if ( !element2 ) {
					return;
				}
				clearTimeout( timer ), setTimeout( ( () => {
					resolve( element2 );
				} ), 1e3 * delayPerSecond ), observer.disconnect();
			}
		} ) );
		return observer.observe( father, {
			childList: !0,
			subtree: !0,
		} ), promise;
	} )( '.recommended-container_floor-aside > .container' ),
	listenIndex = async () => {
		const videoContainer = await observeContainerLoad();
		( () => {
			const handleClickVideoCard = element => {
				element.classList.contains( 'bili-video-card' ) || !element.parentElement ? element.classList.contains( 'is-not-read' ) && ( element.classList.remove( 'is-not-read' ),
					element.classList.add( 'is-read' ) ) : handleClickVideoCard( element.parentElement );
			};
			GM_addStyle( '\n.bili-video-card.is-rcmd.is-read {\n\topacity: .5\n}\n.bili-video-card.is-rcmd.read-item::after {\n\tposition: absolute;\n\ttop: 5px;\n\tleft: 5px;\n\t\n\tfont-size: 13px;\n\tpadding: 3px 8px;\n\tcolor: #fff;\n\tfont-weight: 700;\n\tborder-radius: 4px;\n\tz-index: 20;\n}\n.bili-video-card.is-rcmd.is-read::after {\n\tcontent: "\u5df2\u770b";\n\tbackground-color: hsla(0, 0%, 60%, .77);\n}\n.bili-video-card.is-rcmd.is-not-read::after {\n\tcontent: "\u672a\u770b";\n\tbackground-color: rgba(3, 169, 244, .77);\n}\n' ),
				EventListener.listen( ( element => {
					element.addEventListener( 'mousedown', ( e => {
						2 !== e.button && handleClickVideoCard( e.target );
					} ) ), element.classList.add( 'read-item' );
					const linkDom = element.querySelector( 'a[href^="https://www.bilibili.com/video/BV1"]' );
					if ( !linkDom ) {
						return;
					}
					const bvId = linkDom.href.split( '/' ).find( ( item => item.startsWith( 'BV1' ) ) ),
						isRead = useReadVideoIdListStorage.getInstance().existVideoId( bvId );
					element.classList.add( isRead ? 'is-read' : 'is-not-read' );
				} ) );
		} )(), ( videoContainer => {
			const videoCardTokenValueList = [ 'bili-video-card is-rcmd' ];
			videoCardTokenValueList.map( ( token => {
				const selector = '.' + token.split( ' ' ).join( '.' );
				return Array.from( document.querySelectorAll( selector ) );
			} ) ).flat().forEach( ( element => {
				EventListener.push( element );
			} ) ), new MutationObserver( ( mutations => {
				mutations.forEach( ( mutation => {
					for ( let addedNode of mutation.addedNodes ) {
						if ( addedNode.nodeType !== Node.ELEMENT_NODE || !videoCardTokenValueList.includes( addedNode.classList.value ) ) {
							return;
						}
						EventListener.push( addedNode );
					}
				} ) );
			} ) ).observe( videoContainer, {
				childList: !0,
			} );
		} )( videoContainer );
	};

( async () => {
	const currentUrl = ( () => {
		const originURL = new URL( document.URL ),
			cleanURL = originURL.origin + originURL.pathname;
		return urlModuleMapper[cleanURL] || void 0;
	} )();
	currentUrl && 'index' === currentUrl && await listenIndex();
} )();
