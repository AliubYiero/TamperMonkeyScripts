// ==UserScript==
// @name        学习通首页优化
// @namespace   https://github.com/AliubYiero/TemperScripts
// @version     beta0.1
// @description
// @author      Yiero
// @match       http://i.chaoxing.com/base?t=*
// @icon        http://i.chaoxing.com/favicon.ico
// @require		file://D:\Code\TemperScripts\project\TinyTool\学习通首页优化.js
// @license     GPL
// @grant       GM_addStyle
// ==/UserScript==


// 移除多余元素
// @ts-ignore
GM_addStyle( `
	#first142707,
	#first142708,
	#first142710,
	#first142711,
	#first142713,
	#first142715,
	#myTeach {
		display: none;
	}
	
` )
