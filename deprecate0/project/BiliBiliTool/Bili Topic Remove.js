// ==UserScript==
// @name         bili Topic Romove
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Yiero
// @match        https://t.bilibili.com/*
// @match        https://live.bilibili.com/*
// @match        https://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==


window.onload = () => {
	let url = document.baseURI;
	let shortURL = url.split('/')[2];		// 获取域名
	setTimeout(() => {
		if (shortURL === 't.bilibili.com') {
			document.getElementsByClassName("bili-dyn-version-control")[0].remove();	//新版动态删除
		} else if (shortURL === 'live.bilibili.com') {
			document.getElementsByClassName("gift-planet-entry")[0].remove();			// 主播礼物记录删除
			document.getElementsByClassName("task-box")[0].remove();					// 主播礼物排名删除
			document.getElementsByClassName("popular-and-hot-rank")[0].remove();		// 主播排名删除
			document.getElementById("bshop-popover-vm").remove();						// 小橙车删除
		} else if (shortURL === 'www.bilibili.com') {
			document.getElementsByClassName("float-nav__btn--fixed")[0].remove();			// 主播礼物记录删除
		}
	}, 1000);
}