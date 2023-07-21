// ==UserScript==
// @name		HideDynamic
// @author		Yiero
// @description		bilibili动态隐藏。根据关键字、Up名屏蔽动态。
// @version		1.0.0
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts
// @icon		https://t.bilibili.com/favicon.ico
// @match		https://t.bilibili.com/*
// @require		file://D:\Code\TamperMoneyScripts-vite\dist\HideDynamic.js
// @license		GPL
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
// @grant		GM_addStyle
// @updateUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/HideDynamic.js
// @downloadUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/HideDynamic.js
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

const addStyle = ( cssString ) => {
	GM_addStyle( cssString );
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
		console.log( ...this.contentInfo( ...msg ) );
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

( async () => {
	const print = new Info( "BiliBiliHideDynamic" );
	addStyle( `.hide {display: none !important}` );
	const bandList = {
		videoUpList: [
			"钱默吟",
			"四娃万岁",
			"孙兴华zz",
			"品诺美食开课啦",
			"未明子",
			"巴老师的小号",
			"唯有入梦"
		],
		dynamicUpList: [
			"小fa朵实验室",
			"孙兴华zz",
			"AstrolabeGames",
			"烨梵天",
			"吃貨小飞飞",
			"生命中国",
			"卦者那啥子靈風",
			"oeasy",
			"万象灵依",
			"奥莉安娜的微笑",
			"吾爱破解论坛",
			"纯全三色对对和",
			"鬼嶋さよ咕噜",
			"蓝毒-浅滩律动",
			"唯有入梦"
		],
		liveUpList: [ "Virsaladze", "尊驾何人", "加班第一帅", "卦者那啥子靈風" ]
	};
	
	function bandDyn( dynItem, thisBandList ) {
		var _a;
		const upName = ( _a = dynItem.querySelector( ".bili-dyn-title__text" ) ) == null ? void 0 : _a.innerText;
		if ( !upName ) {
			return;
		}
		if ( thisBandList.indexOf( upName ) !== -1 ) {
			dynItem.classList.add( "hide" );
		}
	}
	
	function bandLive( liveLinkItem ) {
		const upName = liveLinkItem.querySelector( ".be-live-list-item-user" ).innerText;
		if ( bandList.liveUpList.indexOf( upName ) !== -1 ) {
			liveLinkItem.classList.add( "hide" );
		}
	}
	
	function getLocalDynamicTab() {
		let tabsItemIndex = 0;
		const tabsItemList = document.querySelectorAll( ".bili-dyn-list-tabs__item" );
		for ( let i = 0; i < tabsItemList.length; i++ ) {
			const tabsItem = tabsItemList[i];
			if ( tabsItem.classList.contains( "active" ) ) {
				tabsItemIndex = i;
			}
		}
		let thisBandList = [];
		switch ( tabsItemIndex ) {
			case 0:
				print.info( "切换动态屏蔽列表" );
				thisBandList = bandList.dynamicUpList;
				break;
			case 1:
				print.info( "切换视频屏蔽列表" );
				thisBandList = bandList.videoUpList;
				break;
		}
		return thisBandList;
	}
	
	await getElement( document.body, ".bili-dyn-list" );
	( function observeDynamic() {
		const observer = new MutationObserver( ( e ) => {
			const thisBandList = getLocalDynamicTab();
			e.forEach( ( record ) => {
				const dynItem = record.addedNodes[0];
				if ( !dynItem ) {
					return;
				}
				bandDyn( dynItem, thisBandList );
			} );
		} );
		observer.observe( document.querySelector( ".bili-dyn-list__items" ), {
			childList: true
		} );
	} )();
	await getElement( document.body, ".be-live-list-content" );
	( function observeLive() {
		const observer = new MutationObserver( ( e ) => {
			e.forEach( ( record ) => {
				var _a;
				const liveItem = record.addedNodes[0];
				if ( !liveItem || !( ( _a = liveItem == null ? void 0 : liveItem.classList ) == null ? void 0 : _a.contains( "be-live-list-item" ) ) ) {
					return;
				}
				bandLive( liveItem );
			} );
		} );
		observer.observe( document.querySelector( ".be-live-list-content" ), {
			childList: true
		} );
	} )();
} )();
