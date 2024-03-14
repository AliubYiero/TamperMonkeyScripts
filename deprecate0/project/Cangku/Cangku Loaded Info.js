// ==UserScript==
// @name         仓库浏览历史标记
// @namespace    https://github.com/AliubYiero/TemperScripts/
// @version      2.3.0
// @description  记录浏览过的网页，给浏览过的网页添加透明标签
// @author       Yiero
// @match        https://cangku.moe/*
// @icon         https://cangku.moe/favicon.ico
// @require      https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/layer/3.5.1/layer.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @license      MIT
// ==/UserScript==

/* 用户可设置元素 */
const userConfig = {
	// 帖子透明度设置：0为全透明，1为不透明
	opacity: 0.3,

	// [已看/未看]标记显示：`true`为显示，`false`为不显示
	isDisplaySign: true,
}

/* 更新日志v2.3.0
1. 引入`idb-keyval`库用于辅助查询本地数据库
2. 引入油猴的`GM_Storage`用于数据同步
 */

/* ------------------------------ */
// GM_addStyle(GM_getResourceText("css"));
/* 引入idb-keyval@6.2.0，通过require引入会报错 */
function _slicedToArray(e, t) {
	return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray(e, t) || _nonIterableRest()
}

function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(e, t) {
	if (e) {
		if ("string" == typeof e) return _arrayLikeToArray(e, t);
		var r = Object.prototype.toString.call(e).slice(8, -1);
		return "Map" === (r = "Object" === r && e.constructor ? e.constructor.name : r) || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(e, t) : void 0
	}
}

function _arrayLikeToArray(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
	return n
}

function _iterableToArrayLimit(e, t) {
	var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
	if (null != r) {
		var n, o, u = [], i = !0, a = !1;
		try {
			for (r = r.call(e); !(i = (n = r.next()).done) && (u.push(n.value), !t || u.length !== t); i = !0) ;
		} catch (e) {
			a = !0, o = e
		} finally {
			try {
				i || null == r.return || r.return()
			} finally {
				if (a) throw o
			}
		}
		return u
	}
}

function _arrayWithHoles(e) {
	if (Array.isArray(e)) return e
}

function promisifyRequest(r) {
	return new Promise(function (e, t) {
		r.oncomplete = r.onsuccess = function () {
			return e(r.result)
		}, r.onabort = r.onerror = function () {
			return t(r.error)
		}
	})
}

function createStore(e, n) {
	var t = indexedDB.open(e), o = (t.onupgradeneeded = function () {
		return t.result.createObjectStore(n)
	}, promisifyRequest(t));
	return function (t, r) {
		return o.then(function (e) {
			return r(e.transaction(n, t).objectStore(n))
		})
	}
}

var defaultGetStoreFunc;

function defaultGetStore() {
	return defaultGetStoreFunc = defaultGetStoreFunc || createStore("keyval-store", "keyval")
}

function get(t) {
	return (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : defaultGetStore())("readonly", function (e) {
		return promisifyRequest(e.get(t))
	})
}

function set(t, r) {
	return (2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : defaultGetStore())("readwrite", function (e) {
		return e.put(r, t), promisifyRequest(e.transaction)
	})
}

function setMany(e) {
	return (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : defaultGetStore())("readwrite", function (t) {
		return e.forEach(function (e) {
			return t.put(e[1], e[0])
		}), promisifyRequest(t.transaction)
	})
}

function getMany(e) {
	return (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : defaultGetStore())("readonly", function (t) {
		return Promise.all(e.map(function (e) {
			return promisifyRequest(t.get(e))
		}))
	})
}

function update(n, o) {
	return (2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : defaultGetStore())("readwrite", function (r) {
		return new Promise(function (e, t) {
			r.get(n).onsuccess = function () {
				try {
					r.put(o(this.result), n), e(promisifyRequest(r.transaction))
				} catch (e) {
					t(e)
				}
			}
		})
	})
}

function del(t) {
	return (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : defaultGetStore())("readwrite", function (e) {
		return e.delete(t), promisifyRequest(e.transaction)
	})
}

function delMany(e) {
	return (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : defaultGetStore())("readwrite", function (t) {
		return e.forEach(function (e) {
			return t.delete(e)
		}), promisifyRequest(t.transaction)
	})
}

