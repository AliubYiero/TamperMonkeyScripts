// ==UserScript==
// @name		Don't play too much time and do more things
// @name:en		AlertYou
// @description		Don't play too much time and do more things
// @description:en		Don't play too much time and do more things.
// @author		Yiero
// @version		beta_1.0.0
// @match		https://*/*
// @license		GPL
// @icon		https://www.tampermonkey.net/favicon.ico
// @run-at		document-start
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
// @grant		GM_notification
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @require		file://D:\Code\JavaScript\TamperMonkey\tampermonkey-demo\dist\Global\AlertYou\AlertYou.js
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
const isIframe = () => self !== top;

class GMConfigMenu {
	constructor( callback ) {
		/** 配置菜单Id, 用于识别配置菜单, 关闭配置菜单 */
		__publicField( this, "menuId", 0 );
		/** 回调函数 */
		__publicField( this, "callback" );
		this.callback = callback;
	}
	
	/**
	 * 注册油猴菜单配置项
	 * @param {string} title 配置项提示文本
	 * */
	open( title ) {
		if ( this.menuId ) {
			this.close();
		}
		this.menuId = GM_registerMenuCommand( title, this.callback );
	}
	
	/**
	 * 注销油猴菜单配置项
	 * */
	close() {
		GM_unregisterMenuCommand( this.menuId );
		this.menuId = 0;
	}
}

const notification = ( content, timeoutPerSecond ) => {
	setTimeout( () => {
		GM_notification( {
			text: content,
			title: "定时提醒"
		} );
	}, timeoutPerSecond * 1e3 );
};
const setNotification = () => {
	const msg = prompt( "输入需要提醒的事件: " );
	const timeout = Number( prompt( "输入需要提醒的时间: " ) );
	if ( msg && timeout ) {
		notification( msg, timeout );
	}
};
const getNext20Minute = () => Math.ceil( (/* @__PURE__ */ new Date() ).getMinutes() / 20 ) * 20;
const getWaitTimePerMs = () => {
	const nextTime = getNext20Minute();
	return ( nextTime - (/* @__PURE__ */ new Date() ).getMinutes() ) * 60 * 1e3;
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
	
	group() {
		console.group( this.header );
	}
	
	groupEnd() {
		console.groupEnd();
	}
	
	contentInfo( ...msg ) {
		return [ this.header, ...msg ];
	}
}

const print = new Info( "AlertYou" );
const AlertYou = ( config ) => {
	window.alert( config.text );
};
const alertAlways = () => {
	const waitTimePerMs = getWaitTimePerMs();
	print.log( "继续等待 ", waitTimePerMs, " ms将会进行一次提示." );
	const timer = setTimeout( () => {
		const currentTime = /* @__PURE__ */ new Date();
		AlertYou( {
			text: `现在时间[ ${ currentTime.getHours() }:${ currentTime.getMinutes() }:${ currentTime.getSeconds() }]`
		} );
		clearTimeout( timer );
		alertAlways();
	}, waitTimePerMs );
};
( async () => {
	if ( isIframe() ) {
		return;
	}
	alertAlways();
	new GMConfigMenu( () => {
		setNotification();
	} ).open( "开启事件提醒" );
} )();
