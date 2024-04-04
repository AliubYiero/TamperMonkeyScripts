// ==UserScript==
// @name	微信读书自动阅读助手
// @version	1.0.0-beta
// @license	GPL-3
// @namespace	https://github.com/AliubYiero/TamperMonkeyScripts
// @run-at	document-idle
// @author	Yiero
// @homepage	https://github.com/AliubYiero/TamperMonkeyScripts
// @description	微信读书自动滚动, 自动翻页. 
// @match	https://weread.qq.com/*
// @grant	GM_addStyle
// @icon	https://weread.qq.com/favicon.ico
// @require	file://D:\Github\TamperMonkeyScripts\dist\微信读书自动阅读助手.dev.js
// ==/UserScript==

/* ==UserConfig==
配置项:
    favouriteTitle:
        title: 指定收藏夹标题
        description: 更改指定收藏夹标题
        type: text
        default: fun
    userUid:
        title: 用户uid
        description: 设置用户uid
        type: text
        default: ""

 ==/UserConfig== */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const UserConfigs = {
  /* 分组1 */
  "配置项": {
    scrollSpeed: {
      title: "滚动速度",
      description: "修改页面滚动速度",
      type: "number",
      default: 1,
      min: 0
    },
    reachedBottomPauseTime: {
      title: "页面触底暂停时间",
      description: "修改页面触底暂停时间",
      type: "number",
      default: 3,
      min: 0
    }
  }
};
class GMStorageExtra extends Storage {
  /**
   * 拒绝用户实例化 GMStorage,
   * 只能使用静态方法
   * */
  // eslint-disable-next-line no-useless-constructors
  constructor() {
    super();
  }
  /**
   * Storage 对象中存储的数据项数量。
   * @override Storage.length
   * */
  static get length() {
    return this.keys().length;
  }
  /**
   * 该方法接受一个键名作为参数，返回键名对应的值。
   * @override Storage.getItem()
   * */
  static getItem(key, defaultValue, group) {
    return GM_getValue(this.createKey(key, group), defaultValue);
  }
  /**
   * 该方法接受一个键名作为参数，判断键名对应的值是否存在
   * */
  static hasItem(key, group) {
    return Boolean(this.getItem(key, group));
  }
  /**
   * 该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。
   * @override Storage.setItem()
   * */
  static setItem(key, value, group) {
    GM_setValue(this.createKey(key, group), value);
  }
  /**
   * 该方法接受一个键名作为参数，并把该键名从存储中删除。
   * @override Storage.removeItem()
   * */
  static removeItem(key, group) {
    GM_deleteValue(this.createKey(key, group));
  }
  /**
   * 调用该方法会清空存储中的所有键名。
   * @override Storage.clear()
   * */
  static clear() {
    const keyList = GM_listValues();
    for (const key of keyList) {
      GM_deleteValue(key);
    }
  }
  /**
   * 该方法接受一个数值 n 作为参数，并返回存储中的第 n 个键名。
   * @override Storage.key()
   * */
  static key(index) {
    return this.keys()[index];
  }
  /**
   * 返回当前储存中所有的键名
   *
   * @return {string[]} 当前储存中所有的键名
   */
  static keys() {
    return GM_listValues();
  }
  /**
   * 返回当前储存中所有的分组名
   * */
  static groups() {
    const keyList = this.keys();
    return keyList.map((key) => {
      const splitKeyList = key.split(".");
      if (splitKeyList.length === 2) {
        return splitKeyList[0];
      }
      return "";
    }).filter((item) => item);
  }
  /**
   * 如果传入了 group, 则生成 `group.key` 格式的 key
   *
   * @param {string} key - 要连接的 key 值
   * @param {string} [group] - 要连接的 group 值 (可以为中文)
   * @return {string} `group.key` 格式的 key 或者 `key`
   */
  static createKey(key, group) {
    if (group) {
      return `${group}.${key}`;
    }
    for (let groupName in UserConfigs) {
      const configGroup = UserConfigs[groupName];
      for (let configKey in configGroup) {
        if (configKey === key) {
          return `${groupName}.${key}`;
        }
      }
    }
    return key;
  }
}
class ScrollSpeedStorage {
  static get() {
    return GMStorageExtra.getItem("scrollSpeed", 1);
  }
  static set(value) {
    GMStorageExtra.setItem("scrollSpeed", value);
  }
}
class Scroll {
  /**
   * 开启滚动
   * */
  static open() {
    if (this.isScroll) {
      return;
    }
    this.isScroll = true;
    this.scroll();
    console.log("开启滚动, 当前的滚动速度是: ", ScrollSpeedStorage.get());
  }
  /**
   * 关闭滚动
   * */
  static close() {
    this.isScroll = false;
    console.log("关闭滚动");
  }
  /**
   * 切换滚动
   * */
  static toggle() {
    this.isScroll ? this.close() : this.open();
  }
  static stepPerFrame() {
    const scrollDistance = ScrollSpeedStorage.get();
    FrameCounter.add();
    if (FrameCounter.isScrollFrame) {
      window.scrollBy({
        top: scrollDistance,
        left: 0,
        behavior: "smooth"
      });
      PageReachedBottomEvent.listen();
    }
    this.isScroll && requestAnimationFrame(this.stepPerFrame.bind(this));
  }
  /**
   * 滚动
   * */
  static scroll() {
    requestAnimationFrame(this.stepPerFrame.bind(this));
  }
}
/**
 * 当前滚动状态
 * */
