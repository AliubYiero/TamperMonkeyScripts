// ==UserScript==
// @name		kmelearningAutoVideoPass
// @author		Yiero
// @description		自动播放视频, 切换视频
// @version		1.0.1
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts
// @match		https://pc.kmelearning.com/*
// @icon		https://pc.kmelearning.com/favicon.ico
// @license		GPL
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

function freshListenerPushState( callback, delay = 1 ) {
	let _pushState = window.history.pushState;
	window.history.pushState = function () {
		setTimeout( callback, delay * 1e3 );
		return _pushState.apply( this, arguments );
	};
}

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

function getElement( parent, selector, timeoutPerMs = 0 ) {
	return new Promise( ( resolve ) => {
		parent || ( parent = document.body );
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
			if ( timeoutPerMs > 0 ) {
				timer = setTimeout( () => {
					observer.disconnect();
					return resolve( null );
				}, timeoutPerMs );
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

const print = new Info( "kmelearningAutoVideoPass" );
( () => {
	function jedgeVideoPage() {
		return !!document.URL.match( /^https:\/\/pc.kmelearning.com\/jxccb\/home\/courseplay\/.*/g );
	}
	
	let domList = {};
	
	async function getVideoList() {
		domList.videoList = await getElement( document.body, ".course-menu-container" );
		await Sleep.time( 0.5 );
	}
	
	function checkVideoList() {
		const videoList = domList.videoList;
		const notReadVideoList = videoList.querySelectorAll( ".course-menu-item:not(.isChapter) .course-menu-dot:not(:has(.anticon))" );
		const videoPage = notReadVideoList[0];
		videoPage.click();
	}
	
	async function getVideoElement() {
		await Sleep.time( 2 );
		domList.video = await getElement( document.body, "video" );
	}
	
	function playVideo() {
		let videoElement = domList.video;
		videoElement.volume = 0;
		videoElement.autoplay = true;
		videoElement.play();
	}
	
	async function videoObserver( callback ) {
		if ( !jedgeVideoPage() ) {
			return;
		}
		domList.videoContainer = await getElement( document.body, ".course-content-play-area" );
		const observer = new MutationObserver( ( e ) => {
			e.forEach( ( record ) => {
				const removeDom = record.removedNodes[0];
				if ( removeDom && removeDom.toString() === "[object HTMLDivElement]" && ( removeDom == null ? void 0 : removeDom.classList.contains( "course-player" ) ) ) {
					print.log( "视频跳转" );
					setTimeout( callback, 2e3 );
				}
			} );
		} );
		observer.observe( domList.videoContainer, {
			subtree: true,
			childList: true
		} );
	}
	
	async function main() {
		if ( !jedgeVideoPage() ) {
			return;
		}
		print.log( "进入视频页面" );
		await getVideoList();
		await checkVideoList();
		await getVideoElement();
		print.log( "播放视频", domList.video );
		playVideo();
	}
	
	main();
	videoObserver( main );
	freshListenerPushState( () => {
		main();
		videoObserver( main );
	} );
} )();
