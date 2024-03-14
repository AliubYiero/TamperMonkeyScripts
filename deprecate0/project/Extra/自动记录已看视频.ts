/**
 * 自动记录已看视频.ts
 * created by 2023/7/7
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

// ==UserScript==
// @name        Bilibili手动标记拓展 - 自动记录已看视频
// @namespace   https://github.com/AliubYiero/TemperScripts
// @version     beta0.1
// @description 手动标记拓展，进入视频页面自动记录已看
// @author      Yiero
// @match       https://www.bilibili.com/video/*
// @icon        https://www.bilibili.com/favicon.ico
// @require		file://D:\Code\TemperScripts\project\Extra\自动记录已看视频.js
// @license     GPL
// @grant       none
// ==/UserScript==


/** 监听 [未看/已看按钮] 出现 */
function watchReadLoaderBtn() {
	/** 标记已看 */
	function addRead( btnElement: HTMLLinkElement ) {
		btnElement.click();
	}
	
	let callback = e => {
		const btn = videoHeader.querySelector( '.btnNotView' ) as HTMLLinkElement;
		if ( btn ) {
			console.info( '标记已看' );
			
			addRead( btn );
			
			readLoaderBtnObserver.disconnect();
		}
	};
	
	// 获取视频头部信息栏
	let videoHeader = document.querySelector( '.video-info-detail' ) as HTMLDivElement;
	
	// 创建观察者
	const readLoaderBtnObserver = new MutationObserver( callback );
	readLoaderBtnObserver.observe( videoHeader, {
		childList: true,
	} )
}

/** 监听 [快速收藏] 按钮  */
function watchFavorLoaderBtn() {
	
	function addFavor( btnElement: HTMLSpanElement ) {
		btnElement.click();
	}
	
	let callback = e => {
		console.log( '触发快速收藏', e );
		const btn = toolbar.querySelector( '.quick-favorite:not(.on)' ) as HTMLSpanElement;
		
		if ( btn ) {
			addFavor( btn );
			favorLoaderBtnObserver.disconnect();
		}
	};
	
	// 获取视频底部工具栏
	let toolbar = document.querySelector( '.video-toolbar-left' );
	
	// 创建观察者
	const favorLoaderBtnObserver = new MutationObserver( callback );
	favorLoaderBtnObserver.observe( toolbar, {
		subtree: true,
		childList: true,
		characterData: true,
	} )
}

/** 判断收藏状态 */


window.onload = () => {
	setTimeout( () => {
		watchReadLoaderBtn();
		watchFavorLoaderBtn();
		
	}, 2000 )
};
