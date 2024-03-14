// ==UserScript==
// @name         Cangku Img display
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Yiero
// @match        https://cangku.moe/archives/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cangku.moe
// @grant        none
// ==/UserScript==

function removeUserImg(userId) {
	let article = document.querySelector(".format-content")
	let pTags = article.getElementsByTagName("p"); 	//获取所有p标签
	for (let i = pTags.length - 1; i > 0; i--) { 		//从最后一个开始遍历
		let imgTag = pTags[i].querySelector("img"); //获取每个p标签中的img元素
		if (imgTag && pTags[i].childElementCount === 1) { //如果存在img元素并且是唯一的子元素
			pTags[i].remove(); //移除该p标签
		}
	}
}


function getUserId() {
	// 屏蔽用户Id
	const disabledUserId = [34072]
	//alert("1")

	// 选中用户Id
	let autor = document.querySelector("div.header > div.meta");

	let firstA = autor.querySelector("a"); //选择第一个a标签 | 用户属性
	let firstAHref = firstA.getAttribute("href"); //获取href属性值
	let userId = firstAHref.match(/\d+$/)[0]; //使用正则表达式提取数字部分
	console.log(userId);

	for (let i = 0; i < disabledUserId.length; i++) {
		if (userId == disabledUserId[i]) {
			removeUserImg(userId);
		}
	}
}

function colImg() {
	// 选择所有的.post-wrap元素
	let postWrap = document.querySelector(".post-wrap");
	let dlBox = document.querySelector(".dl-box");
	// 遍历每个.post-wrap元素

	// 找到除了第一个p>img标签以外的所有p>img标签
	let imgs = postWrap.querySelectorAll("p > img:not(:first-child)");
	// 如果有多于一个p>img标签
	if (imgs.length > 1) {
		// 创建一个新的div元素并设置类名为.collapse-card
		let button = document.createElement("div");
		button.className = "collapse-card";
		// 将折叠卡片代码作为新div元素的innerHTML属性
		button.innerHTML = `
		<div class="collapse-header" id="heading-vssn0c">
			<div class="collapse-btn collapsed" data-toggle="collapse" data-target="#collapse-vssn0c" data-show="false" aria-expanded="false" aria-controls="collapse-vssn0c">折叠图片</div>
		</div>
		<div id="collapse-vssn0c" class="collapse" aria-labelledby="heading-vssn0c">
			<div class="collapse-body">
			
			</div>
		</div>
		`;
		// 选择.collapse-body元素
		let collapseBody = button.querySelector(".collapse-body");
		// 遍历每个p>img标签并将它们追加到.collapse-body元素中
		imgs.forEach(function (img) {
			collapseBody.appendChild(img);
		});
		// 将新创建的.dl-box元素插入到.post-wrap元素的前面
		postWrap.parentNode.insertBefore(button, postWrap);
	}
}

let timer = setInterval(function () {
	// 尝试获取元素
	let commentLoad = document.querySelector(".comment-wrap")
	// 如果获取到了元素
	if (commentLoad) {
		// 停止定时器
		clearInterval(timer);
		// 执行你想要的操作
		// getUserId();
		colImg();
	}

}, 1000)

// window.onload = () => {
// 	let timer = (function() {
// 		getUserId();
// 	}, 1000);
// }