function clear() {
	return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : defaultGetStore())("readwrite", function (e) {
		return e.clear(), promisifyRequest(e.transaction)
	})
}

function eachCursor(e, t) {
	return e.openCursor().onsuccess = function () {
		this.result && (t(this.result), this.result.continue())
	}, promisifyRequest(e.transaction)
}

function keys() {
	return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : defaultGetStore())("readonly", function (e) {
		if (e.getAllKeys) return promisifyRequest(e.getAllKeys());
		var t = [];
		return eachCursor(e, function (e) {
			return t.push(e.key)
		}).then(function () {
			return t
		})
	})
}

function values() {
	return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : defaultGetStore())("readonly", function (e) {
		if (e.getAll) return promisifyRequest(e.getAll());
		var t = [];
		return eachCursor(e, function (e) {
			return t.push(e.value)
		}).then(function () {
			return t
		})
	})
}

function entries() {
	var r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : defaultGetStore();
	return r("readonly", function (e) {
		if (e.getAll && e.getAllKeys) return Promise.all([promisifyRequest(e.getAllKeys()), promisifyRequest(e.getAll())]).then(function (e) {
			var e = _slicedToArray(e, 2), t = e[0], r = e[1];
			return t.map(function (e, t) {
				return [e, r[t]]
			})
		});
		var t = [];
		return r("readonly", function (e) {
			return eachCursor(e, function (e) {
				return t.push([e.key, e.value])
			}).then(function () {
				return t
			})
		})
	})
}

// export default {clear,createStore,del,delMany,entries,get,getMany,keys,promisifyRequest,set,setMany,update,values};

/*
* Storage管理器
* @description `storageManager`有两个storage管理：
* @description 一个是IndexDB本地数据库(通过`idb-keyval`管理)，用于数据查询；
* @description 一个是油猴的GM_Storage本地储存，用于数据同步，防止域名更改产生的历史记录丢失
* */
let storageManager = {
	async init() {
		// 加载数据库
		defaultGetStoreFunc = createStore('animax-post', 'post-view-history')
		GM_deleteValue('post-view-history')
		// 获取数据库的值
		let GM_ViewHistoryList = GM_getValue('post-view-history')
		let DB_ViewHistoryList
		await values().then((values) => {
			console.log(values)
			DB_ViewHistoryList = values
		});

		/* 判断数据状态 */
		// 1. 没有数据库没有油猴储存，进行数组实例化
		if (!DB_ViewHistoryList[0] && !GM_ViewHistoryList) {
			console.log('default')
			console.log(GM_ViewHistoryList)
			console.log(DB_ViewHistoryList)
			GM_setValue('post-view-history', [])
		}
		// 2. 有数据库没有油猴储存，初始化`post-view-history`，从本地数据库中抓取数据
		else if ((DB_ViewHistoryList[0] && !GM_ViewHistoryList)) {
			console.log('postdefault')
			console.log(GM_ViewHistoryList)
			console.log(DB_ViewHistoryList)
			GM_setValue('post-view-history', DB_ViewHistoryList)
		}
		// 3. 没有数据库有油猴储存，初始化本地数据库，从GM存储中抓取数据
		else if (!DB_ViewHistoryList[0] && GM_ViewHistoryList) {
			console.log('indexDBdefault')
			console.log(GM_ViewHistoryList)
			console.log(DB_ViewHistoryList)
			const viewHistoryDatabase = []
			for (let i = 0; i < GM_ViewHistoryList.length; i++) {
				const viewHistory = GM_ViewHistoryList[i]
				viewHistoryDatabase.push([viewHistory.id, viewHistory])
			}
			setMany(GM_ViewHistoryList)
				.then(() => console.log('数据库数据转存完成！'))
				.catch((err) => console.log('It failed!', err));
		}
		// 4. 有数据库有油猴储存，判断数据是否同步
		else if (DB_ViewHistoryList.length !== GM_ViewHistoryList.length) {
			GM_setValue('post-view-history', DB_ViewHistoryList)
		}

	},
	/*
	* 通过`idb-keyval.get`查询数据库，异步获取历史记录
	* */
	get(archivesId) {
		return get(archivesId * 1)
	},

	/*
	* 设置GM_StorageSet
	* */
	GM_set(archivesId) {
		// 获取`post-view-history`
		const viewHistoryList = GM_getValue('post-view-history')
		viewHistoryList.push({
			id: archivesId * 1,
			date: (new Date).getTime()
		})
		// 储存当前帖子记录
		GM_setValue('post-view-history', viewHistoryList)
	},

	/*
	* 手动发送数据改变，因为监听不到数据库变化
	* */
	sendChangeStorage() {
		localStorage.DB_Change = 1
		localStorage.removeItem('DB_Change')
	},

	// 历史记录判断
	history: {},
}


