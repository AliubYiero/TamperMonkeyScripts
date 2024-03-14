// ==UserScript==
// @name		学习通首页优化
// @name:en		ChaoxingClean
// @description		学习通首页优化
// @description:en		学习通首页优化
// @author		Yiero
// @version		beta_1.0.0
// @match		*://i.chaoxing.com/*
// @match		*://mooc2-ans.chaoxing.com/visit/interaction?s=cd8293306cd15c8ddc528548641ec66f
// @icon		https://i.chaoxing.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @run-at		document-body
// @grant		GM_addStyle
// @require		file://D:\Code\tampermonkey-demo\dist\PageBeautiful\ChaoxingClean\ChaoxingClean.js
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
const styleConfig = {
  hide: {
    /* 首页 */
    main: {
      main: [
        "#first142707",
        "#first142708",
        "#first142710",
        "#first142711",
        "#first142713",
        "#first142715",
        "#myTeach",
        "#to_top"
      ]
    },
    /* 课程页面 */
    course: {
      main: [
        "#myTeach"
      ]
    }
  },
  pref: {}
};
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
class CSSRule {
  constructor() {
    __publicField(this, "cssRuleSet", /* @__PURE__ */ new Set());
    __publicField(this, "styleDom", document.createElement("style"));
  }
  push(selector, rule) {
    let ruleString = "";
    for (let ruleKey in rule) {
      const ruleValue = rule[ruleKey];
      ruleString += `${ruleKey}:${ruleValue};`;
    }
    this.cssRuleSet.add(`${selector} {${ruleString}}`);
    return this;
  }
  pushImportant(selector, rule) {
    let ruleString = "";
    for (let ruleKey in rule) {
      let ruleValue = rule[ruleKey];
      if (typeof ruleValue === "string") {
        ruleValue = ruleValue.replace("!important", "");
      }
      ruleString += `${ruleKey}:${ruleValue} !important;`;
    }
    this.cssRuleSet.add(`${selector} {${ruleString}}`);
    return this;
  }
  pushHide(selector) {
    this.pushImportant(selector, {
      display: "none"
    });
    return this;
  }
  pushHideList(selectorList) {
    selectorList.forEach((selector) => {
      this.pushImportant(selector, {
        display: "none"
      });
    });
    return this;
  }
  pushList(ruleList) {
    ruleList.forEach(({ selector, rule }) => {
      this.push(selector, rule);
    });
    return this;
  }
  pushImportantList(ruleList) {
    ruleList.forEach(({ selector, rule }) => {
      this.pushImportant(selector, rule);
    });
    return this;
  }
  submit() {
    this.removeAll();
    new Info("AddStyle").log(Array.from(this.cssRuleSet).join(" "));
    this.styleDom = GM_addStyle(Array.from(this.cssRuleSet).join(" "));
  }
  removeAll() {
    if (this.styleDom) {
      this.styleDom.remove();
    }
    return this;
  }
}
function transformedHideSelectorList(prefSelectorList) {
  return Object.values(prefSelectorList).flat();
}
function addHideStyle(cssRule) {
  new CSSRule().pushHideList(transformedHideSelectorList(cssRule)).submit();
}
(async () => {
  const entryBranch = new EntryBranch();
  entryBranch.add(
    isMatchURL("^https?://i.chaoxing.com/base"),
    () => {
      addHideStyle(styleConfig.hide.main);
    }
  ).add(
    isMatchURL("mooc2-ans.chaoxing.com/visit/"),
    () => {
      async function autoJumpCourse() {
        const courseLinkBtn = await elementWaiter("#myLearn");
        courseLinkBtn.click();
      }
      addHideStyle(styleConfig.hide.course);
      autoJumpCourse();
    }
  ).run();
})();
