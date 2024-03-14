// ==UserScript==
// @name		Bilibili净化
// @name:en		BiliClean
// @description		Bilibili净化多余元素. 
// @description:en		Bilibili净化多余元素. 
// @author		Yiero
// @match		https://*.bilibili.com/*
// @icon		https://www.bilibili.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @run-at		document-body
// @grant		GM_addStyle
// @version		beta_1.0.0
// @require		file://D:\Code\JavaScript\TamperMonkey\tampermonkey-demo\dist\PageBeautiful\BiliClean\BiliClean.js
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
const hideSelectorList = {
  /* 直播 */
  live: {
    /* 侧边直播栏 */
    danmuBar: [
      // 等级勋章
      ".wealth-medal-ctnr.fans-medal-item-target",
      ".play-together-panel",
      ".entry-web",
      ".gift-planet-entry",
      ".activity-entry",
      ".popular-and-hot-rank",
      // 小橙车
      ".shop-popover",
      ".gift-left-part",
      ".function-card",
      // 系统活动消息
      ".common-danmuku-msg",
      // 送礼弹幕消息
      ".gift-item",
      // 直播PK
      ".pk-bar-with-info",
      ".awesome-pk-vm",
      "#pk-vm"
    ]
  },
  /* 动态 */
  dynamic: {
    main: [
      ".bili-dyn-version-control",
      ".reply-notice"
    ],
    dynamicList: [
      // 番剧列表
      ".bili-dyn-list-tabs__list > .bili-dyn-list-tabs__item:nth-of-type(3)"
    ],
    /* 评论区 */
    comment: [
      // 评论区直接@别人的傻逼
      ".comment-list > .list-item.reply-wrap:has(.text > a)"
    ]
  },
  /* 视频 */
  video: {
    main: [
      ".float-nav__btn--fixed",
      // 广告
      ".reply-notice",
      // 笔记模式拓展, 反馈信息
      "body > div:nth-child(17) > div > div.splitpanes.splitpanes--vertical.default-theme > div.splitpanes__pane.p-3 > div > span"
    ],
    video: [
      // 视频中贴牌广告
      ".bpx-player-skipcard"
    ],
    /* 评论区 */
    comment: [
      // 评论区直接@别人的傻逼
      ".reply-list > .reply-item:has(.root-reply > .reply-content-container > .reply-content > .jump-link.user)"
    ]
  },
  /* 个人空间 */
  space: {
    comment: [
      ".reply-notice"
    ]
  },
  /* 顶部导航栏的直播下拉框 */
  liveNavIframe: {
    main: [
      /* 整个隐藏 */
      ".promotion-show-placeholder"
    ]
  }
};
const prefSelectorList = {
  live: {
    /* 直播标题栏 */
    liveTitle: {
      // 展开直播标题栏
      ".live-skin-normal-a-text": { overflow: "visible" }
    }
  },
  dynamic: {
    main: {}
  },
  video: { main: {} },
  space: { main: {} },
  liveNavIframe: { main: {} }
};
function transformedHideSelectorList(prefSelectorList2) {
  return Object.values(prefSelectorList2).flat();
}
function transformedPrefSelectorList(prefSelectorList2) {
  return Object.entries(
    Object.values(prefSelectorList2).flat().reduce((result, current) => ({
      ...result,
      ...current
    }))
  ).map(
    ([selector, rule]) => ({ selector, rule })
  );
}
function addNewStyle(pageType) {
  const cssRule = new CSSRule();
  cssRule.pushHideList(transformedHideSelectorList(hideSelectorList[pageType])).pushImportantList(transformedPrefSelectorList(prefSelectorList[pageType])).submit();
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
const getEl = document.querySelector.bind(document);
const getEls = document.querySelectorAll.bind(document);
async function changeTypeTitle() {
  const selector = ".bili-dyn-list-tabs__list > .bili-dyn-list-tabs__item";
  await getElement(document.body, selector, 0, 0.1);
  const dynamicTypeList = getEls(selector);
  if (dynamicTypeList) {
    dynamicTypeList[0].innerText = "动态";
    dynamicTypeList[1].innerText = "视频";
    dynamicTypeList[2].innerText = "番剧";
  }
}
async function changeSearchBarPlaceholder(title) {
  const selector = ".search-bar > input";
  await getElement(document.body, selector, 0, 0.5);
  const inputElement = getEl(selector);
  inputElement.placeholder = title;
}
(async () => {
  const entryBranch = new EntryBranch();
  entryBranch.add(
    () => isMatchURL(/^https:\/\/live.bilibili.com\/(blanc\/)?\d+/),
    async () => {
      addNewStyle("live");
      await changeSearchBarPlaceholder("搜索");
    }
  ).add(
    () => isMatchURL("https://t.bilibili.com/"),
    async () => {
      addNewStyle("dynamic");
      await changeTypeTitle();
    }
  ).add(
    () => isMatchURL(/^https:\/\/www.bilibili.com\/video\/(av)|(BV)/),
    () => {
      addNewStyle("video");
    }
  ).add(
    () => isMatchURL(/^https:\/\/space.bilibili.com\/\d+\/dynamic/),
    () => {
      addNewStyle("dynamic");
    }
  ).add(
    () => isMatchURL("https://live.bilibili.com/blackboard/dropdown-menu.html"),
    () => {
      addNewStyle("liveNavIframe");
    }
  );
  entryBranch.run();
})();
