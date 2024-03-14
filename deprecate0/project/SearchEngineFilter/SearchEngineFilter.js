// ==UserScript==
// @name         SearchEngineFilter
// @namespace    https://github.com/AliubYiero/TemperScripts
// @version      beta0.1
// @description  搜索结果过滤网站
// @author       Yiero
// @match		 https://cn.bing.com/*
// @match		 https://www.bing.com/*
// @icon         https://cn.bing.com/favicon.ico
// @require		 file://D:\Code\TemperScripts\project\SearchEngineFilter\SearchEngineFilter.js
// @license      GPL
// @grant        none
// ==/UserScript==


// 定义需要过滤的网站
const filterSite = [
	'csdn',
];

// Question: 能不能将正常字符串转化成正则字符串

// 过滤函数
function searchEngineFilter(dom) {
	for (let i = 0; i < filterSite.length; i++) {
		const site = filterSite[i];
		if (dom.innerText.match(site)) {
			return "remove";
		}
	}
}

// 开始过滤
window.addEventListener('load', () => {
	// 获取所有搜索项
	const postList = document.querySelectorAll('li');
	postList.forEach(post => {
		const link_dom = post.querySelector('cite');
		if (!link_dom) {
			return;
		}

		console.log('移除元素');
		if (searchEngineFilter(link_dom) === 'remove') {
			post.remove();
		}
	})
})

