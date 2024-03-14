// ==UserScript==
// @name		SubsidiaryBiliBiliSignManually
// @description		手动标记拓展
// @author		Yiero
// @version		beta_1.0.1
// @match		https://www.bilibili.com/video/*
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
// @require		file://D:\Code\JavaScript\2023\8-9\TamperMonkey\tampermonkey-demo\dist\Bili\SubsidiaryBiliBiliSignManually\SubsidiaryBiliBiliSignManually.js
// @run-at		document-idle
// @icon		https://www.bilibili.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// ==/UserScript==
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
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
  group() {
    console.group(this.header);
  }
  groupEnd() {
    console.groupEnd();
  }
  contentInfo(...msg) {
    return [this.header, ...msg];
  }
}
function freshListenerPushState(callback, s = 1) {
  let _pushState = window.history.pushState;
  window.history.pushState = function() {
    setTimeout(callback, s * 1e3);
    return _pushState.apply(this, arguments);
  };
}
class EntryBranch {
  constructor() {
    __publicField(this, "branchList", []);
  }
  /**
   * 添加分支
   * @param { function:boolean | boolean } condition
   * @param { function } callback
   * */
  add(condition, callback) {
    if (typeof condition === "boolean") {
      this.branchList.push([() => condition, callback]);
    } else {
      this.branchList.push([condition, callback]);
    }
    return this;
  }
  /**
   * 添加默认分支, 无条件默认触发
   * @param { function } callback
   * */
  default(callback) {
    this.add(true, callback);
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
function elementWaiter(selector, config = document.body, timeoutPerSecond = 0, delayPerSecond = 0) {
  let parent = document.body;
  if (config && "parent" in config) {
    delayPerSecond = config.delayPerSecond || 0;
    timeoutPerSecond = config.timeoutPerSecond || 0;
    parent = config.parent || document.body;
  }
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
const getEl = document.querySelector.bind(document);
document.querySelectorAll.bind(document);
async function clickElement(selector, description, timeoutPerSecond = 20, delayPerSecond = 1) {
  await elementWaiter(selector, {
    timeoutPerSecond,
    delayPerSecond
  });
  const element = getEl(selector);
  if (element) {
    description ? print.log(description) : print.log("点击元素", element);
    element.click();
  } else {
    print.log("获取不到元素 / 获取元素超时", selector);
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
async function clickInputElement(selector, description) {
  await elementWaiter(selector, {
    timeoutPerSecond: 20,
    delayPerSecond: 1
  });
  const element = getEl(selector);
  if (element && element.checked) {
    description ? print.log(description) : print.log("点击元素", element);
    element.click();
  } else if (element) {
    print.log("弹幕已关闭", selector);
  } else {
    print.log("获取不到元素 / 获取元素超时", selector);
  }
}
const print = new Info("SubsidiaryBiliBiliSignManually");
async function clickEvent() {
  await clickElement(".switch-button.on", "关闭自动连播", 20);
  await clickInputElement(".bui-danmaku-switch-input", "关闭弹幕");
  await clickElement(".video-info-detail > .btnNotView", "点击观看标记按钮");
  await clickElement(".be-quick-favorite.video-toolbar-left-item:not(.on)", "点击快速收藏按钮");
  await clickElement(".switch-button.on", "关闭自动连播", 20, 10);
}
(async () => {
  await clickEvent();
  freshListenerPushState(async () => {
    await clickEvent();
  }, 5);
  new GMConfigMenu(async () => {
    await clickEvent();
  }).open("手动关闭");
})();
