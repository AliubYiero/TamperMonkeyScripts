// ==UserScript==
// @name
// @namespace    https://github.com/AliubYiero/TemperScripts
// @version      beta0.8.2
// @description  屏蔽网易CC除了视频容器以外的容器
// @author       Yiero
// @match		 https://cc.163.com/*
// @icon         https://cc.163.com/favicon.ico
// @require		 file://D:\Code\TemperScripts\project\CCTool\CCVideoDisplayOnly.js
// @license      GPL
// @grant        GM_addStyle
// ==/UserScript==

/* TODO
    容器隐藏，而不是直接去除容器
    保留登录框(.header)
 */
GM_addStyle( `
		body > *,
		__next > *,
		.jsx-4102559083 > *,
		.page-right-container > *,
		.scrollContainer > * {
			display: none !important;
		}
		
		#__next,
		.jsx-4102559083,
		.page-right-container,
		.main-container,
		.room-main-container {
			display: block !important;
		}
		
		
	` )

// 在这儿写直播间地址
// 格式为一对英文引号中间包含直播间地址，同时引号后面需要一个英文逗号（和下面一样）
const liveAddressList = [
	'361433',		// Quin直播间
	'239802416',	// 肯尼直播间
]
const danmuBlackList = [
	/^？*$/,
	'草',
	'笑了',
]

/*
* 链式调用类（职责链）
* */
class FunctionChainCall {
	constructor() {
		this.callChain = [];
	}
	
	set(fn, params = []) {
		this.callChain.push([fn, params]);
	}
	
	setList(array) {
		array.forEach(fn => {
			// 非数组不带参数的函数
			if (!Array.isArray(fn)) {
				this.set(fn)
				return;
			}
			
			// 数组带参数函数
			this.set(...fn);
		})
	}
	
	async call() {
		while (this.callChain[0]) {
			const fn = this.callChain[0]
			const returnString = await fn[0].apply(null, fn[1]);
			console.log(returnString);
			if (returnString === 'stop') {
				return;
			}
			this.callChain.shift();
		}
	}
}

/*
* 进程入口
* */
let functionChainCall = new FunctionChainCall();
window.onload = async () => {
	const functionList = [
		[ sleep, [ 3 ] ],			// 休眠进程等待页面加载，3s是个合适的时间，因为足够大部分的广告元素加载出来
		bindUrlChangeEvent,			// 绑定Url跳转事件
		closeIllegalWebsite,		// 关闭非指定直播间
		showVideoOnly,				// 抽离视频容器，单独显示
		[ sleep, [ 0.1 ] ],			// 休眠进程等待视频容器抽离完毕
		preventVideoContainerDrag,	// 关闭可能出现的小视频窗口，阻止容器拖动
		setInitSetting,				// 设置默认配置
		removeExtraInfoContainer,	// 移除额外的广告信息（可能失败）
		hiddenGiftContainer,		// 隐藏礼物界面
		removeRepeatDanmu,			// 删除复读弹幕
	];
	functionChainCall.setList(functionList);
	functionChainCall.call();
}

/*
* 休眠进程
* */
function sleep(delay = 1, callback = () => {
}) {
	return new Promise(resolve => {
		setTimeout(() => {
			callback();
			resolve();
		}, delay * 1000);
	})
}

/*
* 检查应用独立视频的直播间
* */
const checkLiveAddress = (function () {
	const applyLiveAddressList = liveAddressList;
	return function () {
		const liveAddress = location.pathname.split('/')[1];
		// 其他非直播间页面
		if (isNaN(liveAddress)) {	// 其它界面
			return 'true';
		}
		
		// 直播间页面判断是否为应用直播间
		for (let i = 0; i < applyLiveAddressList.length; i++) {
			const applyLiveAddress = applyLiveAddressList[i];
			console.log(applyLiveAddress === liveAddress);
			if (applyLiveAddress === liveAddress) {
				return true;
			}
		}
		
		// 不是应用直播间
		return false;
	};
})();

function closeIllegalWebsite() {
	const checkResult = checkLiveAddress();
	if ( checkResult === 'true' ) {
		return 'stop';
	} else if ( checkResult ) {
		return;
	}
	// 关闭直播间
	window.close();
}

function bindUrlChangeEvent() {
	window.addEventListener( 'popstate', () => {
		closeIllegalWebsite();
	} )
	window.addEventListener( 'hashchange', () => {
		closeIllegalWebsite();
	} )
}

