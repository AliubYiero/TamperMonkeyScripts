// ==UserScript==
// @name		gdwlxyxsAutoVideoPass
// @author		Yiero
// @description		自动秒过视频
// @version		1.0.0
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts
// @icon		https://gdwlxyxs.ytccr.com/favicon.ico
// @match		https://gdwlxyxs.ytccr.com/*
// @license		GPL
// @updateUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/gdwlxyxsAutoVideoPass.js
// @downloadUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/gdwlxyxsAutoVideoPass.js
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

function FreshListenerPushState( callback, delay = 1 ) {
	let _pushState = window.history.pushState;
	window.history.pushState = function () {
		setTimeout( callback, delay * 1e3 );
		return _pushState.apply( this, arguments );
	};
}

function getElement( parent, selector, timeout = 0 ) {
	return new Promise( ( resolve ) => {
		let result = parent.querySelector( selector );
		if ( result ) {
			return resolve( result );
		}
		let timer;
		const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
		if ( mutationObserver ) {
			const observer = new mutationObserver( ( mutations ) => {
				for ( let mutation of mutations ) {
					for ( let addedNode of mutation.addedNodes ) {
						if ( addedNode instanceof Element ) {
							result = addedNode.matches( selector ) ? addedNode : addedNode.querySelector( selector );
							if ( result ) {
								observer.disconnect();
								timer && clearTimeout( timer );
								return resolve( result );
							}
						}
					}
				}
			} );
			observer.observe( parent, {
				childList: true,
				subtree: true
			} );
			if ( timeout > 0 ) {
				timer = setTimeout( () => {
					observer.disconnect();
					return resolve( null );
				}, timeout );
			}
		}
		else {
			const listener = ( e ) => {
				if ( e.target instanceof Element ) {
					result = e.target.matches( selector ) ? e.target : e.target.querySelector( selector );
					if ( result ) {
						parent.removeEventListener( "DOMNodeInserted", listener, true );
						timer && clearTimeout( timer );
						return resolve( result );
					}
				}
			};
			parent.addEventListener( "DOMNodeInserted", listener, true );
			if ( timeout > 0 ) {
				timer = setTimeout( () => {
					parent.removeEventListener( "DOMNodeInserted", listener, true );
					return resolve( null );
				}, timeout );
			}
		}
	} );
}

class Sleep {
	/** 延时睡眠等待 */
	static time( delay = 1 ) {
		return new Promise( ( resolve ) => {
			setTimeout( resolve, delay * 1e3 );
		} );
	}
	
	/** 页面加载等待 */
	static windowLoad( delay = 0 ) {
		return new Promise( ( resolve ) => {
			window.addEventListener( "load", () => {
				setTimeout( resolve, delay * 1e3 );
			} );
		} );
	}
}

( () => {
	class Video {
		constructor() {
			__publicField( this, "domList" );
			this.domList = {
				video: document.querySelector( ".video-play video" )
			};
		}
		
		changeTimeToEnd() {
			this.updateTime( this.domList.video.duration - 1 );
		}
		
		// 改变视频时间
		updateTime( s ) {
			this.domList.video.currentTime = s;
		}
	}
	
	( function pageChangeObserver() {
		let video;
		
		function changeVideo() {
			video = new Video();
			video.domList.video.oncanplay = ( e ) => {
				Sleep.time().then(
					() => {
						video.changeTimeToEnd();
					}
				);
				video.domList.video.oncanplay = () => {
				};
			};
		}
		
		bindVideoObserver();
		FreshListenerPushState( bindVideoObserver );
		
		async function bindVideoObserver() {
			await getElement( document.body, ".video-play video" );
			new MutationObserver( ( e ) => {
				e.forEach( ( record ) => {
					if ( record.target.className === "video" ) {
						changeVideo();
					}
				} );
			} ).observe( document.querySelector( ".details.black" ), {
				subtree: true,
				childList: true
			} );
			changeVideo();
		}
	} )();
} )();
