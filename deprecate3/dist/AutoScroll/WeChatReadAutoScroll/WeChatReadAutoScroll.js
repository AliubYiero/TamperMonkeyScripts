// ==UserScript==
// @name		微信读书自动阅读
// @name:en		WeChatReadAutoScroll
// @description		微信读书阅读自动滚动, 触底自动翻页
// @version		beta_1.0.0
// @match		https://weread.qq.com/web/reader/*
// @author		Yiero
// @icon		https://weread.qq.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
// @require		file://D:\Code\tampermonkey-demo\dist\AutoScroll\WeChatReadAutoScroll\WeChatReadAutoScroll.js
// @run-at		document-idle
// ==/UserScript==
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value2) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __publicField = (obj, key, value2) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value2);
  return value2;
};
class Info {
  constructor(projectName) {
    // @ts-ignore
    __publicField(this, "projectName");
    __publicField(this, "header");
    this.projectName = projectName;
    this.header = `[${projectName}]`;
  }
  log(...msg) {
    console.log(...this.contentInfo(...msg));
  }
  info(...msg) {
    console.info(...this.contentInfo(...msg));
  }
  warn(...msg) {
    console.warn(...this.contentInfo(...msg));
  }
  error(...msg) {
    console.error(...this.contentInfo(...msg));
  }
  contentInfo(...msg) {
    return [this.header, ...msg];
  }
}
class EntryBranch {
  constructor() {
    __publicField(this, "branchList", []);
  }
  /**
   * 添加分支
   * @param { function:boolean } condition
   * @param { function } callback
   * */
  add(condition, callback) {
    this.branchList.push([condition, callback]);
    return this;
  }
  /**
   * 添加默认分支, 无条件默认触发
   * @param { function } callback
   * */
  default(callback) {
    this.branchList.push([() => true, callback]);
    return this;
  }
  /**
   * 运行, 查看是否存在能够运行的入口
   * */
  run() {
    const entry = this.branchList.find((entry2) => entry2[0]());
    if (entry) {
      new Info("EntryBranch").log("进入分支", entry);
      entry[1]();
    }
  }
}
function elementWaiter(selector, parent = document.body, timeoutPerSecond = 0, delayPerSecond = 0) {
  parent || (parent = document.body);
  const entryBranch = new EntryBranch();
  return new Promise((resolve, reject) => {
    function returnElement(element) {
      if (!element) {
        reject(new Error("void Element"));
        return;
      }
      setTimeout(() => {
        dispatchEvent(new CustomEvent("getElement", { detail: element }));
        resolve(element);
      }, delayPerSecond * 1e3);
    }
    entryBranch.add(
      () => !!document.querySelector(selector),
      () => {
        returnElement(document.querySelector(selector));
      }
    ).add(
      () => !!MutationObserver,
      () => {
        const timer = timeoutPerSecond && window.setTimeout(() => {
          observer.disconnect();
          returnElement();
        }, timeoutPerSecond * 1e3);
        const observer = new MutationObserver(observeElementCallback);
        function observeElementCallback(mutations) {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((addNode) => {
              if (!(addNode instanceof HTMLElement)) {
                return;
              }
              const element = addNode.matches(selector) ? addNode : addNode.querySelector(selector);
              if (element) {
                timer && clearTimeout(timer);
                returnElement(element);
              }
            });
          });
        }
        observer.observe(parent, {
          subtree: true,
          childList: true
        });
      }
    ).default(
      () => {
        const intervalDelay = 500;
        let intervalCounter = 0;
        const maxIntervalCounter = Math.ceil((timeoutPerSecond * 1e3 || 20 * 1e3) / intervalDelay);
        const timer = window.setInterval(() => {
          if (++intervalCounter > maxIntervalCounter) {
            clearInterval(timer);
            returnElement();
            return;
          }
          const element = parent.querySelector(selector);
          if (element) {
            clearInterval(timer);
            returnElement(element);
          }
        }, intervalDelay);
      }
    ).run();
  });
}
function MathCeilFloat(number, decimal = 0) {
  decimal = Math.pow(10, decimal);
  return Math.ceil(number * decimal) / decimal;
}
function isReachedPageBottom() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  return scrollTop + clientHeight >= scrollHeight;
}
class ScrollOptionsImpl {
  constructor() {
    /**  延时开启滚动的时间 */
    __publicField(this, "_delayPerMs", 0);
    /** 每一帧的持续时间 */
    __publicField(this, "_frameDuration", 0);
    /** 每秒滚动的帧数 */
    __publicField(this, "_framePerSecond", 0);
    /** 每秒移动的距离 */
    __publicField(this, "_movementDistancePerSecond", 0);
  }
  get delayPerMs() {
    return this._delayPerMs;
  }
  set delayPerMs(value) {
    if (typeof value === "string") {
      const scrollPageDuration = window.innerHeight / this.movementDistancePerSecond * 1e3;
      print.log(scrollPageDuration, this.movementDistancePerSecond);
      try {
        this._delayPerMs = eval(value.replace("auto", String(scrollPageDuration)));
      } catch (e) {
        this._delayPerMs = scrollPageDuration;
      }
    } else {
      this._delayPerMs = value;
    }
  }
  /** 每帧移动的距离, movementDistancePerSecond 和 framePerSecond 的计算数值 */
  get movementDistancePerFrame() {
    return MathCeilFloat(this.movementDistancePerSecond / this.framePerSecond, 3);
  }
  get frameDuration() {
    return MathCeilFloat(1e3 / this._frameDuration);
  }
  get framePerSecond() {
    return this._framePerSecond;
  }
  set framePerSecond(animationFramePerMs) {
    this._framePerSecond = Math.ceil(1e3 / animationFramePerMs);
  }
  get movementDistancePerSecond() {
    return this._movementDistancePerSecond;
  }
  set movementDistancePerSecond(value2) {
    this._movementDistancePerSecond = value2;
  }
}
class GlobalAutoScroll {
  /**
   * @constructor
   * @param { number } movementDistancePerSecond 每秒移动的距离
   * @param { number | string = } [delayPerMs = 'auto'] 延时触发滚动的时间(ms), 0为不进行延时触发滚动, 特殊值 auto 表示滚动一页的时间, 支持四则运算
   * @param { number } [framePerSecond = 60]
   * */
  constructor(movementDistancePerSecond, delayPerMs = "auto", framePerSecond = 17) {
    __publicField(this, "options", new ScrollOptionsImpl());
    /** 计时器 */
    __publicField(this, "timer");
    this.options.movementDistancePerSecond = movementDistancePerSecond;
    this.options.delayPerMs = delayPerMs;
    this.options.framePerSecond = framePerSecond;
  }
  /**
   * 开启滚动
   * */
  async open() {
    if (this.timer) {
      this.close();
    }
    await elementWaiter(".chapterTitle", void 0, 0, 0.1);
    scrollStatusStorage.set("scrolling");
    print.info("等待滚动: ", this.options.delayPerMs);
    this.timer = window.setTimeout(() => {
      let prevTimestamp = 0;
      const scrollStep = (timestamp) => {
        if (prevTimestamp) {
          this.options.framePerSecond = timestamp - prevTimestamp;
        }
        prevTimestamp = timestamp;
        this.scroll();
        if (isReachedPageBottom()) {
          this.close();
          return;
        }
        console.log(this.options);
        this.timer = window.requestAnimationFrame(scrollStep);
      };
      this.timer = window.requestAnimationFrame(scrollStep);
    }, this.options.delayPerMs);
  }
  /**
   * 关闭滚动
   * */
  close() {
    scrollStatusStorage.set("scroll-end");
    if (this.timer) {
      window.clearTimeout(this.timer);
      window.cancelAnimationFrame(this.timer);
    }
    this.timer = void 0;
  }
  /** 滚动函数 */
  scroll() {
    const movementDistancePerFrame = this.options.movementDistancePerFrame;
    scrollBy(0, movementDistancePerFrame);
  }
}
class GMConfigMenu {
  constructor(callback) {
    /** 配置菜单Id, 用于识别配置菜单, 关闭配置菜单 */
    __publicField(this, "menuId", 0);
    /** 回调函数 */
    __publicField(this, "callback");
    this.callback = callback;
  }
  /**
   * 注册油猴菜单配置项
   * @param {string} title 配置项提示文本
   * */
  open(title) {
    if (this.menuId) {
      this.close();
    }
    this.menuId = GM_registerMenuCommand(title, this.callback);
  }
  /**
   * 注销油猴菜单配置项
   * */
  close() {
    GM_unregisterMenuCommand(this.menuId);
    this.menuId = 0;
  }
}
class LocalStorage {
  constructor(key) {
    __publicField(this, "key");
    this.key = key;
  }
  get(defaultValue) {
    return localStorage.getItem(this.key) || defaultValue || "";
  }
  remove() {
    const oldValue = this.get();
    const newValue = void 0;
    dispatchEvent(new CustomEvent("storageUpdate", {
      detail: {
        key: this.key,
        newValue,
        oldValue
      }
    }));
    localStorage.removeItem(this.key);
  }
  set(value2) {
    const oldValue = this.get();
    const newValue = value2;
    dispatchEvent(new CustomEvent("storageUpdate", {
      detail: {
        key: this.key,
        newValue,
        oldValue
      }
    }));
    localStorage.setItem(this.key, value2);
  }
}
class SessionStorage {
  constructor(key) {
    __publicField(this, "key");
    this.key = key;
  }
  get(defaultValue) {
    return sessionStorage.getItem(this.key) || defaultValue || "";
  }
  remove() {
    const oldValue = this.get();
    const newValue = void 0;
    dispatchEvent(new CustomEvent("storageUpdate", {
      detail: {
        key: this.key,
        newValue,
        oldValue
      }
    }));
    sessionStorage.removeItem(this.key);
  }
  set(value2) {
    const oldValue = this.get();
    const newValue = value2;
    dispatchEvent(new CustomEvent("storageUpdate", {
      detail: {
        key: this.key,
        newValue,
        oldValue
      }
    }));
    sessionStorage.setItem(this.key, value2);
  }
}
new MouseEvent("mouseenter", {
  button: 0,
  bubbles: true,
  cancelable: true,
  clientX: 819,
  clientY: 413
});
new MouseEvent("mousedown", {
  bubbles: true,
  cancelable: true,
  button: 0
});
new MouseEvent("mouseup", {
  bubbles: true,
  cancelable: true,
  button: 0
});
new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  button: 0
});
function fireKeyEvent(el = document, evtType, keyCode) {
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
const print = new Info("WeChatReadAutoScroll");
const scrollStatusStorage = new SessionStorage("scrollStatus");
(async () => {
  const scrollSpeedController = new GMConfigMenu(() => {
    const result = prompt("页面滚动速度(px/s)", localStorage.getItem("scrollSpeed") || "100");
    if (!result) {
      return;
    }
    localStorage.setItem("scrollSpeed", result);
  });
  scrollSpeedController.open("[配置] 滚动速度");
  const scrollDelayController = new GMConfigMenu(() => {
    const result = prompt("滚动开启延时 ( auto | (auto / 2) | number ) (ms)", localStorage.getItem("scrollDelay") || "auto");
    if (!result) {
      return;
    }
    localStorage.setItem("scrollDelay", result);
  });
  scrollDelayController.open("[配置] 滚动开启延时");
  function scrollSwitch() {
    let globalAutoScroll;
    const scrollOpenController = new GMConfigMenu(scrollOpenMenuCallback);
    function scrollOpenMenuCallback() {
      const scrollSpeedStorage = new LocalStorage("scrollSpeed");
      const scrollDelayStorage = new LocalStorage("scrollDelay");
      globalAutoScroll = new GlobalAutoScroll(
        +scrollSpeedStorage.get("100"),
        scrollDelayStorage.get("auto"),
        60
      );
      globalAutoScroll.open();
      window.addEventListener("click", () => {
        globalAutoScroll.close();
      }, {
        once: true
      });
      window.addEventListener("keydown", (e) => {
        if (![" "].includes(e.key)) {
          return;
        }
        e.preventDefault();
        globalAutoScroll.close();
      }, {
        once: true
      });
      scrollOpenController.close();
      scrollCloseController.open("关闭滚动");
    }
    const scrollCloseController = new GMConfigMenu(scrollCloseMenuCallback);
    function scrollCloseMenuCallback() {
      scrollCloseController.close();
      scrollOpenController.open("开启滚动");
      window.addEventListener("keydown", (e) => {
        if (!["PageDown", " "].includes(e.key) || scrollStatusStorage.get() === "scroll-end") {
          return;
        }
        e.preventDefault();
        scrollOpenMenuCallback();
      }, { once: true });
    }
    scrollCloseMenuCallback();
    scrollStatusStorage.set("scroll-start");
    window.addEventListener("storageUpdate", (e) => {
      const event = e;
      if (event.detail.key === "scrollStatus" && event.detail.newValue === "scroll-end") {
        scrollCloseMenuCallback();
        if (isReachedPageBottom()) {
          fireKeyEvent(document, "keydown", 39);
          scrollOpenMenuCallback();
        }
      }
    });
  }
  scrollSwitch();
})();
