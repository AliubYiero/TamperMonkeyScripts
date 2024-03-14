// ==UserScript==
// @name         PreventAutoPlay
// @namespace    https://github.com/AliubYiero/TemperScripts
// @version      beta0.1
// @description
// @author       Yiero
// @match		 https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @require		 file://D:\Code\TemperScripts\project\BiliBiliTool\PreventAutoPlay.js
// @grant        none
// ==/UserScript==

function closeCheckBox(checkBoxDom) {
	if (checkBoxDom.checked) {
	    checkBoxDom.checked = false;
	}
}
window.addEventListener('load', ()=> {
	console.log(1233);
	// 默认关闭弹幕
	const danmuRadio = document.querySelector('.bpx-player-dm-switch .bui-switch-input');
	console.log(danmuRadio);
	closeCheckBox(danmuRadio);
	console.log(danmuRadio);
})

