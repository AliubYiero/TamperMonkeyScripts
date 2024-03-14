// ==UserScript==
// @name		TencentCourseIdRemove
// @author		Yiero
// @description		移除腾讯课堂登录后观看视频会出现的课堂Id
// @version		1.0.0
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts
// @match		https://ke.qq.com/course/*
// @icon		https://ke.qq.com/favicon.ico
// @require		file://D:\Code\TamperMoneyScripts-vite\dist\undefined.js
// @license		GPL
// @grant		GM_addStyle
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
const print = new Info("TencentCourseIdRemove");
(async () => {
  if (!document.URL.match(/https:\/\/ke.qq.com\/course\/\d+\/\d+/g)) {
    return;
  }
  const courseIdObserver = new MutationObserver((e) => {
    e.forEach((record) => {
      const addNode = record.addedNodes[0];
      if (addNode == null ? void 0 : addNode.innerText.match(/^\d+$/)) {
        print.log("移除课堂Id");
        addNode.style.display = "none";
      }
    });
  });
  getElement(void 0, "#video-container").then(
    (res) => {
      if (!res) {
        return;
      }
      document.querySelector("#video-container > div").remove();
      courseIdObserver.observe(res, {
        childList: true
      });
    }
  );
})();
