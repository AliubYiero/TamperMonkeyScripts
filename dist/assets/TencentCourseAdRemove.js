// ==UserScript==
// @name		TencentCourseAdRemove
// @description		移除腾讯课堂广告
// @author		Yiero
// @version		1.0.0
// @match		https://ke.qq.com/course/*
// @grant		GM_addStyle
// @icon		https://ke.qq.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts
// @license		GPL
// @updateURL		https://github.com/AliubYiero/TamperMonkeyScripts/blob/master/dist/assets/TencentCourseAdRemove.js
// @downloadUrl		https://github.com/AliubYiero/TamperMonkeyScripts/blob/master/dist/assets/TencentCourseAdRemove.js
// ==/UserScript==

import { S as Sleep } from "./TaskMarking.js";

function ElementMutationObserverAlways( fatherElementSelector, aimElementSelector, callback ) {
	const fatherElement = document.querySelector( fatherElementSelector );
	const observer = new MutationObserver( ( e ) => {
		const aimElement = fatherElement.querySelector( aimElementSelector );
		if ( aimElement ) {
			if ( callback ) {
				callback();
			}
		}
	} );
	observer.observe( fatherElement, {
		subtree: true,
		childList: true
	} );
}

( async () => {
	await Sleep.windowLoad();
	ElementMutationObserverAlways( "#video-container", "div", ( e ) => {
		e.remove();
	} );
} )();
