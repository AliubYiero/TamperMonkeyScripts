// ==UserScript==
// @name		SubsidiaryBiliBiliSignManually
// @author		Yiero
// @description		手动标记拓展
// @version		1.0.0
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts
// @match		https://www.bilibili.com/video/*
// @icon		https://www.bilibili.com/favicon.ico
// @require		file://D:\Code\TamperMoneyScripts-vite\dist\undefined.js
// @license		GPL
// @updateUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/undefined.js
// @downloadUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/undefined.js
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
  contentInfo(...msg) {
    return [this.header, `[${(/* @__PURE__ */ new Date()).toLocaleString("zh-ch")}]`, ...msg];
  }
}
function getElement(parent = document.body, selector, timeoutPerSecond = 0, getElementDelayPerSecond = 0) {
  return new Promise((resolve) => {
    let result = parent.querySelector(selector);
    if (result) {
      return resolve(result);
    }
    let timer;
    const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
    if (mutationObserver) {
      const observer = new mutationObserver((mutations) => {
        for (let mutation of mutations) {
          for (let addedNode of mutation.addedNodes) {
            if (addedNode instanceof Element) {
              result = addedNode.matches(selector) ? addedNode : addedNode.querySelector(selector);
              if (result) {
                observer.disconnect();
                timer && clearTimeout(timer);
                setTimeout(() => {
                  return resolve(result);
                }, getElementDelayPerSecond * 1e3);
              }
            }
          }
        }
      });
      observer.observe(parent, {
        childList: true,
        subtree: true
      });
      if (timeoutPerSecond > 0) {
        timer = setTimeout(() => {
          observer.disconnect();
          return resolve(null);
        }, timeoutPerSecond * 1e3);
      }
    }
  });
}
const print = new Info("SubsidiaryBiliBiliSignManually");
class ReadBtnClick {
  constructor(selector) {
    __publicField(this, "selector");
    this.selector = selector;
  }
  async click() {
    await getElement(void 0, this.selector, 20);
    const element = document.querySelector(this.selector);
    if (element) {
      print.log("触发观看标记", element);
      element.click();
    } else {
      print.log("获取超时, 获取不到目标元素", this.selector, element);
    }
  }
}
class QuickFavorClick {
  constructor(selector) {
    __publicField(this, "selector");
    this.selector = selector;
  }
  async click() {
    const isFavor = !!document.querySelector(".video-fav.video-toolbar-left-item.on");
    await getElement(void 0, this.selector, 20, 1);
    const element = document.querySelector(this.selector);
    if (!isFavor && element) {
      print.log("触发观看标记", element);
      element.click();
    } else {
      print.log("获取超时, 获取不到目标元素", this.selector, element);
    }
  }
}
(async () => {
  await new ReadBtnClick(".video-info-detail > .btnNotView").click();
  await new QuickFavorClick(".be-quick-favorite.video-toolbar-left-item:not(.on)").click();
})();
