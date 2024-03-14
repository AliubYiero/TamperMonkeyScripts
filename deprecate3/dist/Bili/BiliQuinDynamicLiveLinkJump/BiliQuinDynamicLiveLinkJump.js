// ==UserScript==
// @name		Quin动态直播间链接快捷跳转
// @name:en		BiliQuinDynamicLiveLinkJump
// @description		Quin动态直播间链接快捷跳转
// @description:en		Quin动态直播间链接快捷跳转
// @author		Yiero
// @version		beta_1.0.1
// @match		https://t.bilibili.com/*
// @icon		https://t.bilibili.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @run-at		document-idle
// @require		file://D:\Code\tampermonkey-demo\dist\Bili\BiliQuinDynamicLiveLinkJump\BiliQuinDynamicLiveLinkJump.js
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
    return [this.header, ...msg];
  }
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
function isMatchURL(...regExpList) {
  const matchResultList = [];
  regExpList.forEach((regExp) => {
    if (typeof regExp === "string") {
      regExp = new RegExp(regExp);
    }
    matchResultList.push(!!document.URL.match(regExp));
  });
  return matchResultList.includes(true);
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
class DynamicLoad {
  constructor() {
    this.updateObserver();
  }
  /**
   * 获取当前所有动态
   * @return { Node[] }
   * */
  get items() {
    return Array.from(document.querySelectorAll(".bili-dyn-list__item"));
  }
  /**
   * 动态加载监听器, 当动态更新时(加载), 分发一个事件(dynamicUpdate)提示动态更新, 并返回新加载的动态NodeList
   * */
  updateObserver() {
    const dynamicUpdateObserver = new MutationObserver((recordList) => {
      const appendDynamicList = [];
      recordList.forEach((record) => {
        appendDynamicList.push(...Array.from(record.addedNodes));
      });
      window.dispatchEvent(new CustomEvent("dynamicUpdate", {
        detail: appendDynamicList
      }));
    });
    dynamicUpdateObserver.observe(document.querySelector(".bili-dyn-list__items"), {
      childList: true
    });
  }
}
function isQuin(dynamicDom) {
  var _a;
  const upName = (_a = dynamicDom.querySelector(".bili-dyn-title__text")) == null ? void 0 : _a.innerText;
  return upName === "Mr.Quin";
}
function addQuinLiveBtn(dynamicDom) {
  if (!isQuin(dynamicDom)) {
    return;
  }
  const domList = {
    dynamicItem: dynamicDom,
    firstMoreBtn: dynamicDom.querySelector(".bili-dyn-more__menu__item"),
    popoverContainer: dynamicDom.querySelector(".bili-popover"),
    moreMenu: dynamicDom.querySelector(".bili-dyn-more__menu")
  };
  const dynamicItem = dynamicDom;
  const CCLiveLinkBtn = domList.firstMoreBtn.cloneNode();
  CCLiveLinkBtn.dataset.type = "THREE_POINT_CC_LIVE_LINK";
  CCLiveLinkBtn.innerHTML = '<a href="https://cc.163.com/361433/" target="_blank">跳转CC</a>';
  CCLiveLinkBtn.onclick = () => domList.popoverContainer.style.display = "none";
  const douyinLiveLinkBtn = dynamicItem.querySelector(".bili-dyn-more__menu__item").cloneNode();
  douyinLiveLinkBtn.dataset.type = "THREE_POINT_DOUYIN_LIVE_LINK";
  douyinLiveLinkBtn.innerHTML = '<a href="https://live.douyin.com/200525029536" target="_blank">跳转抖音</a>';
  douyinLiveLinkBtn.onclick = () => domList.popoverContainer.style.display = "none";
  domList.moreMenu.appendChild(CCLiveLinkBtn);
  domList.moreMenu.appendChild(douyinLiveLinkBtn);
}
async function handlerBindQuinLiveBtn() {
  await elementWaiter(".bili-dyn-list__item");
  const dynamicLoad = new DynamicLoad();
  const dynamicList = dynamicLoad.items;
  dynamicList.forEach(addQuinLiveBtn);
  window.addEventListener("dynamicUpdate", (e) => {
    const result = e;
    const dynamicList2 = result.detail;
    dynamicList2.forEach(addQuinLiveBtn);
  });
}
(async () => {
  new EntryBranch().add(
    isMatchURL("^https://t.bilibili.com/"),
    handlerBindQuinLiveBtn
  ).run();
})();