__publicField(Scroll, "isScroll", false);
class FrameCounter {
  /**
   * 判断当前是否为滚动帧
   * */
  static get isScrollFrame() {
    return !this.frame;
  }
  /**
   * 添加帧计数
   * */
  static add() {
    this.frame++;
    this.frame = this.frame % this.scrollFrameStep;
  }
}
// 当前帧技术
__publicField(FrameCounter, "frame", -1);
// 滚动帧步长
__publicField(FrameCounter, "scrollFrameStep", 5);
class ReachedBottomPauseTimeStorage {
  static get() {
    return GMStorageExtra.getItem("reachedBottomPauseTime", 3);
  }
  static set(value) {
    GMStorageExtra.setItem("reachedBottomPauseTime", value);
  }
}
class PageBottomBlankStyle {
  static add(height) {
    this.styleElement = GM_addStyle(`.readerFooter {min-height: ${height}px;`);
  }
  static remove() {
    var _a;
    (_a = this.styleElement) == null ? void 0 : _a.remove();
  }
}
__publicField(PageBottomBlankStyle, "styleElement");
const isReachedPageBottom = () => {
  const {
    scrollTop,
    clientHeight,
    scrollHeight
  } = document.documentElement;
  return scrollTop + clientHeight + 10 >= scrollHeight;
};
function fireKeyEvent(el, evtType, keyCode) {
  let evtObj;
  if (document.createEvent) {
    if (window.KeyEvent) {
      evtObj = document.createEvent("KeyEvents");
      evtObj.initKeyEvent(evtType, true, true);
      el.dispatchEvent(evtObj);
      return;
    }
    evtObj = document.createEvent("UIEvents");
    evtObj.initUIEvent(evtType, true, true);
    delete evtObj.keyCode;
    if (typeof evtObj.keyCode === "undefined") {
      Object.defineProperty(evtObj, "keyCode", { value: keyCode });
    } else {
      evtObj.key = String.fromCharCode(keyCode);
    }
    if (typeof evtObj.ctrlKey === "undefined") {
      Object.defineProperty(evtObj, "ctrlKey", { value: true });
    } else {
      evtObj.ctrlKey = true;
    }
    el.dispatchEvent(evtObj);
    return;
  }
}
const bindSpaceEvent = () => {
  window.addEventListener("keydown", (e) => {
    if (e.code !== "Space") {
      return;
    }
    e.preventDefault();
    Scroll.toggle();
  });
};
const addPageBottomBlankStyle = () => {
  PageBottomBlankStyle.remove();
  const bottomBlankHeight = Math.max(
    0,
    Math.min(
      window.innerHeight,
      Math.floor(window.innerHeight / (ScrollSpeedStorage.get() / 5))
    ) - 160
  );
  PageBottomBlankStyle.add(bottomBlankHeight);
};
const bindArrowEvent = () => {
  window.addEventListener("keydown", (e) => {
    if (!["ArrowUp", "ArrowDown"].includes(e.code)) {
      return;
    }
    e.preventDefault();
    const arrowSpeedChangeMapper = {
      "ArrowUp": 1,
      "ArrowDown": -1
    };
    const currentScrollSpeed = ScrollSpeedStorage.get();
    const willChangeScrollSpeed = Math.floor(
      Math.max(
        0,
        currentScrollSpeed + arrowSpeedChangeMapper[e.code]
      )
    );
    ScrollSpeedStorage.set(willChangeScrollSpeed);
    addPageBottomBlankStyle();
    console.log(`当前速度更改为: ${willChangeScrollSpeed}`);
  });
};
const switchNextPage = () => {
  fireKeyEvent(document, "keydown", 39);
  console.log("翻下一页");
};
const observePageFresh = () => {
  const observer = new MutationObserver((mutationRecordList) => {
    for (let mutationRecord of mutationRecordList) {
      for (let addedNode of mutationRecord.addedNodes) {
        if (addedNode.nodeType !== Node.ELEMENT_NODE) {
          return;
        }
        if (addedNode.classList.contains("readerContentHeader")) {
          observer.disconnect();
          setTimeout(() => {
            window.dispatchEvent(new Event("PageLoad"));
          }, 0.4 * 1e3);
          return true;
        }
      }
    }
  });
  observer.observe(document.querySelector(".app_content"), {
    childList: true
  });
};
const handlePageLoad = () => {
  let scrollWaiterTimer = 0;
  window.addEventListener(
    "PageLoad",
    () => {
      window.scrollTo(0, 90);
      const waitTime = window.innerHeight / (ScrollSpeedStorage.get() / 5 * 60);
      clearTimeout(scrollWaiterTimer);
      scrollWaiterTimer = window.setTimeout(() => {
        Scroll.open();
        window.removeEventListener("keydown", closeScrollWaiter);
      }, waitTime * 1e3);
      window.addEventListener("keydown", closeScrollWaiter);
      function closeScrollWaiter(e) {
        if (e.code !== "Space") {
          return;
        }
        e.preventDefault();
        clearTimeout(scrollWaiterTimer);
        window.removeEventListener("keydown", closeScrollWaiter);
        Scroll.close();
      }
    }
  );
};
class PageReachedBottomEvent {
  /**
   * 监听页面触底
   * */
  static listen() {
    if (!isReachedPageBottom()) {
      return;
    }
    clearTimeout(this.freshTimer);
    Scroll.close();
    this.freshTimer = window.setTimeout(() => {
      switchNextPage();
      observePageFresh();
      handlePageLoad();
    }, ReachedBottomPauseTimeStorage.get() * 1e3);
  }
}
__publicField(PageReachedBottomEvent, "freshTimer");
(() => {
  bindSpaceEvent();
  bindArrowEvent();
  addPageBottomBlankStyle();
})();
