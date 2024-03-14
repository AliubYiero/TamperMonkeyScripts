// ==UserScript==
// @name		AddNote
// @namespace	https://github.com/AliubYiero/TemperScripts
// @description	添加一个记录的文本区，保存在本地
// @author		Yiero
// @version		beta0.1
// @match		https://m1qzuffswgw.feishu.cn/minutes/*
// @icon		https://m1qzuffswgw.feishu.cn/favicon.ico
// @require		file://D:\Code\TemperScripts\project\FeishuWebTool\AddNote.js
// @license		GPL
// @grant		none
// ==/UserScript==

function sleep(delay=1) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, delay * 1000);
	})
}

window.onload = async () => {
	// await sleep();

	// 创建一个按钮
	// const editChangeBtn = document.createElement('li');
	// editChangeBtn.innerHTML = `
	// <div> 会议速记 </div>
	// <div className="ud__menu-item__ink"></div>
	// `;

	const ulMenu = document.querySelector('.ud__menu');
	const meetingLinkBtn = ulMenu.querySelector('li');
	const editChangeBtn = meetingLinkBtn.cloneNode();
	editChangeBtn.innerHTML = `
	<div> 会议速记 </div>
	<div className="ud__menu-item__ink"></div>
	`;

	ulMenu.append(editChangeBtn);

}

/*
<li className="ud__menu-overflow-item ud__menu-item ud__menu-item-selected ud__menu-item--root-horizontal ud__menu-item-only-child"
	role="menuitem" tabIndex="-1" style="opacity: 1; order: 0;" data-menu-id="rc-menu-uuid-22954-1-minutes">
	<div
		className="ud__menu-item-title-content ud__menu-item-title-content-text-overflow ud__textOverflow u1pxylti uack55o u1f3wrh8 uxkbsdt">
		会议纪要
	</div>
	<div className="ud__menu-item__ink"></div>
</li>
* */
