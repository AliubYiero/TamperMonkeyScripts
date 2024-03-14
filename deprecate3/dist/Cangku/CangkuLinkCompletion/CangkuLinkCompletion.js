// ==UserScript==
// @name		仓库资源链接补全
// @name:en		CangkuLinkCompletion
// @description		智能识别仓库的资源链接, 补全提取码. 
// @description:en		智能识别仓库的资源链接, 补全提取码. 
// @author		Yiero
// @version		beta_1.0.0
// @match		https://cangku.moe/archives/*
// @match		https://pan.baidu.com/s/*
// @icon		https://cangku.moe/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @run-at		document-idle
// @grant		GM_addElement
// @grant		GM_addStyle
// @require		file://D:\Code\tampermonkey-demo\dist\Cangku\CangkuLinkCompletion\CangkuLinkCompletion.js
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
document.querySelector.bind(document);
const getEls = document.querySelectorAll.bind(document);
const print = new Info("CangkuLinkCompletion");
(async () => {
  await elementWaiter(".comment-item");
  const pwdRegString = "[A-Za-z0-9]{4}";
  const links = getEls('a[href*="pan.baidu.com"]:not([href*="?pwd"])');
  links.forEach((link) => {
    const linkDom = link.cloneNode(true);
    print.log(linkDom);
    function getParentElement(link2) {
      if (!link2) {
        print.log("遍历所有父元素, 无法查询到提取码.");
        return;
      }
      function matchEnterCode(content) {
        let enterCode3 = null;
        const enterCodeMatch = content.match(new RegExp(`提取码?s*?[：:]s*?(${pwdRegString})`)) || content.match(new RegExp(`\\b(${pwdRegString})\\b`));
        if (enterCodeMatch) {
          enterCode3 = enterCodeMatch[1];
        }
        return enterCode3;
      }
      const enterCode2 = matchEnterCode(link2.innerText);
      if (enterCode2) {
        print.log("获取到提取码: ", enterCode2);
        return enterCode2;
      } else {
        return getParentElement(link2.parentElement);
      }
    }
    const enterCode = getParentElement(link);
    if (enterCode) {
      link.href += `?pwd=${enterCode}`;
    }
  });
})();
