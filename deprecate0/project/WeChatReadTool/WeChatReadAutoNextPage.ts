// ==UserScript==
// @name        微信读书自动翻页
// @namespace   https://github.com/AliubYiero/TemperScripts
// @version     1.0.0
// @description 滚动触碰两次页面底部自动翻下一页，滚动触碰两次页面顶部自动翻上一页
// @author      Yiero
// @match		https://weread.qq.com/web/reader/*
// @icon        https://weread.qq.com/favicon.ico
// @license     GPL
// @grant       GM_addStyle
// ==/UserScript==

window.onload = () => {
	switchToNextPage();
	( new MutationObserver( e => {
		console.log( 'scroll' );
		/* 重定位至章节文本处 */
		setTimeout( () => {
			scrollTo( 0, 90 );
		}, 100 )
		
		/* 加载失败重刷新页面 */
		// e.forEach( mutationRecord => {
		// 	if ( mutationRecord.previousSibling.innerText === '加载失败，请点击重试' ) {
		// 		location.reload();
		// 	}
		// } )
		
	} ) )
		.observe( document.getElementsByClassName( 'app_content' )[ 0 ], {
			childList: true
		} )
}


function fireKeyEvent( el, evtType, keyCode ) {
	let evtObj;
	if ( document.createEvent ) {
		// firefox 浏览器下模拟事件
		// @ts-ignore
		if ( window.KeyEvent ) {
			evtObj = document.createEvent( "KeyEvents" );
			evtObj.initKeyEvent( evtType, true, true );
			el.dispatchEvent( evtObj );
			return;
		}
		
		// chrome 浏览器下模拟事件
		evtObj = document.createEvent( "UIEvents" );
		evtObj.initUIEvent( evtType, true, true );
		
		delete evtObj.keyCode;
		//为了模拟keycode
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
	let isTop = false;
	let isBottom = false;
	let resetPageStatus = () => {
		isTop = false;
		isBottom = false;
	}
	return function () {
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