/* 帖子样式管理
* 添加刷新按钮
* 添加全局样式功能
* */
let styleManager = {
	freshBtn: null,			// 刷新按钮对象

	mainReadOnBtn: null,		// 主页面已看按钮
	mainReadOffBtn: null,		// 主页面未看按钮
	navReadOnBtn: null,			// 侧边已看按钮
	navReadOffBtn: null,		// 侧边未看按钮

	postDisplay: '',			// 显示模式

	readStateContentList: ['未看', '已看'],		//浏览记录状态文本集
	readStateStyleList: ['read-off', 'read-on'],		//浏览记录状态样式集
	cardPos: {main: 'flag-read', nav: 'flag-info'},

	checkCounter: 0,
	timer: null,

	/* 添加全局样式函数 */
	addGlobalStyle(styleString) {
		// 创建CSS样式
		let style = document.createElement('style')
		style.innerHTML = styleString
		// 添加CSS样式
		document.querySelector('head').appendChild(style)
	},
	/* 添加全局样式 */
	initGlobalStyle() {
		// 添加样式
		this.addGlobalStyle(`
			/* 添加已看透明度样式 */
			.half-opacity { opacity: ${userConfig.opacity} }
			
			/* 添加刷新按钮样式 */
			.fresh-btn-style {
				color: #33a0de;
				border: none;
			}
			
			/* 添加main卡片阅读标记样式 */
			.flag-read {
				position: absolute;
				left: 5px;
				top: 5px;
			}
			
			/* 添加info卡片阅读标记样式 */
			.flag-info {
				position: absolute;
				right: 6px;
				top: 6px;
			}
			
			/* 添加已读样式 | 因为原先的样式权重太重的无法直接覆盖 */
			.read-on {
				font-size: 13px;
				padding: 3px 8px;
				background-color: hsla(0,0%,60%,.77);
				color: #fff;
				font-weight: 700;
				border-radius: 4px;
			}
			
			/* 添加未读样式 | 因为原先的样式权重太重的无法直接覆盖 */
			.read-off { 
				font-size: 13px;
				padding: 3px 8px;
				background-color: rgba(3,169,244,.77);
				color: #fff;
				font-weight: 700;
				border-radius: 4px;
			}
		`)

		// 添加标记图标
		this.mainReadOnBtn = this.createReadSign(1, 'main')
		this.mainReadOffBtn = this.createReadSign(0, 'main')
		this.navReadOnBtn = this.createReadSign(1, 'nav')
		this.navReadOffBtn = this.createReadSign(0, 'nav')

		// 读取用户显示模式
		if (Config.user.meta[1].key === 'post_display') this.postDisplay = Config.user.meta[1].value
	},

	/* 创建刷新按钮 */
	createFreshBtn() {
		const freshBtn = document.createElement('button')
		freshBtn.textContent = '刷新'

		// 添加CSS样式到按钮
		freshBtn.classList.add('fresh-btn-style')

		// 绑定点击事件
		freshBtn.addEventListener('click', cangkuHistory.read)

		// 创建刷新按钮
		this.freshBtn = freshBtn
		this.timer = setInterval(this.checkFreshBtnInsert, 500)
	},
	checkFreshBtnInsert() {
		const _this = styleManager

		let freshBtn = document.querySelector('.navbar-nav > .fresh-btn-style')
		if (_this.checkCounter++ >= 8 || freshBtn) {
			clearInterval(_this.timer)
			_this.checkCounter = 0
			_this.timer = null
			return;
		}

		if (!freshBtn) {
			// 创建刷新按钮
			document.querySelector('.navbar-nav').appendChild(_this.freshBtn)
			// 添加元素监听事件
			cangkuHistory.addElementListener()
			return;
		}
	},


	/* 创建已看图标
	* @return readSign: DomObj
	* */
	createReadSign(isRead, cardPos) {
		const _this = styleManager
		// 创建阅读标记图标
		const readSignContainer = document.createElement('div')
		readSignContainer.classList.add(_this.cardPos[cardPos], 'read-sign')
		const readSign = readSignContainer.innerHTML = `<div class="${_this.readStateStyleList[isRead]}">${_this.readStateContentList[isRead]}</div>`
		return readSignContainer
	},
}

