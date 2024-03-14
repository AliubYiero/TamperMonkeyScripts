// ==UserScript==
// @name        VideoFileFilter
// @namespace   https://github.com/AliubYiero/TemperScripts
// @version     beta0.1
// @description
// @author      Yiero
// @match		https://m1qzuffswgw.feishu.cn/minutes/*
// @icon        https://m1qzuffswgw.feishu.cn/favicon.ico
// @require		file://D:\Code\TemperScripts\project\FeishuWebTool\VideoFilter\VideoFileFilter.js
// @license     GPL
// @grant       GM_addStyle
// ==/UserScript==

function sleep(delay = 1) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, delay * 1000);
	})
}

window.onload = async () => {
	await sleep(0.1);
	let isFilter = false;
	let beingFilter = false;
	
	
	GM_addStyle(`.view-disabled {
		display: none;
	}`);
	const filesListContainer = document.querySelector('.list-table-body');
	
	let content;
	window.addEventListener('input', debounce(e => {
		console.log('开始过滤');
		content = getSearchContent();
		if (content === '') {
			isFilter = false;
		} else {
			isFilter = true;
			getFilterFile(content);
		}
	}, 1));
	
	new Observer(filesListContainer, debounce(() => {
		console.log('newDom');
		if (isFilter && beingFilter) {
			getFilterFile(content);
		}
	}), 1);
}

const debounce = function (fn, delay) {
	let timer;	// 定时器函数
	return function () {
		// 清除定时器重新计时
		clearTimeout(timer);
		timer = setTimeout(fn, delay * 1000);
	}
};

getSearchContent = function () {
	const input = document.querySelector('.search-input');
	const content = input.value;
	return content;
}

let getFilterFile = (function () {
	const filesListContainer = document.getElementsByClassName('list-table-body');
	const files = document.getElementsByClassName('meeting-list-item-normal');
	return function (content) {
		files.forEach(fileContainer => {
			if (fileContainer.querySelector('.content').innerText.match(content)) {
				fileContainer.classList.remove('view-disabled');
				return;
			}
			if (fileContainer.classList.contains('view-disabled')) {
				return;
			}
			fileContainer.classList.add('view-disabled');
		})
		
		// const fileArray = Array.from(files).sort((a, b) => {
		// 	return a.querySelector('.content').innerText.localeCompare(b.querySelector('.content').innerText)
		// })
		//
		// const listContainer = filesListContainer[0];
		// fileArray.forEach(dom => {
		// 	listContainer.append(dom);
		// })
	}
})();


class Observer extends MutationObserver {
	constructor(dom, callback) {
		super(callback);
		console.log(this);
		if (this) {
			this.disconnect();
		}
		this.observe(dom, {
			childList: true,
		});
	}
}
