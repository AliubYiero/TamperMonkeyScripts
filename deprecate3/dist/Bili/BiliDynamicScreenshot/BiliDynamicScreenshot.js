// ==UserScript==
// @name		BiliDynamicScreenshot
// @name:en		BiliDynamicScreenshot
// @description		BiliDynamicScreenshot
// @description:en		BiliDynamicScreenshot
// @author		Yiero
// @version		beta_1.0.0
// @match		https://t.bilibili.com/*
// @icon		https://t.bilibili.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @run-at		document-idle
// @grant		GM_addStyle
// @grant		GM_addElement
// @require		file://D:\Code\tampermonkey-demo\dist\Bili\BiliDynamicScreenshot\BiliDynamicScreenshot.js
// @require		https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js
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
const getEl = document.querySelector.bind(document);
const getEls = document.querySelectorAll.bind(document);
function parseDynamicList(dynamicNodeList) {
  const dynamicNodeDataSet = /* @__PURE__ */ new Set();
  for (let dynamicNode of dynamicNodeList) {
    dynamicNodeDataSet.add({
      target: dynamicNode,
      isInsert: !!dynamicNode.querySelector('.bili-dyn-more__menu__item[data-type="THREE_POINT_SAVE_AS_PNG"]')
    });
  }
  return dynamicNodeDataSet;
}
function addSaveBtn(dynamicNodeData) {
  if (dynamicNodeData.isInsert) {
    return;
  }
  const moreBtn = dynamicNodeData.target.querySelector(".bili-dyn-more__menu");
  const saveDynamicBtn = moreBtn.querySelector(".bili-dyn-more__menu__item").cloneNode();
  saveDynamicBtn.dataset["type"] = "THREE_POINT_SAVE_AS_PNG";
  saveDynamicBtn.innerText = "保存为图片";
  moreBtn.appendChild(saveDynamicBtn);
  saveDynamicBtn.addEventListener("click", async () => {
    dynamicNodeData.target.querySelector(".bili-popover").style.display = "none";
    const dynamicCanvasDom = await html2canvas(dynamicNodeData.target, {
      allowTaint: true,
      useCORS: true,
      ignoreElements(element) {
        return element.matches(".bili-dyn-item__action");
      }
    });
    print.log(dynamicCanvasDom);
    dynamicCanvasDom.toBlob((blob) => {
      if (!blob) {
        return;
      }
      navigator.clipboard.write([new ClipboardItem({
        [blob.type]: blob
      })]);
    });
  });
}
function addDynamicSaveBtn(dynamicNodeDataSet) {
  dynamicNodeDataSet.forEach(addSaveBtn);
}
const print = new Info("BiliDynamicScreenshot");
(async () => {
  new EntryBranch().add(
    isMatchURL("^https://t.bilibili.com/"),
    async () => {
      await elementWaiter(".bili-dyn-list__item", null, 0, 1);
      const dynamicNodeDataSet = parseDynamicList(getEls(".bili-dyn-list__item"));
      addDynamicSaveBtn(dynamicNodeDataSet);
      new MutationObserver((e) => {
        e.forEach((record) => {
          const dynamicNodeDataSet2 = parseDynamicList(record.addedNodes);
          addDynamicSaveBtn(dynamicNodeDataSet2);
        });
      }).observe(getEl(".bili-dyn-list__items"), {
        childList: true
      });
    }
  ).run();
})();