/* 仓库历史记录读写
* */
let cangkuHistory = {
	url: document.URL,			// url
	splitUrl: '',				// 帖子类型数组
	viewType: '',				// 帖子类型
	archivesId: '',				// 帖子id

	postCardList: [],			// 帖子卡片列表

	checkCounter: 0,
	timer: null,

	/* 初始化子类 */
	init: {
		/* 获取默认属性 */
		getAttr() {
			const _this = cangkuHistory
			_this.splitUrl = _this.url.split('/')
			_this.viewType = _this.splitUrl[3]
			// 防止记录评论链接
			if (_this.viewType === 'archives')
				_this.archivesId = _this.splitUrl[4].split('#')[0]
		},

		// 添加事件监听
		addListener() {
			const _this = cangkuHistory
			// 监听页面跳转
			let _pushState = window.history.pushState;
			window.history.pushState = function () {
				if (_this.viewType !== 'archives') {
					// 重新读取列表
					_this.read()
				}

				return _pushState.apply(this, arguments);
			}

			// 重新读取加载列表
			window.addEventListener('storage', e => {
				if (e.newValue)		// 延时1.5s加载历史因为数据库不会立即更新
					setTimeout(_this.read, 1500)
			})
		},
	},

	/* 发送历史记录改变事件 */
	sendChangeStorage() {
		const _this = cangkuHistory
		storageManager.get(_this.archivesId)
			.then(
				val => {
					if (!val) {
						// 发送localStorage触发事件监听
						storageManager.sendChangeStorage()
						// 添加GM存储
						storageManager.GM_set(_this.archivesId)
					}
				}
			)
	},

	/* 读取全局历史 */
	async read() {
		const _this = cangkuHistory
		// 获取浏览信息
		// await storageManager.get()

		// 发送帖子改变消息
		if (_this.viewType === 'archives') {
			_this.sendChangeStorage()
		}

		// 初始化定时器，防止局部刷新导致定时器冲突
		_this.initTimer()
		// 获取帖子图片
		_this.timer = setInterval(_this.checkCardLoaded, 500)
	},

	/* 设置读取历史 */
	async setReadHistory() {
		const _this = cangkuHistory
		// 添加图片透明度
		for (const postCard of _this.postCardList) {
			// 获取帖子链接id

			let postPositionState	// 帖子位置状态
			// 获取帖子卡片的位置
			if (postCard.parentNode.tagName === 'A') {	// 侧边帖子卡片
				postPositionState = 'nav'
			} else {	// 主容器帖子卡片
				postPositionState = 'main'
			}

			let cardContainer	// 获取帖子卡片容器
			let postLinkNode	// 帖子链接a元素节点
			if (postPositionState === 'nav') {		// 侧边帖子卡片
				// 清除`half-opacity`类，因为侧边帖子卡片只会更新属性不会更新容器导致`half-opacity`类残留
				postCard.classList.remove('half-opacity')
				postLinkNode = postCard.parentNode 			// 获取帖子链接节点
				cardContainer = postLinkNode.children[1] 	// 获取帖子卡片容器

			} else if (postPositionState === 'main' && styleManager.postDisplay === 'thumb') {		// 缩略图主页面
				postLinkNode = postCard.parentNode.parentNode 	// 获取帖子链接节点
				cardContainer = postLinkNode.children[0] 		// 获取帖子卡片容器

			} else if (postPositionState === 'main' && styleManager.postDisplay === 'full') {		// 全图主页面
				postLinkNode = postCard.parentNode.querySelector('.body a')  	// 获取帖子链接节点
				cardContainer = postCard						// 获取帖子卡片容器

			}

			/* 写入记录 | 添加透明度类/已看标记 */
			// 获取帖子链接
			const postLink = postLinkNode.href.split('/')[4]
			// 从数据库中读取帖子链接
			let isRead = 0
			await storageManager.get(postLink)
				.then(val => {
					if (val) isRead = 1
				})
			// 添加透明
			if (isRead) {
				if (postCard.classList.contains('half-opacity')) continue;
				postCard.classList.add('half-opacity')
				console.log("Change opacity successfully")
			}

			// 用户设置 | 是否显示已看标记
			if (!userConfig.isDisplaySign) continue
			/* 添加已看标记元素到页面 */
			// 移除加载时产生的多余的标记元素
			if (cardContainer.querySelector('.read-sign'))
				cardContainer.querySelector('.read-sign').remove()

			// 添加标记元素
			const readState = isRead ? 'On' : 'Off'
			const readSignKey = `${postPositionState}Read${readState}Btn`
			const readSignObj = styleManager[readSignKey].cloneNode(true)
			readSignObj.classList.add(readSignKey, isRead)
			cardContainer.appendChild(readSignObj)
		}
	},
	// 检查帖子卡片加载状态
	checkCardLoaded() {
		const _this = cangkuHistory
		/*
			首页的postCard(全图模式)为9+3个
			首页的postCard(缩略图模式)为18+3个
			帖子内部的postCard为3+3个
			排行榜的postCard为9个（每次加载更新9个）
			分类的postCard为12个
		*/
		_this.postCardList = document.getElementsByClassName('cover')
		// console.log(_this.checkCounter)	// 测试
		if (_this.checkCounter++ >= 20 || _this.postCardList.length >= 6) {
			// console.log(_this.postCardList.length >= 6)
			// 初始化定时器
			_this.initTimer()

			// 设置读取历史记录（透明卡片）
			_this.setReadHistory()

		}
	},
	/* 初始化定时器 */
	initTimer() {
		const _this = cangkuHistory

		// 初始化定时器
		clearInterval(_this.timer)
		_this.checkCounter = 0
		_this.timer = null
	},


	// 添加元素监听
	addElementListener() {
		const _this = cangkuHistory

		// 监听侧边卡片点击事件
		const asideCard = document.querySelector('.card-nav')
		if (asideCard) {
			asideCard.addEventListener('click', () => {
				_this.read()
			})
		}
	},
};

