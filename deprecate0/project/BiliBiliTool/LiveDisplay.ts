// ==UserScript==
// @name        BiliBili隐藏多余元素
// @namespace   https://github.com/AliubYiero/TemperScripts
// @version     beta0.1
// @description
// @author      Yiero
// @match       https://live.bilibili.com/*
// @match       https://t.bilibili.com/*
// @match       https://www.bilibili.com/video/*
// @icon        https://live.bilibili.com/favicon.ico
// @require		file://D:\Code\TemperScripts\project\BiliBiliTool\LiveDisplay.ts
// @license     GPL
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==

( () => {
	/**
	 * 使用CSS隐藏样式
	 * */
	function formatterUnDisplayStyle(): { data: string } {
		// 写入需要隐藏的类
		let classList: Array<string> = [
			// 直播

			// 动态

			// 视频
			
		];
		classList.push( '' );
		let displayStyleString: string = ( classList as Array<string> ).join( ' { display: none !important; }\n' );
		return { data: displayStyleString };
	}
	
	/**
	 * 使用CSS让直播分区标签全部显示
	 * */
	function formatterLiveContentOverflow( prevReturn: { data: string } ): { data: string } {
		let displayStyleString: string = prevReturn.data;
		
		let classList: Array<string> = [
			`.live-skin-normal-a-text { overflow: visible !important; }`,
		]
		let LiveContentOverflowString: string = ( classList as Array<string> ).join( '\n' );
		
		return { data: displayStyleString + LiveContentOverflowString };
	}
	
	/**
	 * 写入CSS样式
	 * */
	function writeToStyle( prevReturn: { data: string } ) {
		let { data } = prevReturn;
		// console.log( data );
		// @ts-ignore
		GM_addStyle( data );
	}
	
	
	/**
	 * 改变动态显示文字：
	 * - 将 `全部` 更换成 `动态` （借助BiliEvolved的动态管理实现动态分类）
	 * - 将 `视频投稿` 更换成 `视频`
	 * - 将 `看番看剧` 更换成 `番剧`
	 * */
	function changeDynamicText() {
		console.log( document.URL );
		if ( !( document.URL === 'https://t.bilibili.com/?tab=all' || document.URL === 'https://t.bilibili.com/' ) ) {
			return;
		}
		setTimeout( () => {
			const dynamicTypeList = document.querySelectorAll( '.bili-dyn-list-tabs__list > .bili-dyn-list-tabs__item' );
			// 将 `全部` 更换成 `动态`
			( <HTMLElement> dynamicTypeList[ 0 ] ).innerText = '动态';
			// 将 `视频投稿` 更换成 `视频`
			( <HTMLElement> dynamicTypeList[ 1 ] ).innerText = '视频';
			// 将 `看番看剧` 更换成 `番剧`
			( <HTMLElement> dynamicTypeList[ 2 ] ).innerText = '番剧';
		}, 2000 )
	}
	
	/**
	 * 职责链：函数入口
	 * */
	const fnChains = [
		formatterUnDisplayStyle,
		formatterLiveContentOverflow,
		writeToStyle,
		changeDynamicText,
	]
	let prevReturn: { data?: unknown } = {};
	while ( fnChains.length > 0 ) {
		prevReturn = ( fnChains.shift() as Function )( prevReturn );
	}
} )();
