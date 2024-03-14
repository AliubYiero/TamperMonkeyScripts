// ==UserScript==
// @name        小说页面优化
// @namespace   https://github.com/AliubYiero/TemperScripts
// @version     beta0.1
// @description
// @author      Yiero
// @match       https://www.ishuquge.la/txt/*/*.html
// @icon        https://www.ishuquge.la/favicon.ico
// @require		file://D:\Code\TemperScripts\project\TinyTool\小说页面优化.ts
// @license     GPL
// @grant       GM_addStyle
// ==/UserScript==


// @ts-ignore
GM_addStyle( `
	.showtxt {
		font-size: 30px;
	}
	
	div.content > div:nth-child(4),
	#center_tip,
	div.content > div.link,
	#wrapper > .header,
	#wrapper > .nav,
	#wrapper > div.book.reader > div.path,
	#content > span,
	.footer {
		display: none;
	}
	
	#wrapper, html {
		background: #f8f8f8;
	}
	.content {
		background: #ffffff;
	}
` )

window.onload = () => {
	try {
		switchToNextPage();
	} catch {
		location.reload();
	}
};

function fireKeyEvent( el: Node, evtType: 'keydown' | 'keyup', keyCode: number ) {
	let evtObj;
	if ( document.createEvent ) {
		// chrome 浏览器下模拟事件
		evtObj = document.createEvent( "UIEvents" );
		evtObj.initUIEvent( evtType, true, true );
		
		delete evtObj.keyCode;
		
		// 模拟keycode
		if ( typeof evtObj.keyCode === "undefined" ) {
			Object.defineProperty( evtObj, "keyCode", { value: keyCode } );
		} else {
			evtObj.key = String.fromCharCode( keyCode );
		}
		
		if ( typeof evtObj.ctrlKey === "undefined" ) {
			//为了模拟ctrl键
			Object.defineProperty( evtObj, "ctrlKey", { value: true } );
		} else {
			evtObj.ctrlKey = true;
		}
		
		el.dispatchEvent( evtObj );
		return;
	}
}

const checkPageBottom = ( function () {
	let isTop: boolean = false;
	let isBottom: boolean = false;
	let resetPageStatus = (): void => {
		isTop = false;
		isBottom = false;
	}
	return function (): number {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
		if ( scrollTop === 0 ) {
			// 触顶两次才翻页
			if ( isTop ) {
				// 已经滚动到底部
				resetPageStatus();
				return 37;
			}
			isTop = true;
			scrollBy( 0, 1 );
		} else if ( scrollTop + clientHeight >= scrollHeight ) {
			// 触底两次才翻页
			if ( isBottom ) {
				// 已经滚动到底部
				resetPageStatus();
				return 39;
			}
			isBottom = true;
			scrollBy( 0, -1 );
		}
	}
} )();

// 防抖封装
const debounce = function ( fn, delay ) {
	let timer;	// 定时器函数
	return function () {
		// 清除定时器重新计时
		clearTimeout( timer );
		timer = setTimeout( fn, delay * 1000 );
	}
};

function switchToNextPage() {
	window.addEventListener( 'scroll', debounce( () => {
		const keyEventCode = checkPageBottom();     // 37为左翻页，39为右翻页
		// console.log('判断页面尾部');
		if ( keyEventCode ) {
			// console.log('到达页面尾部');
			fireKeyEvent( document, "keydown", keyEventCode );
		}
	}, 0.1 ) )
}
