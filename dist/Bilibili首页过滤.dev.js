// ==UserScript==
// @name	Bilibili首页过滤
// @version	0.1.3-beta
// @license	GPL-3
// @namespace	https://github.com/AliubYiero/TamperMonkeyScripts
// @run-at	document-idle
// @author	Yiero
// @homepage	https://github.com/AliubYiero/TamperMonkeyScripts
// @description	过滤首页已推荐视频, 指定UP主/关键词/营销号屏蔽. 
// @match	https://www.bilibili.com/*
// @grant	GM_addStyle
// @grant	GM_setValue
// @grant	GM_getValue
// @grant	GM_deleteValue
// @grant	GM_addElement
// @icon	https://www.bilibili.com/favicon.ico
// @require	file://D:\Github\TamperMonkeyScripts\dist\Bilibili首页过滤.dev.js
// ==/UserScript==


var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class EventListener {
  /**
   * 事件发送
   *
   * @param value 事件值
   * */
  static push(value) {
    window.dispatchEvent(new CustomEvent(this.EVENT_NAME, { detail: value }));
  }
  /**
   * 监听事件
   *
   * @param callback 回调函数
   * */
  static listen(callback) {
    window.addEventListener(this.EVENT_NAME, (e) => {
      const element = e.detail;
      callback(element);
    });
  }
}
// 事件名称
__publicField(EventListener, "EVENT_NAME", "ElementUpdate");
class ElementDisplay {
  /**
   * 显示视频卡片
   * */
  static show(Dom, displayMode = "block") {
    Dom.style.display = displayMode;
  }
  /**
   * 隐藏视频卡片
   * */
  static hide(Dom) {
    Dom.style.display = "none";
  }
}
function debounce(callback, timeoutPerSecond) {
  let timer;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      callback.apply(window, arguments);
    }, timeoutPerSecond * 1e3);
  };
}
const _Dialog = class _Dialog {
  constructor() {
    /**
     * 对话框元素
     * */
    __publicField(this, "dialog");
    this.dialog = this.init();
  }
  /**
   * 获取唯一实例
   * */
  static getInstance() {
    if (!this.instance) {
      this.instance = new _Dialog();
    }
    return this.instance;
  }
  /**
   * 显示UI
   * */
  show() {
    this.dialog.showModal();
  }
  /**
   * 隐藏UI
   * */
  hide() {
    this.dialog.close();
  }
  /**
   * 初始化往页面中添加一个UI
   * @private
   * */
  init() {
    const dialog = GM_addElement(document.body, "dialog", {
      id: "index-filter-container"
    });
    dialog.innerHTML = `
<form>
               <input type="button" value="搜索" id="search-btn">
               <input type="button" value="重置" id="reset-btn">
               <input type="checkbox" name="is-reverse" id="is-reverse">
               <label for="is-reverse">反向匹配</label>
               <input type="checkbox" name="is-exact" id="is-exact">
</form>
		`;
    return dialog;
  }
};
__publicField(_Dialog, "instance");
let Dialog = _Dialog;
const observeVideoCardLoad = (videoContainer) => {
  const videoCardTokenValueList = [
    // `.feed-card` 元素和下面的元素会出现重复
    // 'feed-card',
    "bili-video-card is-rcmd"
  ];
  const videoCardList = videoCardTokenValueList.map((token) => {
    const selector = "." + token.split(" ").join(".");
    return Array.from(document.querySelectorAll(selector));
  }).flat();
  videoCardList.forEach((element) => {
    EventListener.push(element);
  });
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      for (let addedNode of mutation.addedNodes) {
        if (
          // 不是 Node 节点
          addedNode.nodeType !== Node.ELEMENT_NODE || !videoCardTokenValueList.includes(addedNode.classList.value)
        ) {
          return;
        }
        EventListener.push(addedNode);
      }
    });
  });
  observer.observe(videoContainer, {
    childList: true
  });
};
const elementWaiter = async (selector, options = {}) => {
  const {
    father = document,
    timeoutPerSecond = 20,
    delayPerSecond = 0.3
  } = options;
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const element = father.querySelector(selector);
  if (element) {
    setTimeout(() => {
      resolve(element);
    }, delayPerSecond * 1e3);
    return promise;
  }
  let timer = window.setTimeout(() => {
    clearTimeout(timer);
    reject(new Error(`等待元素 ${selector} 超时`));
  }, timeoutPerSecond * 1e3);
  const observer = new MutationObserver(
    (mutationsList) => {
      var _a;
      for (let mutation of mutationsList) {
        for (let addedNode of mutation.addedNodes) {
          if (addedNode.nodeType !== Node.ELEMENT_NODE) {
            return;
          }
          const element2 = (_a = addedNode.parentNode) == null ? void 0 : _a.querySelector(selector);
          if (!element2) {
            return;
          }
          clearTimeout(timer);
          setTimeout(() => {
            resolve(element2);
          }, delayPerSecond * 1e3);
          observer.disconnect();
        }
      }
    }
  );
  observer.observe(father, { childList: true, subtree: true });
  return promise;
};
const observeContainerLoad = async () => {
  const containerSelector = ".recommended-container_floor-aside > .container";
  return await elementWaiter(containerSelector);
};
const getVideoBvId = (videoCardDom) => {
  const linkDom = videoCardDom.querySelector('a[href^="https://www.bilibili.com/video/"]');
  if (!linkDom) {
    return "";
  }
  return new URL(linkDom.href).pathname.split("/")[2] || "";
};
const api_GetVideoInfo = (videoBVId) => {
  return fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${videoBVId}`).then((res) => res.json()).then((res) => {
    if (res.code !== 0) {
      console.error("请求视频信息错误: ", videoBVId);
      return;
    }
    return res.data;
  });
};
const _useReadVideoStore = class _useReadVideoStore {
  constructor() {
    /**
     * 储存已读视频的bv id
     * key: bv id的第一个非前缀字符 BV1<key>
     * value: bv id字符串数组 (去除 BV1)
     * */
    __publicField(this, "localData");
    /** 储存库的名 */
    __publicField(this, "STORE_NAME", "ReadVideoIdList");
    __publicField(this, "setToDatabase", debounce(GM_setValue, 3));
    this.localData = this.getFromDatabase();
  }
  /**
   * 获取储存库
   * */
  static getInstance() {
    if (!this.instance) {
      this.instance = new _useReadVideoStore();
    }
    return this.instance;
  }
  /**
   * 和数据库比较视频id
   * */
  compare(bvId) {
    const { firstAlpha, fullAlpha } = this.splitVideoId(bvId);
    const localDataSet = this.localData.get(firstAlpha) || /* @__PURE__ */ new Set();
    return localDataSet.has(fullAlpha);
  }
  /**
   * 清空当前储存
   * */
  delete() {
    GM_deleteValue(this.STORE_NAME);
    this.localData = this.getFromDatabase();
  }
  /**
   * 设置视频id到存储中
   * */
  set(bvId) {
    var _a;
    const { firstAlpha, fullAlpha } = this.splitVideoId(bvId);
    if (this.compare(bvId)) {
      return false;
    }
    if (!this.localData.has(firstAlpha)) {
      this.localData.set(firstAlpha, /* @__PURE__ */ new Set());
    }
    (_a = this.localData.get(firstAlpha)) == null ? void 0 : _a.add(fullAlpha);
    this.setToDatabase(this.STORE_NAME, this.show());
    return true;
  }
  /**
   * 展示当前的所有数据
   * */
  show() {
    return Array.from(this.localData).map(([key, set]) => {
      return [key, Array.from(set)];
    });
  }
  /**
   * 分离视频id的前缀 (BV1)
   * */
  splitVideoId(bvId) {
    const fullAlpha = bvId.slice(3);
    const firstAlpha = fullAlpha.slice(0, 1);
    return {
      firstAlpha,
      fullAlpha
    };
  }
  /**
   * 从本地储存中获取数据
   * @returns {ReadVideoData}
   * */
  getFromDatabase() {
    const data = GM_getValue(this.STORE_NAME, []);
    if (!Array.isArray(data)) {
      return new Map(Object.entries(data).map(([key, array]) => [key, new Set(array)]));
    }
    return new Map(data.map(([key, array]) => [key, new Set(array)]));
  }
};
__publicField(_useReadVideoStore, "instance");
let useReadVideoStore = _useReadVideoStore;
const filterRepeatVideo = (videoInfo) => {
  const { bvid } = videoInfo;
  const readVideoStore = useReadVideoStore.getInstance();
  const existVideoId = readVideoStore.compare(bvid);
  console.log("比对结果: ", existVideoId, bvid.slice(3));
  !existVideoId && readVideoStore.set(bvid);
  return existVideoId;
};
const filterChain = [
  // 过滤重复视频
  filterRepeatVideo
];
const checkFilterChain = (videoInfo) => {
  return filterChain.some((filter) => filter(videoInfo));
};
const listenVideoCardLoad = () => {
  EventListener.listen(async (element) => {
    const videoId = getVideoBvId(element);
    if (!videoId) {
      return;
    }
    const videoInfo = await api_GetVideoInfo(videoId);
    const fatherDom = element.parentElement;
    if (fatherDom && fatherDom.classList.contains("feed-card")) {
      element = fatherDom;
    }
    if (checkFilterChain(videoInfo)) {
      console.info("[bilibili-index-video-filter] 满足条件, 隐藏元素", element);
      ElementDisplay.hide(element);
    }
  });
};
const init = async () => {
  const element = await observeContainerLoad();
  listenVideoCardLoad();
  observeVideoCardLoad(element);
  Dialog.getInstance().show();
};
(async () => {
  console.info(
    "[bilibili-index-video-filter] 当前已看视频数据库 (size: %sKB): ",
    Math.ceil(JSON.stringify(useReadVideoStore.getInstance().show()).length / 1024),
    useReadVideoStore.getInstance().show()
  );
  await init();
})();
