/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
// ==UserScript==
// @name        自动收藏, 点击已看, 关闭连播
// @namespace   https://github.com/AliubYiero/TemperScripts
// @version     beta0.1
// @description
// @author      Yiero
// @match       https://www.bilibili.com/video/*
// @icon        /favicon.ico
// @require		file://
// @license     GPL
// @grant       none
// ==/UserScript==

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./libs/ElementWaiter.ts
/**
 * ElementWaiter.ts
 * created by 2023/12/31
 * @file 获取元素工具函数, 当目标元素未加载时, 等待页面载入
 * @author  Yiero
 * */
function elementWaiter(selector, config = document.body, timeoutPerSecond = 0, delayPerSecond = 0) {
  // 默认值赋予
  let parent = document.body;
  if (config && 'parent' in config) {
    delayPerSecond = config.delayPerSecond || 0;
    timeoutPerSecond = config.timeoutPerSecond || 0;
    parent = config.parent || document.body;
  }
  return new Promise((resolve, reject) => {
    /**
     * 工具函数: 延时返回目标元素函数
     * 提供两种获取目标元素的方式:
     * 1. 通过 Promise 返回值获取元素
     * 2. 根据分发的事件 'ElementGetter', 获取回调, 回调参数 e.detail 为目标元素
     * */
    function returnElement(element) {
      // 空元素, 抛出异常
      if (!element) {
        reject(new Error('Void Element'));
        return;
      }
      // 延时触发
      setTimeout(() => {
        // 触发事件 (element = e.detail);
        window.dispatchEvent(new CustomEvent('ElementGetter', {
          detail: element
        }));
        // 返回元素
        resolve(element);
      }, delayPerSecond * 1000);
    }
    // 分支1 - 元素已经载入, 直接获取到元素
    if (!!document.querySelector(selector)) {
      returnElement(document.querySelector(selector));
      return;
    }
    // 分支2 - 元素未载入, 使用MutationObserver获取元素
    else if (!!MutationObserver) {
      // 声明定时器
      const timer = timeoutPerSecond && window.setTimeout(() => {
        // 关闭监听器
        observer.disconnect();
        // 返回元素 reject
        returnElement();
      }, timeoutPerSecond * 1000);
      // 声明监听器
      const observer = new MutationObserver(observeElementCallback);
      function observeElementCallback(mutations) {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(addNode => {
            if (!(addNode instanceof HTMLElement)) {
              return;
            }
            // 获取元素
            const element = addNode.matches(selector) ? addNode : addNode.querySelector(selector);
            // 如果获取到元素
            if (element) {
              // 清空定时器
              timer && clearTimeout(timer);
              // 返回元素
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
    // 分支3 - 元素未载入, 浏览器无MutationObserver类, 使用定时器获取元素
    // 定时器延时: 500ms, 默认超时时间20s
    else {
      const intervalDelay = 500;
      let intervalCounter = 0;
      const maxIntervalCounter = Math.ceil((timeoutPerSecond * 1000 || 20 * 1000) / intervalDelay);
      const timer = window.setInterval(() => {
        // 定时器计数
        if (++intervalCounter > maxIntervalCounter) {
          // 超时清除计数器
          clearInterval(timer);
          // reject访问
          returnElement();
          return;
        }
        // 尝试获取元素
        const element = parent.querySelector(selector);
        // 获取到元素时
        if (element) {
          clearInterval(timer);
          returnElement(element);
        }
      }, intervalDelay);
    }
  });
}

;// CONCATENATED MODULE: ./src/index.ts
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const selectors = [
// 快速收藏
'.quick-favorite.be-quick-favorite:not(.on)',
// 未看按钮
'.btnView.btnNotView'];
function clickElements() {
  return __awaiter(this, void 0, void 0, function* () {
    for (const selector of selectors) {
      yield elementWaiter(selector, {
        timeoutPerSecond: 10
      });
      const element = document.querySelector(selector);
      console.log('获取元素:', 'element');
      element.click();
    }
  });
}
clickElements();
})();

/******/ })()
;