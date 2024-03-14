// ==UserScript==
// @name		抖音直播间净化
// @description		抖音直播界面美化. 
// @version		beta_1.0.5
// @author		Yiero
// @match		https://live.douyin.com/*
// @icon		https://live.douyin.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @require		file://D:\Code\tampermonkey-demo\dist\PageBeautiful\DouyinLiveClean\DouyinLiveClean.js
// @run-at		document-start
// @grant		GM_addStyle
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
const hideSelectorList = {
  main: [
    /* 下方的相关直播推荐 */
    ".OkoVu3vW",
    /* 右下角的意见反馈 */
    ".douyin-sidebar, .G0S7YWl4"
  ],
  // 侧边栏
  aside: [
    // 左边侧边导航栏
    ".N_HNXA04"
  ],
  /* 顶部搜索栏 */
  header: [
    // [客户端] [快捷访问]
    // '.NRiH5zYV, .JTui1eE0',
    // 投稿的红点
    ".CPQ46DEr",
    // 直播栏上方的分类栏, [热门直播] / [主机游戏] 等
    ".mNaEBJlG"
  ],
  /* 直播标题栏 */
  liveTitle: [
    // 左侧 [小时栏], [下载], [更多]
    ".s49a85m9 > button:nth-of-type(n + 2)",
    // 右侧 [礼物展馆]
    ".AbLfr3ao",
    // 左侧 [加入粉丝团]
    ".s49a85m9"
  ],
  /* 直播栏 */
  live: [
    // 左下角的礼物卡片
    ".f64hQYrh"
  ],
  /* 网页全屏 */
  fullscreenLive: [
    /* 礼物栏 */
    ".is-theater .tgMCqIjJ"
  ],
  /* 直播弹幕 */
  liveDanmu: [
    // 礼物弹幕
    ".VMJPFNGB"
  ],
  /* 侧边弹幕栏 */
  danmuBar: [
    // 送礼名单
    ".nex5gRxd",
    // 观众入场和点赞
    ".webcast-chatroom___bottom-message",
    // 直播勋章卡片
    ".OAJeuZUg",
    // 礼物弹幕
    ".webcast-chatroom___item:has(.JJvNvDHA)",
    // 点赞消息
    ".webcast-chatroom___item:not(:has(.webcast-chatroom___content-with-emoji-text))",
    // 系统消息, 如[入场信息] [礼物冠名信息]
    ".webcast-chatroom__room-message",
    // 弹幕入场动画
    ".webcast-chatroom___enter-active"
  ]
};
const prefSelectorList = {
  live: {
    // 拉伸到直播满高度
    "#_douyin_live_scroll_container_ > div, .UKFpY5tW, .SxCiQ8ip": { height: "100%" },
    // 拉伸直播到满宽度
    ".SxCiQ8ip": { padding: 0 }
  },
  fullscreenLive: {
    // 拉伸到直播满高度
    ".is-theater > .EDvjMGPs.FKQqfehj": { height: "100%" }
  }
};
function douyinAddNewStyle() {
  const cssRule = new CSSRule();
  cssRule.pushHideList(transformedHideSelectorList(hideSelectorList)).pushImportantList(transformedPrefSelectorList(prefSelectorList)).submit();
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
(() => {
  const entryBranch = new EntryBranch();
  entryBranch.add(
    () => isMatchURL(/^https:\/\/live.douyin.com\/\d+/),
    () => {
      douyinAddNewStyle();
    }
  ).run();
})();