/*
* 获取视频
* */
function showVideoOnly() {
	// 选择主窗口
	// const video = document.querySelector( '.main-wrapper' );	// 获取视频容器
	// document.body.appendChild( video );	// 添加视频容器
	// document.querySelectorAll( 'body > *' ).forEach( dom => {
	// 	if ( dom.classList.contains( 'main-wrapper' ) ) {
	// 		return;
	// 	}
	// 	dom.remove();
	// } );
	
	// let bodyChild = document.querySelector('body > *');
	GM_addStyle( `
		.body > * {
			display: none !important;
		}
	` )
	
	
}

/*
* 阻止视频容器移动
* @description 视频的拖动是miniVideo控制的，但是手动关闭miniVideo却不会删除miniVideo元素，所以视频容器还能够拖动
* @description 模拟点击缺可以关闭，网易CC的开发SoGood
* */
function preventVideoContainerDrag() {
	document.querySelector('.auto-pic-in-pic-close').click();
	
	// 防止miniVideo没有删除，还是需要添加观察者
	const videoContainer = document.querySelector('.cc-h5player-container');
	const observer = new MutationObserver((e) => {
		const element = e[0].target;
		element.style.top = 0;
		element.style.left = 0;
	});
	
	observer.observe(videoContainer, {
		attributes: true,
	});
}

function setInitSetting() {
	// 获取屏蔽设置
	let disSetting = document.getElementsByClassName('ban-effect-list')[0].querySelectorAll('li')
	
	// 进行屏蔽设置
	for (let i = 1; i < disSetting.length; i++) {
		disSetting[i].className = "selected"
	}
	
	// 删除边栏
	document.body.className = 'collapse'
	
	// 拓展弹幕栏
	document.getElementsByClassName('chat-list')[0].style.height = '100%'
}

function removeExtraInfoContainer() {
	const removeElementList = [
		'.ad-ct', // 删除背景跳转
		'#webChat', // 删除消息
		'#pic-in-pic-btn', // 删除视频弹窗
		'#live_left_bottom_box_wrap', //删除视频弹窗
		'.room-boardcast', // 删除广告栏
		'#float-plugin-container-43751-4', // 删除侧边永劫大厅
		'.room-tabs-container', // 删除贵宾栏
		'#room-tabs', // 删除贵宾栏
		'.ui-dialog', // 删除贵宾栏
		'.video-watermark',  // CC直播标签
	]
	
	
	removeElementList.forEach(elementSelector => {
		console.log('删除' + elementSelector)
		const dom = document.querySelector(elementSelector)
		dom?.remove()
	})
}

/*
* TODO：显示视频控制栏
* Bug： 无法控制
* */
function displayVideoControls() {
	const videoControlsBar = document.querySelector('.video-player-controls-main');
	console.log(videoControlsBar);
	videoControlsBar.classList.add = 'show-controls';
	videoControlsBar.style.display = 'block';
}

/*
* 屏蔽底部礼物栏
* */
function hiddenGiftContainer() {
	const giftContainer = document.querySelector('.user-tool-bar');
	giftContainer.style.display = 'none';
}


/*
* 检测复读弹幕，拦截复读弹幕
* */
class RecordDanmu {
	constructor() {
		this.danmuList = [];
		this.expectDanmu = danmuBlackList;
		this.maxRecord = 50;
		this.counter = 0;
	}
	
	addCounter() {
		if (this.counter >= this.maxRecord) {
			this.counter = 0;
		} else {
			this.counter++;
		}
	}
	
	add(text) {
		this.danmuList[this.counter] = text;
		this.addCounter();
	}
	
	isRepeat(text) {
		// 拦截白名单
		if (this.expectDanmu.includes(text)) {
			return;
		}
		return this.danmuList.includes(text);
	}
}

function removerObserver(observeNode, danmuType) {
	const recordDanmu = new RecordDanmu();
	
	const danmuList = observeNode;		// 右侧文本弹幕栏
	const danmuObserver = new MutationObserver(
		e => {
			e.forEach(record => {
				const Node = record.addedNodes[0];
				if (!Node) {
					return;
				}
				
				let fullDanmu = Node.innerText;
				let danmu;
				if (danmuType === 'float') {
					danmu = fullDanmu;
				} else {
				    danmu = fullDanmu.slice(fullDanmu.indexOf('：') + 1);
				}
				
				if (recordDanmu.isRepeat(danmu)) {
					// 删除复读弹幕
					console.log('删除复读弹幕\t' + danmu);
					Node.style.display = 'none';
					return;
				}
				recordDanmu.add(danmu);
			})
		}
	);
	danmuObserver.observe(danmuList, {
		childList: true,
	});
}
function removeRepeatDanmu() {
	removerObserver(document.querySelector('#js-chat-list-ul'), 'text');
	removerObserver(document.querySelector('.comment-canvas'), 'float');
}