// /*
// 主函数入口
;(async function () {
	// 初始化储存器
	await storageManager.init()

	// 添加初始化样式
	styleManager.initGlobalStyle()

	// 加载页面链接组件
	cangkuHistory.init.getAttr()

	// 读取历史
	await cangkuHistory.read()

	// 创建刷新按钮
	styleManager.createFreshBtn()

	// 创建初始化监听事件
	cangkuHistory.init.addListener()

	console.log(GM_getValue('post-view-history'));
})();
// */


/* 测试函数 */
;(async function () {
	// GM_deleteValue('post-view-history')
	// // 初始化`post-view-history`
	// if (!GM_getValue('post-view-history')) GM_setValue('post-view-history', [])
	//
	// const viewHistoryList = GM_getValue('post-view-history')
	// viewHistoryList.push({
	// 	id: '',
	// 	date: (new Date).getTime()
	// })
	// GM_setValue('post-view-history', viewHistoryList)
	// console.log(GM_getValue('post-view-history'));
	// GM_setValue('post-view-history', )
	// console.log(GM_getValue('post-view-history'));
	// console.log(GM_listValues());

	// getMany()
	// defaultGetStoreFunc = createStore('animax-post', 'post-view-history')

	// keys().then((keys) => console.log(keys));

	// window.addEventListener("load", () => {
	// 	alert("load")
	// })
	//
	// window.addEventListener("DOMContentLoaded", () => {
	// 	alert("DOMContentLoaded")
	// })
	//
	// window.addEventListener("popstate", () => {
	// 	alert("popstate")
	// })
	//
	// // 监听页面跳转
	// let _pushState = window.history.pushState;
	// window.history.pushState = function () {
	// 	return _pushState.apply(this, arguments);
	// }

})()








